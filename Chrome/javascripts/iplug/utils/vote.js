define(["iplug/class"], function (Class) {
    var n = Class.extend({
        init: function () {
            this.wootEl = document.getElementById("woot");
            this.mehEl = document.getElementById("meh");
        },
        woot: function (force) {
            if ((!force && API.getUser().vote !== 0) || !API.getMedia()) return;
            this.wootEl.click();
        },
        meh: function (force) {
            if ((!force && API.getUser().vote !== 0) || !API.getMedia()) return;
            this.mehEl.click();
        }
    });
    return new n();
});
