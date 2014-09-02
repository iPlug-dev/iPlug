(function () {
    "use strict";
    if (typeof(window.iPlugDebug) != "boolean") window.iPlugDebug = false;
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
    $("body").append("<div id='iplug-overlay' style='display:none;'></div>");
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
        if (window.iPlugDebug){console.log(users, $("#list-filter-input").val());}
        users = users.filter(function(user) {return -1 != user.username.toLowerCase().indexOf($("#list-filter-input").val().toLowerCase());});
        if (window.iPlugDebug){console.log(users);}
        for (i = 0; i < users.length; i++) {
            $($(".user > .name")[i]).parent().append(["<i class='icon icon-woot' style='background-position: -174px -280px'></i>", "", "<i class='icon icon-woot'></i>"][users[i].vote + 1] + "<div class='leveldisplay' style='left:30px; height: 30px; width: 46px'><span class='name' style='top: 7px; margin-left: auto; margin-right: auto; color: #eee; font-size: 10px'>lvl" + users[i].level + "</span></div>");
        }
    }
    
    function version() {
        var v;
        var reqID = Math.random().toString();
        var fetchResponse = new CustomEvent('checkVersion', {
            "detail": {
                "reqID": reqID
            }
        });
        document.addEventListener('checkedVersion-' + reqID, function respListener(e) {
            if (e.detail.reqID == reqID) {
                document.removeEventListener('checkedVersion-' + reqID, respListener);
                v = e.detail.updated;
            }
        });
        document.dispatchEvent(fetchResponse);
        return v;

    };
    
    if(version){
        setTimeout(function(){
            $('#iplug-overlay').css('display', 'block');
            alert("iPlug has been updated!\n\nNext update: fix this alert!\nNext update: working menu!");
            $('#iplug-overlay').css('display', 'none');
        }, 5000);
    }
    
}());
