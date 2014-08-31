(function () {
    "use strict";
    var version = "0.0.1";
    
    API.on(API.ADVANCE, function(){
        setTimeout(function(){
            $("#woot").click();
        },5000);
    });
1
    API.on(API.WAIT_LIST_UPDATE, function(){
        $(".is-wait").click();
        setTimeout(function(){
            $(".is-wait").click();
        },5000);
    });
    
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
        $(".user > .icon-woot").remove();
        for (i = 0; i < users.length; i++) {
            console.log(users[i].username + ", " + users[i].vote);
            $(".user > .name:textEquals('" + users[i].username + "')").parent().append(["<i class='icon icon-woot' style='background-position: -174px -280px'></i>", "", "<i class='icon icon-woot'></i>"][users[i].vote + 1]);
        }
    }
    
    
}());
