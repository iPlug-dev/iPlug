define(["iplug/class", "jquery"], function(Class, $) {
    var defaults = {
        autowoot: {
            delaymin: 0,
            delaymax: 0,
            delayrandom: false,
            enabled: true,
        },
        autojoin: {
            enabled: true
        },
        autograb: {
            delaymin: 0,
            delaymax: 0,
            enabled: false,
            playlist: "Choose the playlist"
        },
        currentBackground: "standard",
        styles: {
            curatebuttons: true,
            topwoot: false,
            topgrab: false,
            topmeh:  false,
            topskip: false,
            topdl:   false,
            roomname: true,
            audience: true,
            dj:       true,
            joinwaitlist: true,
            playbackcontrols: true,
        }
        visualizations: {
            enabled: false,
            style: 1, // 1 or 2
            style1: {
                bars: 150,
                colors: [{
                    pos: 0.00,
                    color: {
                        r: 255, g: 0,   b: 0
                    }
                }, {
                    pos: 0.25,
                    color: {
                        r: 255, g: 255, b: 0
                    }
                }, {
                    pos: 0.50,
                    color: {
                        r: 0,   g: 255, b: 0
                    }
                }, {
                    pos: 0.75,
                    color: {
                        r: 0,   g: 255, b: 255
                    }
                }, {
                    pos: 1.00,
                    color: {
                        r: 0,   g: 0,   b: 255
                    }
                }]
            },
            style2: {
                colors: [{
                    r: 105, g: 210, b: 231
                }, {
                    r: 27,  g: 103, b: 107
                }, {
                    r: 190, g: 242, b: 2
                }, {
                    r: 235, g: 229, b: 77
                }, {
                    r: 0,   g: 205, b: 172
                }, {
                    r: 22,  g: 147, b: 165
                }, {
                    r: 249, g: 212, b: 35
                }, {
                    r: 255, g: 78,  b: 80
                }, {
                    r: 231, g: 32,  b: 78
                }, {
                    r: 12,  g: 202, b: 186
                }, {
                    r: 255, g: 0,   b: 111
                }]
            }
        }
    };
    var n = Class.extend({
        localStorageName: "iplug|settings",
        init: function() {
            this.load();
        },
        clear: function(){
            localStorage[this.localStorageName] = JSON.stringify(defaults);
            return this.load();
        },
        load: function() {
            try {
                var data = JSON.parse(localStorage[this.localStorageName]);
            } catch (e) {
                console.warn("Settings parser", e);
            }
            $.extend(true, this, defaults, data);
            return this;
        },
        save: function() {
            localStorage[this.localStorageName] = JSON.stringify(this, Object.keys(defaults));
            return this;
        }
    });
    return new n();
});