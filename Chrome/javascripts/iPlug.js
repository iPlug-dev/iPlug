function init() {
    scripts = ["javascripts/jquery-ui-1.10.3.custom.js",
    //"javascripts/socket.io.js", | plug already got it :o
        "javascripts/ddslick.js",
        "javascripts/bililiteRange.js",
        "javascripts/jquery.simulate.js",
        "javascripts/jquery.simulate.ext.js",
        "javascripts/jquery.simulate.drag-n-drop.js",
        "javascripts/jquery.simulate.key-sequence.js",
        "javascripts/jquery.simulate.key-combo.js"];
    if ($('#audience').length > 0) {
        if (document.location.pathname == "/") {
            console.log("[iPlug]: Script will not be loaded!");
        } else {
            console.log("[iPlug]: Loading components...");
            for (i = 0; i <= scripts.length; i++) {
                if (i == scripts.length) {
                    console.log("[iPlug]: Loading script...");
                    $.getScript(chrome.extension.getURL("javascripts/iPlugApp.js"))
                        .done(function (script, status, statusid) {
                        console.log("[iPlug]: Script loaded!");
                    })
                        .fail(function () {
                        console.warn("[iPlug]: Script failed to load!");
                    });

                } else {
                    $.getScript(chrome.extension.getURL(scripts[i]))
                        .done(function (script, status, statusid) {
                        console.log("[iPlug]: Loading component finished with " + status + ".");
                    })
                        .fail(function () {
                        console.warn("[iPlug]: Loading component finished with " + status + ".");
                    });
                }
            }

        }
    } else {
        setTimeout(init, 500);
    }
}
init();
