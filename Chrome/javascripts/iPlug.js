document.addEventListener("KrisDontTouchMyCode", function(event) {
  var fetchResponse = new CustomEvent("KrisDontTouchMyCodeOK-" + event.detail.reqID, {"detail":{"v":getVersion(), "reqID":event.detail.reqID}});
  document.dispatchEvent(fetchResponse);
});

var scripts =  ["javascripts/sketch.min.js", 
                "javascripts/iframe_api.min.js", 
                "javascripts/socket.io-1.2.0.js", 
                "javascripts/iPlugApp.js"];

scripts.forEach(function(a,b){
        scripts[b] = chrome.extension.getURL(a);
});

function init() {
  if (typeof API !== "undefined" && API.enabled && document.getElementById("dj-button") !== null > 0 && document.getElementById("audience") !== null) {
    console.log("[iPlug]: Loading...");
    loadItall(scripts, 0);
  } else setTimeout(init, 50);
}

function loadItall(scripts, num) {
  if (num < scripts.length) {
    $.getScript(scripts[num]).done(function() {
      console.log("[iPlug]: " + (1 + num) / scripts.length * 100 + "%");
      loadItall(scripts, num + 1);
    }).fail(function() {
      console.warn("[iPlug]: Something went wrong! " + scripts[num]);
      loadItall(scripts, num + 1);
    });
  }
}


var g = document.createElement('script');
g.innerText = "(function() {var scripts = " + JSON.stringify(scripts) + ";" + init.toString() + loadItall.toString() + ' init();}());';
document.head.appendChild(g);

function getVersion() {
  var details = chrome.runtime.getManifest();
  return details.version;
}

var updateStatus = {none:0, available:1, downloaded:2, throtled:-1}, timeoutID = 0, port = chrome.runtime.connect({name:"updateChannel"});
port.onMessage.addListener(function(a) {
  clearTimeout(timeoutID);
  a == updateStatus.downloaded ? (console.log("ready to use. reload"), port.disconnect()) : a == updateStatus.throtled ? (console.log("thr"), timeoutID = setTimeout(function() {
    port.postMessage();
  }, 1E3)) : a == updateStatus.available ? (alert("iPlug update found"), console.log("ye")) : a == updateStatus.none && (console.log("none"), timeoutID = setTimeout(function() {
    port.postMessage();
  }, 3E4));
});
