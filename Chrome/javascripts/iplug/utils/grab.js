define(["iplug/class", "iplug/plug-modules"], function (Class, Modules) {
	var a = require(Modules["a"]);
    var n = Class.extend({
        show: function (text, $obj, right) {
            a.trigger("tooltip:show", text, $obj, right);
        },
        hide: function () {
            a.trigger("tooltip:hide");
        }
    });
    return new n();
});
