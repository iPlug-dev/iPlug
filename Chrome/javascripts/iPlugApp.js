(function () {
    "use strict";
    if (typeof(window.iPlugDebug) != "boolean") window.iPlugDebug = false;
    setTimeout(function () {
        $("#dialog-container").remove();
    }, 5000);
    
    if (isNaN(parseInt(localStorage["iplug|autowootdelaymin"]))) {
        localStorage["iplug|autowootdelaymin"] = 0;
    }
    if (isNaN(parseInt(localStorage["iplug|autowootdelaymax"]))) {
        localStorage["iplug|autowootdelaymax"] = 0;
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
        setTimeout(function() {
            $("#woot").click();
        }, Math.round(10 * parseInt(localStorage["iplug|autowootdelaymin"]) + Math.random * (parseInt(10 * (localStorage["iplug|autowootdelaymax"]) - parseInt(localStorage["iplug|autowootdelaymin"]))), 0));
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
    
    
    
    $("#header-panel-bar").append("<div id='iplug-button' class='header-panel-button'><div class='box'><i class='icon-iplug'></i><span>iPlug</span></div></div>");
    $(".app-right").append('<div id="iplug-menu" style="display: none"> <div class="header"><span class="title">iPlug Menu</span> <div class="divider"></div> </div> <div id="iplug-menu-container"> <div class="iplug-menu-autowoot iplug-container"> <div id="autowootenabled" class="item item-iplug"> <i class="icon icon-check-blue" style="display: ' + localStorage['autowootenabled'] + '"></i> <span>Enable Autowoot</span> </div> <div id="autowootdelay" class="iplug-menu-autowoot-delay slider">' + {block: '<div class="titlecontainer min"><span class="title">Autowoot Minimum Delay (Seconds)</span><span class="value">' + ((localStorage["iplug|autowootdelaymin"] / 10).toFixed(1)) + 's</span> </div> <div class="titlecontainer max" style="display: block"><span class="title">Autowoot Maximum Delay (Seconds)</span><span class="value">' + ((localStorage["iplug|autowootdelaymax"] / 10).toFixed(1)) + 's</span></div>',none: '<div class="titlecontainer min"><span class="title">Autowoot Delay (Seconds)</span><span class="value">' + ((localStorage["iplug|autowootdelaymin"] / 10).toFixed(1)) + 's</span></div> <div class="titlecontainer max" style="display: block"><span class="title" style="color: #000">Autowoot Maximum Delay (Seconds)</span><span class="value" style="color: #000">' + ((localStorage["iplug|autowootdelaymax"]/ 10).toFixed(1)) + 's</span></div>'}[localStorage["iplug|autowootdelayrandom"]] + ' <div class="counts"> <span class="count">0s</span> <span class="count">10s</span> <span class="count">20s</span> <span class="count">30s</span><span class="stretch"></span> </div> <div class="barcontainer"> <div class="bar background"></div> <div class="bar selected" style="left: ' + (7 + parseInt(localStorage["iplug|autowootdelaymin"])) + 'px; width: ' + (parseInt(localStorage["iplug|autowootdelaymax"]) - parseInt(localStorage["iplug|autowootdelaymin"])) + 'px"></div> <div class="circle circlefirst" style="left: ' + localStorage["iplug|autowootdelaymin"] + 'px;"></div> <div class="circle circlesecond" style="left: ' + localStorage["iplug|autowootdelaymax"] + 'px;"></div> </div> </div> <div id="autowootdelayrandom" class="item item-iplug"> <i class="icon icon-check-blue" style="display: ' + localStorage['iplug|autowootdelayrandom'] + '"></i> <span>Advanced Autowoot Timing</span> </div> <div class="spacing"> </div> <div id="autojoinenabled" class="item item-iplug"> <i class="icon icon-check-blue" style="display: ' + localStorage['autojoinenabled'] + '"></i> <span>Enable Autojoin</span> </div> </div> </div></div>');
    $("#chat-button, #users-button, #waitlist-button").bind("click", function () {
        $("#iplug-button").attr("class", "header-panel-button");
        $("#iplug-menu").attr("style", "display: none");
    });
    $("#iplug-button").bind("click", function () {
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
                    $("#autowootdelay > .titlecontainer.max > span").attr("style", "");
                    $("#autowootdelay > .titlecontainer.min > .title").html("Autowoot Minimum Delay (seconds)");
                } else {
                    $("#autowootdelay > .titlecontainer.max > span").attr("style", "color: #000");
                    $("#autowootdelay > .titlecontainer.min > .title").html("Autowoot Delay (seconds)");
                    $("#autowootdelay > .barcontainer > .circle").attr("style", "left: " + localStorage["iplug|autowootdelaymin"] + "px");
                    $("#autowootdelay > .barcontainer > .bar.selected").css("width", "0px");
                    localStorage["iplug|autowootdelaymax"] = localStorage["iplug|autowootdelaymin"];
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
    
    if(version){
        setTimeout(function(){
            $('#iplug-overlay').css('display', 'block');
            alert("iPlug has been updated!\n\nNext update: fix this alert!\nNext update: working menu!");
            $('#iplug-overlay').css('display', 'none');
        }, 5000);
    }
}());
