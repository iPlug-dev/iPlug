/* Loader */
function loader() {
    if (typeof requirejs !== 'undefined' && typeof API !== "undefined" && API.enabled && document.getElementById("dj-button") !== null && document.getElementById("audience") !== null) {
        console.log("\n  ██╗██████╗ ██╗     ██╗   ██╗ ██████╗ \n  ╚═╝██╔══██╗██║     ██║   ██║██╔════╝ \n  ██╗██████╔╝██║     ██║   ██║██║  ███╗\n  ██║██╔═══╝ ██║     ██║   ██║██║   ██║\n  ██║██║     ███████╗╚██████╔╝╚██████╔╝ VER is now running!\n  ╚═╝╚═╝     ╚══════╝ ╚═════╝  ╚═════╝ ");
        $.getScript('IPLUG');
    } else setTimeout(loader, 1000);
}

var main = "javascripts/iPlugApp.js";
var s = document.createElement('script');
s.type = "text/javascript";
s.innerText = loader.toString().replace("VER", getVersion()).replace("IPLUG",chrome.extension.getURL(main)) + ' loader();';
document.head.appendChild(s);

/* Version */

document.addEventListener("VersionCheck", function(event) {
    var fetchResponse = new CustomEvent("VersionResponse", {
        detail: {
            "version": getVersion(),
            "reqID": event.detail.reqID
        }
    });
    document.dispatchEvent(fetchResponse);
});

function getVersion() {
    var details = chrome.runtime.getManifest();
    return details.version;
}

/* Updates */

var updateStatus = {
    none: 0,
    available: 1,
    downloaded: 2,
    throtled: -1
}, timeoutID = 0,
    port = chrome.runtime.connect({
        name: "updateChannel"
    });
port.onMessage.addListener(function(a) {
    clearTimeout(timeoutID);
    a == updateStatus.downloaded ? (console.log("ready to use. reload"), port.disconnect()) : a == updateStatus.throtled ? (console.log("thr"), timeoutID = setTimeout(function() {
        port.postMessage();
    }, 1E3)) : a == updateStatus.available ? (alert("iPlug update found"), console.log("ye")) : a == updateStatus.none && (console.log("none"), timeoutID = setTimeout(function() {
        port.postMessage();
    }, 3E4));
});
