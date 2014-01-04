function init() {
    if ($('#audience').length > 0) {
        if (document.location.pathname == "/") return; //Only one instance of plug at a time.
        console.log("[iPlug]: Loading script...");
        $.getScript(chrome.extension.getURL("javascripts/iPlugApp.js"))
            .done(function (script, status, statusid) {
            console.log("[iPlug]: Script loaded!");
        })
            .fail(function () {
            console.warn("[iPlug]: Script failed to load!");
        });
    } else {
        setTimeout(init, 250);
    }
}
init();
