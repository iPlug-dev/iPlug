(function () {
    "use strict";
    API.on(API.ADVANCE, function(){
        setTimeout(function(){
            $("#woot").click();
        },5000);
    });
    API.on(API.WAIT_LIST_UPDATE, function(){
        $(".is-wait").click();
        setTimeout(function(){
            $(".is-wait").click();
        },5000);
    });
    
    $("#header-panel-bar").append("<div id='iplug-button' class='header-panel-button'>\
        <div class='box'>\
            <i class='icon-iplug'></i>\
            <span>iPlug</span>\
        </div>\
    </div>");

    var mehupdate = false;
    var lasttimeout = 0;
    
    
    $.expr[':'].textEquals = function (a, i, m) {
        return $(a).text().match("^" + m[3] + "$");
    };
    
    $("#vote").bind("DOMNodeInserted DOMNodeRemoved DOMSubtreeModified", displayMehs);
    $("#users-button").bind("click", displayMehs);
    
    function displayMehs() {
        displayMeh();
        clearTimeout(lasttimeout);
        lasttimeout = setTimeout(displayMeh(), 1000);
    }
    
    function displayMeh() {
        if ($("#users-button").attr("class").indexOf("selected") == -1 || $(".header > .room").attr("class").indexOf("selected") == -1 || mehupdate) {
            return;
        }
        mehupdate = true;
        setTimeout(function () {
            mehupdate = false;
        }, 0);
        $("#wootchangetracker").unbind().remove();
        var users = API.getUsers();
        console.log(users);
        $(".user > .icon-grab").attr("style", "margin-right: 30px;");
        $(".user > .name").attr("style", "left: 68px");
        $(".user > .icon-woot, .leveldisplay").remove();
        for (i = 0; i < users.length; i++) {
            console.log(users[i].username + ", " + users[i].vote);
            $(".user > .name:textEquals('" + users[i].username + "')").parent().append(["<i class='icon icon-woot' style='background-position: -174px -280px'></i>", "", "<i class='icon icon-woot'></i>"][users[i].vote + 1] + "<div class='leveldisplay' style='left:30px; height: 30px; width: 46px'><span class='name' style='top: 7px; margin-left: auto; margin-right: auto; color: #eee; font-size: 10px'>lvl" + users[i].level + "</span></div>");
        }
    }
    
    
}());
