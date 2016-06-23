define(["iplug/class", "iplug/visualizations/style2/particle", "iplug/visualizations/style2/settings", "iplug/visualizations/processor"], function (Class, Particle, PSettings, Processor) {
    var n = Class.extend({
        init: function () {
            this.particles = [];
        },
        enable: function () {
            Processor.setFFTsize(PSettings.FFTSize);
            localStorage["iplug|scvisualsstyle"] = 2;
        },
        setup: function (ctx) {
            for (var i = 0; i < PSettings.LIMIT; i++) {
                this.particles.push(new Particle(ctx));
            }
        },
        update: function (ctx) {
            var data = Processor.getData();
            for (var i = 0; i < this.particles.length; i++) {
                this.particles[i].energy = (data[this.particles[i].band] / 255);
                this.particles[i].update();
            }
        },
        draw: function (ctx) {
            for (var i = 0; i < this.particles.length; i++) {
                var particle = this.particles[i];
                if (particle.y < -particle.size * particle.level * particle.scale * 2) {
                    this.particles[i] = new Particle(ctx);
                }
                particle.draw(ctx);
            }
        }
    });
    return new n();
});
