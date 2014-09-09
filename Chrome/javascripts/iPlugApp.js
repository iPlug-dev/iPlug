(function () {
    "use strict";
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
    };



    if(typeof(localStorage['iplug|version']) != "string") localStorage['iplug|version'] = "0";
    
    if(version() != localStorage['iplug|version']){
        localStorage['iplug|version'] = version();
        setTimeout(function(){
            $('#iplug-overlay').css('display', 'block');
            alert("iPlug has been updated!\n\n\nVersion: " + localStorage['iplug|version']);
            $('#iplug-overlay').css('display', 'none');
        }, 5000);
    }
    
    function WT() {
        if ($('#woot').length > 0) {
            if($("#woot")[0] != $("#vote > .selected")[0]) { //didn't work
                $("#woot").click();
                setTimeout(WT, 500); //try again
            }
        } else {
            setTimeout(WT, 1000); // object not created yet || slow pc 
        };
    }


    setTimeout(WT, 3000); // AUTO WOOT ON JOIN
    
    
    
    
    
    
    
    
    
    
    
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

        if (localStorage["iplug|bigtxtenabled"] == "none"){
            for (i = 0; i < users.length; i++) {
                $($(".user > .name")[i]).parent().append(["<i class='icon icon-woot' style='background-position: -174px -280px'></i>", "", "<i class='icon icon-woot'></i>"][users[i].vote + 1] + "<div class='leveldisplay' style='left:30px; height: 30px; width: 46px'><span class='name' style='top: 7px; margin-left: auto; margin-right: auto; color: #eee; font-size: 10px'>lvl" + users[i].level + "</span></div>");
            }
        } else if (localStorage["iplug|bigtxtenabled"] == "block") {
            for (i = 0; i < users.length; i++) {
                $($(".user > .name")[i]).parent().append(["<i class='icon icon-woot' style='background-position: -174px -280px'></i>", "", "<i class='icon icon-woot'></i>"][users[i].vote + 1] + "<div class='leveldisplay' style='left:30px; height: 30px; width: 46px'><span class='name' style='top: 5px; margin-left: auto; margin-right: auto; left: 25px;width: 43px;text-align: center;color: rgb(128, 134, 145); font-size: 15px'>" + users[i].level + "</span></div>");
            }
        }
        if (0===$("#removedcheck").length) {
            $("#user-lists > .jspScrollable > .jspContainer > .jspPane").prepend("<div id='removedcheck'></div>");
        }
        clearInterval(lasttimer);
        lasttimer = setInterval(checkplugrefresh, 50);
    }
    
    
    function checkplugrefresh() {
        if (0===$("#removedcheck").length) {
            displayMeh();
        }
    }
    
    
    //remove style="display: block;" that sometimes happens cuz plug
    //how about $().css("display", "none")
    setTimeout(function () {
        $("#dialog-container").attr("style","");
    }, 5000);
    
    if (isNaN(parseInt(localStorage["iplug|autowootdelaymin"]))) {
        localStorage["iplug|autowootdelaymin"] = 0;
    }
    if (isNaN(parseInt(localStorage["iplug|autowootdelaymax"]))) {
        localStorage["iplug|autowootdelaymax"] = 0;
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
    
    $(window).bind("mousemove", function (event) {
        mouseX = event.pageX;
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
    $(".app-right").append('<div id="iplug-menu" style="display: none"> <div class="header"><span class="title">iPlug Menu</span> <div class="divider"></div> </div> <div id="iplug-menu-container"> <div class="iplug-menu-autowoot iplug-container"> <div id="autowoot" class="subcontainer"><i class="iplug-collapse icon icon-arrow-up" style="text-indent: 0px"></i> <div id="autowootenabled" class="item item-iplug"> <i class="icon icon-check-blue" style="display: ' + localStorage['iplug|autowootenabled'] + '"></i> <span class="subtitle">Autowoot</span> </div> <div id="autowootdelay" class="iplug-menu-autowoot-delay slider">' + { block: ' <div class="titlecontainer min"><span class="title">Autowoot Minimum Delay (Seconds)</span><span class="value">' + ((localStorage['iplug|autowootdelaymin'] / 10).toFixed(1)) + 's</span> </div> <div class="titlecontainer max"><span class="title" style="display: inline">Autowoot Maximum Delay (Seconds)</span><span class="value" style="display: inline">' + ((localStorage["iplug|autowootdelaymax"] / 10).toFixed(1)) + 's</span> </div>', none: ' <div class="titlecontainer min"><span class="title">Autowoot Delay (Seconds)</span><span class="value">' + ((localStorage['iplug|autowootdelaymin'] / 10).toFixed(1)) + 's</span> </div> <div class="titlecontainer max"><span class="title" style="display: none"></span><span class="value" style="display: none">' + ((localStorage['iplug|autowootdelaymax'] / 10).toFixed(1)) + 's</span> </div>'}[localStorage['iplug|autowootdelayrandom']] + ' <div class="counts"> <span class="count">0s</span> <span class="count">10s</span> <span class="count">20s</span> <span class="count">30s</span><span class="stretch"></span> </div> <div class="barcontainer"> <div class="bar background"></div> <div class="bar selected" style="left: ' + (7 + parseInt(localStorage['iplug|autowootdelaymin'])) + 'px; width: ' + (parseInt(localStorage['iplug|autowootdelaymax']) - parseInt(localStorage['iplug|autowootdelaymin'])) + 'px"></div> <div class="hit"></div> <div class="circle circlefirst" style="left: ' + localStorage['iplug|autowootdelaymin'] + 'px;"></div> <div class="circle circlesecond" style="left: ' + localStorage['iplug|autowootdelaymax'] + 'px;"></div> </div> </div> <div id="autowootdelayrandom" class="item item-iplug"> <i class="icon icon-check-blue" style="display: ' + localStorage['iplug|autowootdelayrandom'] + '"></i> <span>Advanced Autowoot Timing</span> </div> </div> <div id="visuals" class="subcontainer"><i class="iplug-collapse icon icon-arrow-up" style="text-indent: 0px"></i> <div class="noitem"><span class="subtitle">Visual Options</span></div> <div id="youtubevideodisabled" class="item item-iplug"><i class="icon icon-check-blue" style="display: ' + localStorage['iplug|youtubevideodisabled'] + '"></i><span>Hide Youtube Video</span> </div> <div id="curatedisabled" class="item item-iplug"><i class="icon icon-check-blue" style="display: ' + localStorage['iplug|curatedisabled'] + '"></i><span>Hide Vote Buttons</span> </div> <div id="waitlistdisabled" class="item item-iplug"><i class="icon icon-check-blue" style="display: ' + localStorage['iplug|waitlistdisabled'] + '"></i><span>Hide Waitlist Join Button</span> </div> <div id="audiencedisabled" class="item item-iplug"><i class="icon icon-check-blue" style="display: ' + localStorage['iplug|audiencedisabled'] + '"></i><span>Hide Audience</span> </div> <div id="djdisabled" class="item item-iplug"><i class="icon icon-check-blue" style="display: ' + localStorage['iplug|djdisabled'] + '"></i><span>Hide DJ</span> </div> </div> <div id="misc" class="subcontainer"><i class="iplug-collapse icon icon-arrow-up" style="text-indent: 0px"></i> <div class="noitem"><span class="subtitle">Misc Options</span> </div> <div id="autojoinenabled" class="item item-iplug"> <i class="icon icon-check-blue" style="display: ' + localStorage['iplug|autojoinenabled'] + '"></i> <span>Autojoin</span> </div> <div id="bigtxtenabled" class="item item-iplug"> <i class="icon icon-check-blue" style="display: ' + localStorage['iplug|bigtxtenabled'] + '"></i> <span>Alternative Level Indicator</span> </div> </div> </div> </div>');
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
            case "autowootdelayrandom":
                if (enabled) {
                    $("#autowootdelay > .titlecontainer.max >").attr("style", "display: inline");
                    $("#autowootdelay > .titlecontainer.min > .title").html("Autowoot Minimum Delay (seconds)");
                    $("#autowootdelay > .titlecontainer.max > .title").html("Autowoot Maximum Delay (seconds)");
                } else {
                    var average = Math.floor((parseInt(localStorage["iplug|autowootdelaymax"]) + parseInt(localStorage["iplug|autowootdelaymin"])) / 2);
                    localStorage["iplug|autowootdelaymax"] = average;
                    localStorage["iplug|autowootdelaymin"] = average;
                    $("#autowootdelay > .titlecontainer > .value").html((average / 10).toFixed(1) + "s")
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
        })[0]
        var victim;
        if (localStorage['iplug|' + $(this).parent().parent().attr("id") + 'random'] == "block") {
            victim = closest;
        } else {
            victim = $(this).parent().children(".circle");
        }
        //dragging = true;
        //drag(victim, $(this).parent().children(".bar.selected"), $(this).parent().children(".circlefirst"), $(this).parent().children(".circlesecond"), $(this).parent().parent().children(".titlecontainer.min").children(".value"), $(this).parent().parent().children(".titlecontainer.max").children(".value"), mouseX, mousepos - 6, $(this).parent().parent().attr("id"));
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
                    setTimeout(function() {lol.css("height", "")}, 0);;
                }
            }
        }).parent().animate({
            height: newheight
        }, {
            duration: 750
        });
    });
    
    
    
}());
