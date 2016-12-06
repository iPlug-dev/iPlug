define(["iplug/plug-modules", "underscore"], function(Modules, _) {
    var w = require(Modules["w"]);
    var a = require(Modules["a"]);
    var u = require(Modules["u"]);

    var header_panel;

    for (var x in a._events["room:joining"]) {
        if (!a._events["room:joining"].hasOwnProperty(x)) continue;
        if (a._events["room:joining"][x].context.id === "header-panel-bar") {
            header_panel = a._events["room:joining"][x].context;
            break;
        }
    }

    var click_events = $._data(header_panel.$chatButton.get(0), "events")["click"];
    var chatButton;

    for (var i = 0; i < click_events.length; i++) {
        console.log(click_events[i]);
        if (click_events[i].handler.name === "bound onChatClick") {
            chatButton = click_events[i];
            break;
        }
    };

    var chat_context;

    for (var i = 0; i < a._events["ws:reconnecting"].length; i++) {
        if (a._events["ws:reconnecting"][i].context.id === "chat") {
            chat_context = a._events["ws:reconnecting"][i].context;
            break;
        }
    }

    header_panel.onChatClick = function() {
        //!this.$chatButton.hasClass("selected") && !a.chat && (this.$(".header-panel-button").removeClass("selected"), this.$chatButton.addClass("selected"), r.trigger("show:chat"))
        console.log("onChatClick");
        if (u.chat) return;
        if (!this.$chatButton.hasClass("selected")) {
            this.$(".header-panel-button").removeClass("selected");
            this.$chatButton.addClass("selected");
            a.trigger("show:chat");
        } else if (this.$chatButton.hasClass("private-chat")) {
            a.trigger("show:chat");
        } else {
            this.$chatButton.addClass("private-chat");
            a.trigger("show:privatechat");
            chat_context.hide();
        }
    }

    a.on("show:chat show:users show:waitlist show:friends", function() { //hide priv chat
        header_panel.$chatButton.removeClass("private-chat");
    });

    chatButton.handler = _.bind(header_panel.onChatClick, header_panel);

    //TODO: MOVE EMOJI CODE HERE

    //OPTION A:
    //w.onChatReceived = function(smth, smthB, smthC) { REWRITE WHOLE FUNCTION }

    //OPTION B:
    //w._onChatReceived = w.onChatReceived; // no need to check if variable is already set cuz this code won't run more than once
    //w.onChatReceived = function(smth, smthB, smthC) {
    //    DO SOMETHING WITH ARGUMENTS HERE
    //    return w._onChatReceived.call(this, smth, smthB, smthC); // or use .apply(this, [...]); 
    //}
});