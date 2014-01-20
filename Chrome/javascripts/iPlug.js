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
        loadScript(i, _scripts[i], scripts[i], _scripts.length);
    }
}

function loadScript(awesomenumber, src, script, x) {
    script = document.createElement('script');
    script.onerror = function () {
        callback(false, awesomenumber, x);
    };
    script.onload = function () {
        callback(true, awesomenumber, x);
    };
    script.src = chrome.extension.getURL(src);
    document.getElementsByTagName('head')[0].appendChild(script);
}

function callback(check, number, x) {
    if (check === true) {
        console.log("[iPlug]: Loading component " + number + "/" + x + " finished with succes.");
    } else if (check === false) {
        console.warn("[iPlug]: Loading component " + number + "/" + x + " finished with error.");
    }
}
