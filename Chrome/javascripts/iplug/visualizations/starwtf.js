define(["iplug/class"], function (Class) {
    var n = Class.extend({
        init: function (x, y, maxSpeed) {
            this.x = x;
            this.y = y;
            this.slope = y / x;
            this.opacity = 0;
            this.speed = Math.max(Math.random() * maxSpeed, 1);
        },
        distanceTo: function (originX, originY) {
            return Math.sqrt(Math.pow(originX - this.x, 2) + Math.pow(originY - this.y, 2));
        },
        reset: function (x, y, maxSpeed) {
            this.init.apply(this, arguments);
            return this;
        }
    });
    return n;
});
