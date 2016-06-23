define(["iplug/class", "iplug/visualizations/style2/settings"], function (Class, Settings) {
    var n = Class.extend({
        init: function (ctx) {
            this.x = Math.random() * ctx.width;
            this.y = Math.random() * ctx.height * 2;
            this.reset();
        },
        reset: function () {
            this.level = 1 + Math.floor(Math.random() * 4);
            this.scale = Settings.SCALE.MIN + (Settings.SCALE.MAX - Settings.SCALE.MIN) * Math.random();
            this.alpha = Settings.ALPHA.MIN + (Settings.ALPHA.MAX - Settings.ALPHA.MIN) * Math.random();
            this.speed = Settings.SPEED.MIN + (Settings.SPEED.MAX - Settings.SPEED.MIN) * Math.random();
            this.size = Settings.SIZE.MIN + (Settings.SIZE.MAX - Settings.SIZE.MIN) * Math.random();
            this.spin = Settings.SPIN.MIN + (Settings.SPIN.MAX - Settings.SPIN.MIN) * Math.random();
            this.band = Math.round(Math.random() * Settings.FFTSize);
            this.color = {
                r: 0,
                g: 0,
                b: 0
            }; /* TODO */
            if (Math.floor(Math.random())) {
                this.spin = -this.spin;
            }
            this.smoothedScale = 0.0;
            this.smoothedAlpha = 0.0;
            this.decayScale = 0.0;
            this.decayAlpha = 0.0;
            this.energy = 0.0;
            this.rotation = Math.random() * Math.PI * 2;
        },
        draw: function (ctx) {
            var alpha = this.alpha * this.energy * 1.5;
            var power = Math.exp(this.energy);
            var scale = this.scale * power;
            this.decayScale = Math.max(this.decayScale, scale);
            this.decayAlpha = Math.max(this.decayAlpha, alpha);
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
            ctx.lineCap = 'round';
            ctx.globalAlpha = this.smoothedAlpha / this.level;
            ctx.strokeStyle = this.color;
            ctx.stroke();
            ctx.restore();
        },
        update: function () {
            this.rotation += this.spin;
            this.y -= this.speed * this.level;
        }
    });
    return n;
});
