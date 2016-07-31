define(["iplug/class", "iplug/settings", "iplug/visualizations/processor", "iplug/visualizations/style2/particle", "iplug/visualizations/style2/settings"], function(Class, Settings, Processor, Particle, PSettings) {
    var n = Class.extend({
        init: function() {
            this.particles = [];
            for (var i = 0; i < PSettings.LIMIT; i++) {
                var particle = new Particle();
                this.particles.push(particle);
            }
        },
        reset: function() {

        },
        update: function(ctx, obj) {

        },
        draw: function(ctx, fData, tData, time) {
            Processor.analyser.smoothingTimeConstant = 0.5;
            Processor.setFFTsize(1024);

            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

            for (var i = 0; i < this.particles.length; i++) {
                this.particles[i].energy = fData[this.particles[i].band] / 255;
            }

            for (var i = 0; i < this.particles.length; i++) {
                if (this.particles[i].y < -this.particles[i].size * this.particles[i].level * this.particles[i].scale * 2) {
                    this.particles[i].reset();
                    this.particles[i].x = Math.random() * ctx.canvas.width;
                    this.particles[i].y = ctx.canvas.height + this.particles[i].size * this.particles[i].scale * this.particles[i].level;
                }
                this.particles[i].update();
                this.particles[i].draw(ctx);
            }
        }
    });
    return new n();
});