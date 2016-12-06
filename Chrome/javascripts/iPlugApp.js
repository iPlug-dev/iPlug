var idiot = "___URL___";
//console.log("CHROME", idiot);

requirejs.config({
    paths: {
        "iplug": idiot + "javascripts/iplug",
        "sketch": idiot + "javascripts/sketch"
    }
});

gkey = 'AIzaSyCmqEcQFgJ2RN_k_fjUCdP5m9aaitvUwvs';

require(["jquery", "underscore", "iplug/youtube-api", "iplug/autowoot", "iplug/version", "sketch", "iplug/utils/tooltip", "iplug/utils/notify", "iplug/utils/dj", "iplug/backgrounds", "iplug/modifications/userlists", "iplug/modifications/playback"], function ($, _, ytapi, Autowoot, Version, Sketch, Tooltip, Notify, Dj, backgrounds) {
    "use strict";

    //-------------------------------------------- CHECK IF EXISTS -------------------------------\\

    if (isNaN(parseInt(localStorage["iplug|autowootdelaymin"]))) {
        localStorage["iplug|autowootdelaymin"] = 0;
    }
    if (isNaN(parseInt(localStorage["iplug|autowootdelaymax"]))) {
        localStorage["iplug|autowootdelaymax"] = 0;
    }
    if (isNaN(parseInt(localStorage["iplug|scvisualsbarsmin"]))) {
        localStorage["iplug|scvisualsbarsmin"] = 150;
    }
    if (isNaN(parseInt(localStorage["iplug|scvisualsbarsmax"]))) {
        localStorage["iplug|scvisualsbarsmax"] = 150;
    }
    if (undefined === backgrounds[localStorage['iplug|currentBackground']]) {
        localStorage['iplug|currentBackground'] = "standard";
    }
    if (undefined === localStorage["iplug|sccolorstring"]) {
        localStorage["iplug|sccolorstring"] = "0|255,0,0&0.25|255,255,0&0.5|0,255,0&0.75|0,255,255&1|0,0,255";
    }
    if (undefined === localStorage["iplug|decolorstring"]) {
        localStorage["iplug|decolorstring"] = "rgb(105,210,231)|rgb(27,103,107)|rgb(190,242,2)|rgb(235,229,77)|rgb(0,205,172)|rgb(22,147,165)|rgb(249,212,35)|rgb(255,78,80)|rgb(231,32,78)|rgb(12,202,186)|rgb(255,0,111)";
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
    if (undefined === localStorage["iplug|playbackborder"]) {
        localStorage["iplug|playbackborder"] = "none";
    }
    if (undefined === localStorage["iplug|curateenabled"]) {
        localStorage["iplug|curateenabled"] = "block";
    }
    if (undefined === localStorage["iplug|topwootenabled"]) {
        localStorage["iplug|topwootenabled"] = "none";
    }
    if (undefined === localStorage["iplug|topgrabenabled"]) {
        localStorage["iplug|topgrabenabled"] = "none";
    }
    if (undefined === localStorage["iplug|topmehenabled"]) {
        localStorage["iplug|topmehenabled"] = "none";
    }
    if (undefined === localStorage["iplug|topskipenabled"]) {
        localStorage["iplug|topskipenabled"] = "none";
    }
    if (undefined === localStorage["iplug|topdlenabled"]) {
        localStorage["iplug|topdlenabled"] = "none";
    }
    if (undefined === localStorage["iplug|waitlistdisabled"]) {
        localStorage["iplug|waitlistdisabled"] = "none";
    }
    if (undefined === localStorage["iplug|roomnamedisabled"]) {
        localStorage["iplug|roomnamedisabled"] = "none";
    }
    if (undefined === localStorage["iplug|audiencedisabled"]) {
        localStorage["iplug|audiencedisabled"] = "none";
    }
    if (undefined === localStorage["iplug|djdisabled"]) {
        localStorage["iplug|djdisabled"] = "none";
    }
    if (undefined === localStorage["iplug|autohideplaybackcontrolsenabled"]) {
        localStorage["iplug|autohideplaybackcontrolsenabled"] = "none";
    }
    if (undefined === localStorage["iplug|scvisualsenabled"]) {
        localStorage["iplug|scvisualsenabled"] = "block";
    }
    if (undefined === localStorage["iplug|listgrabmehenabled"]) {
        localStorage["iplug|listgrabmehenabled"] = "block";
    }
    if (undefined === localStorage["iplug|imagesenabled"]) {
        localStorage["iplug|imagesenabled"] = "block";
    }
    if (undefined === localStorage["iplug|videosenabled"]) {
        localStorage["iplug|videosenabled"] = "block";
    }
    if (undefined === localStorage["iplug|playmehenabled"]) {
        localStorage["iplug|playmehenabled"] = "none";
    }
    if (undefined === localStorage["iplug|remembermehsenabled"]) {
        localStorage["iplug|remembermehsenabled"] = "none";
    }
    if (undefined === localStorage["iplug|multiplaylistenabled"]) {
        localStorage["iplug|multiplaylistenabled"] = "none";
    }
    if (undefined === localStorage["iplug|duplicatesongsenabled"]) {
        localStorage["iplug|duplicatesongsenabled"] = "none";
    }
    if (undefined === localStorage["iplug|brokensongsenabled"]) {
        localStorage["iplug|brokensongsenabled"] = "none";
    }

    $("#playback > .background").css({
        display: (localStorage["iplug|playbackborder"] === "none") ? "block" : "none"
    });
    $("#playback").css({
        display: (localStorage["iplug|youtubevideodisabled"] === "none") ? "block" : "none"
    });
    $("#vote").css({
        display: localStorage["iplug|curateenabled"]
    });
    $("#woot").css({
        display: localStorage["iplug|topwootenabled"]
    });
    $("#grab").css({
        display: localStorage["iplug|topgrabenabled"]
    });
    $("#meh").css({
        display: localStorage["iplug|topmehenabled"]
    });
    $("#dj-button").css({
        display: (localStorage["iplug|waitlistdisabled"] === "none") ? "block" : "none"
    });
    $("#room-bar").css({
        visibility: (localStorage["iplug|roomnamedisabled"] === "none") ? "visible" : "hidden"
    })
    $("#audience").css({
        display: (localStorage["iplug|audiencedisabled"] === "none") ? "block" : "none"
    });
    $("#dj-booth").css({
        display: (localStorage["iplug|djdisabled"] === "none") ? "block" : "none"
    });
    if (localStorage["iplug|autohideplaybackcontrolsenabled"] === "block")
        $("#playback-controls").addClass("autohide");
    if (localStorage["iplug|multiplaylistenabled"] === "block")
    	$("#footer").addClass("multi");
    var colorscheme = localStorage["iplug|sccolorstring"].split("&");
    colorscheme.forEach(function (a, i, e) {
        e[i] = [a.split("|")[0], a.split("|")[1].split(",")];
    });
    var COLORS = localStorage["iplug|decolorstring"].split("|");

    //=============================================================================================================================================\\
    //=============================================================================================================================================\\
    //=============================================================================================================================================\\
    //=============================================================================================================================================\\
    //=============================================================================================================================================\\

    function JN() {
        if (localStorage["iplug|autojoinenabled"] != "block") return;
        if (tempAutoJoinDisabled) return;
        var button = $("#dj-button");
        if (button.length > 0) {
            if (button.hasClass("is-leave") || button.hasClass("is-quit")) return; //done
            if (button.hasClass("is-full") || button.hasClass("is-locked")) {
                return setTimeout(JN, 500);
            }
            if (button.hasClass("is-wait") || button.hasClass("is-join")) {
                button.click();
                return;
            }
        }
        setTimeout(JN, 1000); // object not created yet || slow pc || loll
    }

    JN(); // AUTO JOIN ON JOIN, and butter on butter is butter

    //========== INIT
    $("#playback-container").css("width", $("#playback-container").css("width"));

    /////

    var pos = -3,
        prevpos = -3;

    function smartAutoJoin() {
        if (API.getDJ() !== undefined && API.getDJ().id == API.getUser().id) {
            pos = -2;
        } else {
            if (API.getWaitListPosition() > -1)
                pos = 0;
            else pos = -1;
        }
        if (prevpos === 0) {
            if (pos === 0) {
                prevpos = pos;
                return;
            }
            if (pos == -2) {
                prevpos = pos;
                return;
            }
            if (pos == -1) {
                prevpos = pos;
                tempAutoJoin(true);
            } // TEMP DISABLE AUTO JOIN
        } else if (prevpos == -2) {
            if (pos == -1) {
                prevpos = pos;
                return;
            } // DJ CYCLE OFF
            if (pos === 0) {
                prevpos = pos;
                return;
            } // DJ CYCLE ON
        } else if (prevpos == -1) {
            if (pos === 0) {
                prevpos = pos;
                tempAutoJoin(false);
            } // MAKE IT WORK NORMALLY
            if (pos == -2) {
                prevpos = pos;
                tempAutoJoin(false);
            }
        }
    }
    /*INIT CALL*/
    function smartAutoJoinInit() {
        if ((pos != -3) || (prevpos != -3)) return; // event was faster hehe
        if ((typeof (API) == "object") && (typeof (API.enabled) == "boolean") && !($('#room-loader').length > 0) && (API.enabled)) {
            if (API.getDJ() !== undefined && API.getDJ().id == API.getUser().id) {
                prevpos = -2;
                pos = -2;
            } else {
                if (API.getWaitListPosition() > -1) {
                    prevpos = 0;
                    pos = 0;
                } else {
                    prevpos = -1;
                    pos = -1;
                }
            }
        } else {
            setTimeout(smartAutoJoinInit, 500);
        }
    }
    smartAutoJoinInit();
    /**********/
    var tempAutoJoinDisabled = false;

    function tempAutoJoin(enabled) {
        if (!(pos != -1 && localStorage["iplug|autojoinenabled"] != "block")) {

            tempAutoJoinDisabled = enabled;
            if (enabled)
                $("#autojoinenabled > i").addClass("blackandwhite");
            else
                $("#autojoinenabled > i").removeClass("blackandwhite");
        } else if (localStorage["iplug|autojoinenabled"] != "block") {
            tempAutoJoinDisabled = false;
            $("#autojoinenabled > i").removeClass("blackandwhite");
        }
    }

    //$("#playback-container").addClass("custom1");

    //$("#iplug-playback").addClass("custom1");

    //=============================================================================================================================================\\
    //=============================================================================================================================================\\
    //=============================================================================================================================================\\
    //=============================================================================================================================================\\
    //=============================================================================================================================================\\

    setTimeout(function () {
        $("#dialog-container").attr("style", "");
    }, 5000);

    Array.prototype.last = function () {
        return this[this.length - 1];
    };

    $('body').keyup(function (e) {
        if (e.keyCode !== 32 || $("#chat-input").hasClass("focused") || $("#dialog-container").css("display") === "block") return;
        if (document.activeElement.tagName === "INPUT") return;
        $("#volume > .button").click();
    });

    if (localStorage["iplug|currentBackground"] === "youtube") {
        $("#playback").addClass("largevideo");
        $(".room-background").remove();
    } else {
        $(".room-background").addClass("default");
        $("#room").append('<i class="room-background" style="left: ' + $(".room-background.default").css("left") + '; top: ' + $(".room-background.default").css("top") + '; background: url(' + backgrounds[localStorage["iplug|currentBackground"]].url + ') no-repeat; opacity: 0;"></i>');
        $(".room-background").animate({
            opacity: 1
        }, {
            duration: 2500,
            queue: false,
            easing: "linear"
        });
    }

    var plugUtils = null;
    $.each(require.s.contexts._.defined, function(i, a){
      if (a && a.badgeClass)
        return !(plugUtils = a);
    });

    var mouseX;
    var mouseY;
    var mouseChange;
    $(window).bind("mousemove", function (event) {
        mouseX = event.pageX;
        mouseY = event.pageY;
        mouseChange = true;
    });

    var dragging = false;

    if (API.getMedia()) $(".backgroundcard[card='youtube'] img").attr("src", (API.getMedia().format === 1) ? ("https://img.youtube.com/vi/" + API.getMedia().cid + "/mqdefault.jpg") : API.getMedia().image);
    API.on(API.ADVANCE, function (data) {
        $(".backgroundcard[card='youtube'] img").attr("src", (data.media.format === 1) ? ("https://img.youtube.com/vi/" + data.media.cid + "/mqdefault.jpg") : data.media.image);
    });

    API.on(API.WAIT_LIST_UPDATE, function () {
        smartAutoJoin(); // init settings
        JN();
    });
    API.on(API.CHAT, function (a) {
        var img = localStorage["iplug|imagesenabled"] === "block";
        var vid = localStorage["iplug|videosenabled"] === "block";
        if (img || vid)
            convertChat(img, vid, $(".cid-" + a.cid));
    });
    var backgroundcarddeck = "";
    Object.keys(backgrounds).forEach(function (e) {
        backgroundcarddeck += cardBuilder(e);
    });
    $(window).bind("resize", function () {
        var heightwidth = {
            width: window.innerWidth - 345 + "px",
            height: window.innerHeight - 108 + "px"
        };
        $(".largevideo > #iplug-playback").css(heightwidth).attr(heightwidth);
        // Visualizations.width = Visualizations.canvas.width;
        // Visualizations.height = Visualizations.canvas.height;
        $(".room-background:not(.default)").css({
            left: $(".room-background.default").css("left"),
            top: $(".room-background.default").css("top")
        });
    });
    $("#your-active-playlist").append("<span id='playlistcounter'>");
    $("#header-panel-bar").append("<div id='iplug-button' class='header-panel-button'><div class='box'><i class='icon-iplug'></i></div></div>");
    $(".app-right").append(eval("'__MENU__'"));
    $("#chat-button, #users-button, #waitlist-button, #friends-button").bind("click", function () {
        $("#iplug-button").attr("class", "header-panel-button");
        $("#iplug-menu").attr("style", "display: none");
        $(".iplug-container > .subcontainer").css("height", "30px").children(".iplug-collapse").attr("class", "iplug-collapse icon icon-arrow-up");
    });
    $("#iplug-button").bind("mouseenter", function () {
        $("#tooltip").remove();
        $("body").append('<div id="tooltip" style="top: 0px; left: ' + (window.innerWidth - 100) + 'px;" class="right"><span>iPlug Menu</span><div class="corner"></div></div>');
    }).bind("mouseleave", function () {
        $("#tooltip").remove();
    }).bind("click", function () {
        $("#waitlist-button").trigger("click");
        $("#iplug-button").attr("class", "header-panel-button selected");
        $("#iplug-menu").attr("style", "display: block");
        $("#waitlist-button").attr("class", "header-panel-button");
        $("#waitlist").attr("style", "display: none");
    }).one("click", function () {
        $(".iplug-container .item, .iplug-container .noitem").each(function (i, item) {
            var width = $(item).hasClass("item") ? 30 : 0;
            $(item).children("span").each(function (i, e) {
                width += parseInt($(e).css("width"));
            });
            $(item).css("width", width + 1 + "px");
        });
        $(".unavailable").each(function (i, e) {
            var checkbox = $("#" + $(e).parent().attr("id") + "enabled > i");
            if (checkbox.css("display") === "block") checkbox.click();
        });
        //$(".backgroundcard[card='youtube'] img").attr("src", (data.media.format === 1) ? ("https://img.youtube.com/vi/" + data.media.cid + "/mqdefault.jpg") : data.media.image);
    });
    $(".nodecontainer .node").each(function (i, e) {
        $(e).css({
            right: 5 + 19 * (i % 16) + "px",
            top: 5 + 19 * Math.floor(i / 16) + "px"
        });
    }).not(".cross").bind("click", bindnode);
    $("#now-playing-bar").wrap('<div id="topbarcontainer" style="left: ' + ((localStorage["iplug|roomnamedisabled"] === "none") ? "446" : "53") + 'px"></div>').children("#history-button").prependTo("#topbarcontainer").wrap('<div id="iconscontainer"></div>').before('<div id="downloadbutton" style="display: ' + ((localStorage["iplug|topdlenabled"] === "none") ? "none !important" : "inline-block !important") + ';"><i></i><div class="downloadbox"><div class="downloadcontainer"><div class="spinner"><i></i><span class="percentage"></span></div></div></div></div><div id="topdjbutton" style="display: ' + ((localStorage["iplug|topskipenabled"] === "none") ? "none !important" : "inline-block !important") + ';"><i class="icon icon-skip"></i></div>');
    if (localStorage["iplug|topwootenabled"] === "block" || localStorage["iplug|topgrabenabled"] === "block" || localStorage["iplug|topmehenabled"] === "block") {
        $("#vote").prependTo("#iconscontainer");
        $("body").addClass("topvotebar");
    }
    $("#topdjbutton").bind("click", function () {
        Dj.click();
        $("#user-rollover .action.skip").click();
    }).bind("mouseover", function () {
        $("body").append('<div id="tooltip" class style="top: 0px; left: ' + (window.innerWidth - 428) + 'px;"><span>Skip current song</span><div class="corner"></div></div>').one("mouseout", function () {
            $("#tooltip").remove();
        });
    });

    $(".iplug-container .item-iplug:not(.unavailable)").bind("click", function () {
        var enabled = "block" != localStorage["iplug|" + $(this).attr("id")];
        if (enabled) {
            localStorage["iplug|" + $(this).attr("id")] = "block";
            $(this).children("i").attr("style", "display: block");
        } else {
            localStorage["iplug|" + $(this).attr("id")] = "none";
            $(this).children("i").attr("style", "display: none");
        }
        callbacks($(this).attr("id"), enabled)();
    });

    $(".iplug-container .slider > .barcontainer > .circle").bind("mousedown", startdrag);

    $(".iplug-container .slider > .barcontainer > .hit").bind("mousedown", function () {
        var mousepos = Math.max(0, Math.min(300, mouseX - $(this).offset().left));
        if (dragging) {
            return;
        }
        if ($(this).parent().hasClass("gradient")) {
            $(this).parent().append('<div class="circle new" style="left: ' + Math.max(0, Math.min(300, mouseX - $(this).offset().left)) + 'px; border-color: ' + getGradientColor(Math.max(0, Math.min(300, mouseX - $(this).offset().left)) / 300, colorscheme) + ';"></div>');
            var newb = $(this).siblings(".new").removeClass("new").css({
                height: "0px",
                width: "0px",
                marginLeft: "-7px",
                marginTop: "5px"
            }).bind("mousedown", startdrag);
            bindGradientCircleEvents(newb);
            newb.trigger("mousedown");
        } else if ($(this).parent().parent().parent().hasClass("colorpicker")) {
            var circle = $(this).siblings(".circle");
            circle.css("left", parseInt((((mousepos < parseInt(circle.css("left"))) ? 0 : 255) + parseInt(circle.css("left")) + 2) / 2) - 1 + "px");
            callbacks($(this).parent().parent().attr("id"))();
        } else {
            var closest = $(this).parent().children(".circle").sort(function (a, b) {
                return Math.abs(mousepos - parseInt($(a).css("left"))) - Math.abs(mousepos - parseInt($(b).css("left")));
            }).eq(0);
            var victim;
            if (localStorage['iplug|' + $(this).parent().parent().attr("id") + 'random'] == "block") {
                victim = closest;
                var add = (mousepos > parseInt(closest.css("left"))) ? 1 : -1;
                victim.css("left", parseInt(closest.css("left")) + add + "px");
                var values = [];
                $(this).parent().children(".circle").each(function (i, item) {
                    values.push(parseInt($(item).css("left")));
                });
                values.sort(function (a, b) {
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
                drag(victim, $(this).parent().children(".bar.selected"), $(this).parent().children(".circle"), $(this).parent().parent().children(".titlecontainer").children(".value"), mouseX, mousepos + 1, $(this).parent().parent().attr("id"), parseInt($(this).parent().children(".bar.background").css("width")) + 1, callbacks(victim.parent().parent().attr("id")));
            }
        }
    });

    $(".iplug-container .slider, .iplug-container .gradientpicker").on('mousedown', function (e) {
        var handler, doc = jQuery(document);
        e.preventDefault();
        doc.on('mousemove', handler = function (e) {
            e.preventDefault();
        });
        doc.one('mouseup', function (e) {
            doc.off('mousemove', handler);
        });
    });

    $(".iplug-container > .subcontainer").prepend("<div class='openhitbox'>");
    $(".iplug-container .openhitbox").bind("mousedown", function () {
    	var that = $(this);
    	var _this = that.siblings(".iplug-collapse");
        if (_this.css("text-indent") != "0px") {
            that.attr("queue", "true");
            return;
        }
        var newclass, newheight, rotate, clearheight, complete;
        if (_this.attr("class") == "iplug-collapse icon icon-arrow-up") {
            newclass = "iplug-collapse icon icon-arrow-down";
            newheight = _this.parent().css("height", "").css("height");
            _this.parent().css("height", "30px");
            rotate = "-180px";
            clearheight = true;
            complete = function () {};
        } else {
            newclass = "iplug-collapse icon icon-arrow-up";
            newheight = "30px";
            rotate = "180px";
            clearheight = false;
            complete = function () {
                _this.siblings(".gradientpicker").children(".settings").children().css("display", "none");
                _this.siblings(".gradientpicker").children(".slider").children(".barcontainer").children(".circle.selected").removeClass("selected").css({
                    height: "10px",
                    width: "10px",
                    marginLeft: "-8px",
                    marginTop: "0px"
                });
            };
        }
        _this.attr("class", newclass).css("text-indent", "180px").css("margin-top", "-2px").css("text-indent", rotate).animate({
            marginTop: "0px",
            textIndent: 0
        }, {
            step: function (go) {
                _this.css('transform', 'rotate(' + go + 'deg)');
            },
            duration: 750,
            complete: function () {
                complete();
                if (that.attr("queue") == "true") {
                    that.mousedown();
                }
                that.attr("queue", "false");
                if (clearheight === true) {
                    var lol = _this.parent();
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

    $(".iplug-container .gradientpicker > .settings > .delete").bind("click", function () {
        if ($(this).children().css("display") === "none") return;
        $(this).parent().siblings(".slider").children(".barcontainer").children(".circle.selected").remove();
        $(this).parent().children().css("display", "none");
        callbacks($(this).parent().siblings(".slider").attr("id"))();
    });

    $(".iplug-container .gradientpicker > .centerall").bind("click", function () {
        var circles = $(this).siblings(".slider").children(".barcontainer").children(".circle");
        circles.sort(function (a, b) {
            return parseInt($(a).css("left")) - parseInt($(b).css("left"));
        }).each(function (i, item) {
            $(item).css("left", parseInt(i / (circles.length - 1) * 300) + "px");
        });
        callbacks("scgradientslider")();
    });

    $(".nodecontainer .node.cross").bind("click", function () {
        var cross = $(this);
        cross.after('<div class="node"></div>');
        cross.parent().animate({
            height: -19 * Math.floor(-$(".node").length / 16) + "px"
        }, {
            duration: 250,
            queue: false
        });
        cross.parent().children(".node").each(function (i, e) {
            $(e).animate({
                right: 5 + 19 * (i % 16) + "px",
                top: 5 + 19 * Math.floor(i / 16) + "px"
            }, {
                duration: 250,
                queue: false
            });
        });
        cross.siblings(".node").first().bind("click", bindnode).css("background-color", cross.parent().siblings(".settings").find(".colorblock").css("background-color")).click();
        cross.parent().siblings(".settings").find(".delete span").css({
            display: "block",
            cursor: "pointer"
        });
        COLORS = [];
        $(".node").not(".cross").each(function (i, e) {
            COLORS.push($(e).css("background-color"));
        });
        localStorage["iplug|decolorstring"] = COLORS.join("|");
    });

    $("#visuals1 .delete").bind("click", function () {
        var del = $(this).parent().siblings(".nodecontainer").children(".node.selected");
        var pos = del.parents().children(".node").index(del);
        var nodes = del.siblings(".node");
        if (nodes.length <= 1) return;
        if (pos === nodes.length) pos--;
        del.parent().animate({
            height: -19 * Math.floor(-$(".node").length / 16) + "px"
        }, {
            duration: 250,
            queue: false
        });
        del.remove();
        nodes.each(function (i, e) {
            $(e).animate({
                right: 5 + 19 * (i % 16) + "px",
                top: 5 + 19 * Math.floor(i / 16) + "px"
            }, {
                duration: 250,
                queue: false
            });
        });
        nodes.eq(pos).click();
        if (nodes.length <= 2) $(this).children().css({
            display: "none",
            cursor: "default"
        });
        COLORS = [];
        $(".node").not(".cross").each(function (i, e) {
            COLORS.push($(e).css("background-color"));
        });
        localStorage["iplug|decolorstring"] = COLORS.join("|");
    });

    $("#backgroundcardselected").one("click", function () {
        $("#backgroundcarddeck").css({
            marginTop: $("#backgroundcardselected").offset().top - 85 + "px",
            marginBottom: 816 - $("#backgroundcardselected").offset().top + "px"
        });
    }).bind("click", function () {
        var deck = $("#backgroundcarddeckcontainer");
        var selected = $("#backgroundcardselected");
        var cards = deck.children().children();
        var card = cards.filter("[card=" + selected.children().attr("card") + "]");
        var n = cards.index(card);
        if (selected.css("cursor") !== "pointer") return;
        $("#playlist-button .icon-arrow-down").click();
        selected.css({
            cursor: "default"
        });
        card.css({
            marginLeft: "345px"
        });
        deck.children().css({
            marginTop: $("#backgroundcardselected").offset().top - 85 + parseInt(deck.css("height")) + "px"
        });
        deck.scrollTop(0).css({
            overflowY: "hidden",
            display: "block"
        }).animate({
            scrollTop: 149 * n + parseInt(deck.css("height"))
        }, {
            duration: 250 * Math.pow(n + 2, .5),
            queue: false,
            complete: function () {
                deck.scrollTop(149 * n).children().css({
                    marginTop: $("#backgroundcardselected").offset().top - 85 + "px"
                });
            }
        });
        setTimeout(function () {
            card.animate({
                marginLeft: "0px"
            }, {
                duration: 750,
                queue: false
            });
            selected.children().animate({
                marginLeft: "-345px"
            }, {
                duration: 750,
                queue: false,
                complete: function () {
                    selected.children().remove();
                }
            });
            setTimeout(function () {
                deck.css({
                    overflowY: "scroll"
                }).attr("opened", "true");
                cards.css({
                    cursor: "pointer"
                }).bind("click", function () {
                    var newcard = $(this);
                    if (newcard.attr("card") === "youtube") $("#youtubevideodisabled i[style='display: block'], #playbackborder i[style='display: none']").click();
                    var m = cards.index(newcard);
                    cards.css({
                        cursor: ""
                    }).unbind();
                    deck.attr("opened", "false").css({
                        overflowY: "hidden"
                    }).animate({
                        scrollTop: 149 * m
                    }, {
                        duration: 250 * Math.pow(Math.abs(m - deck.scrollTop() / 149) + 2, .5),
                        queue: false
                    });
                    setTimeout(function () {
                        newcard.animate({
                            marginLeft: "345px"
                        }, {
                            duration: 750,
                            queue: false
                        }).clone().css({
                            marginLeft: "-345px"
                        }).appendTo(selected).animate({
                            marginLeft: "0px"
                        }, {
                            duration: 750,
                            queue: false
                        });
                        setTimeout(function () {
                            deck.children().css({
                                marginTop: $("#backgroundcardselected").offset().top - 85 + parseInt(deck.css("height")) + "px"
                            });
                            deck.scrollTop(deck.scrollTop() + parseInt(deck.css("height"))).animate({
                                scrollTop: 0
                            }, {
                                duration: 250 * Math.pow(m + 2, .5),
                                complete: function () {
                                    deck.scrollTop(0).css({
                                        display: "none"
                                    }).children().css({
                                        marginTop: $("#backgroundcardselected").offset().top - 85 + "px"
                                    });
                                    newcard.css({
                                        marginLeft: "0px"
                                    });
                                    selected.css({
                                        cursor: "pointer"
                                    });
                                }
                            });
                        }, 500);
                    }, 250 * Math.pow(Math.abs(m - deck.scrollTop() / 149) + 2, .5) - 250);
                    if (card === newcard) return;
                    localStorage["iplug|currentBackground"] = newcard.attr("card");
                    if (newcard.attr("card") === "youtube") {
                        $("#playback").addClass("largevideo");
                        $(".room-background:not(.default)").remove();
                    } else {
                        if (card.attr("card") === "youtube") {
                            $("#playback").removeClass("largevideo");
                            $(window).trigger("resize");
                        }
                        var oldbg = $(".room-background:not(.default)");
                        $("#room").append('<i class="room-background" style="left: ' + $(".room-background.default").css("left") + '; top: ' + $(".room-background.default").css("top") + '; background: url(' + backgrounds[newcard.attr("card")].url + ') no-repeat; opacity: 0;"></i>');
                        $(".room-background").animate({
                            opacity: 1
                        }, {
                            duration: 2500,
                            queue: false,
                            easing: "linear",
                            complete: function () {
                                oldbg.remove();
                            }
                        });
                    }
                });
            }, 500);
        }, 250 * Math.pow(n + 2, .5) - 250);
    });

    $("#footer-user .settings") /*click()*/ .bind("click", function () {
        $(".application .s-vo").removeClass("s-vo").addClass("iplug-disabled").append('<div class="item iplugremoved"><span>Use the iPlug settings instead :)</span></div>')
    });
    var plugSettings;
    $.each(require.s.contexts._.defined, function (i, a) {
        if (a && a.settings)
            return !(plugSettings = a.settings);
    });
    if (plugSettings && plugSettings.videoOnly) {
        var settingsSave;
        $.each(require.s.contexts._.defined, function (i, a) {
            if (a && a.prototype && a.prototype.route && a.prototype.route === "users/settings")
                return !(settingsSave = a);
        });
        var plugEvent = null;
        $.each(require.s.contexts._.defined, function (i, a) {
            if (a && a._events && a.trigger && !a.cid)
                return !(plugEvent = a);
        });
        new settingsSave({
            videoOnly: false
        });
        plugSettings.videoOnly = false;
        plugEvent.trigger("change:videoOnly");

        $("#topbarcontainer #woot").css({
            display: localStorage["iplug|topwootenabled"]
        });
        $("#topbarcontainer #grab").css({
            display: localStorage["iplug|topgrabenabled"]
        });
        $("#topbarcontainer #meh").css({
            display: localStorage["iplug|topmehenabled"]
        });
    }
    /*
    function backsettings() {
    	if ($("#user-settings").offset().left !== 220) {
    		setTimeout(backsettings, 10);
    	} else {
    		$("#footer-user .back").click();
    		setTimeout(function() {
    			$("#user-view").css({visibility: ""});
    		}, 500);
    	}
    }
    setTimeout(function() {
    	$("#user-view").css({"visibility": "hidden"})
    	if ($(".application .s-vo.selected").click().length) {
    		location.reload();
    	}
    	backsettings();
    }, 0);*/

    bindGradientCircleEvents($(".iplug-container .gradientpicker > .slider .barcontainer.gradient > .circle"));

    $("body").bind("click", function () {
        var deck = $("#backgroundcarddeckcontainer");
        if (deck.attr("opened") !== "true" || deck.is(":hover")) return;
        deck.children().children().filter("[card=" + localStorage["iplug|currentBackground"] + "]").click();
    });

    //OLD DOWNLOAD BUTTON STUFF
    /*
    $("#dialog-container").bind("DOMNodeInserted", function (e) {
        var target = $(e.target);
        if (target.attr("class") !== "dialog-frame" || target.parent().attr("id") !== "dialog-preview" || target.parent().children(".dialog-frame:first")[0] !== target[0]) return;
        try {
            initdownloadbutton(target)
        } catch(ex) {
            console.warn("wtf", ex);
        }
    });

    function initdownloadbutton(target) {
        var id = ($("#dialog-preview").hasClass("soundcloud")) ? $("#dialog-preview > div.dialog-body > div > iframe").attr("src") : ("https://youtu.be/" + $(".playlist-media-item.selected img, .playlist-media-first-item.selected img").attr("src").match(/[^,\/]+(?=\/default\.jpg)/)[0]);
        if (id === undefined) return setTimeout(initdownloadbutton, 50, target);
        var m = $(".playlist-media-item.selected .meta, .playlist-media-first-item.selected .meta");
        if ($("#dialog-preview > .dialog-body > .message").text() === "") return setTimeout(initdownloadbutton, 50, target);
        var meta = {
            name: encodeURIComponent($("#dialog-preview > .dialog-body > .message").text())
        };
        if ($("#history-button.selected").length) {
            var history = API.getHistory();
            var index = history.map(function (a) {
                return a.media.author + " - " + a.media.title;
            }).indexOf($("#dialog-preview > .dialog-body > .message").text());
            if (index === -1) return console.log("error!", history, history.map(function (a) {
                return a.media.author + " - " + a.media.title;
            }), $("#dialog-preview > .dialog-body > .message").text());
            meta.title = encodeURIComponent(history[i].media.title);
            meta.artist = encodeURIComponent(history[i].media.author);
        } else {
            meta.title = encodeURIComponent(m.children(".title").text());
            meta.artist = encodeURIComponent(m.children(".author").text());
        }
        target.prepend('<div id="download"><i></i><div class="downloadbox"><div class="downloadcontainer"><div class="spinner"><i></i><span class="percentage"></span></div></div></div></div>');
        $("#download").bind("mouseenter", function () {
            if ($("#download > .downloadbox").css("cursor") === "default") {
                $("#download > .downloadbox").animate({
                    width: "307px",
                    left: "-307px",
                    height: "375px"
                }, {
                    duration: 250,
                    queue: false
                });
            } else {
                $("#download > .downloadbox").animate({
                    width: "35px",
                    left: "-35px"
                }, {
                    duration: 250,
                    queue: false
                });
            }
        }).bind("mouseleave", function () {
            $("#download > .downloadbox").animate({
                width: "5px",
                left: "-5px",
                height: "60px"
            }, {
                duration: 250,
                queue: false
            });
        }).one("click", function () {
            $("#download > .downloadbox").animate({
                width: "307px",
                left: "-307px",
                height: "375px"
            }, {
                duration: 250,
                queue: false
            });
            $("#download").css({
                cursor: "default"
            });
            genqr(id, meta, $("#download"));
        });
    }

    var lastclose = 0;
    $("#downloadbutton").bind("mouseenter", function () {
        lastclose = 0;
        if ($("#downloadbutton").css({
                boxShadow: "rgb(10, 10, 10) 0px -2px 0px -2px inset"
            }).css("cursor") === "pointer") $("#downloadbutton .downloadbox").animate({
            height: "69px",
            left: "0px",
            width: "54px"
        }, {
            duration: 250,
            queue: false
        });
        else $("#downloadbutton .downloadbox").animate({
            width: "307px",
            left: "-253px",
            height: "429px"
        }, {
            duration: 250,
            queue: false
        });
    }).bind("mouseleave", function () {
        var nowclose = new Date().getTime();
        lastclose = nowclose;
        $("#downloadbutton .downloadbox").animate({
            height: "54px",
            left: "0px",
            width: "54px"
        }, {
            duration: 250,
            queue: false,
            complete: function () {
                if (lastclose == nowclose) $("#downloadbutton").css({
                    boxShadow: "rgb(10, 10, 10) 0px -2px 0px -1px inset"
                });
            }
        });
    }).on("click", function () {
        if ($("#downloadbutton").css("cursor") === "default") return;
        $("#downloadbutton").css({
            cursor: "default"
        });
        $("#downloadbutton > .downloadbox").animate({
            width: "307px",
            left: "-253px",
            height: "429px"
        }, {
            duration: 250,
            queue: false
        });
        var media = API.getMedia();
        var id = (media.format === 1) ? ("https://youtu.be/" + media.cid) : ("https://w.soundcloud.com/player/?url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F" + media.cid);
        var meta = {
            name: media.author + " - " + media.title,
            title: media.title,
            artist: media.author
        };
        genqr(id, meta, $("#downloadbutton"));
    });

    var lastreset = 0;
    API.on(API.ADVANCE, function () {
        if ($("#downloadbox").css("height") === "54px") return downloadbuttonreset(lastreset = new Date().getTime());
        $("#downloadbutton").one("mouseleave", function () {
            downloadbuttonreset(lastreset = new Date().getTime());
        });
    });

    function downloadbuttonreset(thisreset) {
        if (thisreset !== lastreset) return;
        lastreset = 0;
        $("#downloadbutton").css({
            cursor: "pointer"
        });
        $("#downloadbutton .downloadcontainer >").remove();
        $("#downloadbutton .downloadcontainer").append('<div class="spinner"><i></i><span class="percentage"></span></div>');
    }

    function fail(id, hi, meta, dl) {
        console.log("fetching link for qr code failed: (" + hi + ") for video " + id);
        dl.find(".downloadcontainer >").remove();
        dl.find(".downloadcontainer").append('<div class="failed"><span>failed :(</span><br/><span>(</span><span class="retry">retry?</span><span>)</span></div>');
        console.log(dl.find(".retry"));
        dl.find(".retry").bind("click", function () {
            dl.find(".downloadcontainer >").remove();
            dl.find(".downloadcontainer").append('<div class="spinner"><i></i><span class="percentage"></span></div>');
            genqr(id, meta, dl);
        })
    }

    function genqr(id, meta, dl) {
        $.ajax({
            url: "https://mp3-l0laapk3.rhcloud.com/init.php?url=" + id,
            success: function (dlid) {
                waitqr(id, dlid, meta, dl);
            },
            error: function () {
                fail(id, 1, meta, dl);
            }
        });
    }

    function waitqr(id, dlid, meta, dl) {
        $.ajax({
            url: "https://mp3-l0laapk3.rhcloud.com/progress.php?id=" + dlid,
            success: function (a) {
                if (!a || (a === "false")) return fail(id, 4, meta, dl);
                if (a.indexOf("mp3") === -1) {
                    dl.find(".percentage").html(a + "%");
                    return waitqr(id, dlid, meta, dl);
                }
                $.ajax({
                    url: "https://www.googleapis.com/urlshortener/v1/url?key=" + gkey,
                    contentType: "application/json",
                    method: "POST",
                    data: '{"longUrl":"https://mp3-l0laapk3.rhcloud.com/download.php?id=' + a + '&name=' + meta.name + '&title=' + meta.title + '&artist=' + meta.artist + '"}',
                    success: function (b) {
                        console.log('"' + a + '"');
                        var url = b.id;
                        dl.find(".downloadcontainer >").remove();
                        dl.find(".downloadcontainer").append('<a id="qrlink" target="_blank" attr="" href="' + url + '" title="' + url + '">' + url.replace("https://", "") + '</a><span>----- OR -----</span><a id="qrlink" target="_blank" attr="" href="' + url + '"><div id="' + dl.attr("id") + 'qrcode"></div></a>');
                        var qrcode = new QRCode(dl.attr("id") + "qrcode");
                        qrcode.makeCode(url);
                    },
                    error: function (b) {
                        fail(id, 3, meta, dl);
                    }
                });
            },
            error: function (a) {
                fail(id, 2, meta, dl);
            }
        })
    }
    */

    function bindnode() {
        var node = $(this);
        if (node.is(".selected")) return;
        node.addClass("selected").animate({
            height: "14px",
            width: "14px",
            marginRight: "-2px",
            marginTop: "-2px"
        }, {
            duration: 250,
            queue: false
        }).siblings(".selected").removeClass("selected").animate({
            height: "10px",
            width: "10px",
            marginRight: "0px",
            marginTop: "0px"
        }, {
            duration: 250,
            queue: true
        });
        node.parent().siblings(".settings").children().css("display", "block").find(".colorblock").css("background-color", node.css("background-color"));
        node.css("background-color").substring(4, 17).split(", ").forEach(function (e, i, a) {
            node.parent().siblings(".settings").find(".circle").eq(i).css("left", parseInt(e) + "px");
        });
    }

    function startdrag(dis) {
        if (dragging) {
            return;
        }
        dragging = true;
        var victim;
        if (localStorage['iplug|' + $(this).parent().parent().attr("id") + 'random'] !== "none") {
            victim = $(this);
        } else {
            victim = $(this).parent().children(".circle");
        }
        drag(victim, $(this).parent().children(".bar.selected"), $(this).parent().children(".circle"), $(this).parent().parent().children(".titlecontainer").children(".value"), mouseX, parseInt($(this).attr("style").split(" ")[1]), $(this).parent().parent().attr("id"), parseInt($(this).parent().children(".bar.background").css("width")) + 1, callbacks(victim.parent().parent().attr("id")));
    }

    //* MICHAL *//
    var holdingCircle = false;
    var overCircle = false;

    function updateTooltip(_this) {
        $("#tooltip").css("top", ($(_this.target).offset().top - 28) + 'px');
        $("#tooltip").css("right", (window.innerWidth - $(_this.target).offset().left - $(_this.target).width() + 2) + 'px');
        $("#tooltip>span").html(parseInt(_this.target.style.left, 10));
    }
    $(".iplug-container .colorpicker .slider .barcontainer .circle").bind("mouseenter", function (_this) {
        overCircle = true;
        $("#tooltip").remove();
        $("body").append('<div id="tooltip" style="top: ' + ($(_this.target).offset().top - 28) + 'px; left: initial; right: ' + (window.innerWidth - $(_this.target).offset().left - $(_this.target).width() + 2) + 'px;" class="right"><span>' + parseInt(_this.target.style.left, 10) + '</span><div class="corner"></div></div>');
    }).bind("mousedown", function (_this) {
        holdingCircle = true;
        $("#tooltip").remove();
        $("body").append('<div id="tooltip" style="top: ' + ($(_this.target).offset().top - 28) + 'px; left: initial; right: ' + (window.innerWidth - $(_this.target).offset().left - $(_this.target).width() + 2) + 'px;" class="right"><span>' + parseInt(_this.target.style.left, 10) + '</span><div class="corner"></div></div>');
    }).bind("mouseleave", function () {
        overCircle = false;
        if (!holdingCircle) {
            $("#tooltip").remove();
        }
    });
    $(window).bind("mouseup", function () {
        holdingCircle = false;
        if (!overCircle) {
            $("#tooltip").remove();
        }
    });
    //* END MICHAL *//

    $(window).bind("mouseup blur", function () {
        dragging = false;
    });

    function drag(victim, selection, circles, minmax, startx, original, name, max, callback) {
        victim.css("left", Math.max(0, Math.min(max, (original - startx + mouseX))) + "px");
        var values = [];
        circles.each(function (i, a) {
            values.push($(a));
        });
        values.forEach(function (a, i, e) {
            e[i] = parseInt(a.attr("style").split(" ")[1]);
        });
        values.sort(function (a, b) {
            return a - b;
        });
        localStorage["iplug|" + name + "min"] = values[0];
        localStorage["iplug|" + name + "max"] = values.last();
        selection.attr("style", "left: " + (7 + values[0]) + "px; width: " + (values.last() - values[0]) + "px");
        if ($(".colorpicker").find(victim)[0] == victim[0]) {
            updateTooltip({
                target: victim[0]
            });
        }
        if (dragging) {
            setTimeout(function () {
                drag(victim, selection, circles, minmax, startx, original, name, max, callback);
            }, 1);
        }
        if (mouseChange) {
            callback(values, minmax);
            mouseChange = false;
        }
    }

    var detector = $("<div></div>").addClass("proximitydetector");
    detector.append($("#playback-controls")).appendTo("#playback");

    var cover;
    $("#meh").bind("click", function () {
        cover = $("<div>");
        var meh = $("#meh");
        cover.css({
            height: meh.height(),
            width: meh.width(),
            left: meh.offset().left,
            top: meh.offset().top,
            position: "fixed",
            cursor: "pointer"
        }).on("click", function () {
            cover.remove();
            $("#woot").click();
            $("#meh").trigger("mouseover");
        }).on("mouseover", function () {
            Tooltip.show("click again to woot", cover, false);
        }).on("mouseout", function () {
            Tooltip.hide();
        });
        $("#vote").append(cover);
        Tooltip.show("click again to woot", cover, false);
    });
    API.on(API.ADVANCE, function () {
        if (cover && cover.remove)
            cover.remove();
    });

    var grabDialog;
    $.each(require.s.contexts._.defined, function (i, a) {
        if (a && a.drawRowBind)
            return !(grabDialog = a);
    });
    var titleSplitter;
    $.each(require.s.contexts._.defined, function (i, a) {
        if (a && a.authorTitle)
            return !(titleSplitter = a);
    });
    var ytresps = {};

    function isChatBottom() {
        return $("#chat-messages")[0].scrollHeight <= $("#chat-messages").scrollTop() + $("#chat-messages").innerHeight() + 5;
    }

    function scrollChatToBottom() {
        $("#chat-messages").scrollTop($("#chat-messages")[0].scrollHeight - $("#chat-messages").innerHeight());
    }

    function convertChat(allowImg, allowVid, scope, first) {
        scope.find("a").each(function (i, a) {
            a = $(a);
            var text = a.attr("href");
            if (allowImg) {
            	checkRealImage(text, function(response) {
            		if (!response)
            			return;
            		response.image.addClass("chat-img");
                    var atBottom = isChatBottom();
                	a.replaceWith(response.image);
                    if (atBottom)
                        scrollChatToBottom();
            	}, function(response) {
                    response.image.css({cursor: "pointer"});
                    bindOpenImg(response);
                });
            }
            if (allowVid) {
                var yt = text.match(/youtu(?:\.be|be\.com)(?=[^ \n\r]*(?:&|#|\?)(?:t|time[^= \n\r]+)=((?:[\d]+m)?[\d]+)|)[^ \n\r]*(?:\/embed)?(?:\/|\?)(?:watch|v)?\/?(?:\?(?:.*&)?v)?=?([\w_-]{11})(?:\?|&|$|\n|\r| )/i);
                if (yt) {
                    var id = yt[2];
                    var spinner = $("<i class='minispinner'></i>");
                    var grab = $("<div class='chat-yt-grab'></<div>").append(spinner);
                    var img = $("<img src='http://img.youtube.com/vi/" + id + "/hqdefault.jpg'>");
                    var el = $("<div class='chat-yt'></div>").append(img);
                    el.prepend(grab);
                    grab.bind("mouseenter", function () {
                        Tooltip.show("grab", grab, true);
                    }).bind("mouseleave", Tooltip.hide).bind("click", function () {
                        if (ytresps[id]) {
                            grabDialog.show(grab, createFakeMedia(1, id, ytresps[id]));
                            $(".pop-menu").css({
                                left: "",
                                top: ""
                            }).css({
                                width: 0
                            }).appendTo(grab).animate({
                                width: 205
                            }, {
                                duration: 250,
                                easing: "easeInOutQuint"
                            });
                        }
                    });
                    var t = (yt[1] || "0").split("m").reverse().map(function (a) {
                        return parseInt(a, 10)
                    });
                    t = t[0] + 60 * (t[1] || 0);
                    bindOpenYt(el, grab, id, t);
                    var atBottom = isChatBottom();
                    a.replaceWith(el);
                    if (atBottom)
                        scrollChatToBottom();
                    if (ytresps[id])
                        finish();
                    else
                        gapi.client.youtube.videos.list({
                            id: id,
                            part: "snippet,contentDetails"
                        }).execute(function (response) {
                            var items = response.items;
                            if (!items.length)
                                return grab.remove();
                            ytresps[id] = items[0];
                            finish();
                        });

                    function finish() {
                        grab.css({
                            cursor: "pointer"
                        });
                        spinner.removeClass("minispinner").addClass("icon icon-grab-disabled");
                        img.attr("src", ytresps[id].snippet.thumbnails.high.url);
                    }
                }
            }
        });
        if (!first)
            setTimeout(function () {
                convertChat(allowImg, allowVid, scope, true);
            }, 250);
    }

    function bindOpenImg(response) {
    	var url = response.url;
    	var el = response.image;
        el.one("click", function () {
            if ($("#iplug-overlay2 :not(iframe)").length)
                $("#iplug-overlay2").click();
            if (!canOpenDialog())
                return bindOpenImg(response);
            var offset = el.offset();
            var maxscale = Math.min(3, Math.min(window.innerWidth * 0.8 / response.width, window.innerHeight * 0.8 / response.height));
            var scale = Math.min(1, maxscale);
            var X = response.width * scale;
            var Y = response.height * scale;
            var image = $("<img src='" + url + "'>");
            if (response.height > 4 * response.width && scale < 0.25) { //image is super long, make scroller (TODO: DOESNT WORK YET I THINK)
            	image = image.wrap("<div>").addClass("largeImageScroller");
            } else {
	            image.css({
	                position: "fixed",
	                zIndex: "120005",
	                width: el.width(),
	                height: el.height,
	                left: offset.left,
	                top: offset.top
	            });
	        }
            var overlay = createPopup().append(image).addClass("above-chat");
            image.animate({
                width: X,
                height: Y,
                left: window.innerWidth * 0.5 - X / 2,
                top: window.innerHeight * 0.5 - Y / 2
            }, {
                duration: 250,
                easing: "easeInOutQuint",
                complete: function () {
                    if (scale === 1 && maxscale > 1.5) {
                        var zoomedIn = false;
                        var animating = false;
                        image.css({
                            cursor: "zoom-in"
                        }).on("click", function () {
                            if (animating)
                                return;
                            animating = true;
                            var newscale = zoomedIn ? 1 : maxscale;
                            var X = response.width * newscale;
                            var Y = response.height * newscale;
                            image.css({
                                cursor: zoomedIn ? "zoom-in" : "zoom-out"
                            }).animate({
                                width: X,
                                height: Y,
                                left: window.innerWidth * 0.5 - X / 2,
                                top: window.innerHeight * 0.5 - Y / 2
                            }, {
                                duration: 250,
                                easing: "easeInOutQuint",
                                complete: function () {
                                    zoomedIn = !zoomedIn;
                                    animating = false;
                                }
                            });
                        });
                    }
                    overlay.one("click", remove);

                    function remove(e) {
                        if (document.elementFromPoint(e.pageX, e.pageY) !== overlay[0]) {
                            overlay.one("click", remove);
                            return;
                        }
                        overlay.css({
                            display: "none"
                        });
                        image.stop().remove();
                        e.preventDefault();
                        bindOpenImg(response);
                    }
                }
            });
        });
    }

    function createFakeMedia(format, cid, res) {
        console.log(res);
        var split = titleSplitter.authorTitle(res.snippet.title);
        console.log(split);
        return [{
            format: format,
            cid: cid,
            duration: titleSplitter.iso8601(res.contentDetails.duration),
            author: split.author || res.snippet.channelTitle || "?",
            title: split.title,
            image: res.snippet.thumbnails.default.url,
            get: function (key) {
                if (key === "media")
                    return this;
                return this[key];
            }
        }];
    }

    function bindOpenYt(el, grab, id, time) {
        el.one("click", function (e) {
            var target = document.elementFromPoint(e.pageX, e.pageY);
            if (grab[0] === target || grab.find(target).length)
                return bindOpenYt(el, grab, id, time);
            if ($("#iplug-overlay2 iframe").length)
                $("#iplug-overlay2").click();
            if (!canOpenDialog())
                return bindOpenYt(el, grab, id, time);
            var width = (window.innerWidth - 345) * 0.75; // width='" + width + "' height='" + width * 9 / 16 + "' frameborder='0'
            var iframe = $("<div id='embeddedYT'></div>");
            $("#chat").addClass("over");
            var overlay = createPopup().append(iframe);

            var crl = new window.YT.Player(iframe[0], {
                width: width,
                height: width * 9 / 16,
                videoId: id,
                playerVars: {
                    start: time,
                    autoplay: 1,
                    cc_load_policy: 0, //subtitles
                    color: "red",
                    controls: 1,
                    disablekb: 1, //keyboard
                    iv_load_policy: 3,
                    loop: 0,
                    modestbranding: 1,
                    rel: 0,
                    showinfo: 1,
                    theme: "dark"
                },
                events: {
                    'onError': function () {
                        overlay.click();
                    },
                    'onStateChange': function (a) {
                        if (a.data === 0)
                            overlay.click();
                    }
                }
            });

            overlay.one("click", function (e) {
                $("#chat").removeClass("over");
                overlay.css({
                    display: "none"
                });
                vol.click();
                crl.destroy();
                iframe.remove();
                e.preventDefault();
                bindOpenYt(el, grab, id, time);
            });

            var vol = $("#volume .icon:not(.icon-volume-off)").click();
        });
    }

    function canOpenDialog() {
        return $("#dialog-container").css("display") === "none" && $("#iplug-overlay").css("display") === "none" && $("#iplug-overlay2").css("display") === "none";
    }

    $("body").append("<div id='iplug-overlay2' style='display: none'>");


    function createPopup() {
        return $("#iplug-overlay2").css({
            display: "block"
        });
    }

	var scapi = null;
	$.each(require.s.contexts._.defined, function(i, a){
	  if (a && a.id && a.sc)
	    return !(scapi = a);
	});

	function checkRealImage(url, callback, sizecallback) {
        var needResponse = true;
        var img;
		if (/prntscr\.com|prnt\.sc|gyazo\.com|scr\.hu|imgur\.com\/(?!gallery)[^\/]{2,}(?:\/|$)/.test(url) && !/i(?:mage)?\.prnt|i.gyazo\.com|i\.imgur/i.test(url)) {
            needResponse = false;
            img = $("<img/>").attr({src: "chrome-extension://__EXTENSION_ID__/images/spinnergrey.png", class: "spinning"});
            callback({
                image: img,
                url: "chrome-extension://__EXTENSION_ID__/images/spinnergrey.png"
            });
			chrome.runtime.sendMessage("__EXTENSION_ID__", {
				type: "getRealImage",
				url: url
			}, function(response) {
                var atBottom = isChatBottom();
                img.attr({src: response.url}).removeClass("spinning");
                if (atBottom)
                    scrollChatToBottom();
				go(response.url);
			});
		} else
			go(url);

		function go(url) {
            if (!img)
                img = $("<img/>").attr("src", url);
            img.error(function(a) {
                if (needResponse)
                    callback(needResponse = false);
            }).load(function(a) {
                img.css({display: "none"});
                var width = this.width,
                    height = this.height;
                img.css({display: ""});
                sizecallback({
                    image: img,
                    url: url,
                    width: width,
                    height: height
                });
            });
            if (needResponse)
                chrome.runtime.sendMessage("__EXTENSION_ID__", {
                    type: "checkImageHeaders",
                    url: url
                }, function(response) {
                    if (response.isImage)
                        callback({
                            image: img,
                            url: url
                        });
                    else if (needResponse)
                        callback(needResponse = false);
                });
	    }
	}

	//automeh songs
	var mehstorage = (localStorage["iplug|mehstorage"] || "").split(" ").filter(function(a) {
		return a;
	});
	var nowmehd = false;
	$("#vote").on("click", function() {
	  setTimeout(function() {
	    var mehd = $("#meh").hasClass("active");
	    var media = API.getMedia();
	    var songstr = media.format + media.cid;
	    if (mehd) {
	    	if ((localStorage['iplug|remembermehsenabled'] !== "block") && !nowmehd) return;
	    	if (mehstorage.indexOf(songstr) > -1) return;
	    	mehstorage.push(songstr);
	    	localStorage["iplug|mehstorage"] = mehstorage.join(" ");
	    } else {
	    	nowmehd = true;
	    	var index = mehstorage.indexOf(songstr);
	    	if (index === -1) return;
	    	mehstorage.pop(index);
	    	localStorage["iplug|mehstorage"] = mehstorage.join(" ");
	    }
	  }, 0);
	});
	API.on(API.ADVANCE, function(a) {
		nowmehd = false;
		if (localStorage['iplug|remembermehsenabled'] !== "block") return;
		if (mehstorage.indexOf(a.media.format + a.media.cid) > -1) $("#meh").click();
	});



        
	//display meh storage
    var managemehs = $("<div id='iplug-manage-mehs' style='display: none'>");
    var managemehcontent = $('<div><span class="title">Manage meh&#39;d songs</span><i class="icon icon-dialog-close"></i><div><input type="text" id="mehSearch" placeholder="Filter" class="iplug"><div id="mehSearchResults"></div></div><span class="close">Close</span>');
    managemehcontent.on("click", function(e) {
        e.stopPropagation();
    }).appendTo(managemehs);
    managemehs.appendTo("body").add("#iplug-manage-mehs .close, #iplug-manage-mehs .icon-dialog-close").on("click", function() {
        managemehs.css({display: "none"});
    });
    $("#mehSearch").on("input", function() {
    	var val = $("#mehSearch").val().toLowerCase();
    	$("#mehSearchResults > div").each(function(i, e) {
    		$(e).css({display: e.childNodes[2].innerText.toLowerCase().indexOf(val) === -1 ? "none" : ""});
    	});
    });

	$("#managemehs").on("click", function() {
		$("#mehSearchResults").empty().addClass("loading");
		$("#mehSearch").val("");
		managemehs.css({display: "block"});
		var oneDone = false;
		gapi.client.youtube.videos.list({ //youtube
			id: mehstorage.filter(function(a) {
					return a[0] === "1";
				}).map(function(a) {
					return a.substring(1);
				}).join(","),
			part: "snippet"
		}).execute(function(response) {
			if ("error" in response)
				return $("#mehSearchResults").addClass("error");
			response.items.forEach(function(a) {
				addSong("1" + a.id, a.snippet.thumbnails.default.url, a.snippet.title);
			});
			finish();
		});
		var scids = mehstorage.filter(function(a) { //soundcloud
			return a[0] === "2";
		}).map(function(a) {
			return a.substring(1);
		});
		function sc() {
			if (!scids.length)
				return finish();
			scapi.sc.get("/tracks", {
                ids: scids.splice(0, 100).join(",")
            }).then(function(resp) {
            	resp.forEach(function(a) {
            		addSong("2" + a.id, a.artwork_url || a.user.avatar_url || a.artwork_url, a.user.username + " - " + a.title);
            	});
            	sc();
            });
		}
		sc();

		function addSong(id, img, title) {
			var el = $("<div cid='" + id + "'><div><img src='" + img + "'></img></div><div class='delete'><i class='icon icon-delete'></i></div></div>");
			$("<span>").text(title).appendTo(el);
			$("#mehSearchResults").append(el);
		}

		function finish() {
			if (!oneDone)
				return oneDone = true;
			$("#mehSearchResults").removeClass("loading").find(".delete").on("click", function(a) {
				var item = $(this).parent();
		    	var index = mehstorage.indexOf(item.attr("cid"));
		    	if (index === -1) return;
		    	mehstorage.pop(index);
		    	localStorage["iplug|mehstorage"] = mehstorage.join(" ");
				item.remove();
			});
		}
	});


    //scroll to change volume
    $("#volume").on("mousewheel", function (e) {
        if (e.deltaY > 0) return API.setVolume(API.getVolume() + 5);
        if (e.deltaY < 0) return API.setVolume(API.getVolume() - 5);
    });

    //emotes
    var emojiFilter;
    $.each(require.s.contexts._.defined, function (i, a) {
        if (a && a.replace_colons)
            return !(emojiFilter = a);
    });
    var plugSugg;
    $.each(require.s.contexts._.defined, function (i, a) {
        if (a && a.prototype && a.prototype.updateSuggestions)
            return !(plugSugg = a);
    });
    /*
    var plugSuggBase = null;
    $.each(require.s.contexts._.defined, function(i, a){
    	if (a && a.prototype && a.prototype.submitSuggestion)
    		return !(plugSuggBase = a);
    		return !(plugSuggBase = a);
    });*/

    //
    //emotes provided by twitchemotes.com
    //emotes provided by tastycat
    //
    var emoteUrls = [{
        url: "https://twitchemotes.com/api_cache/v2/subscriber.json",
        overwrite: false,
        emotes: function (x) {
            var emoteArray = x.unknown_emotes.emotes;
            for (var a in x.channels)
                emoteArray = emoteArray.concat(x.channels[a].emotes);
            return emoteArray;
        },
        name: function (x, a, key) {
            return a.code || key;
        },
        image: function (x, a, key) {
            return x.template.small.replace("{image_id}", a.image_id);
        }
    }, {
        url: "https://twitchemotes.com/api_cache/v2/global.json",
        overwrite: true,
        emotes: function (x) {
            return x.emotes;
        },
        name: function (x, a, key) {
            return key;
        },
        image: function (x, a, key) {
            return x.template.small.replace("{image_id}", a.image_id);
        }
    }, {
        url: "https://emotes.tastycat.org/emotes-full.json",
        overwrite: true,
        emotes: function (x) {
            return x.emotes;
        },
        name: function (x, a, key) {
            return a.name || key;
        },
        image: function (x, a, key) {
            return a.url;
        }
    }, {
        url: "https://api.frankerfacez.com/v1/set/global",
        overwrite: true,
        emotes: function (x) {
            var emoteArray = [];
            for (var a in x.sets)
                emoteArray = emoteArray.concat(x.sets[a].emoticons);
            return emoteArray;
        },
        name: function (x, a, key) {
            return a.name;
        },
        image: function (x, a, key) {
            return "https://" + a.urls["1"];
        }
    }, {
        url: "https://api.betterttv.net/emotes",
        overwrite: true,
        emotes: function (x) {
            return x.emotes;
        },
        name: function (x, a, key) {
            return a.regex;
        },
        image: function (x, a, key) {
            return a.url;
        }
    }, {
    	url: "https://ddragon.leagueoflegends.com/cdn/6.21.1/data/en_GB/item.json",
    	overwrite: false,
    	emotes: function(x) {
    		return x.data;
    	},
    	name: function(x, a, key) {
    		return a.name.replace(/ ([a-z])?|\W/g, function(_, $1) {return ($1||"").toUpperCase()});
    	},
    	image: function(x, a, key) {
    		return "https://ddragon.leagueoflegends.com/cdn/6.21.1/img/item/" + a.image.full;
    	}
    }, {
    	url: "https://ddragon.leagueoflegends.com/cdn/6.21.1/data/en_GB/champion.json",
    	overwrite: false,
    	emotes: function(x) {
    		return x.data;
    	},
    	name: function(x, a, key) {
    		return a.name.replace(/ ([a-z])?|\W/g, function(_, $1) {return ($1||"").toUpperCase()});
    	},
    	image: function(x, a, key) {
    		return "https://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/" + a.image.full;
    	}
    }, {
    	url: "https://ddragon.leagueoflegends.com/cdn/6.21.1/data/en_GB/summoner.json",
    	overwrite: false,
    	emotes: function(x) {
    		return x.data;
    	},
    	name: function(x, a, key) {
    		return a.name.replace(/ ([a-z])?|\W/g, function(_, $1) {return ($1||"").toUpperCase()});
    	},
    	image: function(x, a, key) {
    		return "https://ddragon.leagueoflegends.com/cdn/6.21.1/img/spell/" + a.image.full;
    	}
    }];


	console.log("downloading emotes..");
    var allEmotes = {};
    var emoteObjectsToLoad = emoteUrls.length;
    emoteUrls.forEach(function (emoteObject) {
        var tries = 0;
        load();

        function load() {
            $.ajax({
                url: emoteObject.url,
                dataType: "json",
                success: function (x) {
                    var emotes = emoteObject.emotes(x);
                    var faileds = 0;
                    for (var key in emotes) {
                        try {
                            var name = emoteObject.name(x, emotes[key], key).toLowerCase();
                            var img = emoteObject.image(x, emotes[key], key);
                            if (!name || !img) {
                                console.warn(name, img, emotes[key]);
                                faileds++;
                                continue;
                            }
                            if (emoteObject.overwrite || !allEmotes.hasOwnProperty(name))
                                allEmotes[name] = img;
                        } catch (ex) {
                            console.warn(key, ex);
                            faileds++;
                        }
                    }
                    if (faileds > 0)
                        console.warn("Couldnt load " + faileds + "/" + emotes.length + " emotes from " + emoteObject.url);
                    if (--emoteObjectsToLoad <= 0)
                        mapEmotes();
                },
                error: function (x) {
                    if (tries++ < 3)
                        return load();
                    console.warn("Failed to load emotes from " + emoteObject.url + "...");
                    if (--emoteObjectsToLoad <= 0)
                        mapEmotes();
                }
            });
        }
    });

    function mapEmotes() {
	    //initialise worker
	    var blobURL = URL.createObjectURL(new Blob(['(',
	    function() {
	        onmessage = function(m) {
	        	var allEmotes = m.data.allEmotes;
	        	var emojidata = m.data.emojidata;
		        //hashing

		        function hashThis(a, node) {
		            if (a.length < 2)
		                return;
		            var first = a.substr(0, 1);
		            var second = a.substr(1, 1);
		            if (!realHash[first])
		                realHash[first] = {};
		            if (!realHash[first][second])
		                realHash[first][second] = [];
		            realHash[first][second].push(a);
		        }

		        var realHash = {};
		        for (var key in allEmotes) {
		            hashThis(key, allEmotes[key]);
		        }

		        for (var one in realHash)
		            for (var two in realHash[one])
		                realHash[one][two] = realHash[one][two].sort();

		        var regex = new RegExp(":(" + Object.keys(realHash).map(function (one) {
		            return one.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/gi, "\\$&") + "(?:" + Object.keys(realHash[one]).map(function (two) {
		                return two.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/gi, "\\$&") + "(?:" + realHash[one][two].map(function (content) {
		                    return content.substr(2).replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/gi, "\\$&").toLowerCase(); //escape for regex usage
		                }).join("|") + ")";
		            }).join("|") + ")";
		        }).join("|") + "):", "ig");

		        for (var key in emojidata) {
		            if (!emojidata.hasOwnProperty(key)) continue;
		            var node = emojidata[key]; -
		            node[3].forEach(function (a) {
		                hashThis(a, node);
		            });
		        }

	            postMessage({
	            	realHash: realHash,
	            	regex: regex
	            });
	        };
	    }.toString(),
	    ')()'], {type: 'application/javascript'}));
	    var worker = new Worker(blobURL);
	    URL.revokeObjectURL(blobURL);

	    worker.onmessage = function(m) {
        	console.log("succesfully loaded " + Object.keys(allEmotes).length + " emotes!");
	    	finishEmotes(m.data.realHash, m.data.regex);
	    };
	    console.log("mapping emotes..");
	    worker.postMessage({
	    	allEmotes: allEmotes,
	    	emojidata: window.emoji.data
	    });
	}

    function finishEmotes(realHash, regex) {

        //replacing
        var replaceColonsOld = emojiFilter.replace_colons;
        emojiFilter.replace_colons = function (str, x, y, z) {
        	if (z && str === ":SSearch All Emojis:")
        		return "<i class='icon icon-search'></i>";
            var resp = replaceColonsOld.apply(emojiFilter, arguments);
            var args = arguments;
            if (!x && !y) {
                resp = resp.replace(regex, function (a, $1) {
                    return "<img src='" + allEmotes[$1.toLowerCase()] + "'" + (z ? "" : " tooltip='" + $1 + "' onload='emojiTooltip(this)'") + "></img>";
                });

                //quote chat
                if (/[^\u00a0]\u200E[^\u00a0]*\u00a0[^\u00a0]+\u00a0.*\u200F./.test(resp)) {
                    var users = API.getUsers();
                    do
                        resp = resp.replace(/([^\u00a0])\u200E([^\u00a0]*)\u00a0([^\u00a0]+)\u00a0(.*)\u200F(.)/, function(a, $1, $2, timestamp, $4, $5) {
                            var un = $1 + $2;
                            var msg = $4 + $5
                            var user = users.find(function(a) {
                                return a.username == un;
                            }), badge = "?",
                                icons = "";
                            if (user) {
                                badge = "bdg bdg-" + plugUtils.badgeClass(user.badge);
                                if (user.sub)
                                    icons = '<i class="icon icon-chat-subscriber"></i>';
                                else if (user.silver)
                                    icons = '<i class="icon icon-chat-silver-subscriber"></i>';
                                if (user.gRole >= 5)
                                    icons += '<i class="icon icon-chat-admin"></i>';
                                else if (users.gRole >= 2)
                                    icons += '<i class="icon icon-chat-ambassador"></i>';
                                if (user.role > 0)
                                    icons += '<i class="icon icon-chat-' + Object.keys(API.ROLE).find(function(a) {
                                        return API.ROLE[a] == user.role;
                                    }).toLowerCase() + '"></i>';
                            }
                            return '<div class="cm message"><div class="badge-box clickable"><i class="' + badge + '"></i></div><div class="msg"><div class="from staff">' + icons + '<span class="un clickable">' + un + '</span><span class="timestamp" style="display: inline;">' + timestamp + '</span></div><div class="text">' + msg + '</div></div></div>'
                        });
                    while (/(?:^|\u00a0)([^\u00a0]+)\u00a0([^\u00a0]+)\u00a0(.+)(?:$|\u00a0)/.test(resp))
                }
            }
            setTimeout(function() {
            	$("#chat-suggestion-items > .chat-suggestion-item:has(.icon-search)").unbind("click mousedown").on("click", function() { //take over search emoji button
            		var val = $("#chat-input-field").val();
            		$("#chat-input-field").val(val.substring(0, lastEmojiCursorPos) + val.substring(lastEmojiCursorPos + lastEmojiPart.length + 1));
            		//open emoji search (on mouseclick)
            		searchEmojiMode = false;
            		search.css({display: "block"});
                    input.val(lastEmojiPart).trigger("input").focus();
            	});
            }, 0);
            return resp;
        };
        window.emojiTooltip = function (that) {
            var $this = $(that);
            $this.on("mouseenter", function () {
                Tooltip.show($this.attr("tooltip"), $this, false);
            }).on("mouseleave", Tooltip.hide);
        }

        //suggestions

        //GENERATED BY CHARINDEX EXTRACTER.JS
        var REGEXUNICODELETTERS = {
        	" ":"[ -_\\u00A0\\u1680\\u180E\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200A\\u200B\\u202F\\u205F\\u3000\\uFEFF]+",
            "0":"[0\\uD835\\uDFCE\\uDFE2\\uDFF6\\uDFD8\\u0030\\u2080\\u2070\\uFF10\\u24EA\\u1159\\u2298\\u24AA]",
            "1":"[1\\u00A0\\u00A0\\u00A0\\u00A0\\uFE00\\uD835\\uDFCF\\uDFE3\\uDFF7\\uDFD9\\u0031\\u2081\\u00B9\\uFF11\\u2460\\u2474]",
            "2":"[2\\u21EB\\u21E7\\uD835\\uDFD0\\uDFE4\\uDFF8\\uDFDA\\u0032\\u2082\\u00B2\\uFF12\\u2461\\u11AF\\u03E9\\u0536\\u2475]",
            "3":"[3\\u21EF\\u21EE\\uD835\\uDFD1\\uDFE5\\uDFF9\\uDFDB\\u0033\\u2083\\u00B3\\uFF13\\u2462\\u04E0\\u0545\\u2476]",
            "4":"[4\\uD835\\uDFD2\\uDFE6\\uDFFA\\uDFDC\\u0034\\u2084\\u2074\\uFF14\\u2463\\u096B\\u054E\\u2477]",
            "5":"[5\\uFA0C\\uD835\\uDFD3\\uDFE7\\uDFFB\\uDFDD\\u0035\\u2085\\u2075\\uFF15\\u2464\\u01BC\\u2478]",
            "6":"[6\\uD835\\uDFD4\\uDFE8\\uDFFC\\uDFDE\\u0036\\u2086\\u2076\\uFF16\\u2465\\u03EC\\u2479]",
            "7":"[7\\uD835\\uDFD5\\uDFE9\\uDFFD\\uDFDF\\u0037\\u2087\\u2077\\uFF17\\u2466\\u11A8\\u0534\\u247A]",
            "8":"[8\\uD835\\uDFD6\\uDFEA\\uDFFE\\uDFE0\\u0038\\u2088\\u2078\\uFF18\\u2467\\u0551\\u247B]",
            "9":"[9\\u201F\\u201E\\u201F\\u201B\\u201E\\u201A\\u201F\\u201E\\u2E42\\u201B\\u201A\\u201B\\u201A\\uD835\\uDFD7\\uDFEB\\uDFFF\\uDFE1\\u0039\\u2089\\u2079\\uFF19\\u2468\\u096F\\u0533\\u247C]",
            "a":"[a\\u00C1\\u00E1\\u0103\\u01CE\\u00C2\\u00E2\\u00C4\\u00E4\\u0227\\u1EA1\\u0201\\u00C0\\u00E0\\u1EA3\\u0203\\u0101\\u0105\\u1E9A\\u00C5\\u00E5\\u1E01\\u023A\\u00C3\\u00E3\\u08A0\\uFB50\\u27F0\\u2327\\u3400\\u2DE0\\uAB00\\u263A\\uA960\\u0100\\u10600\\uAA60\\u2284\\u2285\\u2327\\u00C5\\u00E5\\u1E01\\u2284\\u2285\\uF0000\\u2327\\uD835\\uDCEA\\uDCD0\\uDCB6\\uDC9C\\uDD1E\\uDD04\\uDE8A\\uDE70\\uDD52\\uDD38\\u15E9\\u03B1\\u0041\\u1D00\\u019B\\u1D43\\u1D2C\\u03BB\\u0394\\uFF41\\uFF21\\u0E04\\u24D0\\u24B6\\u039B\\u1F84\\u1F8B\\uFF91\\u0571\\u10DB\\u01DF\\u028C\\u0539\\u0061\\u0308\\u00AA\\u00C6\\u1571\\u01DE\\u15C5\\u0252\\u0250\\u007C\\u033F\\u0336\\u0020\\u0251\\u2200\\u0034\\u249C\\u0430]",
            "x":"[x\\u033D\\u2612\\u2717\\u0353\\u2327\\u1F5D9\\u033D\\u0353\\uFA30\\u2718\\u2716\\uFA30\\uFA30\\u2715\\u2327\\u033D\\u0353\\u2327\\u1E8D\\u1E8B\\uD835\\uDD01\\uDCE7\\uDCCD\\uDCB3\\uDD35\\uDD1B\\uDEA1\\uDE87\\uDD69\\uDD4F\\u166D\\u0078\\u0058\\u03C7\\u0445\\u04B2\\u02E3\\u1D61\\u03F0\\u0416\\uFF58\\uFF38\\u24E7\\u24CD\\u04FE\\u1E8A\\uFF92\\u00D7\\u10EF\\u0AEA\\u04FC\\u04B3\\u0543\\u03A7\\u0308\\uA2BC\\u0436\\u2573\\u24B3]",
            "v":"[v\\u030C\\u030C\\u1E7F\\u01B2\\u028B\\u1E7D\\uD835\\uDCFF\\uDCE5\\uDCCB\\uDCB1\\uDD33\\uDD19\\uDE9F\\uDE85\\uDD67\\uDD4D\\u142F\\u03BD\\u1D20\\u0056\\u0076\\u0194\\u1D5B\\uFF56\\uFF36\\u24E5\\u24CB\\u0474\\u040F\\u03C5\\u0475\\u221A\\u0E07\\u0C6E\\u2200\\u05E2\\u0308\\u13C9\\u00A5\\u143B\\u028C\\u005C\\u0020\\u0347\\u002F\\u039B\\u143A\\u24B1]",
            "n":"[n\\uFF2E\\u22C0\\u2AFF\\u2A00\\u2A01\\u2A02\\u2210\\u2AFF\\u22C2\\u019D\\u0272\\u22C0\\u22C1\\u0144\\u0148\\u0146\\u1E4B\\u0235\\u1E45\\u1E47\\u01F9\\u019D\\u0272\\u1E49\\u0220\\u019E\\u0273\\u00D1\\u00F1\\u2210\\u2AFF\\u22C2\\u22C0\\u22C1\\u22C0\\u2A00\\u220F\\u2211\\u2140\\u2A09\\u22C3\\u2AFF\\u22C0\\u2A00\\u22C1\\u220F\\u0273\\u2140\\u2211\\u2A09\\u22C3\\u2AFF\\u2AFF\\u0274\\u057C\\u03B7\\u041B\\u041F]",
            "c":"[c\\u2183\\u212D\\u0107\\u010D\\u00C7\\u00E7\\u0109\\u0255\\u010B\\u0188\\u023B\\u023C\\u00C7\\u00E7\\u2A700\\u1C80\\u2C60\\u0297\\uD835\\uDCEC\\uDCD2\\uDCB8\\uDC9E\\uDD20\\uDE8C\\uDE72\\uDD54\\u2102\\u1455\\u0063\\u0187\\u1D04\\u0043\\u1D9C\\u03C2\\uFF43\\uFF23\\u1645\\u24D2\\u24B8\\u00A2\\u03B6\\u21BB\\u096E\\u0108\\u03FE\\u0547\\u0308\\u00A9\\u3108\\uA49D\\u091F\\u1464\\u0254\\u007C\\u033F\\u0347\\u0020\\u1462\\u249E]",
            "b":"[b\\uFE70\\u1E03\\u1E05\\u0181\\u0253\\u1E07\\u0243\\u0180\\u0183\\u20000\\uA640\\u10080\\uD7B0\\u0180\\u10080\\u10000\\uA9E0\\u212C\\u2900\\u100000\\u10000\\uD835\\uDCEB\\uDCB7\\uDC35\\uDD1F\\uDD05\\uDE8B\\uDE71\\uDD53\\uDD39\\u15F7\\u0432\\u0299\\u0042\\u1D47\\u1D2E\\u03D0\\uFF42\\uFF22\\u1656\\u0E52\\u10A6\\u24D1\\u24B7\\u00DF\\u4E43\\u03B2\\u048D\\u0E56\\u044A\\u10EA\\u10E9\\u026E\\u0185\\u0411\\u0545\\u0062\\u0308\\u03E6\\u00FE\\u1658\\u0064\\u0071\\u007C\\u033F\\u0347\\u0336\\u0020\\u0029\\u0038\\u249D]",
            "z":"[z\\u22FF\\u2128\\u2982\\u22FF\\u0290\\u0240\\u01B6\\u22FF\\u2981\\u2982\\u017A\\u017E\\u1E91\\u0291\\u017C\\u1E93\\u0225\\u1E95\\u0290\\u01B6\\u0240\\uD835\\uDD03\\uDCE9\\uDCCF\\uDCB5\\uDD37\\uDEA3\\uDE89\\uDD6B\\u2124\\u0020\\u1614\\u007A\\u01B5\\u1D22\\u005A\\u0224\\u1DBB\\uFF5A\\uFF3A\\u24E9\\u24CF\\u1E94\\u4E59\\u0540\\u0E8A\\u09E8\\u0ABD\\u1E90\\u0308\\u13C3\\u0582\\u0577\\u1663\\u033F\\u002F\\u0347\\u0032\\u15F1\\u24B5]",
            "l":"[l\\u026C\\u2114\\u013A\\u023D\\u019A\\u026C\\u013E\\u013C\\u1E3D\\u0234\\u1E37\\u1E3B\\u0140\\u026B\\u026D\\u1D0C\\u0142\\u0140\\u026B\\u026D\\u2143\\u2112\\u2113\\u2142\\uD835\\uDCF5\\uDCC1\\uDC3F\\uDD29\\uDD0F\\uDE95\\uDE7B\\uDD5D\\uDD43\\u14AA\\u0196\\u004C\\u029F\\u006C\\u053C\\u02E1\\u1D38\\uFF4C\\uFF2C\\u0285\\u24DB\\u24C1\\u013F\\uFF9A\\u04C0\\u0546\\u0141\\u03B9\\u0308\\u007C\\u056C\\u013B\\u1102\\u0E45\\u0347\\u0020\\u0433\\u0393\\u0031\\u24A7]",
            "h":"[h\\u210C\\u1E2B\\u021F\\u1E29\\u0125\\u1E27\\u1E23\\u1E25\\u02AE\\u0266\\u1E96\\u0127\\u210B\\u02AE\\uD835\\uDCF1\\uDCBD\\uDC3B\\uDD25\\uDCD7\\uDE91\\uDE77\\uDD59\\u210D\\u157C\\u043D\\u0048\\u029C\\u04C7\\u02B0\\u1D34\\uFF48\\uFF28\\u0452\\u050B\\u24D7\\u24BD\\u0124\\u1F2C\\u3093\\u0068\\u0570\\u01F6\\u0267\\u04BA\\u0126\\u0308\\u2645\\u09F8\\u0265\\u007C\\u0336\\u0020\\u24A3]",
            "i":"[i\\u2111\\u268A\\u0130\\u4DC0\\u0197\\u4DC0\\u268A\\u2630\\u0130\\u00CD\\u00ED\\u012D\\u01D0\\u00CE\\u00EE\\u00CF\\u00EF\\u0130\\u1ECB\\u0209\\u00CC\\u00EC\\u1EC9\\u020B\\u012B\\u012F\\u0197\\u0268\\u1E2D\\u0129\\u268A\\u2110\\u4DC0\\u268A\\u2630\\u4DC0\\u268A\\u2630\\u2630\\u4DC0\\u268A\\u2630\\uD835\\uDCF2\\uDCD8\\uDCBE\\uDC3C\\uDD26\\uDE92\\uDE78\\uDD5A\\uDD40\\u0049\\u03B9\\u01C0\\u026A\\u0196\\u1DA4\\u1D35\\uFF49\\uFF29\\u0E40\\u24D8\\u24BE\\u0131\\u012A\\u1F37\\u1F3F\\uFF89\\u0069\\uFEE8\\u027F\\u1F36\\u0142\\u03AF\\u0308\\u00A1\\u13A5\\u0407\\u14FF\\u007C\\u0021\\u14F0\\u24A4\\u05D5]",
            "r":"[r\\u211C\\u0155\\u0159\\u0157\\u1E59\\u1E5B\\u0211\\u027E\\u027F\\u027B\\u0213\\u1E5F\\u027C\\u027A\\u024C\\u024D\\u027D\\u027F\\u211B\\u027B\\u027A\\uD835\\uDCFB\\uDCC7\\uDC45\\uDD2F\\uDCE1\\uDE9B\\uDE81\\uDD63\\u211D\\u1587\\u044F\\u0052\\u0280\\u0072\\u01A6\\u02B3\\u1D3F\\u0433\\u0393\\uFF52\\uFF32\\u24E1\\u24C7\\u0154\\u0212\\u5C3A\\u0F60\\u0550\\u042F\\u0AB0\\u0308\\u00AE\\u13D2\\u0490\\u0279\\u007C\\u033F\\u0020\\u0336\\u0027\\u256E\\u0281\\u0269\\u24AD\\u1D26\\uFF41]",
            "d":"[d\\u2B740\\u0256\\u010F\\u1E11\\u1E13\\u0221\\u1E0B\\u1E0D\\u018A\\u0257\\u1E0F\\u0111\\u0256\\u018C\\uA720\\u0256\\uD835\\uDCED\\uDCD3\\uDCB9\\uDC9F\\uDD21\\uDD07\\uDE8D\\uDE73\\uDD55\\uDD3B\\u15EA\\u2202\\u1D05\\u0044\\u0064\\u1D48\\u1D30\\uFF44\\uFF24\\u0E54\\u0503\\u24D3\\u24B9\\u0254\\u0189\\u00D0\\u03B4\\u056A\\u0ED3\\u10EB\\u053A\\u0308\\u00F0\\u13A0\\u00DE\\u15EB\\u0062\\u0070\\u007C\\u033F\\u0347\\u0020\\u0029\\u1572\\u249F\\u0110]",
            "e":"[e\\u15f4\\u2B820\\u00C9\\u00E9\\u0115\\u011B\\u0229\\u1E19\\u00CA\\u00EA\\u00CB\\u00EB\\u0117\\u1EB9\\u0205\\u00C8\\u00E8\\u1EBB\\u025D\\u0207\\u0113\\u0119\\u0246\\u0247\\u1E1B\\u1EBD\\uAB30\\u025D\\u025D\\u2130\\u212F\\uD835\\uDC86\\uDCD4\\uDC52\\uDC38\\uDD22\\uDD08\\uDE8E\\uDE74\\uDD56\\uDD3C\\u156E\\u0454\\u0190\\u1D07\\u0045\\u0065\\u0404\\u1D49\\u1D31\\u03B5\\u03A3\\uFF45\\uFF25\\u1653\\u04BD\\u24D4\\u24BA\\u1F14\\u1F1D\\u4E47\\u0AEF\\u025B\\u00A3\\u039E\\u021D\\u0308\\u20AC\\uA085\\u164D\\u0258\\u01DD\\u007C\\u033F\\u0347\\u0336\\u0020\\u0033\\u163F\\u24A0]",
            "j":"[j\\u025F\\u01F0\\u0135\\u029D\\u0248\\u0249\\u025F\\uD835\\uDCF3\\uDCD9\\uDCBF\\uDCA5\\uDD27\\uDD0D\\uDE93\\uDE79\\uDD5B\\uDD41\\u148D\\u05E0\\u004A\\u1D0A\\u006A\\u0286\\u02B2\\u1D36\\u03F3\\uFF4A\\uFF2A\\u05DF\\u24D9\\u24BF\\u0134\\u0408\\uFF8C\\u0644\\u0E27\\u0575\\u0296\\u0308\\u00BF\\u1499\\u012F\\u017F\\u0020\\u0347\\u007C\\u027F\\u0E45\\u149A\\u24A5]",
            "o":"[o\\u0153\\u019F\\u019F\\u0275\\u0153\\u00D8\\u00F8\\u00D3\\u00F3\\u014F\\u01D2\\u00D4\\u00F4\\u00D6\\u00F6\\u022F\\u1ECD\\u0151\\u020D\\u00D2\\u00F2\\u1ECF\\u01A1\\u020F\\u014D\\u019F\\u01EB\\u00D8\\u00F8\\u1D13\\u00D5\\u00F5\\u2134\\u1D13\\u00D8\\u00F8\\u00D8\\u00F8\\uD835\\uDCF8\\uDCDE\\uDC5C\\uDCAA\\uDD2C\\uDD12\\uDE98\\uDE7E\\uDD60\\uDD46\\u004F\\u03C3\\u1D0F\\u006F\\u01A0\\u1D52\\u1D3C\\u0398\\uFF4F\\uFF2F\\u0E4F\\u24DE\\u24C4\\u2661\\u1F44\\u1F4B\\u053E\\u0585\\u0ED0\\u0AE6\\u2295\\u0424\\u0308\\u00A4\\u25CA\\u03A6\\u14CE\\u007C\\u033F\\u0347\\u0020\\u0030\\u14CD\\u24AA]",
            "f":"[f\\u1E1F\\u0192\\u2131\\u2132\\u214E\\uD835\\uDC87\\uDCBB\\uDC39\\uDD23\\uDD09\\uDE8F\\uDE75\\uDD57\\uDD3D\\u15B4\\u0066\\u0191\\u0493\\u0046\\u1DA0\\u03D1\\uFF46\\uFF26\\u0166\\u03DD\\u24D5\\u24BB\\u0492\\uFF77\\u2231\\u0562\\u0532\\u0284\\u0283\\u0308\\uA2B0\\u0287\\u025F\\u007C\\u033F\\u0336\\u0020\\u027B\\u24A1]",
            "g":"[g\\u01F5\\u011F\\u01E7\\u0123\\u011D\\u0121\\u0193\\u029B\\u0260\\u1E21\\u01E5\\u210A\\u2141\\uD835\\uDCF0\\uDCD6\\uDC54\\uDCA2\\uDD24\\uDD0A\\uDE90\\uDE76\\uDD58\\uDD3E\\u0047\\u0067\\u0262\\u1D4D\\u1D33\\uFF47\\uFF27\\u161C\\u24D6\\u24BC\\u01E4\\u0581\\u0E87\\u0AED\\u0533\\u0122\\u0308\\u0AEC\\u03B6\\u03F1\\u0253\\u007C\\u033F\\u0347\\u0020\\u0336\\u03B9\\u10DB\\u018B\\u0039\\u24A2]",
            "s":"[s\\u223E\\u223D\\u015B\\u0161\\u015F\\u015D\\u0219\\u1E61\\u1E9B\\u1E63\\u0282\\u023F\\u023F\\uD835\\uDCFC\\uDCE2\\uDCC8\\uDCAE\\uDD30\\uDD16\\uDE9C\\uDE82\\uDD64\\uDD4A\\u1515\\u0455\\u0053\\u0073\\u01A7\\u02E2\\u0405\\uFF53\\uFF33\\u0E23\\u24E2\\u24C8\\u01A8\\u1E69\\u1E68\\u310E\\u0024\\u03DA\\u015E\\u03C2\\u0586\\u054F\\u0218\\u0308\\u00A7\\u3089\\u13D5\\u0160\\u0020\\u0347\\u005C\\u033F\\u0035\\u1522\\u24AE]",
            "k":"[k\\u1E31\\u01E9\\u0137\\u1E33\\u0199\\u1E35\\uD835\\uDCF4\\uDCDA\\uDCC0\\uDCA6\\uDC58\\uDD0E\\uDE94\\uDE7A\\uDD5C\\uDD42\\u004B\\u043A\\u0198\\u1D0B\\u0138\\u1D4F\\u1D37\\u03BA\\uFF4B\\uFF2B\\u24DA\\u24C0\\u04A0\\u045C\\u1E30\\u30BA\\u049F\\u04A1\\u006B\\u049B\\u04C4\\u049A\\u041A\\u0308\\u039A\\u15BD\\u1438\\u029E\\u007C\\u27E8\\u24A6]",
            "m":"[m\\u1E3F\\u1E41\\u1E43\\u0271\\u0270\\u2133\\u2133\\u0270\\uD835\\uDCF6\\uDCC2\\uDC40\\uDD2A\\uDD10\\uDE96\\uDE7C\\uDD5E\\uDD44\\u15F0\\u043C\\u004D\\u1D0D\\u1D50\\u1D39\\u03FB\\u039C\\uFF4D\\uFF2D\\u164F\\u0E53\\u24DC\\u24C2\\u1E42\\u110A\\u028D\\u264F\\u10DD\\u006D\\u0308\\u0BF1\\u1662\\u026F\\u007C\\u033F\\u0020\\u0056\\u0077\\u0057\\u163B\\u24A8]",
            "u":"[u\\u0D4D\\u0244\\u0289\\u00DA\\u00FA\\u016D\\u01D4\\u1E77\\u00DB\\u00FB\\u1E73\\u00DC\\u00FC\\u1EE5\\u0171\\u0215\\u00D9\\u00F9\\u1EE7\\u01B0\\u0217\\u016B\\u0173\\u016F\\u1E75\\u0169\\uD835\\uDCFE\\uDCE4\\uDCCA\\uDCB0\\uDD32\\uDD18\\uDE9E\\uDE84\\uDD66\\uDD4C\\u144C\\u03C5\\u0055\\u1D1C\\u01B2\\u1D58\\u1D41\\u01B1\\uFF55\\uFF35\\u1640\\u0E22\\u24E4\\u24CA\\u1F57\\u0216\\u0426\\u0075\\u0574\\u0531\\u0E19\\u057D\\u028A\\u016A\\u0544\\u0308\\u00B5\\u1457\\u006E\\u007C\\u0347\\u0020\\u220F\\u039B\\u1458\\u24B0\\u0446]",
            "p":"[p\\u1E55\\u1E57\\u01A5\\u2118\\uD835\\uDCF9\\uDCDF\\uDCC5\\uDCAB\\uDD2D\\uDD13\\uDE99\\uDE7F\\uDD61\\u2119\\u146D\\u03C1\\u01A4\\u1D18\\u0050\\u0070\\u1D56\\u1D3E\\uFF50\\uFF30\\u0569\\u24DF\\u24C5\\u1E56\\u1FE5\\uFF71\\u0584\\u03C6\\u00FE\\u01BF\\u0580\\u0308\\u00DE\\u13B5\\u01F7\\u0420\\u157F\\u0071\\u0064\\u007C\\u033F\\u0336\\u0020\\u0027\\u0185\\u0062\\u1575\\u24AB]",
            "t":"[t\\u01AB\\u01AE\\u0288\\u0165\\u0163\\u1E71\\u021B\\u0236\\u1E97\\u023E\\u1E6B\\u1E6D\\u01AD\\u1E6F\\u01AB\\u01AE\\u0288\\u0167\\uD835\\uDCFD\\uDCE3\\uDCC9\\uDCAF\\uDD31\\uDD17\\uDE9D\\uDE83\\uDD65\\uDD4B\\u0054\\u0442\\u01AC\\u1D1B\\u1D57\\u1D40\\u03C4\\uFF54\\uFF34\\u0074\\u019A\\u24E3\\u24C9\\u04AD\\u04AC\\uFF72\\u2020\\u0567\\u0A6E\\u0166\\u0535\\u0308\\u0164\\u03EE\\u22A5\\u15B6\\u0287\\u0020\\u033F\\u007C\\u0037\\u24AF]",
            "q":"[q\\u024A\\u024B\\u02A0\\u213A\\uD835\\uDCFA\\uDCE0\\uDCC6\\uDCAC\\uDD2E\\uDD14\\uDE9A\\uDE80\\uDD62\\u211A\\u146B\\u0071\\u0051\\u03D9\\u01A2\\u1D60\\u03C6\\u10B3\\uFF51\\uFF31\\u1EE3\\u24E0\\u24C6\\u04A8\\u01EB\\u0566\\u04A9\\u0E51\\u0563\\u03A9\\u01A3\\u01EA\\u0308\\u018D\\u00D8\\u1574\\u0070\\u0062\\u0020\\u007C\\u033F\\u0347\\u03ED\\u01A0\\u24AC]",
            "y":"[y\\u2144\\u00DD\\u00FD\\u0177\\u0178\\u00FF\\u1E8F\\u1EF5\\u1EF3\\u1EF7\\u01B4\\u0233\\u1E99\\u024E\\u024F\\u1EF9\\uD835\\uDD02\\uDCE8\\uDCCE\\uDCB4\\uDC66\\uDD1C\\uDEA2\\uDE88\\uDD6A\\uDD50\\u0059\\u0443\\u01B3\\u028F\\u0079\\u02B8\\u1D5E\\u03C8\\u03A8\\uFF59\\uFF39\\u05E5\\u10E7\\u24E8\\u24CE\\u0447\\u1F5B\\uFF98\\u057E\\u04CB\\u03B3\\u0E2F\\u05E2\\uFFE5\\u0263\\u00A5\\u040F\\u054E\\u03D3\\u0308\\u03E4\\u13A9\\u15BB\\u028E\\u2570\\u007C\\u256F\\u2443\\u03BB\\u24B4]",
            "w":"[w\\u1E83\\u0175\\u1E85\\u1E87\\u1E89\\u1E81\\u1E98\\uD835\\uDD00\\uDCE6\\uDCCC\\uDCB2\\uDD34\\uDD1A\\uDEA0\\uDE86\\uDD68\\uDD4E\\u15EF\\u03C9\\u019C\\u1D21\\u0057\\u0077\\u02B7\\u1D42\\u0448\\u0428\\uFF57\\uFF37\\u164E\\u0E2C\\u026F\\u24E6\\u24CC\\u0460\\u1FA7\\u1E82\\u0429\\u0561\\u0C1A\\u0449\\u0E9F\\u03CE\\u0308\\u13B3\\u028D\\u007C\\u0347\\u0020\\u039B\\u004D\\u163A\\u24B2]"
        }; 

        var canSkip = false;
        var last = "";

        var laststr = "";
        var lastEmojiPart = "";
        var lastEmojiCursorPos = 0;
        plugSugg.prototype.check = function (str, len) {
            var max = 30;
            var n = str.lastIndexOf("@");
            if (n !== -1) {
                var f = str.substr(n + 1, len).toLowerCase();
                if (!f) {
                    this.suggestions = [];
                    return false;
                }
                var names = API.getUsers().map(function (a) {
                    return a.rawun;
                });
                var first = this.suggestions = names.filter(function (a) {
                    return a.substr(0, f.length).toLowerCase()/*.replace(/ +/g, "")*/ === f;
                }).sort();
                var searchRegex = new RegExp(f.split("").map(function(a) {
                    return REGEXUNICODELETTERS[a] || ("\\" + a);
                }).join(""), "i");
                this.suggestions = this.suggestions.concat(names.filter(function(a) {
                    return first.indexOf(a) == -1 && searchRegex.test(a);
                }).sort());
                if (max < this.suggestions.length)
                    this.suggestions.length = max;
                if (this.suggestions.length) {
                    this.type = "@";
                    return;
                }
            }
            n = str.lastIndexOf(":");
            if (n !== -1) {
                var f = (laststr = str.substr(n + 1, len)).toLowerCase();
                if (f.length < 2) {
                    this.suggestions = [];
                    return false;
                }
                var first = f.substr(0, 1);
                var second = f.substr(1, 1);
                if (!first || !second || !realHash[first] || !realHash[first][second]) {
                    this.suggestions = [];
                    return false;
                }
                var i = 0;
                this.suggestions = realHash[first][second];
                if (f.length > 2) {
                    this.suggestions = this.suggestions.filter(function (a) {
                        return a.substr(0, f.length) === f;
                    });
                    if (max < this.suggestions.length)
                        this.suggestions.length = max;
                } else this.suggestions = this.suggestions.slice(0, max);
                if (this.lastEmpty)
                    this.index = 1;
                this.lastEmpty = !this.suggestions.length;
                if (this.suggestions.length === 0)
                    return false;
                else
                    this.suggestions.unshift("SSearch All Emojis");
                this.type = ":";
                if (this.index === -1)
                	this.index = 1;
                lastEmojiPart = this.lastEmojiSearch = str.substr(n + 1, len);
                lastEmojiCursorPos = n;
                this.lastLength = len;
            }
        };

        var upDownOld = plugSugg.prototype.upDown;
        var container = $("#chat-suggestion");
        plugSugg.prototype.upDown = function () {
            canSkip = false;
            upDownOld.apply(this, arguments);
            var selected = $("#chat-suggestion-items >:eq(" + this.index + ")");
            var offTop = selected.offset().top - container.offset().top;
            if (offTop < 0)
                container.scrollTop(offTop + container.scrollTop());
            else {
                var offBot = offTop - container.height() + selected.height();
                if (offBot > 0)
                    container.scrollTop(offBot + container.scrollTop());
            }
        }



        //search all
        var search = $("<div id='iplug-search-emojis' style='display: none'>");
        var content = $('<div><span class="title">Search All Emojis</span><i class="icon icon-dialog-close"></i><div><input type="text" id="emojiSearch" placeholder="Search for emoji" class="iplug"><div id="emojiSearchResults"></div><span id="emojiSearchCount"></span></div><span class="close">Close</span>');
        content.on("click", function(e) {
            e.stopPropagation();
        }).appendTo(search);
        search.appendTo("body").add("#iplug-search-emojis .close, #iplug-search-emojis .icon-dialog-close").on("click", function() {
            search.css({display: "none"});
        });

        //initialise worker
        var blobURL = URL.createObjectURL(new Blob(['(',
        function() {
            onmessage = function(m) {
                var allEmotes = m.data;
                var keys = Object.keys(allEmotes).sort().reverse();
                onmessage = function(m) {
                    var str = m.data;
                    postMessage({
                        query: str,
                        result: keys.filter(function(a) {
                            return -1 !== a.indexOf(str);
                        }).map(function(key) {
                            return "<div><img src='" + allEmotes[key] + "'></img><span>" + key + "</span></div>"
                        })
                    });
                }
                postMessage(true); //init complete
            };
        }.toString(),
        ')()'], {type: 'application/javascript'}));
        var worker = new Worker(blobURL);
        URL.revokeObjectURL(blobURL);

        var chatInputRange;
        var chatInputBefore;
        var chatInputAfter;
        var searchEmojiMode;
        var input = $("#emojiSearch");
        var output = $("#emojiSearchResults");
        worker.onmessage = function() {
            var lastQuery = "";
            input.on("input", function() {
                if (input.val().length < 2) return;
                lastQuery = input.val();
                worker.postMessage(input.val());
                output.empty();
            });

            worker.onmessage = function(m) {
                if (m.data.query !== lastQuery) return;
                output.empty();
                $("#emojiSearchCount").text(m.data.result.length + " results");
                one(m.data.result, m.data.query);

                function one(array, query) {
                    for (var i = 0; i < 20; i++)
                        output.append(array.pop());
                    if (m.data.query === lastQuery)
                        setTimeout(one, 0, array, query);
                }
            }
        };
        worker.postMessage(allEmotes);

        output.on("click", "*", function() {
            output.empty();
            search.css({display: "none"});

            var chatInput = document.getElementById("chat-input-field");
            if (searchEmojiMode) {
	            chatInput.value = chatInputBefore + $(this).children("span").text() + ":" + (chatInputAfter[0] === " " ? "" : " ") + chatInputAfter;
	            chatInput.focus();
	            chatInput.selectionEnd = chatInput.selectionStart = chatInputRange[0] + $(this).children("span").text().length + 2;
	        } else
	        	chatInput.value = chatInput.value.substring(0, lastEmojiCursorPos) + ":" + $(this).children("span").text() + ":" + (chatInput.value[lastEmojiCursorPos] === " " ? "" : " ") + chatInput.value.substring(lastEmojiCursorPos);
        });

        var plugChat = [];
        $.each(require.s.contexts._.defined, function(i, plugChat){
            if (plugChat && plugChat.prototype && plugChat.prototype.onLevelChange && plugChat.prototype.playSound) {
                var submitSuggestionOld = plugChat.prototype.submitSuggestion;
                plugChat.prototype.submitSuggestion = function() {
                    if ("SSearch All Emojis:" === this.suggestionView.getSelected()) {
                        chatInputRange = this.suggestionView.type === "@" ? this.getMentionRange() : this.getEmojiRange();
                        chatInputBefore = this.chatInput.value.substr(0, chatInputRange[0]);
                        chatInputAfter = this.chatInput.value.substr(chatInputRange[1]);
                        this.chatInput.value = this.chatInput.value.substr(0, chatInputRange[0] - 1) + this.chatInput.value.substr(chatInputRange[1]);
                        this.chatInput.setSelectionRange(chatInputRange[0], chatInputRange[0]);
                        this.suggestionView.reset();
                        this.suggestionView.updateSuggestions();

                        //open emoji search (on enter)
                        searchEmojiMode = true;
                        search.css({display: "block"});
                        input.val(this.suggestionView.lastEmojiSearch).trigger("input").focus();

                    } else submitSuggestionOld.apply(this, arguments);
                }
            }
        });


        /*
        var getSelectedOld = plugSugg.prototype.getSelected;
        plugSugg.prototype.getSelected = function () {
        	if (this.type === ":" && this.index === 0) {
        		setTimeout(function() {

        		}, 0);
        		return ""
        	}
            if (canSkip && laststr.length === 1) {
                setTimeout(function () {
                    var e = jQuery.Event("keydown");
                    e.keyCode = 13;
                    $("#chat-input-field").trigger(e);
                }, 0);
                return laststr;
            } else return getSelectedOld.apply(this, arguments);
        };*/

        $("#chat-input-field").preBind("keydown", function (e) {
            if (e.keyCode === 18)
                return;

            var now = $("#chat-input-field").val();
            if (now === last)
                return;
            if (now.length - last.length !== 1) {
                canSkip = false;
                last = now;
                return;
            }
            var i = 0;
            while (now.substr(i, 1) === last.substr(i, 1) && i < now.length)
                i++;
            if (i === now.length) {
                last = now;
                canSkip = false;
                return;
            }
            if (now.substr(i, 1) === ":")
                canSkip = true;
            last = now;
        });
    }


    //alt song on meh
    var playingAltSong = false;
	$("#vote").on("click", function() {
	  setTimeout(function() {
	  	if (localStorage["iplug|playmehenabled"] !== "block") return;
	    if ($("#meh").hasClass("active"))
	    	openAltSong();
	    else
	    	closeAltSong();
	  }, 0);
	});
	API.on(API.ADVANCE, function() {
		if (playingAltSong)
			closeAltSong();
	});
    function openAltSong() {
    	if (playingAltSong) return;
    	playingAltSong = true;
    	console.log("TODO: OPEN");
    	//TODO

    }
    function closeAltSong() {
    	if (!playingAltSong) return;
    	playingAltSong = false;
    	console.log("TODO: CLOSE");
    	//TODO

    }


    //multiplaylist binder
    /*$("#playlist-menu .activate-button .icon").on("click", multibind);
    function multibind() {
    	if (localStorage["iplug|multiplaylistenabled"] !== "block") return;
    	e.stopPropagation();
    	//real select
    }*/

    var playlistRow;
	$.each(require.s.contexts._.defined, function(i,a) {
		if (a && a.prototype && a.prototype.onMouseEnter && a.prototype.render && a.prototype.onActivateClick)
		    return !(playlistRow = a);
	});
	var playlistmenu;
	$.each(require.s.contexts._.defined, function(i,a) {
		if (a && a.onCreateRelease && a.onReset)
		    return !(playlistmenu = a);
	});
	var playlistcollection;
	$.each(require.s.contexts._.defined, function(i,a) {
	    if (a && a.getActiveID && a.getVisibleID)
	    	return !(playlistcollection = a)
	});

	var allPlaylists;
	var multiorder = (localStorage["iplug|multiplaylist"] || playlistcollection.getActiveID().toString()).split(" ").filter(function(a) {
		return a;
	}).map(function(a) {
		return parseInt(a);
	});
	var count = playlistcollection.findWhere({
		id: multiorder[0]
	}).attributes.count;
	var nowcount = localStorage["iplug|playlistcounter" + multiorder[0]] = parseInt(localStorage["iplug|playlistcounter" + multiorder[0]]) || count;
	$("#playlistcounter").text(count - nowcount + 1 + "/" + count);

	API.on(API.ADVANCE, function(data) {
		if (data.lastPlay.dj.id !== API.getUser().id)
			return;
		var count = playlistcollection.findWhere({
			id: multiorder[0]
		}).attributes.count;
		var nowcount = localStorage["iplug|playlistcounter" + multiorder[0]] = (parseInt(localStorage["iplug|playlistcounter" + multiorder[0]]) || count) - 1;
		if (!nowcount && (localStorage["iplug|multiplaylistenabled"] !== "block"))
			return;
		if (!nowcount && multiorder.length > 1) {
			//cycle playlists
			multiorder.push(multiorder.shift());
			localStorage["iplug|multiplaylist"] = multiorder.join(" ");

			var real = playlistcollection.findWhere({
				visible: true
			});
			real.visible = false;
			var fake = playlistcollection.findWhere({
				id: multiorder[0]
			});
			real.attributes.visible = false;
			fake.attributes.visible = true;
			allPlaylists[multiorder[0]].onActivateClick();
			real.attributes.visible = true;
			fake.attributes.visible = false;
		}
		var count = playlistcollection.findWhere({
			id: multiorder[0]
		}).attributes.count;
		var nowcount = localStorage["iplug|playlistcounter" + multiorder[0]] = (parseInt(localStorage["iplug|playlistcounter" + multiorder[0]]) || count);
		$("#playlistcounter").text(count - nowcount + 1 + "/" + count);
		var initializeOld = playlistRow.prototype.initialize;
	});

	var initializeOld = playlistRow.prototype.initialize;

	playlistRow.prototype.initialize = function() {
		initializeOld.apply(this, arguments);
		allPlaylists[this.model.get("id")] = this;
	}
	var renderOld = playlistRow.prototype.render;
	playlistRow.prototype.render = function() {
		renderOld.apply(this, arguments);
		var $this = this.$el;
		var id = this.model.get("id")
		$this.attr("playlistid", id);
		var del = $("<div>");
		del.append("<div><i class='icon icon-leave-booth-big'>").on("click", function() {
			//remove from multiorder
			var index = multiorder.indexOf(id);
			console.log(id, index, $this.attr("playlistid"), multiorder.join(" "), $this[0]);
			multiorder.splice(index, 1);
			localStorage["iplug|multiplaylist"] = multiorder.join(" ");
			$this.removeClass("queued").find(".activate-button span").text("");
			//fix display order of other playlists
			$("#playlist-menu .row.queued .activate-button span").each(function(i, e) {
				var n = parseInt(e.innerText);
				if (n > index)
					e.innerText = (n - 1) || "";
			});
			if (!index) { //activate new playlist if needed
				var real = playlistcollection.findWhere({
					visible: true
				});
				real.visible = false;
				var fake = playlistcollection.findWhere({
					id: multiorder[0]
				});
				if (multiorder.length === 1)
					$("#playlist-menu .row.queued").addClass("last");
				real.attributes.visible = false;
				fake.attributes.visible = true;
				allPlaylists[multiorder[0]].onActivateClick();
				real.attributes.visible = true;
				fake.attributes.visible = false;
			}
		}).wrap("<div class='delete'></div>").parent().appendTo($this);
		if (localStorage["iplug|multiplaylistenabled"] === "block") {
			var index = multiorder.indexOf(this.model.get("id"));
			if (index === -1)
				return;
			var span = $("<span>");
			$this.addClass("queued").children(".activate-button").append(span);
			if (multiorder.length === 1)
				$this.addClass("last");
			if (index > 0)
				span.text(index);
		}
	};
	var onActivateClickOld = playlistRow.prototype.onActivateClick;
	playlistRow.prototype.onActivateClick = function() {
		var $this = this.$el;
		if (localStorage["iplug|multiplaylistenabled"] === "block") {
			if (!$this.hasClass("queued")) {
				$this.addClass("queued").children(".activate-button").append("<span>" + multiorder.length + "</span>");
				multiorder.push(this.model.get("id"));
				localStorage["iplug|multiplaylist"] = multiorder.join(" ");
				$("#playlist-menu .row.last").removeClass("last");
				return;
			}
			var index = multiorder.indexOf(this.model.get("id"));
			if (index || $this.find(".activate-button .icon-check-purple").length) {
				if (index === -1)
					console.error("playlist is in queue, but not in multiorder!");
				if (!index)
					return; //do nothing :) just like plug devs
				multiorder = multiorder.concat(multiorder.splice(0, index));
				localStorage["iplug|multiplaylist"] = multiorder.join(" ");
				var rows = $("#playlist-menu .container .row");
				multiorder.forEach(function(a, i) {
					rows.filter("[playlistid='" + a + "']").find(".activate-button span").text(i || "");
				});
			}
		}
		//$this.addClass("active").siblings(".active").removeClass("active");
		onActivateClickOld.apply(this, arguments);
		var count = playlistcollection.findWhere({
			id: multiorder[0]
		}).attributes.count;
		var nowcount = localStorage["iplug|playlistcounter" + multiorder[0]] = (parseInt(localStorage["iplug|playlistcounter" + multiorder[0]]) || count);
		$("#playlistcounter").text(count - nowcount + 1 + "/" + count);
	}
	var onMouseEnterOld = playlistRow.prototype.onMouseEnter;
	playlistRow.prototype.onMouseEnter = function() {
		var $this = this.$el;
		if ($(this).filter(".selected:has(.activate-button .icon-check-purple)").length) {

		}
		onMouseEnterOld.apply(this, arguments);
	}
	var onResetOld = playlistmenu.onReset;
	playlistmenu.onReset = function() {
		allPlaylists = {};
		onResetOld.apply(this, arguments);
	};
	playlistmenu.onReset();


    $.fn.preBind = function (type, data, fn) {
        this.each(function () {
            var $this = $(this);

            $this.bind(type, data, fn);

            var currentBindings = $this.data('events', type);
            if ($.isArray(currentBindings)) {
                currentBindings.unshift(currentBindings.pop());
            }
        });
        return this;
    };

    function callbacks(id, enabled) {
        switch (id) {
        case "autojoinenabled":
            return function () {
                if (pos == -1 && localStorage["iplug|autojoinenabled"] == "block") {
                    $("#autojoinenabled > i").removeClass("blackandwhite");
                    tempAutoJoinDisabled = false;
                }
                if (tempAutoJoinDisabled && localStorage["iplug|autojoinenabled"] != "block") {
                    $("#autojoinenabled").click();
                    tempAutoJoin(false);
                    JN();
                } else if (localStorage["iplug|autojoinenabled"] == "block") {
                    JN();
                }
            };
        case "youtubevideodisabled":
            return function () {
                if (enabled) {
                    if ($("#backgroundcardselected .backgroundcard[card='youtube']").length) {
                        $("#youtubevideodisabled").click();
                    } else {
                        $("#playback").css({
                            display: "none"
                        });
                    }
                } else {
                    $("#playback").css({
                        display: "block"
                    });
                }
            };
        case "playbackborder":
            return function () {
                if (enabled) {
                    $("#playback > .background").css({
                        display: "none"
                    });
                } else {
                    if ($("#backgroundcardselected .backgroundcard[card='youtube']").length) {
                        $("#playbackborder").click();
                    } else {
                        $("#playback > .background").css({
                            display: "block"
                        });
                    }
                }
            };
        case "curateenabled":
            return function () {
                if (cover && cover.remove)
                    cover.remove();
                $("#vote").css({
                    display: (enabled) ? "block" : "none"
                });
                if (enabled && $("body").hasClass("topvotebar")) {
                    $("#vote").appendTo("#room");
                    $("body").removeClass("topvotebar");
                    if (localStorage['iplug|topwootenabled'] === "block") $("#topwootenabled").click();
                    if (localStorage['iplug|topgrabenabled'] === "block") $("#topgrabenabled").click();
                    if (localStorage['iplug|topmehenabled'] === "block") $("#topmehenabled").click();
                }
            };
        case "topwootenabled":
            return function () {
                if (enabled && !$("body").hasClass("topvotebar")) {
                    $("#vote").prependTo("#iconscontainer");
                    $("body").addClass("topvotebar");
                    if (localStorage['iplug|curateenabled'] === "block") $("#curateenabled").click();
                }
                $("#woot").css({
                    display: (enabled) ? "block" : "none"
                });
            };
        case "topgrabenabled":
            return function () {
                if (enabled && !$("body").hasClass("topvotebar")) {
                    $("#vote").prependTo("#iconscontainer");
                    $("body").addClass("topvotebar");
                    if (localStorage['iplug|curateenabled'] === "block") $("#curateenabled").click();
                }
                $("#grab").css({
                    display: (enabled) ? "block" : "none"
                });
            };
        case "topmehenabled":
            return function () {
                if (cover && cover.remove)
                    cover.remove();
                if (enabled && !$("body").hasClass("topvotebar")) {
                    $("#vote").prependTo("#iconscontainer");
                    $("body").addClass("topvotebar");
                    if (localStorage['iplug|curateenabled'] === "block") $("#curateenabled").click();
                }
                $("#meh").css({
                    display: (enabled) ? "block" : "none"
                });
            };
        case "topskipenabled":
            return function () {
                if (cover && cover.remove)
                    cover.remove();
                $("#topdjbutton").attr({
                    style: "display: " + ((enabled) ? "inline-block" : "none") + " !important"
                });
            };
        case "topdlenabled":
            return function () {
                if (cover && cover.remove)
                    cover.remove();
                $("#downloadbutton").attr({
                    style: "display: " + ((enabled) ? "inline-block" : "none") + " !important"
                });
            };
        case "waitlistdisabled":
            return function () {
                $("#dj-button").css({
                    display: (enabled) ? "none" : "block"
                });
            };
        case "roomnamedisabled":
            return function () {
                $("#room-bar").css({
                    visibility: (enabled) ? "hidden" : "visible"
                });
                $("#topbarcontainer").css({
                    left: (enabled) ? "53px" : "446px"
                });
            };
        case "audiencedisabled":
            return function () {
                $("#audience").css({
                    display: (enabled) ? "none" : "block"
                });
            };
        case "djdisabled":
            return function () {
                $("#dj-booth").css({
                    display: (enabled) ? "none" : "block"
                });
            };
        case "autohideplaybackcontrolsenabled":
            return function () {
                if (enabled)
                    $("#playback-controls").addClass("autohide");
                else
                    $("#playback-controls").removeClass("autohide");
            };
        case "scvisualsenabled":
            return function () {
                if (typeof (API.getMedia()) == "object") {
                    if (typeof (API.getMedia().format) == "number" && API.getMedia().format == 2) {
                        $("#playback-controls > div.button.refresh").click();
                    } else {
                        //onAPIadvance();
                    }
                }
            };
        case "autowootdelayrandom":
            return function () {
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
            };
        case "scvisualsbars":
            return function () {
                //SPACER_WIDTH = Math.floor((((300 - (parseInt(localStorage["iplug|scvisualsbarsmin"], 10))) / 12) + 0.5) * 2) / 2;
                //SPACER_WIDTH = Math.floor(51 - parseInt(localStorage["iplug|scvisualsbarsmin"]) / 6) / 2
            };
        case "sccolorred":
        case "sccolorgreen":
        case "sccolorblue":
        case "decolorred":
        case "decolorgreen":
        case "decolorblue":
            return function () {
                var color = "rgb(" + parseInt($("#" + id.substring(0, 2) + "colorred > .barcontainer > .circle").css("left")) + "," + parseInt($("#" + id.substring(0, 2) + "colorgreen > .barcontainer > .circle").css("left")) + "," + parseInt($("#" + id.substring(0, 2) + "colorblue > .barcontainer > .circle").css("left")) + ")";
                $("#" + id.substring(0, 2) + "colorcolor").css("background-color", color);
                if (id.substring(0, 2) === "sc") $("#scgradientslider > .barcontainer > .circle.selected").css("border-color", color);
                if (id.substring(0, 2) === "de") $(".node.selected").css("background-color", color);
                callbacks(id.substring(0, 2) + "gradientslider")();
            };
        case "autowootdelay":
            return function (values, minmax) {
                minmax.each(function (i, a) {
                    $(a).html((values[i] / 10).toFixed(1) + "s");
                });
            };
        case "scgradientslider":
            return function () {
                var colors = $("#scgradientslider > .barcontainer > .circle");
                colors.sort(function (a, b) {
                    return parseInt($(a).css("left")) - parseInt($(b).css("left"));
                });
                var scheme = [];
                colors.each(function (i, a) {
                    var temp = $(a).css("border-color").split("rgb(")[1].split(")")[0].split(", ");
                    temp.forEach(function (a, i, e) {
                        e[i] = parseInt(a);
                    });
                    scheme.push([parseInt($(a).css("left")) / 300, temp]);
                });
                colorscheme = scheme;
                $("#scgradientslider > .barcontainer > .bar").attr("style", setGradient(scheme));
                var lel = [];
                scheme.forEach(function (a, i) {
                    lel.push(a[0] + "|" + a[1].join(","));
                });
                localStorage["iplug|sccolorstring"] = lel.join("&");
                updateColor();
            };
        case "degradientslider":
            return function () {
                COLORS = [];
                $(".node").not(".cross").each(function (i, e) {
                    COLORS.push($(e).css("background-color"));
                });
                localStorage["iplug|decolorstring"] = COLORS.join("|");
            };
        case "imagesenabled":
            return function () {
                if (enabled)
                    convertChat(true, false, $("#chat-messages"));
            };
        case "videosenabled":
            return function () {
                if (enabled)
                    convertChat(false, true, $("#chat-messages"));
            };
        case "remembermehsenabled":
        	return function() {};
        case "playmehenabled":
        	return function() {
        		if (!enabled && playingAltSong)
        			closeAltSong();
        	}
        case "multiplaylistenabled":
        	return function() {
    			if (enabled)
    				$("#footer").addClass("multi");
    			else
    				$("#footer").removeClass("multi");

				playlistmenu.onReset();
        	}
        }
        console.error("iplug menu error: unknown option '" + id + "'");
        return function () {};
    }

    function bindGradientCircleEvents(e) {
        e.bind("mouseenter", function () {
            $(this).animate({
                height: "14px",
                width: "14px",
                marginLeft: "-10px",
                marginTop: "-2px"
            }, {
                duration: 100,
                queue: false
            });
        }).bind("mouseleave", function () {
            if ($(this).hasClass("selected")) return;
            $(this).animate({
                height: "10px",
                width: "10px",
                marginLeft: "-8px",
                marginTop: "0px"
            }, {
                duration: 100,
                queue: false
            });
        }).bind("mousedown", function () {
            var settings = $(this).parent().parent().siblings(".settings");
            $(this).addClass("selected").animate({
                height: "14px",
                width: "14px",
                marginLeft: "-10px",
                marginTop: "-2px"
            }, {
                duration: 100,
                queue: false
            }).siblings(".circle").removeClass("selected").animate({
                height: "10px",
                width: "10px",
                marginLeft: "-8px",
                marginTop: "0px"
            }, {
                duration: 100,
                queue: false
            });
            settings.children(".delete").children().css(($(this).siblings(".circle").length === 0) ? {
                display: "none",
                cursor: "default"
            } : {
                display: "block",
                cursor: "pointer"
            });
            var color = $(".circle.selected").css("borderColor");
            settings.children(".colorpicker").children(".colorblock").css("background-color", color);
            color = color.split("rgb(")[1].split(",");
            settings.children(".colorpicker").children(".slider").children(".barcontainer").children(".circle").each(function (i, a) {
                $(a).css("left", parseInt(color[i]));
            });
            settings.children().css("display", "block");
        });
    }

    function colorCircleDom(scheme) {
    	return "";
    }

    function colorDom(scheme) {
        var result = "";
        for (var i = 0; i < scheme.length; i++) {
            result += '<div class="circle" style="left: ' + parseInt(scheme[i][0] * 300) + 'px; border-color: rgb(' + scheme[i][1].join(",") + ')"></div>';
        }
        return result;
    }

    function setCircleGradient(scheme) {
    	return "";
    }

    function setGradient(scheme) {
        var bg = "";
        scheme.forEach(function (a) {
            bg += ", " + ("rgb(" + a[1].join(",") + ")") + " " + (Math.round(a[0] * 100) + "%");
        });
        return "background: linear-gradient(to right" + bg + ");";
    }

    function getGradientColor(i) {
        if (i === 1) return "rgb(" + colorscheme.last()[1].join(",") + ")";
        var min = colorscheme.filter(function (a) {
            return a[0] <= i;
        }).last() || colorscheme.last();
        var max = colorscheme.filter(function (a) {
            return a[0] > i;
        })[0] || colorscheme[0];
        var inbetween = max[0] - min[0],
            a, b;
        if (inbetween === 0) {
            a = 1;
            b = 0;
        } else {
            b = (i - min[0]) / inbetween;
            a = (max[0] - i) / inbetween;
        }
        return "rgb(" + Math.round(min[1][0] * a + max[1][0] * b) + "," + Math.round(min[1][1] * a + max[1][1] * b) + "," + Math.round(min[1][2] * a + max[1][2] * b) + ")";
    }

    function showMeh() {
        if (localStorage["iplug|listgrabmehenabled"] !== "block") return;
        var usernames = [];
        API.getUsers().filter(function (x) {
            if (x.vote === -1) return true;
        }).forEach(function (e) {
            usernames.push(e.username);
        });
        if (usernames.length > 0) Tooltip.show(usernames.join("\n"), $("#meh"), false);
    }

    function hideTooltip() {
        Tooltip.hide();
    }

    function showGrab() {
        if (localStorage["iplug|listgrabmehenabled"] !== "block") return;
        var usernames = [];
        API.getUsers().filter(function (x) {
            if (x.grab) return true;
        }).forEach(function (e) {
            usernames.push(e.username);
        });
        if (usernames.length > 0) Tooltip.show(usernames.join("\n"), $("#grab"), false);
    }
    $("#grab").on("mouseenter", showGrab).on("mouseleave", hideTooltip);
    $("#meh").on("mouseenter", showMeh).on("mouseleave", hideTooltip);

    function cardBuilder(key) {
        return '<div class="backgroundcard"  card="' + key + '"><div class="backgroundtitle noitem"><span>' + backgrounds[key].text + '</span></div><div class="backgrounddescription noitem"><p>' + backgrounds[key].description + '</p></div><img src="' + backgrounds[key].url + '" class="backgroundthumbnail"></img></div>';
    }




    //because I can
    API.on(API.CHAT_COMMAND, function(string) {
        var params = string.split(" ");
        if (params.shift() != "/flip") return;
        API.sendChat($.trim(strtr(strtr(params.join(" "), {
            ä:"a",á:"a",à:"a",â:"a",ã:"a",Ä:"A",Á:"A",À:"A",Â:"A",Ã:"A",ë:"e",é:"e",è:"e",ê:"e",Ë:"E",É:"E",È:"E",Ê:"E",ï:"i",í:"i",ì:"i",î:"i",Ï:"I",Í:"I",Ì:"I",Î:"I",ö:"o",ó:"o",ò:"o",ô:"o",õ:"o",Ö:"O",Ó:"O",Ò:"O",Ô:"O",Õ:"O",ü:"u",ú:"u",ù:"u",û:"u",Ü:"U",Ú:"U",Ù:"U",Û:"U",ß:"ss"
        }), {
            ",":"\u02bb","!":"\u00a1","?":"\u00bf",".":"\u0387","'":"\u02cc","\"":"\u02cc\u02cc","*":"\u2093","&":"\u214b","1":"\u0196","2":"\u0547","3":"\u0190","4":"h","5":"\u0aec","6":"9","7":"L","9":"6","A":"\u2200","a":"\u0250","b":"q","B":"\u0a98","c":"\u0254","C":"\u0186","d":"p","D":"\u10a7","e":"\u0259","E":"\u018e","F":"\u2132","f":"\u025f","g":"\u0253","G":"\u2141","h":"\u0265","i":"\u0131","j":"\u017f","J":"\u017f","k":"\u029e","K":"\u029e","L":"\u10a8","l":"\u0e45","M":"W","m":"\u026f","n":"u","P":"\u0500","p":"d","Q":"\u1ff8","q":"b","R":"\u0b27","r":"\u0279","T":"\u22a5","t":"\u0287","U":"\u2229","u":"n","V":"\u039b","v":"\u028c","w":"\u028d","W":"M","Y":"\u2144","y":"\u028e"
        })).split("").reverse().join(""));

        //php's strtr for javascript
        function strtr(e,t,n){var r="",i=0,s=0,o=0,u=0,a=false,f="",l="",c="";var h=[];var p=[];var d="";var v=false;if(typeof t==="object"){for(r in t){if(t.hasOwnProperty(r)){h.push(r);p.push(t[r])}}t=h;n=p}o=e.length;u=t.length;f=typeof t==="string";l=typeof n==="string";for(i=0;i<o;i++){v=false;if(f){c=e.charAt(i);for(s=0;s<u;s++){if(c==t.charAt(s)){v=true;break}}}else{for(s=0;s<u;s++){if(e.substr(i,t[s].length)==t[s]){v=true;i=i+t[s].length-1;break}}}if(v){d+=l?n.charAt(s):n[s]}else{d+=e.charAt(i)}}return d}
    });

    function updateColor() {}
});

totalLength = 
$.extend($.easing, {
    tocircle: function(x, t, b, c, d) {
    	return Math.min(10000, 1 / $.easing.easeInOutQuint(x, t, b, c, d));
    },
    fromcircle: function(x, t, b, c, d) {
    	return Math.min(10000, 1 / (1 - $.easing.easeInOutQuint(x, t, b, c, d)));
    }
});

$.fn.preBind = function (type, data, fn) {
    this.each(function () {
        var $this = $(this);

        $this.bind(type, data, fn);

        var currentBindings = $this.data('events', type);
        if ($.isArray(currentBindings)) {
            currentBindings.unshift(currentBindings.pop());
        }
    });
    return this;
};

var usercode; //make global so user can access
function usercodesave() {
    if (typeof usercode !== "function") throw new Error("usercode is not a function!");
    localStorage['usercustomcode'] = usercode.toString();
    localStorage['usercustomcodesafe'] = 'TRUE';
    console.log("code updated! refresh to make it work! ;)");
}

(function () {
    if ("FALSE" !== localStorage["iplug|usercustomcodesafe"]) {
        localStorage["iplug|usercustomcodesafe"] = "FALSE";
        window.onbeforeunload = function () {
            localStorage['iplug|usercustomcodesafe'] = 'TRUE';
        };
        try {
            eval(localStorage['iplug|usercustomcode']);
            if (typeof usercode !== "function") {
                usercode = function usercode() {};
                localStorage['iplug|usercustomcode'] = usercode.toString();
                localStorage['iplug|usercustomcodesafe'] = 'TRUE';
            }
            try {
                console.log('\n\n\n\n\n/-----------------------------------------------------------------------------------------------\\\n|You opened the console! you know some code, do you?                                            |\n|Did you know that iPlug can run your code for you? allow me to demonstrate with an example:    |\n|                                                                                               |\n|function usercode() {                                                                          |\n|  console.log(\'hi!\') //will log \'hi\' in console whenever plug loads                            |\n|}                                                                                              |\n|                                                                                               |\n|usercodesave() //will save changes made to usercode                                            |\n\\-----------------------------------------------------------------------------------------------/\n\n\n\n\n');
                usercode();
            } catch (error) {
                console.log("\n\na non fatal error has been encountered while executing the custom user code, please change the function usercode(), run usercodesave(), and then refresh the page.");
                console.error(error + "\n\n");
            }
        } catch (error) {
            console.log("\n\na non fatal error has been encountered while parsing the custom user code, please change the function usercode(), run usercodesave(), and then refresh the page.");
            console.error(error + "\n\n");
        }
    } else {
        console.log('\n\n\n\n\n/-----------------------------------------------------------------------------------------------\\\n|we\'re sorry to announce that your browser has crashed last session.                            |\n|in order to avoid potentionally automaticly loading wrong code that crashes your browser,      |\n|we have automaticly disabled your code. if you want to change your code, simply modify the     |\n|function usercode(), and use usercodesave() to save the function, and then refresh.            |\n\\-----------------------------------------------------------------------------------------------/\n\n\n\n\n');
        try {
            eval(localStorage['iplug|usercustomcode']);
        } catch (error) {
            console.error("\n\nunrecoverable error while parsing custom user code :(");
            console.error(error + "\n\n");
            console.log(localStorage['iplug|usercustomcode']);
        }
    }
}());
