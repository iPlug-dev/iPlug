define(["iplug/class", "iplug/plug-modules", "jquery", "underscore"], function (Class, Modules, $, _) {	
	var a = require(Modules["a"]);
    var n = Class.extend({
        init: function () {
            this.loading = true;
            this.loaded = false;
            $("body").append($("<script/>").attr("src", "https://youtube.com/iframe_api"));
            _.delay(_.bind(this.check, this), 1e3);
        },
        check: function () {
            if (typeof window.YT !== "object" || typeof window.YT.Player !== "function" || !window.YT.loaded) {
                _.delay(_.bind(this.check, this), 250);
            } else {
                this.YT = window.YT;
                this.loaded = true;
                a.trigger("yt:ready");
            }
        }
    });
    return new n();
});
