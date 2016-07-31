define(["iplug/class", "iplug/settings", "iplug/visualizations/style1/bar", "iplug/visualizations/processor"], function(Class, Settings, Bar, Processor) {
    var n = Class.extend({
        init: function() {
            this.image = new Image();
            this.image.onload = function() {
                this.loaded = true;
            };
            this.reset();
        },
        reset: function() {
            this.gradient = undefined;
            this.speedA = [];
            this.image.src = "";
            this.image.loaded = false;
            this.offset = (isFinite(this.offset) && !isNaN(this.offset)) ? this.offset : 0;
            this.title = {
                state: 0, //0 = no animation, 1 = stay, 2 = go left & stay
                changed: 0, //internal
                offset: 0, //internal
                offsetMax: 0, //internal
                text: "",
                getFont: function(ctx) {
                    return 0.050 * ctx.canvas.height + "px 'Exo', sans-serif";
                }
            };
            this.author = {
                state: 0, //0 = no animation, 1 = stay, 2 = go left & stay
                changed: 0, //internal
                offset: 0, //internal
                offsetMax: 0, //internal
                text: "",
                getFont: function(ctx) {
                    return "bold " + 0.070 * ctx.canvas.height + "px 'Exo', sans-serif";
                }
            };
        },
        update: function(ctx, obj) {
            ctx.save();
            if (obj) {
                if (obj.artwork) {
                    this.image.src = obj.artwork;
                }
                if (obj.title) {
                    this.title.text = obj.title;
                }
                if (obj.author) {
                    this.author.text = obj.author;
                }
            }

            ctx.font = this.title.getFont(ctx);
            this.title.offsetMax = Math.max(0, ctx.measureText(this.title.text).width + 0.28 /*magic value*/ * ctx.canvas.height - 0.816 /*magic value*/ * ctx.canvas.width);
            if (this.title.offsetMax === 0) {
                this.title.state = 0;
                this.title.offset = 0;
            } else {
                this.title.state = 1;
            }

            ctx.font = this.author.getFont(ctx);
            this.author.offsetMax = Math.max(0, ctx.measureText(this.author.text).width + 0.28 /*magic value*/ * ctx.canvas.height - 0.816 /*magic value*/ * ctx.canvas.width);
            if (this.author.offsetMax === 0) {
                this.author.state = 0;
                this.author.offset = 0;
            } else {
                this.author.state = 1;
            }

            ctx.restore();
        },
        draw: function(ctx, fData, tData, time) {
            Processor.analyser.smoothingTimeConstant = 0.8;

            Processor.setFFTsize((Settings.visualizations.style1.fftSize >= 128 && (Settings.visualizations.style1.fftSize & -Settings.visualizations.style1.fftSize) == Settings.visualizations.style1.fftSize && Settings.visualizations.style1.fftSize <= 32768) ? Settings.visualizations.style1.fftSize : 1024);

            fData = fData.slice(0, fData.length >= 2048 ? (365 * fData.length / 2048) : fData.length == 1024 ? 185 : fData.length == 512 ? 92 : fData.length == 256 ? 46 : fData.length == 128 ? 23 : fData.length == 64 ? 14 : 10);

            if (Settings.visualizations.style1.colors.length === 0) {
                this.gradient = ctx.createLinearGradient(0, 0, ctx.canvas.width, 0);
                this.gradient.addColorStop(0, "rgb(255,255,255)");
            } else if (Settings.visualizations.style1.colorRotation) {
                var sum = 0;
                for (var i = 0; i < tData.length; i++)
                    sum += Math.abs(tData[i] - 128);
                this.speedA.unshift(sum / (128 * tData.length));
                if (this.speedA.length > 2) this.speedA.pop();

                this.offset = (this.offset + ctx.canvas.width / 502 * time.delta / 1000 * (Settings.visualizations.style1.rotationSpeed.static + Settings.visualizations.style1.rotationSpeed.dynamic * this.speedA.reduce(function(p, c, i, a) {
                    return p + c / (a.length || 1);
                }, 0))) % ((1 + 2 / Settings.visualizations.style1.colors.length) * ctx.canvas.width);

                this.offset = (isFinite(this.offset) && !isNaN(this.offset)) ? this.offset : 0;

                this.gradient = ctx.createLinearGradient(-this.offset, 0, ctx.canvas.width * (2 + 2 / (Settings.visualizations.style1.colors.length)) - this.offset, 0);

                for (var i = 0; i < Settings.visualizations.style1.colors.length; i++) {
                    var c = Settings.visualizations.style1.colors[i];
                    this.gradient.addColorStop(c.pos / (2 + 2 / Settings.visualizations.style1.colors.length), "rgb(" + c.color.r + "," + c.color.g + "," + c.color.b + ")");
                    this.gradient.addColorStop((1 + c.pos + 2 / Settings.visualizations.style1.colors.length) / (2 + 2 / Settings.visualizations.style1.colors.length), "rgb(" + c.color.r + "," + c.color.g + "," + c.color.b + ")");
                }
            } else {
                this.gradient = ctx.createLinearGradient(0, 0, ctx.canvas.width, 0);

                for (var i = 0; i < Settings.visualizations.style1.colors.length; i++) {
                    var c = Settings.visualizations.style1.colors[i];
                    this.gradient.addColorStop(c.pos, "rgb(" + c.color.r + "," + c.color.g + "," + c.color.b + ")");
                }
            }

            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            ctx.fillStyle = this.gradient;
            var offsetLeft = ctx.canvas.width * 0.092; /*dont change*/
            var offsetTop = ctx.canvas.height * 0.129; /*magic value*/
            var midY = ctx.canvas.height / 2;
            var bar_w = (ctx.canvas.width - (offsetLeft * 2)) / (fData.length - 0);
            var bar_d_w = bar_w / 3 < 1 ? bar_w : bar_w / 3;

            for (var i = 0, x = 0, y = 0; i < fData.length; i++) {
                x = offsetLeft - bar_d_w + (1 + i) * bar_w;
                y = offsetTop + (255 - fData[i]) / 255 * (midY - offsetTop);
                ctx.fillRect(x, y, bar_d_w, midY - y);
            }

            var spacer = 0.03 * ctx.canvas.height;
            var x = offsetLeft;
            var y = midY + spacer;
            var w = h = 0.250 * ctx.canvas.height;

            if (this.image.loaded) {
                ctx.save();
                ctx.beginPath();
                ctx.moveTo(x + 10, y);
                ctx.lineTo(x + w - 10, y);
                ctx.quadraticCurveTo(x + w, y, x + w, y + 10);
                ctx.lineTo(x + w, y + h - 10);
                ctx.quadraticCurveTo(x + w, y + h, x + w - 10, y + h);
                ctx.lineTo(x + 10, y + h);
                ctx.quadraticCurveTo(x, y + h, x, y + h - 10);
                ctx.lineTo(x, y + 10);
                ctx.quadraticCurveTo(x, y, x + 10, y);
                ctx.closePath();
                ctx.clip();
                ctx.drawImage(this.image, x, y, w, h);
                ctx.restore();
            }

            ctx.save();
            ctx.beginPath();
            ctx.moveTo(x + w + spacer, y);
            ctx.lineTo(ctx.canvas.width - offsetLeft, y);
            ctx.lineTo(ctx.canvas.width - offsetLeft, y + h);
            ctx.lineTo(x + w + spacer, y + h);
            ctx.clip();

            if (this.title.state === 1) {
                this.title.changed += time.delta;
                if (this.title.changed >= 1500) {
                    this.title.changed = 0;
                    this.title.state = 2;
                }
            } else if (this.title.state === 2) {
                if (this.title.offset === -this.title.offsetMax) {
                    this.title.changed += time.delta;
                } else {
                    this.title.offset -= 65 /* *ctx.canvas.width / 502*/ * time.delta / 1000;
                    this.title.offset = Math.max(this.title.offset, -this.title.offsetMax);
                }
                if (this.title.changed >= 3000) { //3s ok?
                    this.title.changed = 0;
                    this.title.state = 1;
                    this.title.offset = 0;
                }
            }

            if (this.author.state === 1) {
                this.author.changed += time.delta;
                if (this.author.changed >= 1500) {
                    this.author.changed = 0;
                    this.author.state = 2;
                }
            } else if (this.author.state === 2) {
                if (this.author.offset === -this.author.offsetMax) {
                    this.author.changed += time.delta;
                } else {
                    this.author.offset -= 65 /* *ctx.canvas.width / 502*/ * time.delta / 1000;
                    this.author.offset = Math.max(this.author.offset, -this.author.offsetMax);
                }
                if (this.author.changed >= 3000) {
                    this.author.changed = 0;
                    this.author.state = 1;
                    this.author.offset = 0;
                }
            }

            ctx.fillStyle = "#fff";

            ctx.font = this.title.getFont(ctx);
            ctx.textBaseline = "bottom";
            ctx.fillText(this.title.text, this.title.offset + x + w + spacer, y + h / 2);

            ctx.font = this.author.getFont(ctx);
            ctx.textBaseline = "bottom";
            ctx.fillText(this.author.text, this.author.offset + x + w + spacer, y + h);

            ctx.restore();
        }
    });
    return new n();
});