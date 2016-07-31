define(["iplug/class", "iplug/plug-modules", "jquery", "underscore"], function(Class, Modules, $, _) {
    var a = require(Modules["a"]);
    var n = Class.extend({
        init: function() {
            // get your own at https://developers.soundcloud.com
            this.clientID = "9258af128ee9d4c781d46b31917531e7";
        },
        tracks: function(id, callback) {
            if (!callback || typeof callback !== "function") return;
            $.getJSON("https://api.soundcloud.com/tracks/" + id + "?client_id=" + this.clientID, function(data, status, xhr) {
                callback(null, data);
            }).fail(function(xhr, status, statusText) {
                callback(new Error(id.toString() + " - " + statusText), {});
            });
        }
    });
    return new n();
});