chrome.runtime.onUpdateAvailable.addListener(function(details) {
    console.log("updating to version " + details.version);
});

/*chrome.tabCapture.capture({
	audio: true,
	video: false
}, function(a) {
	console.log(a);
});*/

/*chrome.runtime.onConnect.addListener(function(port) {
    var ID = Math.floor(Math.random() * 1900);
    ports.push(port);
    portsID.push(ID);
    port.onDisconnect.addListener(function() {
        for (var i = 0; i < portsID.length; i++) {
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
});*/

chrome.runtime.onMessageExternal.addListener(function(request, sender, sendResponse) {
    //console.log("Sender ", sender);
    //console.log("Request", request);
    
    switch(request.type) {
    	case "getRealImage":
			try {
	    		getRealImage(request.url, function(realUrl) {
	    			sendResponse({url: realUrl});
	    		});
			} catch(ex) {
				sendResponse({url: url});
			}
    		break;
    	default:
    		console.error("wtf, unknown request '" + request.type + "'\nsender:", sender, "\nrequest:", request);
    }

    return true; //async support for sendResponse
});


function getRealImage(url, callback) {
    var xhr = new XMLHttpRequest;
    xhr.open('GET', url);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            var match = xhr.response.match(/[^'"]*(?:image\.prnt|\/i\.imgur|i\.gyazo\.com\/(?!thumb)|cloudfront.net\\\/images\\\/(?!default))[^'"]*/);
            callback(match && match[0].replace(/\\\//g, "/") || url);
        }
    };
    xhr.send();
}