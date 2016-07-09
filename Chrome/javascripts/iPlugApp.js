var chrome = "___URL___";
console.log("CHROME", chrome);

requirejs.config({
    paths: {
        "iplug": chrome + "javascripts/iplug",
        "sketch": chrome + "javascripts/sketch"
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
    if (isNaN(parseInt(localStorage["iplug|scvisualsstyle"]))) {
        localStorage["iplug|scvisualsstyle"] = 0;
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
        if ($("#dj-button").length > 0) {
            var t = $("#dj-button")[0];
            if ((t == $(".is-leave")[0]) || (t == $(".is-quit")[0])) return; //done
            if ((t == $(".is-full")[0]) || (t == $(".is-locked")[0])) {
                return setTimeout(JN, 500);
            }
            if (t == $(".is-wait")[0]) {
                $("#dj-button").click();
                return;
            }
        } else {
            setTimeout(JN, 1000); // object not created yet || slow pc || loll
        }
    }

    setTimeout(JN, 5000); // AUTO JOIN ON JOIN, and butter on butter is butter

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
    API.on(API.CHAT, function () {
        var img = localStorage["iplug|imagesenabled"] === "block";
        var vid = localStorage["iplug|videosenabled"] === "block";
        if (img || vid)
            convertChat(img, vid);
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
            $(item).css("width", width + "px");
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

    $(".iplug-container .item-iplug").bind("click", function () {
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

    $(".iplug-container > .subcontainer > .iplug-collapse").bind("mousedown", function () {
        if ($(this).css("text-indent") != "0px") {
            $(this).attr("queue", "true");
            return;
        }
        var newclass, newheight, rotate, clearheight, complete, dis = $(this);
        if (dis.attr("class") == "iplug-collapse icon icon-arrow-up") {
            newclass = "iplug-collapse icon icon-arrow-down";
            newheight = $(this).parent().css("height", "").css("height");
            dis.parent().css("height", "30px");
            rotate = "-180px";
            clearheight = true;
            complete = function () {};
        } else {
            newclass = "iplug-collapse icon icon-arrow-up";
            newheight = "30px";
            rotate = "180px";
            clearheight = false;
            complete = function () {
                dis.siblings(".gradientpicker").children(".settings").children().css("display", "none");
                dis.siblings(".gradientpicker").children(".slider").children(".barcontainer").children(".circle.selected").removeClass("selected").css({
                    height: "10px",
                    width: "10px",
                    marginLeft: "-8px",
                    marginTop: "0px"
                });
            };
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
                complete();
                if ($(this).attr("queue") == "true") {
                    $(this).mousedown();
                }
                $(this).attr("queue", "false");
                if (clearheight === true) {
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

    $("#visualsstyle").bind("click", function () {
        if ($("#scvisuals").is(':animated')) return;
        $("#scvisuals > .iplug-collapse.icon-arrow-down").trigger('mousedown');
        setTimeout(function () {
            $("#visuals" + localStorage['iplug|scvisualsstyle']).css("height", "0px").css("opacity", "0");
            localStorage['iplug|scvisualsstyle'] = (1 + parseInt(localStorage['iplug|scvisualsstyle'])) % 2;
            $("#visuals" + localStorage['iplug|scvisualsstyle']).css("height", "").css("opacity", "");
            $("#visualsstyle > span").first().html("Style " + (1 + parseInt(localStorage['iplug|scvisualsstyle'])));
            $("#scvisuals > .iplug-collapse.icon-arrow-up").trigger('mousedown');
        }, 750);
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

    $("#dialog-container").bind("DOMNodeInserted", function (e) {
        var target = $(e.target);
        if (target.attr("class") !== "dialog-frame" || target.parent().attr("id") !== "dialog-preview" || target.parent().children(".dialog-frame:first")[0] !== target[0]) return;
        initdownloadbutton(target)
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

    function convertChat(allowImg, allowVid, first) {
        $("#chat-messages a").each(function (i, a) {
            a = $(a);
            var text = a.attr("href");
            if (allowImg && /(\b(https?):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|]\.(?:jpg|gif|png)\b)/i.test(text)) {
                var el = $("<img src='" + text + "' class='chat-img'>");
                getRealImageSize(text, function (size) {
                    el.css({
                        cursor: "pointer"
                    });
                    bindOpenImg(el, text, size);
                });
                a.replaceWith(el);
            } else if (allowVid) {
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
                    a.replaceWith(el);
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
                convertChat(allowImg, allowVid, true);
            }, 250);
    }

    function bindOpenImg(el, url, size) {
        el.one("click", function () {
            if ($("#iplug-overlay2 :not(iframe)").length)
                $("#iplug-overlay2").click();
            if (!canOpenDialog())
                return bindOpenImg(el, url, size);
            var offset = el.offset();
            var image = $("<img src='" + url + "'>").css({
                position: "fixed",
                zIndex: "120005",
                width: el.width(),
                height: el.height,
                left: offset.left,
                top: offset.top
            });
            var overlay = createPopup().append(image).addClass("above-chat");
            var maxscale = Math.min(window.innerWidth * 0.8 / size.width, window.innerHeight * 0.8 / size.height);
            var scale = Math.min(1, maxscale);
            var X = size.width * scale;
            var Y = size.height * scale;
            image.animate({
                width: X,
                height: Y,
                left: window.innerWidth * 0.5 - X / 2,
                top: window.innerHeight * 0.5 - Y / 2
            }, {
                duration: 250,
                easing: "easeInOutQuint",
                complete: function () {
                    if (scale === 1) {
                        var zoomedIn = false;
                        var animating = false;
                        image.css({
                            cursor: "zoom-in"
                        }).on("click", function () {
                            if (animating)
                                return;
                            animating = true;
                            var newscale = zoomedIn ? 1 : maxscale;
                            var X = size.width * newscale;
                            var Y = size.height * newscale;
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
                        bindOpenImg(el, url, size);
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

            crl = new window.YT.Player(iframe[0], {
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
                    showinfo: 0,
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

    function getRealImageSize(src, callback) {
        $("<img/>")
            .attr("src", src)
            .load(function () {
                callback({
                    width: this.width,
                    height: this.height
                });
            });
    }

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
    var allEmotes = {};
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
    }];

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
                        finishEmotes();
                },
                error: function (x) {
                    if (tries++ < 3)
                        return load();
                    console.warn("Failed to load emotes from " + emoteObject.url + "...");
                    if (--emoteObjectsToLoad <= 0)
                        finishEmotes();
                }
            });
        }
    });

    function finishEmotes() {
        console.log("loaded " + Object.keys(allEmotes).length + " emotes! lmao");

        //hashing

        var realHash = {};
        for (var key in allEmotes) {
            hashThis(key, allEmotes[key]);
        }

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

        for (var one in realHash)
            for (var two in realHash[one])
                realHash[one][two] = realHash[one][two].sort();

        var regex = new RegExp(":(" + Object.keys(realHash).map(function (one) {
            return one.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/gi, "\\$&") + "(?:" + Object.keys(realHash[one]).map(function (two) {
                return two.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/gi, "\\$&") + "(?:" + realHash[one][two].map(function (content) {
                    return content.substr(2).replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/gi, "\\$&").toLowerCase(); //escape for regex usage
                }).join("|") + ")";
            }).join("|") + ")";
        }).join("|") + "):", "g");

        for (var key in window.emoji.data) {
            if (!window.emoji.data.hasOwnProperty(key)) continue;
            var node = window.emoji.data[key]; -
            node[3].forEach(function (a) {
                hashThis(a, node);
            });
        }

        //replacing
        var replace_colons_old = emojiFilter.replace_colons;
        emojiFilter.replace_colons = function (str, x, y, z) {
            var resp = replace_colons_old.apply(emojiFilter, arguments);
            var args = arguments;
            if (!x && !y)
                resp = resp.replace(regex, function (a, b) {
                    return "<img src='" + allEmotes[b.toLowerCase()] + "'" + (z ? "" : " tooltip='" + b + "' onload='emojiTooltip(this)'") + "></img>";
                });
            return resp;
        };
        window.emojiTooltip = function (that) {
            var $this = $(that);
            $this.on("mouseenter", function () {
                Tooltip.show($this.attr("tooltip"), $this, false);
            }).on("mouseleave", Tooltip.hide);
        }

        //suggestions

        var canSkip = false;
        var last = "";

        var laststr = "";
        plugSugg.prototype.check = function (str, len) {
            var n = str.lastIndexOf("@");
            if (n !== -1) {
                var f = str.substr(n + 1, len).toLowerCase();
                if (!f) {
                    this.suggestions = [];
                    return false;
                }
                this.suggestions = API.getUsers().map(function (a) {
                    return a.rawun;
                }).filter(function (a) {
                    return a.substr(0, f.length).toLowerCase() === f;
                }).sort();
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
                var max = 30;
                var i = 0;
                this.suggestions = realHash[first][second];
                if (f.length > 2) {
                    this.suggestions = this.suggestions.filter(function (a) {
                        return a.substr(0, f.length) === f;
                    });
                    if (max < this.suggestions.length)
                        this.suggestions.length = max;
                } else this.suggestions = this.suggestions.slice(0, max);
                this.suggestions = this.suggestions;
                if (this.suggestions.length)
                    this.type = ":";
                else
                    return false;
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

        var getSelectedOld = plugSugg.prototype.getSelected;
        plugSugg.prototype.getSelected = function () {
            if (canSkip && laststr.length === 1) {
                setTimeout(function () {
                    var e = jQuery.Event("keydown");
                    e.keyCode = 13;
                    $("#chat-input-field").trigger(e);
                }, 0);
                return laststr;
            } else return getSelectedOld.apply(this, arguments);
        };

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
                    convertChat(true, false);
            }
        case "videosenabled":
            return function () {
                if (enabled)
                    convertChat(false, true);
            }
        }
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

    function colorDom(scheme) {
        var result = "";
        for (var i = 0; i < scheme.length; i++) {
            result += '<div class="circle" style="left: ' + parseInt(scheme[i][0] * 300) + 'px; border-color: rgb(' + scheme[i][1].join(",") + ')"></div>';
        }
        return result;
    }

    function setGradient(scheme) {
        var moz = "-moz-linear-gradient(left";
        var webkit = "-webkit-gradient(linear, left top, right top";
        var webkiit = "-webkit-linear-gradient(left";
        var o = "-o-linear-gradient(left";
        var ms = "-ms-linear-gradient(left";
        var bg = "linear-gradient(to right";
        scheme.forEach(function (a) {
            var le = [Math.round(a[0] * 100) + "%", "rgb(" + a[1].join(",") + ")"];
            moz += ", " + le[1] + " " + le[0];
            webkit += ", color-stop(" + le[0] + ", " + le[1] + ")";
            webkiit += ", " + le[1] + " " + le[0];
            o += ", " + le[1] + " " + le[0];
            ms += ", " + le[1] + " " + le[0];
            bg += ", " + le[1] + " " + le[0];
        });
        return "background: " + moz + "); background: " + webkit + "); background: " + webkiit + "); background: " + o + "); background: " + ms + "); background: " + bg + ");";
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
