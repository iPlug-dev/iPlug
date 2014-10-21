function init() {
    if (($('#audience').length >0 )&&($('#room-loader').length > 0 )) {
        if (document.location.pathname == "/") {
                    console.log("[iPlug]: Script will not be loaded here!");
                } else {
                    document.addEventListener('KrisDontTouchMyCode', function (event) { //communication between plugin and injected script
                        var fetchResponse = new CustomEvent('KrisDontTouchMyCodeOK-' + event.detail.reqID, {
                            "detail": {
                                "v": getVersion(),
                                "reqID": event.detail.reqID
                            }
                        });
                        document.dispatchEvent(fetchResponse);
                    });
                    var scripts = ["javascripts/sketch.min.js"];
                    console.log("[iPlug]: Loading components...");
                    loadItall(scripts, 0);
                }
    } else {
        setTimeout(init, 500);
    }
}

function getVersion() {
    var details = chrome.runtime.getManifest();
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


var updateStatus = {none:0, available:1, downloaded:2, throtled:-1}, timeoutID = 0, port = chrome.runtime.connect({name:"updateChannel"});
port.onMessage.addListener(function(a) {
  clearTimeout(timeoutID);
  a == updateStatus.downloaded ? (console.log("ready to use. reload"), port.disconnect();) : a == updateStatus.throtled ? (console.log("thr"), setTimeout(function() {
    port.postMessage();
  }, 1E3)) : a == updateStatus.available ? (alert("iPlug update found"), console.log("ye")) : a == updateStatus.none && (console.log("none"), timeoutID = setTimeout(function() {
    port.postMessage();
  }, 3E4));
});