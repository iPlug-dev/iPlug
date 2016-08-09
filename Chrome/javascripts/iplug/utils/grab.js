define(["iplug/class", "iplug/plug-modules"], function(Class, Modules) {
    var a = require(Modules["a"]);
    var b = require(Modules["b"]);
    var s = require(Modules["s"]);
    var q = require(Modules["q"]);
    var n = Class.extend({
        getPlaylists: function() {
            return b.toJSON();
        },
        getActivePlaylist: function() {
            return b.findWhere({
                active: true
            }).toJSON();
        },
        getVisiblePlaylist: function() {
            return b.findWhere({
                visible: true
            }).toJSON();
        },
        grab: function(playlistid) {
            if (!playlistid) {
                var active = this.getActivePlaylist();
                if (!active) return; //there is no playlist selected
                playlistid = active.id;
            }
            var historyid = s.get("historyID");
            if (!historyid) return; //nothing playing
            a.dispatch(new q(q.GRAB, playlistid, historyid));
        }
    });
    return new n();
});