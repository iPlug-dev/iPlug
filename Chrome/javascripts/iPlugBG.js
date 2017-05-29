chrome.runtime.onUpdateAvailable.addListener(function(details) {
    console.log("can update to version " + details.version);
});






//////////////////////////////
//MAIN STUFF
//////////////////////////////

var requestHandlers = [];
chrome.runtime.onMessageExternal.addListener(function(request, sender, sendResponse) {
    //console.log("Sender ", sender);
    //console.log("Request", request);
    if (!requestHandlers[request.type])
        console.error("wtf, unknown request '" + request.type + "'\nsender:", sender, "\nrequest:", request);

    requestHandlers[request.type](request, sender, sendResponse);
    
    return true; //async support for sendResponse
});


requestHandlers["update"] = function(request, sender, sendResponse) {
    chrome.runtime.requestUpdateCheck(function(status, details) {
        if (status == chrome.runtime.RequestUpdateCheckStatus.UPDATE_AVAILABLE)
            status = "update_available";
        else if (status == chrome.runtime.RequestUpdateCheckStatus.NO_UPDATE)
            status = "no_update";
        else status = "throttled";
        sendResponse(status, details);
    });
};













////////////////////////////////
//NOTIFICATIONS
////////////////////////////////


var focusChrome;
var allNotifications = [];
var hasNotificationsInited = false;
function initNotifications() {
    if (hasNotificationsInited)
        return;
    hasNotificationsInited = true;
    chrome.notifications.onClicked.addListener(function(nootid) {
        focusChrome();
        chrome.tabs.update(allNotifications.find(function(a) { return a.notid = nootid; }).tabid, {selected: true});
    });
    chrome.notifications.onClosed.addListener(function(nootid) {
        allNotifications = allNotifications.filter(function(a) {
            return a.notid = nootid;
        });
    });
}

chrome.permissions.contains({
    permissions: ['notifications']
}, function (granted) {
    if (granted)
        initNotifications();
});



requestHandlers["pullToForeground"] = function(request, sender, sendResponse) {
    chrome.tabs.update(sender.tab.id, {highlighted: true});
};
requestHandlers["requestNotificationPermission"] = function(request, sender, sendResponse) {
    if (hasNotificationsInited)
        return sendResponse({granted: true});
    chrome.permissions.request({
        permissions: ['notifications']
    }, function(granted) {
        console.log("LEEEEEETS GO: " + granted);
        if (granted)
            initNotifications();
        sendResponse({granted: granted});
    });
};
requestHandlers["createNotification"] = function(request, sender, sendResponse) {
    request.options.type = chrome.notifications.TemplateType[request.options.type];
    chrome.notifications.create(request.options, function(id) {
        allNotifications.push({
            notid: id,
            tabid: sender.tab.id
        });
    });
    focusChrome = sendResponse;
};
requestHandlers["clearAllNotifications"] = function(request, sender, sendResponse) {
    allNotifications.forEach(function(not) {
        chrome.notifications.clear(not.notid);
    });
};












/////////////////////////////
// IMAGE LOADING
/////////////////////////////

requestHandlers["getRealImage"] = function(request, sender, sendResponse) {
    try {
        getRealImage(request.url, function(realUrl) {
            sendResponse({url: realUrl});
        });
    } catch(ex) {
        sendResponse({url: url});
    }
};
requestHandlers["checkImageHeaders"] = function(request, sender, sendResponse) {
    try {
        checkImageHeaders(request.url, function(isImage) {
            sendResponse({isImage: isImage});
        });
    } catch(ex) {
        sendResponse({isImage: false});
    }
};


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








//////////////////////////////////
//MUTE ON BACKGROUND SOUNDS
//////////////////////////////////

var muteFilter = [];
var muteCallback;
requestHandlers["initAutoMute"] = function(request, sender, sendResponse) {
    if (request.disable) {
        muteFilter = [];
        updateMute();
        return;
    }
    console.log("test");
    chrome.permissions.request({
        permissions: ['tabs']
    }, function(granted) {
        if (!granted)
            return sendResponse({
                success: false
            });
        muteFilter = request.muteFilter;
        muteCallback = sendResponse;
        updateMute();
    });
};

var tabsWithSound = {};
var isMuted = false;
function updateMute() {
    var newState = Object.keys(tabsWithSound).filter(function(a) {
        console.log(a, muteFilter);
        return muteFilter.some(function(b) {
            return tabsWithSound[a] && tabsWithSound[a].indexOf(b) >= 0;
        });
    }).length > 0;
    if (isMuted == newState) return;
    console.log("updatemute", newState, isMuted);
    isMuted = newState;
    muteCallback({
        success: true,
        muted: newState
    });
}

chrome.tabs.query({audible: true}, function(tabs) {
    for (var i = 0; i < tabs.length; i++)
        tabsWithSound[tabs[i].id] = tabs[i].url;
    updateMute()
});
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    console.log("audible:", tab.audible, tab.url);
    tabsWithSound[tabId] = tab.audible ? tab.url : undefined;
    updateMute()
});
chrome.tabs.onRemoved.addListener(function(tabId) {
    if (tabsWithSound[tabId])
        tabsWithSound[tabId] = undefined;
    updateMute()
});







////////////////////////////////////
//MICHAL OLD STUFF
////////////////////////////////////
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