(function () {
    "use strict";
    var version = "0.0.1";
    
    API.on(API.ADVANCE, function(){
        setTimeout(function(){
            $("#woot").click();
            $(".is-wait").click();
        },5000);
    });
    
}());
