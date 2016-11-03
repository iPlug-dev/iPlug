define(["iplug/plug-modules", "iplug/settings", "iplug/visualizations/core", "iplug/visualizations/processor", "jquery", "underscore"], function(Modules, Settings, Core, Processor, $, _) {
    var s = require(Modules["s"]); //now playing
    var z = require(Modules["z"]); //settings
    var t = require(Modules["t"]); //soundcloud
    var a = require(Modules["a"]); //eventemitter

    var p = null;
    var c;
    var d;

    for (var i = 0, found = false; !found && i < s._events["change:media"].length; i++) {
        for (var j = 0; !found && j < a._events["change:streamDisabled"].length; j++) {
            for (var k = 0; !found && k < s._events["change:remaining"].length; k++) {
                for (var l = 0; !found && l < s._events["change:volume"].length; l++) {

                    c = s._events["change:media"][i];
                    d = a._events["change:streamDisabled"][j];
                    var e = s._events["change:remaining"][k];
                    var f = s._events["change:volume"][l];

                    if (f.callback.name === "onVolumeChange") {
                        if (e.callback.name === "onRemainingChange") {
                            if (c.callback.name === "onMediaChange") {
                                if (d.callback === c.callback) {
                                    if (c.context === d.context && d.context === e.context && e.context === f.context) {
                                        console.log("Context found", i, j, k, l);
                                        p = a._events["change:streamDisabled"][j].context;
                                        found = true;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    if (p === null) throw new Error("Playback modification: context not found!");

    p._reset = p.reset;
    p._onResize = p.onResize;

    p.reset = function() {
        Core.reset();
        return this._reset.apply(this, arguments);
    };
    p.onResize = function() {
        var r = this._onResize.apply(this, arguments);
        Core.onResize();
        return r;
    };
    p.onSnoozeClick = function() {
        this.reset();
        this.stop();
        this.$ytIframe.hide();
        this.$scIframe.hide();
        if (this.$ipIframe) this.$ipIframe.hide();
        this.$controls.addClass("snoozed");
    };

    c.callback = d.callback = p.onMediaChange = function() {
        var s = require(Modules["s"]); //now playing
        this.reset();
        this.$controls.removeClass("snoozed");
        var n = s.get("media");
        if (n) {
            this.$noDJ.hide();
            if (!z.settings.streamDisabled) {
                this.ignoreComplete = !0, _.delay(_.bind(this.resetIgnoreComplete, this), 1000);
                var i = s.get("volume");
                var ela = s.get("elapsed");
                var o = ela < 4 ? 0 : ela;
                console.log("elapsed", ela, o);
                if (n.get("format") === 1) { //youtube = 1
                    this.buffering = !1;
                    this.yto = {
                        id: n.get("cid"),
                        volume: i,
                        seek: o,
                        quality: z.settings.hdVideo ? "hd720" : "" //maybe more than 720p?
                    };
                    if (this.$ytIframe.length) {
                        $(this.$ytIframe).show();
                        this.ytFrameLoadedBind();
                    } else {
                        var a = "yt5";
                        if (window.location.origin.indexOf("//plug.dj") > -1) {
                            a += ""
                        } else if (window.location.origin.indexOf("//localhost") > -1) {
                            a += "local"
                        } else {
                            a += "staging"
                        }
                        var l = $('<iframe id="yt-frame" frameborder="0" src="' + window.location.protocol + "//bug.dj/_/" + a + '.html"></iframe>');

                        l.load(this.ytFrameLoadedBind);
                        this.$container.append(l);
                        this.$ytIframe = this.$("#yt-frame");
                    }
                    this.$syncIframe.hide();
                    if (this.$ipIframe) this.$ipIframe.hide();
                    this.$scIframe.hide();
                } else if (n.get("format") === 2) { //sc = 2
                    if (Settings.visualizations.enabled) {
                        if (!this.$ipIframe) {
                            this.$ipIframe = Core.render(this.$container);
                        }
                        this.$ipIframe.show();
                        this.$syncIframe.hide();
                        this.$ytIframe.hide();
                        this.$scIframe.hide();
                        this.player = {
                            isPlaying: function() {
                                return Processor.isPlaying();
                            },
                            setVolume: function(value) {
                                return Processor.setVolume(value);
                            },
                            pause: function() {
                                return Processor.setSource({
                                    url: ""
                                });
                            },
                            off: function() {},
                            on: function() {},
                            seek: function(n) {
                                return Processor.setCurrentTime(n / 1000);
                            }
                        }
                        Core.updateMedia({
                            media: s.get("media"),
                            seek: Math.max(s.get("elapsed"), 0),
                            volume: s.get("volume") / 100
                        });
                        Core.run();

                    } else {
                        if (t.r) { //sc api loaded?
                            if (t.sc) { // ready
                                if (this.$scIframe.length) {
                                    this.$scIframe.show();
                                    this.$scIframe.attr("src", this.visualizers[this.random.integer(0, 1)]);
                                } else {
                                    this.$scIframe = $('<iframe id="sc-frame" frameborder="0" src="' + this.visualizers[this.random.integer(0, 1)] + '"></iframe>');
                                    this.$container.append(this.$scIframe);
                                }
                                this.$syncIframe.hide();
                                this.$ytIframe.hide();
                                if (this.$ipIframe) this.$ipIframe.hide();
                                var c = this;
                                y = setTimeout(this.scTimeoutBind, 5000);
                                n && t.sc.stream("/tracks/" + n.get("cid")).then(function(e) {
                                    clearTimeout(y);
                                    c.player = e;
                                    e.on("state-change", c.scStateBind);
                                    e.options.protocols = ["http"];
                                    e.play();
                                });
                            } else { //sc down
                                this.$container.append($('<img src="https://soundcloud-support.s3.amazonaws.com/images/downtime.png" height="271"/>').css("position", "absolute").css("left", 46));
                            }
                        } else {
                            r.on("sc:ready", this.onSCReady, this); //triggers onMediaChange again when sc api ready
                        }
                    }
                }
            } else {
                this.reset();
                this.stop();
                this.$syncIframe.hide();
                this.$ytIframe.hide();
                if (this.$ipIframe) this.$ipIframe.hide();
                this.$scIframe.hide();
            }
        } else {
            this.$syncIframe.hide();
            this.$ytIframe.hide();
            if (this.$ipIframe) this.$ipIframe.hide();
            this.$scIframe.hide();
            this.$noDJ.show();
            this.$controls.hide();
        }
    };
    if (s.get("media") && s.get("media").get("format") === 2 && Settings.visualizations.enabled) {
        p.onMediaChange();
    }
    return p;
});