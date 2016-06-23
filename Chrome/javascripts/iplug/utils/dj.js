define(["jquery", "iplug/class", "iplug/plug-modules"], function ($, Class, Modules) {
	var d = require(Modules["d"]);
	var f = require(Modules["f"]);
    var n = Class.extend({
        click: function () {
            f.showSimple(d.image.user, {
                x: 0,
                y: 0
            });
            f.showInfo();
            $("#user-rollover").addClass("topbarskip");
        }
    });
    return new n();
});
