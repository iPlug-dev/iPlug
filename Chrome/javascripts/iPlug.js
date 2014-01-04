function init() {
    if ($('#audience').length > 0) {
        if (document.location.pathname == "/" || $('.plugPlus').length > 0) return; //Only one instance of plug at a time.
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
