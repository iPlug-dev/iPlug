chrome.runtime.onUpdateAvailable.addListener(function(details) {
  console.log("updating to version " + details.version);
  broadcast("updateChannel", 2);
});
var ports = [];
var portsID = [];

chrome.tabCapture.capture({
	audio: true,
	video: false
}, function(a) {
	console.log(a);
});

chrome.runtime.onConnect.addListener(function(port) {
  var ID = Math.floor(Math.random() * 1900);
  ports.push(port);
  portsID.push(ID);
  port.onDisconnect.addListener(function() {
    for (var i = 0;i < portsID.length;i++) {
      if (portsID[i] == ID) {
        portsID.splice(i, 1);
        ports.splice(i, 1);
      }
    }
  });
  
  if (port.name == "updateChannel") {
    port.onMessage.addListener(function(msg) {
      if (msg == "debug") {
        port.postMessage(port);
      } else {
        chrome.runtime.requestUpdateCheck(function(status) {
          if (status == "update_available") {
            broadcast(port.name, 1);
            console.log("Update pending...");
          } else if (status == "no_update") {
            broadcast(port.name, 0);
            console.log("No update found");
          } else if (status == "throttled") {
            broadcast(port.name, -1);
            console.log("Slow down!");
          }
        });
      }
    });
  }
  
});
function broadcast(channelName, data) {
  for (var i = 0;i < ports.length;i++) {
    if (ports[i].name == channelName) {
      ports[i].postMessage(data);
    }
  }
}