define(["iplug/plug-modules", "iplug/settings", "iplug/visualizations/core", "iplug/visualizations/processor", "jquery", "underscore"], function(Modules, Settings, Core, Processor, $, _) {
    var p = require(Modules["p"]); //playback
    var s = require(Modules["s"]); //now playing
    var z = require(Modules["z"]); //settings
    var t = require(Modules["t"]); //soundcloud
    var a = require(Modules["a"]); //eventemitter

    //TODO: REWRITE P = ...context

    for (var i = 0; i < s._events["change:media"].length; i++) {
        var c = s._events["change:media"][i].callback;
        if (c.name === "onMediaChange" && c.toString().indexOf("soundcloud-support.s3.amazonaws.com") > -1) {
            for (var j = 0; j < a._events["change:streamDisabled"].length; j++) {
                var d = a._events["change:streamDisabled"][j].callback;
                if (d === c) {
                    console.log("Unbound A", j);
                    console.log("Unbound B", i);
                    a._events["change:streamDisabled"][j].context.reset.call(a._events["change:streamDisabled"][j].context);
                    a._events["change:streamDisabled"].splice(j, 1);
                    s._events["change:media"].splice(i, 1);
                    break;
                }
            }
        }
    }

    for (var i = 0; i < s._events["change:remaining"].length; i++) {
        var c = s._events["change:remaining"][i].callback;
        if (c.name === "onRemainingChange") {
            console.log("Unbound C", i);
            s._events["change:remaining"].splice(i, 1);
            break;
        }
    }

    for (var i = 0; i < s._events["change:volume"].length; i++) {
        var c = s._events["change:volume"][i].callback;
        if (c.name === "onVolumeChange" && c.toString().indexOf("player") > -1) {
            console.log("Unbound D", i);
            s._events["change:volume"].splice(i, 1);
            break;
        }
    }

    p.prototype._reset = p.prototype.reset;
    p.prototype._onResize = p.prototype.onResize;
    p.prototype.reset = function() {
        Core.reset();
        return this._reset.apply(this, arguments);
    };
    p.prototype.onResize = function() {
        var r = this._onResize.apply(this, arguments);
        Core.onResize();
        return r;
    };
    p.prototype.onSnoozeClick = function() {
        this.reset();
        this.stop();
        this.$ytIframe.hide();
        this.$scIframe.hide();
        if (this.$ipIframe) this.$ipIframe.hide();
        this.$controls.addClass("snoozed");
    };

    p.prototype.onMediaChange = function() {
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
                if (n.get("format") === 1) { //youtube = 1, sc = 2
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
                } else if (n.get("format") === 2) {
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
    var playback = new p();
    $("#playback").empty().replaceWith(playback.$el);
    playback.render();
    playback.onRefreshClick();

    //TRIGGER MODULE plug-background "d2f19/cff9b/bc78d"

    /* DONE
    u.on("change:volume", this.onVolumeChange, this).on("change:media", this.onMediaChange, this).on("change:remaining", this.onRemainingChange, this),
r.on("change:streamDisabled", this.onMediaChange, this)



TODO!!!!!!
    r.on("playback:block", this.block, this).on("playback:unblock", this.unblock, this)

    */

    /*require("d2f19/ae79a/f1afc/b83f5").loadBG = function() {

    }*/
    return playback;
});