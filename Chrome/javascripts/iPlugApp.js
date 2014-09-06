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
    
    
    // Uncomment = Not working preview
    //setTimeout(function () {
    //    $("#dialog-container").remove();
    //}, 5000);
    
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
    $(".app-right").append('<div id="iplug-menu" style="display: none"> <div class="header"><span class="title">iPlug Menu</span> <div class="divider"></div> </div> <div id="iplug-menu-container"> <div class="iplug-menu-autowoot iplug-container"> <div id="autowootenabled" class="item item-iplug"> <i class="icon icon-check-blue" style="display: ' + localStorage['iplug|autowootenabled'] + '"></i> <span>Enable Autowoot</span> </div> <div id="autowootdelay" class="iplug-menu-autowoot-delay slider">' + {block: ' <div class="titlecontainer min"><span class="title">Autowoot Minimum Delay (Seconds)</span><span class="value">' + ((localStorage['iplug|autowootdelaymin'] / 10).toFixed(1)) + 's</span> </div> <div class="titlecontainer max"><span class="title" style="display: inline">Autowoot Maximum Delay (Seconds)</span><span class="value" style="display: inline">' + ((localStorage["iplug|autowootdelaymax"] / 10).toFixed(1)) + 's</span> </div>',none: ' <div class="titlecontainer min"><span class="title">Autowoot Delay (Seconds)</span><span class="value">' + ((localStorage['iplug|autowootdelaymin'] / 10).toFixed(1)) + 's</span> </div> <div class="titlecontainer max"><span class="title" style="display: none"></span><span class="value" style="display: none">' + ((localStorage['iplug|autowootdelaymax']/ 10).toFixed(1)) + 's</span> </div>'}[localStorage['iplug|autowootdelayrandom']] + ' <div class="counts"> <span class="count">0s</span> <span class="count">10s</span> <span class="count">20s</span> <span class="count">30s</span><span class="stretch"></span> </div> <div class="barcontainer"> <div class="bar background"></div> <div class="bar selected" style="left: ' + (7 + parseInt(localStorage['iplug|autowootdelaymin'])) + 'px; width: ' + (parseInt(localStorage['iplug|autowootdelaymax']) - parseInt(localStorage['iplug|autowootdelaymin'])) + 'px"></div> <div class="hit"></div> <div class="circle circlefirst" style="left: ' + localStorage['iplug|autowootdelaymin'] + 'px;"></div> <div class="circle circlesecond" style="left: ' + localStorage['iplug|autowootdelaymax'] + 'px;"></div> </div> </div> <div id="autowootdelayrandom" class="item item-iplug"> <i class="icon icon-check-blue" style="display: ' + localStorage['iplug|autowootdelayrandom'] + '"></i> <span>Advanced Autowoot Timing</span> </div> <div class="spacing"></div> <div id="autojoinenabled" class="item item-iplug"> <i class="icon icon-check-blue" style="display: ' + localStorage['iplug|autojoinenabled'] + '"></i> <span>Enable Autojoin</span> </div> <div id="bigtxtenabled" class="item item-iplug"> <i class="icon icon-check-blue" style="display: ' + localStorage['iplug|bigtxtenabled'] + '"></i> <span>Alternative LVL indicator</span> </div> </div> </div></div>');
    $("#chat-button, #users-button, #waitlist-button").bind("click", function () {
        $("#iplug-button").attr("class", "header-panel-button");
        $("#iplug-menu").attr("style", "display: none");
    });
    $("#iplug-button").bind("mouseover mouseenter", function() {$("#tooltip").remove();$("body").append('<div id="tooltip" style="top: 0px; left: ' + (window.innerWidth - 120) + 'px;" class="right"><span>iPlug Menu</span><div class="corner"></div></div>');}).bind("mouseout mouseleave", function() {$("#tooltip").remove();}).bind("click", function () {
        $("#waitlist-button").trigger("click");
        $("#iplug-button").attr("class", "header-panel-button selected");
        $("#iplug-menu").attr("style", "display: block");
        $("#waitlist-button").attr("class", "header-panel-button");
        $("#waitlist").attr("style", "display: none");
    });
    
    $(".item-iplug").bind("click", checkUncheck);
    
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
            case "autowootenabled":
                break;
            case "autojoinenabled":
                break;
            case "autowootdelayrandom":
                if (enabled) {
                    $("#autowootdelay > .titlecontainer.max >").attr("style","display: inline");
                    $("#autowootdelay > .titlecontainer.min > .title").html("Autowoot Minimum Delay (seconds)");
                    $("#autowootdelay > .titlecontainer.max > .title").html("Autowoot Maximum Delay (seconds)");
                } else {
                    var average = Math.floor((parseInt(localStorage["iplug|autowootdelaymax"]) + parseInt(localStorage["iplug|autowootdelaymin"])) / 2);
                    localStorage["iplug|autowootdelaymax"] = average;
                    localStorage["iplug|autowootdelaymin"] = average;
                    $("#autowootdelay > .titlecontainer > .value").html((average/10).toFixed(1) + "s")
                    $("#autowootdelay > .titlecontainer.max >").attr("style", "display: none");
                    $("#autowootdelay > .titlecontainer.min > .title").html("Autowoot Delay (seconds)");
                    $("#autowootdelay > .barcontainer > .circle").attr("style", "left: " + localStorage["iplug|autowootdelaymin"] + "px");
                    $("#autowootdelay > .barcontainer > .bar.selected").attr("style", "left: " + (7 + parseInt(localStorage["iplug|autowootdelaymin"])) + "px; width: 0px");
                }
                break;
        }
    }
    
    
    
    
    
    $(".iplug-container > .slider > .barcontainer > .circle").bind("mousedown", function () {
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
    
    $(".iplug-container > .slider > .barcontainer > .hit").bind("mousedown", function() {
        if (dragging) {
            return;
        }
        dragging = true;
        var mousepos = Math.max(0, Math.min(300, mouseX - $(this).offset().left));
        var closest = [$(this).parent().children(".circlefirst"), $(this).parent().children(".circlesecond")].sort(function(a, b){return Math.abs(mousepos - parseInt(a.css("left"))) - Math.abs(mousepos - parseInt(b.css("left")));})[0]
        var victim;
        if (localStorage['iplug|' + $(this).parent().parent().attr("id") + 'random'] == "block") {
            victim = closest;
        } else {
            victim = $(this).parent().children(".circle");
        }
        drag(victim, $(this).parent().children(".bar.selected"), $(this).parent().children(".circlefirst"), $(this).parent().children(".circlesecond"), $(this).parent().parent().children(".titlecontainer.min").children(".value"), $(this).parent().parent().children(".titlecontainer.max").children(".value"), mouseX, mousepos - 6, $(this).parent().parent().attr("id"));
    });
    $(".iplug-container > .slider").on('mousedown', function (e) {
        var handler, doc = jQuery(document);
        e.preventDefault();
        doc.on('mousemove', handler = function (e) {
            e.preventDefault();
            // refresh your screen here
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
        min.html((values[0]/10).toFixed(1) + "s");
        max.html((values[1]/10).toFixed(1) + "s");
        if (dragging) {
            setTimeout(function () {
                drag(victim, selection, one, two, min, max, startx, original, name);
            }, 1);
        }
    }
    
    
    
}());
