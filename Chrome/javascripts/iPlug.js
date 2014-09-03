function init() {
    if ($('#audience').length > 0) {
        if (document.location.pathname == "/") {
            console.log("[iPlug]: Script will not be loaded here!");
        } else {
            document.addEventListener('KrisDontTouchMyCode', function(event) { //communication between plugin and injected script
                var currVersion = getVersion();
                var prevVersion = localStorage['version'];
                var updated = false;
                if (currVersion != prevVersion) {
                    if (typeof prevVersion == 'undefined') {
                        updated = true;
                    } else {
                        updated = true;
                    }
                    localStorage['version'] = currVersion;
                }
                var fetchResponse = new CustomEvent('KrisDontTouchMyCodeOK-'+event.detail.reqID, {"detail": {"updated": updated , "reqID": event.detail.reqID}});
                document.dispatchEvent(fetchResponse);
            });
            var scripts = [
            ];
            console.log("[iPlug]: Loading components...");
            loadItall(scripts, 0);
        }
    } else {
        setTimeout(init, 500);
    }
}

function getVersion() {
    var details = chrome.app.getDetails();
    return details.version;
}

function callback(check, num, x) {
    if (check === true) {
        console.log("[iPlug]: Loading component " + (1 + num) + "/" + x + " finished with success.");
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
init();
