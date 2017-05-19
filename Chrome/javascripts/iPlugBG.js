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
        case "checkImageHeaders":
            try {
                checkImageHeaders(request.url, function(isImage) {
                    sendResponse({isImage: isImage});
                });
            } catch(ex) {
                sendResponse({isImage: false});
            }
            break;
        case "pullToForeground":
            chrome.tabs.update(sender.tab.id, {selected: true});
            console.log("HI!!!" + sender.tab.id);
            break;
        case "createNotification":
            request.options.type = chrome.notifications.TemplateType[request.options.type];
            chrome.notifications.create(request.options, function(id) {
                allNotifications.push({
                    notid: id,
                    tabid: sender.tab.id
                });
            });
            focusChrome = sendResponse;
            break;
        case "clearAllNotifications":
            allNotifications.forEach(function(not) {
                chrome.notifications.clear(not.notid);
            });
            break;
    	default:
    		console.error("wtf, unknown request '" + request.type + "'\nsender:", sender, "\nrequest:", request);
    }

    return true; //async support for sendResponse
});

var focusChrome;
var allNotifications = [];
chrome.notifications.onClicked.addListener(function(nootid) {
    focusChrome();
    chrome.tabs.update(allNotifications.find(function(a) { return a.notid = nootid; }).tabid, {selected: true});
});
chrome.notifications.onClosed.addListener(function(nootid) {
    allNotifications = allNotifications.filter(function(a) {
        return a.notid = nootid;
    });
});


/*
var isMutedBecauseOfYoutube = false;
chrome.tabs.query({audible: true, url: "*://*.youtube.com/*"}, function(response) {
    if (isMutedBecauseOfYoutube ^ !!response.length) {
        isMutedBecauseOfYoutube = !isMutedBecauseOfYoutube;
    }
});
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo) {
    if (isMutedBecauseOfYoutube ^ changeInfo.) {
        isMutedBecauseOfYoutube = !isMutedBecauseOfYoutube;
    }
});*/





function checkImageHeaders(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('HEAD', url);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            callback(/^Content-Type: image/im.test(xhr.getAllResponseHeaders()));
        }
    };
    xhr.send(null);
}


function getRealImage(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            var match = xhr.response.match(/[^'"]*(?:image\.prnt|\/i\.imgur|i\.gyazo\.com\/(?!thumb)|cloudfront.net\\\/images\\\/(?!default))[^'"]*/);
            callback(match && match[0].replace(/\\\//g, "/") || url);
        }
    };
    xhr.send();
}