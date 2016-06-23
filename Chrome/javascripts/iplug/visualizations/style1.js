define(["iplug/class", "iplug/visualizations/style1/bar", "iplug/visualizations/processor"], function (Class, Bar, Processor) {
    var n = Class.extend({
        init: function () {
            this.bars = [];
            this.barsLimit = 64;
            this.margins = [0.09, 0.15, 0.09, 0.50]; // left, top, right, bottom
            this.margins2 = [0, 0, 0, 0];
        },
        enable: function () {
            Processor.setFFTsize(128);
            localStorage["iplug|scvisualsstyle"] = 1;
        },
        setup: function (ctx) {
            for (var i = 0; i < this.barsLimit; i++) {
                this.bars.push(new Bar());
            }
            this.onResize(ctx);
        },
        onResize: function (ctx) {
            for (var i = 0; i < 4; i++) {
                this.margins2[i] = ((i % 2 == 0) ? ctx.width : ctx.height) * this.margins[i];
            }
            this.oneBarWidth = (ctx.width - this.margins2[0] - this.margins2[2]) / this.bars.length;
            this.preHeight = (ctx.height - this.margins2[1] - this.margins2[3]);
        },
        update: function (ctx) {
            var data = Processor.getData();
            for (var i = 0; i < this.bars.length; i++) {
                var value = (1 - data[i] / 255) * this.preHeight;
                this.bars[i].update(
                    this.oneBarWidth * i + this.margins2[0],
                    this.margins2[1] + value,
                    this.oneBarWidth,
                    this.preHeight - value
                );
            }
        },
        draw: function (ctx) {
            for (var i = 0; i < this.bars.length; i++) {
                this.bars[i].draw(ctx);
            }
        }
    });
    return new n();
});
