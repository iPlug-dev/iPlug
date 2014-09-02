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
    $("#waitlist > .header > .divider").remove();
    $("#waitlist > .header").append("<div class='divider left'></div>");
    $("#waitlist > .header").append("<div class='divider right'></div>");
    $("#header-panel-bar").append("\
    <div id='iplug-button' class='header-panel-button'>\
        <div class='box'>\
            <i class='icon-iplug'></i>\
            <span>iPlug</span>\
        </div>\
    </div>");

    var mehupdate = false;
    var lasttimeout = 0;
    
    $("#vote").bind("DOMNodeInserted DOMNodeRemoved DOMSubtreeModified", displayMehs);
    $("#users-button, .icon-clear-input").bind("click", displayMehs);
    $("#list-filter-input").bind("keyup", displayMehs);
    
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
        $(".user > .icon-grab").attr("style", "margin-right: 30px;");
        $(".user > .name").attr("style", "left: 68px");
        $(".user > .icon-woot, .leveldisplay").remove();
        console.log(users, $("#list-filter-input").val());
        users = users.filter(function(user) {return -1 != user.username.toLowerCase().indexOf($("#list-filter-input").val().toLowerCase());});
        console.log(users);
        for (i = 0; i < users.length; i++) {
            $($(".user > .name")[i]).parent().append(["<i class='icon icon-woot' style='background-position: -174px -280px'></i>", "", "<i class='icon icon-woot'></i>"][users[i].vote + 1] + "<div class='leveldisplay' style='left:30px; height: 30px; width: 46px'><span class='name' style='top: 7px; margin-left: auto; margin-right: auto; color: #eee; font-size: 10px'>lvl" + users[i].level + "</span></div>");
        }
    }
    
    
}());
