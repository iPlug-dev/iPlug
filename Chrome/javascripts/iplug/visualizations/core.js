define(["iplug/class", "sketch", "jquery", "underscore", "iplug/visualizations/style1"], function (Class, Sketch, $, _, Style1) {
    var n = Class.extend({
        init: function () {
            this.visualizations = Sketch.create({
                autopause: false,
                fullscreen: false,
                container: document.getElementById("playback"),
                setup: function () {
                    _.bind(Style1.setup, Style1)(this);
                },
                draw: function () {
                    _.bind(Style1.draw, Style1)(this);
                },
                update: function () {
                    _.bind(Style1.update, Style1)(this);
                }
            });
            Object.defineProperty(this.visualizations, "width", {
                get: function () {
                    return this.canvas.width;
                }
            });
            Object.defineProperty(this.visualizations, "height", {
                get: function () {
                    return this.canvas.height;
                }
            });
            $(window).on("resize", _.bind(this.onResize, this));
        },
        enable: function () {

        },
        disable: function () {

        },
        onResize: function () {
            console.log("!!!!");
            console.log(this);
            _.bind(Style1.onResize, Style1)(this.visualizations);
        },
        hide: function () { // _.bind(n.hide,n);
            var that = this;
            $(this.visualizations.canvas).stop(true).animate({
                opacity: "0"
            }, {
                easing: "easeOutQuint",
                duration: 2E3,
                queue: !1,
                complete: function () {
                    this.style.display = "none";
                    that.visualizations.stop();
                }
            })
        },
        show: function () { // _.bind(n.show,n);
            var that = this;
            $(this.visualizations.canvas).stop(true).animate({
                opacity: "1"
            }, {
                easing: "easeOutQuint",
                duration: 2E3,
                queue: !1,
                start: function () {
                    this.style.display = "block";
                    that.visualizations.start();
                }
            });
        }
    });
    return new n();
});
