(function () {
    var jssCode = document.createElement('script');
    jssCode.setAttribute('id', 'iPlug-javascript');
    jssCode.setAttribute('src', 'https://raw.github.com/L0laapk3/iPlug/master/Source/scriptlistx.js'); // x is here for tests
    document.body.appendChild(jssCode);
    
    $.getScript("https://raw.github.com/L0laapk3/iPlug/master/Source/scriptlistx.js")
            .done(function () {
            console.log("[iPlug]: Loading more scripts...");
        })
            .fail(function (x) {
            console.warn("[iPlug]: Loading more scripts finished with error!");
            console.warn(x);
        });
        
        
    var version = "0.6.0";
    
    
    if (localStorage['iPlug|version'] != version) {
        localStorage['iPlug|version'] = version;
        localStorage['iPlug|updated'] = true;
    } else {
        localStorage['iPlug|updated'] = false;
    }
}());
