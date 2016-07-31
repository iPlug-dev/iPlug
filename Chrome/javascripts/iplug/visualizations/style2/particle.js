define(["iplug/class", "iplug/settings", "iplug/visualizations/style2/settings"], function(Class, Settings, PSettings) {
    var n = Class.extend({
        init: function(ctx) {
            this.x = Math.random() * 1000;
            this.y = Math.random() * 1000;
            this.reset();
        },
        reset: function() {
            this.level = 1 + Math.floor(Math.random() * 4);
            this.scale = PSettings.SCALE.MIN + (PSettings.SCALE.MAX - PSettings.SCALE.MIN) * Math.random();
            this.alpha = PSettings.ALPHA.MIN + (PSettings.ALPHA.MAX - PSettings.ALPHA.MIN) * Math.random();
            this.speed = PSettings.SPEED.MIN + (PSettings.SPEED.MAX - PSettings.SPEED.MIN) * Math.random();
            this.size = PSettings.SIZE.MIN + (PSettings.SIZE.MAX - PSettings.SIZE.MIN) * Math.random();
            this.spin = PSettings.SPIN.MIN + (PSettings.SPIN.MAX - PSettings.SPIN.MIN) * Math.random();
            this.band = Math.floor(Math.random() * PSettings.LIMIT);

            this.color = Settings.visualizations.style2.colors[Math.floor(Math.random() * Settings.visualizations.style2.colors.length)];

            if (Math.round(Math.random())) {
                this.spin = -this.spin;
            }
            this.smoothedScale = 0.0;
            this.smoothedAlpha = 0.0;
            this.decayScale = 0.0;
            this.decayAlpha = 0.0;
            this.energy = 0.0;
            this.rotation = Math.random() * Math.PI * 2;
        },
        draw: function(ctx) {
            this.decayScale = Math.max(this.decayScale, this.scale * Math.exp(this.energy));
            this.decayAlpha = Math.max(this.decayAlpha, this.alpha * this.energy * 1.5);
            this.smoothedScale += 0.3 * (this.decayScale - this.smoothedScale);
            this.smoothedAlpha += 0.3 * (this.decayAlpha - this.smoothedAlpha);
            this.decayScale *= 0.985;
            this.decayAlpha *= 0.975;
            ctx.save();
            ctx.beginPath();
            ctx.translate(this.x + Math.cos(this.rotation * this.speed) * 250, this.y);
            ctx.rotate(this.rotation);
            ctx.scale(this.smoothedScale * this.level, this.smoothedScale * this.level);
            ctx.moveTo(this.size * 0.5, 0);
            ctx.lineTo(this.size * -0.5, 0);
            ctx.lineWidth = 1;
            ctx.lineCap = "round";
            ctx.globalAlpha = this.smoothedAlpha / this.level;
            if (!this.color) {
                this.color = {
                    r: 255,
                    g: 255,
                    b: 255
                };
            }
            ctx.strokeStyle = "rgb(" + this.color.r + "," + this.color.g + "," + this.color.b + ")";
            ctx.stroke();
            ctx.restore();
        },
        update: function() {
            this.rotation += this.spin;
            this.y -= this.speed * this.level;
        }
    });
    return n;
});