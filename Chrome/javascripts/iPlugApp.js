(function () {
    "use strict";
    var version = "0.0.1";
    
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
    
}());
