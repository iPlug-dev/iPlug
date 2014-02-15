function init() {
    if ($('#audience').length > 0) {
        if (document.location.pathname == "/") {
            console.log("[iPlug]: Script will not be loaded here!");
        } else {
            var scripts = ["javascripts/jquery-ui-1.10.3.custom.js",
                "javascripts/attrchange.js",
                "javascripts/chosen.jquery.min.js",
                "javascripts/bililiteRange.js",
                "javascripts/jquery.simulate.js",
                "javascripts/jquery.simulate.ext.js",
                "javascripts/jquery.simulate.drag-n-drop.js",
                "javascripts/jquery.simulate.key-sequence.js",
                "javascripts/jquery.simulate.key-combo.js"];
            console.log("[iPlug]: Loading components...");
            loadItall(scripts, 0);
        }
    } else {
        setTimeout(init, 500);
    }
}

function callback(check, num, x) {
    if (check === true) {
        console.log("[iPlug]: Loading component " + (1 + num) + "/" + x + " finished with succes.");
    } else if (check === false) {
        console.warn("[iPlug]: Loading component " + (1 + num) + "/" + x + " finished with error.");
    } else {
        console.warn("[iPlug]: This should not happen. Report it.");
    }
}

function loadItall(scripts, num) {
    if (num > scripts.length) {
        return;
    } else if (num == scripts.length) {
        console.log("[iPlug]: Loading main script...");
        $.getScript(chrome.extension.getURL("javascripts/iPlugApp.js"))
            .done(function () {
            console.log("[iPlug]: Main script loaded!");
        })
            .fail(function () {
            console.warn("[iPlug]: Main script failed to load!");
        });
    } else if (num < scripts.length) {
        $.getScript(chrome.extension.getURL(scripts[num]))
            .done(function () {
            callback(true, num, scripts.length);
            loadItall(scripts, (num + 1));
        })
            .fail(function () {
            callback(false, num, scripts.length);
            loadItall(scripts, (num + 1));
        });
    }
}
if (typeof iPlugVersion != "undefined") {
    iPlugPreviousVersion = iPlugVersion;
} else {
    iPlugPreviousVersion = undefined;
}
iPlugVersion = chrome.app.getDetails().version;
init();
