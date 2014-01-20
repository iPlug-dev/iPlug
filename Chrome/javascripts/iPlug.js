function init() {
    if ($('#audience').length > 0) {
        LoadScripts();
    } else {
        setTimeout(init, 500);
    }
}
init();

function LoadScripts() {
    var scripts = [];
    var _scripts = ["javascripts/jquery-ui-1.10.3.custom.js",
    //"javascripts/socket.io.js", | plug already got it :o
    "javascripts/ddslick.js",
        "javascripts/bililiteRange.js",
        "javascripts/jquery.simulate.js",
        "javascripts/jquery.simulate.ext.js",
        "javascripts/jquery.simulate.drag-n-drop.js",
        "javascripts/jquery.simulate.key-sequence.js",
        "javascripts/jquery.simulate.key-combo.js"];
    LoadScriptsAsync(_scripts, scripts);
}

function LoadScriptsAsync(_scripts, scripts) {
    for (var i = 0; i < _scripts.length; i++) {
        loadScript(i, _scripts[i], scripts[i]);
    }
}

function loadScript(awesomenumber, src, script) {
    script = document.createElement('script');
    script.onerror = function () {
        callback(false, awesomenumber);
    };
    script.onload = function () {
        callback(true, awesomenumber);
    };
    script.src = src;
    document.getElementsByTagName('head')[0].appendChild(script);
}

function callback(check, number) {
    if (check === true) {
        console.log("[iPlug]: Loading component " + number + "/" + _scripts.length + " finished with succes.");
    } else if (check === false) {
        console.warn("[iPlug]: Loading component " + number + "/" + _scripts.length + " finished with error.");
    }
}
