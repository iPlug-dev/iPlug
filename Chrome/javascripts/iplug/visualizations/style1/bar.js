define(["iplug/class"], function (Class) {
    var n = Class.extend({
        init: function () {
            this.x = 0;
            this.y = 0;
            this.width = 0;
            this.height = 0;
        },
        update: function (x, y, w, h) {
            this.x = x;
            this.y = y;
            this.width = w;
            this.height = h;
        },
        draw: function (ctx) {
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    });
    return n;
});
