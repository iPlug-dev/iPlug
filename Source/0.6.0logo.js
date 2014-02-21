code = (function() {
    
    var iPlug = {};
    iPlug.plug3check = function () {
        if (typeof plugCubed == "undefined") {
            setTimeout(iPlug.plug3check, 10000);
            return;
        }
        console.log("[iPlug]: Plug³ detected!");
        console.log("[iPlug]: Moving UI");
        setTimeout(function () {
            $("#room-bar").css('left', '162px');
            console.log("[iPlug]: UI moved!");
        }, 8000);
    };
    setTimeout(iPlug.plug3check, 10000);
    $("#plug-dj").after("<div id='iplug-menu-icon'><i id='iplug-menu-plug'></i><i class='iplug-logo'></i></div>");

    //put all code here
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
}());
