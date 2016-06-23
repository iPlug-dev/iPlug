define(["iplug/class", "iplug/plug-modules"], function (Class, Modules) {
	var a = require(Modules["a"]);
    var n = Class.extend({
        show: function (icon, text) {
            a.trigger("notify", icon, text);
        }
    });
    return new n();
});
