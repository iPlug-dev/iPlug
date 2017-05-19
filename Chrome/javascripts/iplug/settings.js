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
            topmeh: false,
            topskip: false,
            topdl: false,
            roomname: true,
            audience: true,
            dj: true,
            joinwaitlist: true,
            playbackcontrols: true,
        },
        visualizations: {
            enabled: false,
            style: 1, // 1 or 2 (coming 3)
            style1: {
                fftSize: 1024, //min 128, max 32768
                colorRotation: true,
                rotationSpeed: {
                    static: 50,
                    dynamic: 200
                },
                colors: [{
                    pos: 0.00,
                    color: {
                        r: 255,
                        g: 0,
                        b: 0
                    }
                }, {
                    pos: 0.25,
                    color: {
                        r: 255,
                        g: 255,
                        b: 0
                    }
                }, {
                    pos: 0.50,
                    color: {
                        r: 0,
                        g: 255,
                        b: 0
                    }
                }, {
                    pos: 0.75,
                    color: {
                        r: 0,
                        g: 255,
                        b: 255
                    }
                }, {
                    pos: 1.00,
                    color: {
                        r: 0,
                        g: 0,
                        b: 255
                    }
                }]
            },
            style2: {
                colors: [{
                    r: 105,
                    g: 210,
                    b: 231
                }, {
                    r: 27,
                    g: 103,
                    b: 107
                }, {
                    r: 190,
                    g: 242,
                    b: 2
                }, {
                    r: 235,
                    g: 229,
                    b: 77
                }, {
                    r: 0,
                    g: 205,
                    b: 172
                }, {
                    r: 22,
                    g: 147,
                    b: 165
                }, {
                    r: 249,
                    g: 212,
                    b: 35
                }, {
                    r: 255,
                    g: 78,
                    b: 80
                }, {
                    r: 231,
                    g: 32,
                    b: 78
                }, {
                    r: 12,
                    g: 202,
                    b: 186
                }, {
                    r: 255,
                    g: 0,
                    b: 111
                }]
            }
        }
    };
    var settings = {};
    var localStorageName = "iplug|settings";
    var n = new Proxy(settings, {
        get: function(obj, prop) {
            switch (prop) {
                case "load":
                    return function() {
                        try {
                            var data = JSON.parse(localStorage[localStorageName]);
                            if (!data || typeof settings !== "object") {
                                throw new Error("Not object");
                            }
                            for (prop in settings) {
                                delete settings[prop];
                            }
                            for (prop in data) {
                                settings[prop] = data[prop];
                            }
                        } catch (e) {
                            console.warn("Settings parser", e);
                            n.clear();
                        }
                        return n;
                    }
                case "save":
                    return function() {
                        localStorage[localStorageName] = JSON.stringify(settings);
                        return n;
                    }
                case "clear":
                    return function() {
                        var data = defaults;
                        for (prop in settings) {
                            delete settings[prop];
                        }
                        for (prop in data) {
                            settings[prop] = data[prop];
                        }
                        return n;
                    }
                default:
                    return obj[prop];
            }
        },
        set: function(obj, prop, value) {
            switch (prop) {
                case "load":
                case "save":
                case "clear":
                    throw new Error("Tried to write non-writable property: " + prop);
                default:
                    return obj[prop] = value;
            }
        }
    });
    n.load();
    return n;
});