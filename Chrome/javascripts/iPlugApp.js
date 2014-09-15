(function () {
    //"use strict";

    //-------------------------------------------- CHECK IF EXISTS -------------------------------\\

    if (isNaN(parseInt(localStorage["iplug|autowootdelaymin"]))) {
        localStorage["iplug|autowootdelaymin"] = 0;
    }
    if (isNaN(parseInt(localStorage["iplug|autowootdelaymax"]))) {
        localStorage["iplug|autowootdelaymax"] = 0;
    }
    if (isNaN(parseInt(localStorage["iplug|scvisualsbarsmin"]))) {
        localStorage["iplug|scvisualsbarsmin"] = 232;
    }
    if (isNaN(parseInt(localStorage["iplug|scvisualsbarsmax"]))) {
        localStorage["iplug|scvisualsbarsmax"] = 232;
    }
    if (undefined === localStorage["iplug|autowootdelayrandom"]) {
        localStorage["iplug|autowootdelayrandom"] = "none";
    }
    if (undefined === localStorage["iplug|autowootenabled"]) {
        localStorage["iplug|autowootenabled"] = "block";
    }
    if (undefined === localStorage["iplug|autojoinenabled"]) {
        localStorage["iplug|autojoinenabled"] = "block";
    }
    if (undefined === localStorage["iplug|bigtxtenabled"]) {
        localStorage["iplug|bigtxtenabled"] = "none";
    }
    if (undefined === localStorage["iplug|youtubevideodisabled"]) {
        localStorage["iplug|youtubevideodisabled"] = "none";
    }
    if (undefined === localStorage["iplug|curatedisabled"]) {
        localStorage["iplug|curatedisabled"] = "none";
    }
    if (undefined === localStorage["iplug|waitlistdisabled"]) {
        localStorage["iplug|waitlistdisabled"] = "none";
    }
    if (undefined === localStorage["iplug|audiencedisabled"]) {
        localStorage["iplug|audiencedisabled"] = "none";
    }
    if (undefined === localStorage["iplug|djdisabled"]) {
        localStorage["iplug|djdisabled"] = "none";
    }
    if (undefined === localStorage["iplug|scvisualsenabled"]) {
        localStorage["iplug|scvisualsenabled"] = "block";
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////

    $("body").append("<div id='iplug-overlay' style='display:none;'></div>");

    $("#waitlist > .header > .divider").remove();
    $("#waitlist > .header").append("<div class='divider left'></div>");
    $("#waitlist > .header").append("<div class='divider right'></div>");



    function version() {
        var v;
        var reqID = Math.random().toString();
        var fetchResponse = new CustomEvent('KrisDontTouchMyCode', {
            "detail": {
                "reqID": reqID
            }
        });
        document.addEventListener('KrisDontTouchMyCodeOK-' + reqID, function respListener(e) {
            if (e.detail.reqID == reqID) {
                document.removeEventListener('KrisDontTouchMyCodeOK-' + reqID, respListener);
                v = e.detail.v;
            }
        });
        document.dispatchEvent(fetchResponse);
        return v;
    }



    if (typeof (localStorage['iplug|version']) != "string") localStorage['iplug|version'] = "0";

    if (version() != localStorage['iplug|version']) {
        localStorage['iplug|version'] = version();
        setTimeout(function () {
            $('#iplug-overlay').css('display', 'block');
            alert("iPlug has been updated!\n\n\nVersion: " + localStorage['iplug|version']);
            $('#iplug-overlay').css('display', 'none');
        }, 5000);
    }

    function WT() {
        if ($('#woot').length > 0) {
            var v1 = $("#meh")[0] == $("#vote > .selected")[0];
            var v2 = $("#woot")[0] == $("#vote > .selected")[0];
            if (!(v1 || v2)) { //didn't work
                $("#woot").click();
                setTimeout(WT, 500); //try again
            }
        } else {
            setTimeout(WT, 1000); // object not created yet || slow pc 
        }
    }


    setTimeout(WT, 3000); // AUTO WOOT ON JOIN



    var Visualizations = {};
    var CANVAS_HEIGHT = 9;
    var CANVAS_WIDTH = 16;

    Visualizations.currentRoom = window.location.href;
    Visualizations.audio = new Audio();
    Visualizations.audio.src = "";
    Visualizations.audio.controls = false;
    Visualizations.audio.autoplay = true;
    Visualizations.audio.preload = "auto";
    Visualizations.audio.loop = false;
    Visualizations.initVolume = function () {
        var volume;
        try {
            volume = API.getVolume();
        } catch (f) {}
        if (!isFinite(volume / 100)) {
            setTimeout(Visualizations.initVolume, 1000);
        } else {
            Visualizations.audio.volume = (volume / 100);
        }
    }
    Visualizations.initVolume();
    Visualizations.roomChecker = setInterval(function () {
        var u = window.location.href;
        if (u != Visualizations.currentRoom) {
            Visualizations.currentRoom = u;
            if (!Visualizations.audio.paused) Visualizations.audio.pause();
        }
    }, 1000);
    Visualizations.context = new webkitAudioContext(); // ONLY 1 !!!!!!
    Visualizations.analyser = Visualizations.context.createAnalyser();
    Visualizations.source = Visualizations.context.createMediaElementSource(Visualizations.audio);
    Visualizations.source.connect(Visualizations.analyser);
    Visualizations.analyser.connect(Visualizations.context.destination);

    $("#playback-container").parent().append("<canvas id='iplug-playback' style='z-index: 6;'></canvas>");

    Visualizations.chatError = function (message) {
        $("#chat-messages").append('<div class="system" style="border-left-color: transparent;padding-left: 27px;">\
    <i class="icon icon-support-white" style="background: url(https://w.soundcloud.com/icon/assets/images/orange_transparent_32-94fc761.png);"></i>\
    <span class="text" style="color: #d1d1d1;">' + message + '</span>\
    </div>');
    }

    Visualizations.ObsrvOne = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if (mutation.attributeName == "style") {
                var te = mutation.target.style.cssText;
                te += "z-index: 6;position: absolute;top: 0;";
                $("#iplug-playback")[0].style.cssText = te;
                CANVAS_WIDTH = parseInt(mutation.target.style.width, 10);
                CANVAS_HEIGHT = (parseInt(mutation.target.style.height, 10) - 30 - (100 - API.getVolume()));
            }
        });
    });
    Visualizations.ObsrvOne.observe($("#playback-container")[0], {
        attributes: true,
        childList: false,
        characterData: false
    });
    Visualizations.ObsrvTwo = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            Visualizations.audio.volume = (API.getVolume() / 100);
            CANVAS_HEIGHT = (parseInt($("#playback-container")[0].style.height, 10) - 30 - (100 - API.getVolume()));
        });
    });
    Visualizations.ObsrvTwo.observe($("#volume > span")[0], {
        attributes: false,
        childList: true,
        characterData: false
    });
    $("#iplug-playback")[0].style.cssText = $("#playback-container")[0].style.cssText + "z-index: 6;position: absolute;top: 0;"; /*initial call*/
    CANVAS_WIDTH = parseInt($("#iplug-playback")[0].style.width, 10); /*initial call*/
    CANVAS_HEIGHT = (parseInt($("#playback-container")[0].style.height, 10) - 30 - (100 - API.getVolume())); /*initial call*/

    // Check for non Web Audio API browsers.
    //if (!window.webkitAudioContext) {
    //    alert("iPlug - error! \n\nWeb Audio isn't available in your browser!\nWeb Audio is supported by: \nChrome 14+, Firefox 23+, Opera 15+, Safari 6+!\n\nBut...you can still hear the sounds :) /nPS. Update your browser! :>");
    //}

    Visualizations.streamURL = Visualizations.permURL = undefined;
    Visualizations.clientID = "9258af128ee9d4c781d46b31917531e7";
    /* GET YOUR OWN CLIENT ID ON HTTP://DEVELOPERS.SOUNDCLOUD.COM 
     * DON'T USE MINE :)
     */
    Visualizations.killFlash = function () {
        try {
            if ($("#playback-controls")[0] == $(".snoozed")[0]) {
                Visualizations.audio.src = ""
            }
            if (localStorage['iplug|scvisualsenabled'] != "block") {
                soundManager.unmuteAll();
                return false;
            }
            $("#playback-buffering").text("").css("display", "none");
            if (!soundManager.muted) soundManager.muteAll();
            if (soundManager.muted) soundManager.stopAll();
        } catch (f) {}
    }
    setInterval(Visualizations.killFlash, 2000);
    Visualizations.onEvent = function (event) {
        if (!Visualizations.audio.paused) Visualizations.audio.pause();
        var cid = "";
        var yesNo; // YES, IT IS YESNO
        if (typeof event != "object") {
            var superTemp = API.getMedia();
            if (superTemp === undefined) return;
            if (superTemp.format != "2") return;
            cid = superTemp.cid;
            yesNo = true;
        } else {
            if (typeof (event.media) != "object") return;
            if (event.media.format != "2") return;
            cid = event.media.cid;
            yesNo = false;
        }
        if (localStorage['iplug|scvisualsenabled'] != "block") return;
        $("#playback-container > *").remove();
        $.get('https://api.soundcloud.com/tracks/' + cid + '.json?client_id=' + Visualizations.clientID).always(function (data, data2) {
            if (data2 == "success") {
                if (data.streamable === true) { //start working now
                    Visualizations.streamURL = data.stream_url + '?client_id=' + Visualizations.clientID;
                    Visualizations.permURL = data.permalink_url;
                    Visualizations.playIt(yesNo);
                } else {
                    Visualizations.streamURL = undefined;
                    Visualizations.permURL = undefined;
                    Visualizations.chatError("Track not streamable!");
                }
            } else {
                Visualizations.streamURL = undefined;
                Visualizations.permURL = undefined;
                Visualizations.chatError(JSON.parse(data.responseText).errors[0].error_message);
            }
        });
    };

    Visualizations.callEvent = function (something) {
        Visualizations.onEvent(something);
    };

    Visualizations.playIt = function (yesNo) {
        if (yesNo) {
            Visualizations.audio.src = Visualizations.streamURL + "#t=" + API.getTimeElapsed();
        } else {
            Visualizations.audio.src = Visualizations.streamURL;
        }
        Visualizations.audio.play();
    };

    Visualizations.canvas = $("#iplug-playback")[0];
    Visualizations.ctx = Visualizations.canvas.getContext('2d');
    var SPACER_WIDTH = Math.floor((((300 - (parseInt(localStorage["iplug|scvisualsbarsmin"], 10))) / 12) + 0.5) * 2) / 2;
    Visualizations.colors = ['red', 'yellow', 'green', 'aqua', 'blue'];
    Visualizations.getRainbowGradient = function (ctx, width) {
        var grd = ctx.createLinearGradient(0, 0, width, 0);
        {
            var arrLength = Visualizations.colors.length - 1;
            Visualizations.colors.forEach(function(a,i){
            
            grd.addColorStop(i/arrLength, a);
            });
        }
        return grd;
    }


    Visualizations.compressArray = function (a, b) {
        var n = a.length / b;
        var temp = 0;
        var c = [];
        var m = n - 1;
        for (i = 0; i < a.length; i++) {
            if (i >= m) {
                temp += a[i] / n * (1 - i + m);
                c.push(temp);
                temp = a[i] / n * (i - m);
                m += n;
            } else {
                temp += a[i] / n;
            }
        }
        return c;
    }

    Visualizations.rafCallback = function (time) {
        window.requestAnimationFrame(Visualizations.rafCallback, Visualizations.canvas);

        var freqByteData = new Uint8Array(Visualizations.analyser.frequencyBinCount);
        if (typeof (window.flap) == "undefined") window.flap = freqByteData;
        Visualizations.analyser.getByteFrequencyData(freqByteData);
        var BAR_WIDTH;
        if (SPACER_WIDTH > 1) {
            BAR_WIDTH = (SPACER_WIDTH / 2);
        } else {
            BAR_WIDTH = (SPACER_WIDTH);
        }

        var OFFSET = 100;
        var CUTOFF = 23;
        var numBars = Math.round(CANVAS_WIDTH / SPACER_WIDTH);
        var freqByteData2 = Visualizations.compressArray(freqByteData, numBars);
        Visualizations.ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        Visualizations.ctx.lineCap = 'round';

        Visualizations.ctx.fillStyle = Visualizations.getRainbowGradient(Visualizations.ctx, CANVAS_WIDTH / 2);
        for (var i = 0; i < numBars; ++i) {
            var magnitude = freqByteData2[i /*+ OFFSET*/ ];
            Visualizations.ctx.fillRect(i * SPACER_WIDTH, CANVAS_HEIGHT, BAR_WIDTH, -magnitude);
        }
    };
    API.on(API.ADVANCE, Visualizations.callEvent);
    Visualizations.rafCallback(); // CALL ONLY ONCE!

    $("#playback-controls > div.button.refresh").click(function () {
        API.trigger(API.ADVANCE);
    });

    $("#playback-controls > div.button.snooze").click(function () {
        API.trigger(API.ADVANCE);
    });

    Visualizations.initCall = function () {
        if ((typeof (API) == "object") && (typeof (API.enabled) == "boolean") && !($('#room-loader').length > 0)) {
            Visualizations.callEvent();
        } else {
            setTimeout(Visualizations.initCall, 1000);
        }
    };
    Visualizations.initCall();
    //=============================================================================================================================================\\
    //=============================================================================================================================================\\
    //=============================================================================================================================================\\
    //=============================================================================================================================================\\
    //=============================================================================================================================================\\














    var mehupdate = false;
    var lasttimer = 0;

    $("#vote").bind("DOMNodeInserted DOMNodeRemoved DOMSubtreeModified", displayMeh);
    $("#users-button, .icon-clear-input").bind("click", displayMeh);
    $("#list-filter-input").bind("keyup", displayMeh);

    function displayMeh() {
        if (mehupdate) {
            return;
        }
        if ($("#users-button").attr("class").indexOf("selected") == -1 || $(".header > .room").attr("class").indexOf("selected") == -1) {
            clearInterval(lasttimer);
            return;
        }
        mehupdate = true;
        setTimeout(function () {
            mehupdate = false;
        }, 0);
        $("#wootchangetracker").unbind().remove();
        var users = API.getUsers();
        $(".user > .icon-grab").attr("style", "margin-right: 30px;");
        $(".user > .name").attr("style", "left: 68px");
        $(".user > .icon-woot, .leveldisplay").remove();
        users = users.filter(function (user) {
            return -1 != user.username.toLowerCase().indexOf($("#list-filter-input").val().toLowerCase());
        });

        if (localStorage["iplug|bigtxtenabled"] == "none") {
            for (i = 0; i < users.length; i++) {
                $($(".user > .name")[i]).parent().append(["<i class='icon icon-woot' style='background-position: -174px -280px'></i>", "", "<i class='icon icon-woot'></i>"][users[i].vote + 1] + "<div class='leveldisplay' style='left:30px; height: 30px; width: 46px'><span class='name' style='top: 7px; margin-left: auto; margin-right: auto; color: #eee; font-size: 10px'>lvl" + users[i].level + "</span></div>");
            }
        } else if (localStorage["iplug|bigtxtenabled"] == "block") {
            for (i = 0; i < users.length; i++) {
                $($(".user > .name")[i]).parent().append(["<i class='icon icon-woot' style='background-position: -174px -280px'></i>", "", "<i class='icon icon-woot'></i>"][users[i].vote + 1] + "<div class='leveldisplay' style='left:30px; height: 30px; width: 46px'><span class='name' style='top: 5px; margin-left: auto; margin-right: auto; left: 25px;width: 43px;text-align: center;color: rgb(128, 134, 145); font-size: 15px'>" + users[i].level + "</span></div>");
            }
        }
        if (0 === $("#removedcheck").length) {
            $("#user-lists > .jspScrollable > .jspContainer > .jspPane").prepend("<div id='removedcheck'></div>");
        }
        clearInterval(lasttimer);
        lasttimer = setInterval(checkplugrefresh, 50);
    }


    function checkplugrefresh() {
        if (0 === $("#removedcheck").length) {
            displayMeh();
        }
    }


    //remove style="display: block;" that sometimes happens cuz plug
    //how about $().css("display", "none")
    setTimeout(function () {
        $("#dialog-container").attr("style", "");
    }, 5000);



    if (localStorage["iplug|youtubevideodisabled"] == "none") {
        $("#playback").css("display", "block");
    } else {
        $("#playback").css("display", "none");
    }
    if (localStorage["iplug|curatedisabled"] == "none") {
        $("#vote").css("display", "block");
    } else {
        $("#vote").css("display", "none");
    }
    if (localStorage["iplug|waitlistdisabled"] == "none") {
        $("#audience").css("display", "block");
    } else {
        $("#audience").css("display", "none");
    }
    if (localStorage["iplug|audiencedisabled"] == "none") {
        $("#dj-button").css("display", "block");
    } else {
        $("#dj-button").css("display", "none");
    }
    if (localStorage["iplug|djdisabled"] == "none") {
        $("#dj-booth").css("display", "block");
    } else {
        $("#dj-booth").css("display", "none");
    }

    var mouseX;
    var mouseChange;

    $(window).bind("mousemove", function (event) {
        mouseX = event.pageX;
        mouseChange = true;
    });



    var dragging = false;

    API.on(API.ADVANCE, function () {
        if (localStorage["iplug|autowootenabled"] != "block") {
            return;
        }
        setTimeout(WT, Math.round(100 * parseInt(localStorage["iplug|autowootdelaymin"]) + Math.random() * (100 * parseInt((localStorage["iplug|autowootdelaymax"]) - parseInt(localStorage["iplug|autowootdelaymin"]))), 0));
    });

    API.on(API.WAIT_LIST_UPDATE, function () {
        if (localStorage["iplug|autojoinenabled"] != "block") {
            return;
        }
        $(".is-wait").click();
        setTimeout(function () {
            $(".is-wait").click();
        }, 5000);
    });



    $("#header-panel-bar").append("<div id='iplug-button' class='header-panel-button'><div class='box'><i class='icon-iplug'></i></div></div>");
    $(".app-right").append('<div id="iplug-menu" style="display: none"> <div class="header"><span class="title">iPlug Menu</span> <div class="divider"></div> </div> <div id="iplug-menu-container"> <div class="iplug-menu-autowoot iplug-container"> <div id="autowoot" class="subcontainer"><i class="iplug-collapse icon icon-arrow-up" style="text-indent: 0px"></i> <div id="autowootenabled" class="item item-iplug"> <i class="icon icon-check-blue" style="display: ' + localStorage['iplug|autowootenabled'] + '"></i> <span class="subtitle">Autowoot</span> </div> <div id="autowootdelay" class="iplug-menu-autowoot-delay slider">' + {
        block: ' <div class="titlecontainer min"><span class="title">Autowoot Minimum Delay (Seconds)</span><span class="value">' + ((localStorage['iplug|autowootdelaymin'] / 10).toFixed(1)) + 's</span> </div> <div class="titlecontainer max"><span class="title" style="display: inline">Autowoot Maximum Delay (Seconds)</span><span class="value" style="display: inline">' + ((localStorage["iplug|autowootdelaymax"] / 10).toFixed(1)) + 's</span> </div>',
        none: ' <div class="titlecontainer min"><span class="title">Autowoot Delay (Seconds)</span><span class="value">' + ((localStorage['iplug|autowootdelaymin'] / 10).toFixed(1)) + 's</span> </div> <div class="titlecontainer max"><span class="title" style="display: none"></span><span class="value" style="display: none">' + ((localStorage['iplug|autowootdelaymax'] / 10).toFixed(1)) + 's</span> </div>'
    }[localStorage['iplug|autowootdelayrandom']] + ' <div class="counts"> <span class="count">0s</span> <span class="count">10s</span> <span class="count">20s</span> <span class="count">30s</span><span class="stretch"></span> </div> <div class="barcontainer"> <div class="bar background"></div> <div class="bar selected" style="left: ' + (7 + parseInt(localStorage['iplug|autowootdelaymin'])) + 'px; width: ' + (parseInt(localStorage['iplug|autowootdelaymax']) - parseInt(localStorage['iplug|autowootdelaymin'])) + 'px"></div> <div class="hit"></div> <div class="circle circlefirst" style="left: ' + localStorage['iplug|autowootdelaymin'] + 'px;"></div> <div class="circle circlesecond" style="left: ' + localStorage['iplug|autowootdelaymax'] + 'px;"></div> </div> </div> <div id="autowootdelayrandom" class="item item-iplug"> <i class="icon icon-check-blue" style="display: ' + localStorage['iplug|autowootdelayrandom'] + '"></i> <span>Advanced Autowoot Timing</span> </div> </div> <div id="visuals" class="subcontainer"><i class="iplug-collapse icon icon-arrow-up" style="text-indent: 0px"></i> <div class="noitem"><span class="subtitle">Visual Options</span> </div> <div id="youtubevideodisabled" class="item item-iplug"><i class="icon icon-check-blue" style="display: ' + localStorage['iplug|youtubevideodisabled'] + '"></i><span>Hide Youtube Video</span> </div> <div id="curatedisabled" class="item item-iplug"><i class="icon icon-check-blue" style="display: ' + localStorage['iplug|curatedisabled'] + '"></i><span>Hide Vote Buttons</span> </div> <div id="waitlistdisabled" class="item item-iplug"><i class="icon icon-check-blue" style="display: ' + localStorage['iplug|waitlistdisabled'] + '"></i><span>Hide Waitlist Join Button</span> </div> <div id="audiencedisabled" class="item item-iplug"><i class="icon icon-check-blue" style="display: ' + localStorage['iplug|audiencedisabled'] + '"></i><span>Hide Audience</span> </div> <div id="djdisabled" class="item item-iplug"><i class="icon icon-check-blue" style="display: ' + localStorage['iplug|djdisabled'] + '"></i><span>Hide DJ</span> </div> </div> <div id="misc" class="subcontainer"><i class="iplug-collapse icon icon-arrow-up" style="text-indent: 0px"></i> <div class="noitem"><span class="subtitle">Misc Options</span> </div> <div id="autojoinenabled" class="item item-iplug"> <i class="icon icon-check-blue" style="display: ' + localStorage['iplug|autojoinenabled'] + '"></i> <span>Autojoin</span> </div> <div id="bigtxtenabled" class="item item-iplug"> <i class="icon icon-check-blue" style="display: ' + localStorage['iplug|bigtxtenabled'] + '"></i> <span>Alternative Level Indicator</span> </div> </div> <div id="scvisuals" class="subcontainer"><i class="iplug-collapse icon icon-arrow-up" style="text-indent: 0px"></i> <div id="scvisualsenabled" class="item item-iplug"> <i class="icon icon-check-blue" style="display: ' + localStorage['iplug|scvisualsenabled'] + '"></i> <span class="subtitle">Alternative Soundcloud Visuals</span> </div> <div id="scvisualsbars" class="iplug-menu-autowoot-delay slider"> <div class="counts"> <span class="count">Fast</span> <span class="count">Fancy</span> <span class="stretch"></span> </div> <div class="barcontainer"> <div class="bar background"></div> <div class="bar selected"></div> <div class="hit"></div> <div class="circle circlefirst" style="left: ' + localStorage['iplug|scvisualsbarsmin'] + 'px;"></div> <div class="circle circlesecond" style="left: ' + localStorage['iplug|scvisualsbarsmax'] + 'px;"></div> </div> </div> </div> </div> </div> </div>');
    $("#chat-button, #users-button, #waitlist-button").bind("click", function () {
        $("#iplug-button").attr("class", "header-panel-button");
        $("#iplug-menu").attr("style", "display: none");
        $(".iplug-container > .subcontainer").css("height", "30px").children(".iplug-collapse").attr("class", "iplug-collapse icon icon-arrow-up");
    });
    $("#iplug-button").bind("mouseover mouseenter", function () {
        $("#tooltip").remove();
        $("body").append('<div id="tooltip" style="top: 0px; left: ' + (window.innerWidth - 120) + 'px;" class="right"><span>iPlug Menu</span><div class="corner"></div></div>');
    }).bind("mouseout mouseleave", function () {
        $("#tooltip").remove();
    }).bind("click", function () {
        $("#waitlist-button").trigger("click");
        $("#iplug-button").attr("class", "header-panel-button selected");
        $("#iplug-menu").attr("style", "display: block");
        $("#waitlist-button").attr("class", "header-panel-button");
        $("#waitlist").attr("style", "display: none");
    }).one("click", function () {
        $(".iplug-container .item").each(function (i, item) {
            $(item).css("width", parseInt($(item).children("span").css("width")) + 30 + "px");
        });
    });

    $(".iplug-container .item-iplug").bind("click", checkUncheck);


    function checkUncheck() {
        var enabled = "block" != localStorage["iplug|" + $(this).attr("id")];
        if (enabled) {
            localStorage["iplug|" + $(this).attr("id")] = "block";
            $(this).children("i").attr("style", "display: block");
        } else {
            localStorage["iplug|" + $(this).attr("id")] = "none";
            $(this).children("i").attr("style", "display: none");
        }
        switch ($(this).attr("id")) {
            case "youtubevideodisabled":
                if (enabled) {
                    $("#playback").css("display", "none");
                } else {
                    $("#playback").css("display", "block");
                }
                break;
            case "curatedisabled":
                if (enabled) {
                    $("#vote").css("display", "none");
                } else {
                    $("#vote").css("display", "block");
                }
                break;
            case "waitlistdisabled":
                if (enabled) {
                    $("#dj-button").css("display", "none");
                } else {
                    $("#dj-button").css("display", "block");
                }
                break;
            case "audiencedisabled":
                if (enabled) {
                    $("#audience").css("display", "none");
                } else {
                    $("#audience").css("display", "block");
                }
                break;
            case "djdisabled":
                if (enabled) {
                    $("#dj-booth").css("display", "none");
                } else {
                    $("#dj-booth").css("display", "block");
                }
                break;
            case "scvisualsenabled":
                $("#playback-controls > div.button.refresh").click();
                break;
            case "autowootdelayrandom":
                if (enabled) {
                    $("#autowootdelay > .titlecontainer.max >").attr("style", "display: inline");
                    $("#autowootdelay > .titlecontainer.min > .title").html("Autowoot Minimum Delay (seconds)");
                    $("#autowootdelay > .titlecontainer.max > .title").html("Autowoot Maximum Delay (seconds)");
                } else {
                    var average = Math.floor((parseInt(localStorage["iplug|autowootdelaymax"]) + parseInt(localStorage["iplug|autowootdelaymin"])) / 2);
                    localStorage["iplug|autowootdelaymax"] = average;
                    localStorage["iplug|autowootdelaymin"] = average;
                    $("#autowootdelay > .titlecontainer > .value").html((average / 10).toFixed(1) + "s");
                    $("#autowootdelay > .titlecontainer.max >").attr("style", "display: none");
                    $("#autowootdelay > .titlecontainer.min > .title").html("Autowoot Delay (seconds)");
                    $("#autowootdelay > .barcontainer > .circle").attr("style", "left: " + localStorage["iplug|autowootdelaymin"] + "px");
                    $("#autowootdelay > .barcontainer > .bar.selected").attr("style", "left: " + (7 + parseInt(localStorage["iplug|autowootdelaymin"])) + "px; width: 0px");
                }
                break;
        }
    }





    $(".iplug-container .slider > .barcontainer > .circle").bind("mousedown", function () {
        if (dragging) {
            return;
        }
        dragging = true;
        var victim;
        if (localStorage['iplug|' + $(this).parent().parent().attr("id") + 'random'] == "block") {
            victim = $(this);
        } else {
            victim = $(this).parent().children(".circle");
        }
        drag(victim, $(this).parent().children(".bar.selected"), $(this).parent().children(".circlefirst"), $(this).parent().children(".circlesecond"), $(this).parent().parent().children(".titlecontainer.min").children(".value"), $(this).parent().parent().children(".titlecontainer.max").children(".value"), mouseX, parseInt($(this).attr("style").split(" ")[1]), $(this).parent().parent().attr("id"));
    });
    $(window).bind("mouseup blur", function () {
        dragging = false;
    });


    $(".iplug-container .slider > .barcontainer > .hit").bind("mousedown", function () {
        if (dragging) {
            return;
        }
        var mousepos = Math.max(0, Math.min(300, mouseX - $(this).offset().left));
        var closest = [$(this).parent().children(".circlefirst"), $(this).parent().children(".circlesecond")].sort(function (a, b) {
            return Math.abs(mousepos - parseInt(a.css("left"))) - Math.abs(mousepos - parseInt(b.css("left")));
        })[0];
        if (localStorage['iplug|' + $(this).parent().parent().attr("id") + 'random'] == "block") {
            var victim = closest;
            var add;
            if (mousepos > parseInt(closest.css("left"))) {
                add = 1;
            } else {
                add = -1;
            }
            victim.css("left", parseInt(closest.css("left")) + add + "px");
            var values = [parseInt($(this).parent().children(".circlefirst").attr("style").split(" ")[1]), parseInt($(this).parent().children(".circlesecond").attr("style").split(" ")[1])].sort(function (a, b) {
                return a - b;
            });
            localStorage["iplug|" + $(this).parent().parent().attr("id") + "min"] = values[0];
            localStorage["iplug|" + $(this).parent().parent().attr("id") + "max"] = values[1];
            $(this).parent().children(".bar.selected").attr("style", "left: " + (7 + values[0]) + "px; width: " + (values[1] - values[0]) + "px");
            $(this).parent().parent().children(".titlecontainer.min").children(".value").html((values[0] / 10).toFixed(1) + "s");
            $(this).parent().parent().children(".titlecontainer.max").children(".value").html((values[1] / 10).toFixed(1) + "s");
        } else {
            victim = $(this).parent().children(".circle");
            dragging = true;
            drag(victim, $(this).parent().children(".bar.selected"), $(this).parent().children(".circlefirst"), $(this).parent().children(".circlesecond"), $(this).parent().parent().children(".titlecontainer.min").children(".value"), $(this).parent().parent().children(".titlecontainer.max").children(".value"), mouseX, mousepos - 6, $(this).parent().parent().attr("id"));
        }
    });


    $(".iplug-container .slider").on('mousedown', function (e) {
        var handler, doc = jQuery(document);
        e.preventDefault();
        doc.on('mousemove', handler = function (e) {
            e.preventDefault();
        });
        doc.one('mouseup', function (e) {
            doc.off('mousemove', handler);
        });
    });


    function drag(victim, selection, one, two, min, max, startx, original, name) {
        victim.attr("style", "left: " + Math.max(0, Math.min(300, (original - startx + mouseX))) + "px");
        var values = [parseInt(one.attr("style").split(" ")[1]), parseInt(two.attr("style").split(" ")[1])].sort(function (a, b) {
            return a - b;
        });
        localStorage["iplug|" + name + "min"] = values[0];
        localStorage["iplug|" + name + "max"] = values[1];
        selection.attr("style", "left: " + (7 + values[0]) + "px; width: " + (values[1] - values[0]) + "px");
        min.html((values[0] / 10).toFixed(1) + "s");
        max.html((values[1] / 10).toFixed(1) + "s");
        if (dragging) {
            setTimeout(function () {
                drag(victim, selection, one, two, min, max, startx, original, name);
            }, 1);
        }
        if (mouseChange) {
            switch (victim.parent().parent().attr("id")) {
                case "scvisualsbars":
                    SPACER_WIDTH = Math.floor((((300 - (parseInt(localStorage["iplug|scvisualsbarsmin"], 10))) / 12) + 0.5) * 2) / 2;
                    break;
            }
            mouseChange = false;
        }
    }





    $(".iplug-container > .subcontainer > .iplug-collapse").bind("mousedown", function () {
        if ($(this).css("text-indent") != "0px") {
            $(this).attr("queue", "true");
            return;
        }
        var newclass, newheight, rotate, clearheight;
        if ($(this).attr("class") == "iplug-collapse icon icon-arrow-up") {
            newclass = "iplug-collapse icon icon-arrow-down";
            newheight = $(this).parent().css("height", "").css("height");
            $(this).parent().css("height", "30px");
            rotate = "-180px";
            clearheight = true;
        } else {
            newclass = "iplug-collapse icon icon-arrow-up";
            newheight = "30px";
            rotate = "180px";
            clearheight = false;
        }
        $(this).attr("class", newclass).css("text-indent", "180px").css("margin-top", "-2px").css("text-indent", rotate).animate({
            marginTop: "0px",
            textIndent: 0
        }, {
            step: function (go) {
                $(this).css('-moz-transform', 'rotate(' + go + 'deg)');
                $(this).css('-webkit-transform', 'rotate(' + go + 'deg)');
                $(this).css('-o-transform', 'rotate(' + go + 'deg)');
                $(this).css('transform', 'rotate(' + go + 'deg)');
            },
            duration: 750,
            complete: function () {
                if ($(this).attr("queue") == "true") {
                    $(this).mousedown();
                }
                $(this).attr("queue", "false");
                if (clearheight == true) {
                    var lol = $(this).parent();
                    setTimeout(function () {
                        lol.css("height", "");
                    }, 0);
                }
            }
        }).parent().animate({
            height: newheight
        }, {
            duration: 750
        });
    });


    var colorscheme = [
        [0, [255, 0, 0]],
        [0.25, [255, 255, 0]],
        [0.5, [0, 255, 0]],
        [0.75, [0, 255, 255]],
        [1, [0, 0, 255]]
    ];

    function getGradientColor(i) {
        var min = colorscheme.filter(function (a) {
            return a[0] < i;
        }).reverse()[0];
        var max = colorscheme.filter(function (a) {
            return a[0] >= i;
        })[0];
        var inbetween = max[0] - min[0];
        var a = (i - min[0]) / inbetween;
        var b = (max[0] - i) / inbetween;
        return "rgb(" + Math.round(min[1][0] * a + max[1][0] * b) + "," + Math.round(min[1][1] * a + max[1][1] * b) + "," + Math.round(min[1][2] * a + max[1][2] * b) + ")";
    }

}());