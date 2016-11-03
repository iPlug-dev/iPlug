/* Loader */
function loader() {
    if (typeof requirejs !== 'undefined' && typeof API !== "undefined" && API.enabled && document.getElementById("dj-button") !== null && document.getElementById("audience") !== null) {
        console.log("\n  ██╗██████╗ ██╗     ██╗   ██╗ ██████╗ \n  ╚═╝██╔══██╗██║     ██║   ██║██╔════╝ \n  ██╗██████╔╝██║     ██║   ██║██║  ███╗\n  ██║██╔═══╝ ██║     ██║   ██║██║   ██║\n  ██║██║     ███████╗╚██████╔╝╚██████╔╝ VER is now running!\n  ╚═╝╚═╝     ╚══════╝ ╚═════╝  ╚═════╝ ");
        IPLUG
    } else setTimeout(loader, 1000);
}


var libs = ["javascripts/qrcode.min.js"];
var main = "javascripts/iPlugApp.js";


libs.forEach(function(e) {
	var script = document.createElement('script');
	script.type = "text/javascript";
	script.src = chrome.extension.getURL(e);
	document.head.appendChild(script);
});
var s = document.createElement('script');
s.type = "text/javascript";

var xhr = new XMLHttpRequest();
xhr.open("GET", chrome.extension.getURL(main), false);
xhr.send();
var MAIN = xhr.responseText;
var xhr = new XMLHttpRequest();
xhr.open("GET", chrome.extension.getURL('javascripts/menu.js'), false);
xhr.send();
var MENU = xhr.responseText.replace(/([\n\r]| (?= ))/g, "").replace(/"/g, '\\"');

s.innerHTML = loader.toString().replace("VER", getVersion()).replace("IPLUG", MAIN.replace(/__EXTENSION_ID__/g, chrome.runtime.id).replace("__MENU__", MENU).replace("___URL___", chrome.extension.getURL(""))) + ' loader();';
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
