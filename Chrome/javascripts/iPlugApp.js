(function () {
    
    console.log("[iPlug]: Loading more scripts...");
    
    $.getScript("https://raw.github.com/L0laapk3/iPlug/master/Source/scriptlistx.js")
            .fail(function () {
            console.error("[iPlug]: Loading more scripts finished with error!");
        });
        
        
    var version = "0.6.0";
    
    
    if (localStorage['iPlug|version'] != version) {
        localStorage['iPlug|version'] = version;
        localStorage['iPlug|updated'] = true;
    } else {
        localStorage['iPlug|updated'] = false;
    }
}());
