var requireIDs = {
    a: null,
    r: null,
    s: null,
    v: null,
    c: null,
    d: null,
    e: null,
    f: null,
    i: null,
    m: null,
    g: null,
    p: null,
    z: null
};
var x;
for (var i in x = requirejs.s.contexts._.defined) {
    if (!x.hasOwnProperty(i) || !x[i]) continue;
    if (x[i] && x[i]._events && x[i]._events.notify)
        requireIDs.a = requireIDs.a === null ? i : console.warn("NOT NULL", "a", i);
    if (x[i].prototype && x[i].prototype.RowClass && x[i].prototype.className === "list room")
        requireIDs.r = requireIDs.r === null ? i : console.warn("NOT NULL", "r", i);
    if (x[i].__proto__.onElapsedChange)
        requireIDs.s = requireIDs.s === null ? i : console.warn("NOT NULL", "s", i);
    if (x[i].prototype && x[i].prototype.vote)
        requireIDs.v = requireIDs.v === null ? i : console.warn("NOT NULL", "v", i);
    if (x[i].prototype && x[i].prototype.hasOwnProperty("id") && x[i].prototype.id == "chat-suggestion")
        requireIDs.c = requireIDs.c === null ? i : console.warn("NOT NULL", "c", i);
    if (x[i].prototype && x[i].prototype.submitSuggestion && x[i].prototype.hasOwnProperty("id"))
        requireIDs.i = requireIDs.i === null ? i : console.warn("NOT NULL", "i", i);
    if (x[i] && x[i].add && x[i].init && x[i].remove && x[i].lookup && x[i].exists)
        requireIDs.e = requireIDs.e === null ? i : console.warn("NOT NULL", "e", i);
    if (x[i] && x[i].lookup && x[i].map && x[i].emojify)
        requireIDs.m = requireIDs.m === null ? i : console.warn("NOT NULL", "m", i);
    if (x[i] && x[i].getAudience && x[i]._events && x[i].findWhere)
        requireIDs.g = requireIDs.g === null ? i : console.warn("NOT NULL", "g", i);
    if (x[i] && x[i].prototype && x[i].prototype.hasOwnProperty("id") && x[i].prototype.id === "playback")
        requireIDs.p = requireIDs.p === null ? i : console.warn("NOT NULL", "p", i);
    if (x[i] && x[i].hasOwnProperty("settings"))
        requireIDs.z = requireIDs.z === null ? i : console.warn("NOT NULL", "z", i);
    if (x[i] && x[i].__proto__ && x[i].__proto__.id === "dj-booth")
        requireIDs.d = requireIDs.d === null ? i : console.warn("NOT NULL", "d", i);
    if (x[i] && x[i].__proto__ && x[i].__proto__.id === "user-rollover")
        requireIDs.f = requireIDs.f === null ? i : console.warn("NOT NULL", "f", i);
}
for (var i in requireIDs) {
    if (!requireIDs.hasOwnProperty) continue;
    if (!requireIDs[i]) console.warn("NULL", i, requireIDs[i]);
}

var gapiloaded = false;
$("head").append('<script src="https://apis.google.com/js/client.js?onload=initiate"></script>');
function initiate() {
	gapi.client.setApiKey('AIzaSyCmqEcQFgJ2RN_k_fjUCdP5m9aaitvUwvs');
	gapi.client.load('urlshortener', 'v1');
	gapiloaded = true;
}

/** 
   Copyright (C) 2013 Justin Windle, http://soulwire.co.uk 

   Modified by iPlug developers 
*/

define("sketch", [], function(){"use strict";var e = window, t = e.document;function n(e){return"[object Array]"==Object.prototype.toString.call(e)}function o(e){return"function"==typeof e}function r(e){return"number"==typeof e}function i(e){return"string"==typeof e}function u(e){return C[e]||String.fromCharCode(e)}function a(e,t,n){for(var o in t)!n&&o in e||(e[o]=t[o]);return e}function c(e,t){return function(){e.apply(t,arguments)}}function s(e){var t={};for(var n in e)t[n]=o(e[n])?c(e[n],e):e[n];return t}function l(e){function t(t){o(t)&&t.apply(e,[].splice.call(arguments,1))}function n(e){for(_=0;_<et.length;_++)B=et[_],i(B)?O[(e?"add":"remove")+"EventListener"].call(O,B,k,!1):o(B)?k=B:O=B}function r(){R(T),T=L(r),K||(t(e.setup),K=o(e.setup)),U||(t(e.resize),U=o(e.resize)),e.running&&!Y&&(e.dt=(z=+new Date)-e.now,e.millis+=e.dt,e.now=z,t(e.update),Z&&(e.retina&&(e.save(),e.scale(V,V)),e.autoclear&&e.clear()),t(e.draw),Z&&e.retina&&e.restore()),Y=++Y%e.interval}function c(){O=J?e.style:e.canvas,D=J?"px":"",Q=e.width,X=e.height,e.fullscreen&&(X=e.height=w.innerHeight,Q=e.width=w.innerWidth),e.retina&&Z&&V&&(O.style.height=X+"px",O.style.width=Q+"px",Q*=V,X*=V),O.height!==X&&(O.height=X+D),O.width!==Q&&(O.width=Q+D),K&&t(e.resize)}function l(e,t){return N=t.getBoundingClientRect(),e.x=e.pageX-N.left-(w.scrollX||w.pageXOffset),e.y=e.pageY-N.top-(w.scrollY||w.pageYOffset),e}function f(t,n){return l(t,e.element),n=n||{},n.ox=n.x||t.x,n.oy=n.y||t.y,n.x=t.x,n.y=t.y,n.dx=n.x-n.ox,n.dy=n.y-n.oy,n}function d(e){if(e.preventDefault(),G=s(e),G.originalEvent=e,G.touches)for(M.length=G.touches.length,_=0;_<G.touches.length;_++)M[_]=f(G.touches[_],M[_]);else M.length=0,M[0]=f(G,$);return a($,M[0],!0),G}function g(n){for(n=d(n),j=(q=et.indexOf(W=n.type))-1,e.dragging=/down|start/.test(W)?!0:/up|end/.test(W)?!1:e.dragging;j;)i(et[j])?t(e[et[j--]],n):i(et[q])?t(e[et[q++]],n):j=0}function p(n){F=n.keyCode,H="keyup"==n.type,tt[F]=tt[u(F)]=!H,t(e[n.type],n)}function m(n){e.autopause&&("blur"==n.type?b:y)(),t(e[n.type],n)}function y(){e.now=+new Date,e.running=!0}function b(){e.running=!1}function P(){(e.running?b:y)()}function A(){Z&&e.clearRect(0,0,e.width,e.height)}function S(){I=e.element.parentNode,_=E.indexOf(e),I&&I.removeChild(e.element),~_&&E.splice(_,1),n(!1),b()}var T,k,O,I,N,_,D,z,B,G,W,F,H,j,q,Q,X,Y=0,M=[],U=!1,K=!1,V=w.devicePixelRatio||1,J=e.type==x,Z=e.type==h,$={x:0,y:0,ox:0,oy:0,dx:0,dy:0},et=[e.element,g,"mousedown","touchstart",g,"mousemove","touchmove",g,"mouseup","touchend",g,"click",g,"mouseout",g,"mouseover",v,p,"keydown","keyup",w,m,"focus","blur",c,"resize"],tt={};for(F in C)tt[C[F]]=!1;return a(e,{touches:M,mouse:$,keys:tt,dragging:!1,running:!1,millis:0,now:0/0,dt:0/0,destroy:S,toggle:P,clear:A,start:y,stop:b}),E.push(e),e.autostart&&y(),n(!0),c(),r(),e}for(var f,d,g="E LN10 LN2 LOG2E LOG10E PI SQRT1_2 SQRT2 abs acos asin atan ceil cos exp floor log round sin sqrt tan atan2 pow max min".split(" "),p="__hasSketch",m=Math,h="canvas",y="webgl",x="dom",v=t,w=e,E=[],b={fullscreen:!0,autostart:!0,autoclear:!0,autopause:!0,container:v.body,interval:1,globals:!0,retina:!1,type:h},C={8:"BACKSPACE",9:"TAB",13:"ENTER",16:"SHIFT",27:"ESCAPE",32:"SPACE",37:"LEFT",38:"UP",39:"RIGHT",40:"DOWN"},P={CANVAS:h,WEB_GL:y,WEBGL:y,DOM:x,instances:E,install:function(e){if(!e[p]){for(var t=0;t<g.length;t++)e[g[t]]=m[g[t]];a(e,{TWO_PI:2*m.PI,HALF_PI:m.PI/2,QUATER_PI:m.PI/4,random:function(e,t){return n(e)?e[~~(m.random()*e.length)]:(r(t)||(t=e||1,e=0),e+m.random()*(t-e))},lerp:function(e,t,n){return e+n*(t-e)},map:function(e,t,n,o,r){return(e-t)/(n-t)*(r-o)+o}}),e[p]=!0}},create:function(e){return e=a(e||{},b),e.globals&&P.install(self),f=e.element=e.element||v.createElement(e.type===x?"div":"canvas"),d=e.context=e.context||function(){switch(e.type){case h:return f.getContext("2d",e);case y:return f.getContext("webgl",e)||f.getContext("experimental-webgl",e);case x:return f.canvas=f}}(),(e.container||v.body).appendChild(f),P.augment(d,e)},augment:function(e,t){return t=a(t||{},b),t.element=e.canvas||e,t.element.className+=" sketch",a(e,t,!0),l(e)}},A=["ms","moz","webkit","o"],S=self,T=0,k="AnimationFrame",O="request"+k,I="cancel"+k,L=S[O],R=S[I],N=0;N<A.length&&!L;N++)L=S[A[N]+"Request"+k],R=S[A[N]+"Cancel"+k];return S[O]=L=L||function(e){var t=+new Date,n=m.max(0,16-(t-T)),o=setTimeout(function(){e(t+n)},n);return T=t+n,o},S[I]=R=R||function(e){clearTimeout(e)},P});

/**
 Simple JavaScript Inheritance
 By John Resig http://ejohn.org/
 MIT Licensed.

 Modified by Plug DJ, Inc.
 */

define('class', [], function () {
    var e, t, n;
    e = false;
    t = /xyz/.test(function () {
        xyz
    }) ? /\b_super\b/ : /.*/;
    n = function () {};
    n.extend = function (n) {
        var r = this.prototype;

        e = true;
        var i = new this;
        e = false;

        for (var s in n) {
            if (!n.hasOwnProperty(s)) continue;
            if (typeof n[s] == "function" && typeof r[s] == "function" && t.test(n[s])) {
                i[s] = function (e, t) {
                    return function () {
                        var n = this._super;
                        this._super = r[e];
                        var i = t.apply(this, arguments);
                        this._super = n;
                        return i;
                    }
                }(s, n[s]);
            } else {
                i[s] = n[s];
            }
        }

        function Class() {
            !e && this.init && this.init.apply(this, arguments)
        }

        Class.prototype = i;
        Class.prototype.constructor = Class;
        Class.extend = arguments.callee;
        return Class;
    };
    return n;
});

define("modifications/userlists",[requireIDs.r,requireIDs.v],function(r,v){
    r.prototype.RowClass = v.extend({
        vote: function () {
            if (this.model.get('level')) {
                if (!this.$level) {
                    this.$level = $("<span>");
                }
                this.$level.removeClass().addClass("plug-level");
                this.$level.text(this.model.get('level'));
                this.$el.append(this.$level);
            } else {
                this.$level.remove();
                this.$level = undefined;
            }
            if (this.model.get('grab')) {
                if (!this.$grabIcon) {
                    this.$grabIcon = $('<i>');
                }
                this.$grabIcon.addClass('icon icon-grab');
                this.$el.append(this.$grabIcon);
            } else if (this.$grabIcon) {
                this.$grabIcon.remove();
                this.$grabIcon = undefined;
            }
            if (this.model.get('vote') !== 0) {
                if (!this.$icon) {
                    this.$icon = $('<i>');
                }
                this.$el.append(this.$icon);
                if (this.model.get('vote') === 1) {
                    this.$icon.removeClass().addClass('icon icon-woot');
                } else {
                    this.$icon.removeClass().addClass('icon icon-meh');
                }
            } else if (this.$icon) {
                this.$icon.remove();
                this.$icon = undefined;
            }
        }
    });
    return true;
});
define("modifications/chat-suggestions", ["jquery", "underscore", "utils/twitchemotes", requireIDs.i, requireIDs.c, requireIDs.m, requireIDs.g, requireIDs.e, "hbs!templates/room/chat/ChatSuggestionItem"], function(e,t,k,o,z,i,r,s,u){
    var a = z.extend({
        check: function (e, t) {
            var n = e.lastIndexOf(" @"),
                r = e.lastIndexOf(" :");
            n === -1 && (n = e.indexOf("@") === 0 ? 0 : -1);
            if (n > -1 && n > r) {
                this.type = "@", n === 0 ? this.suggestions = s.lookup(e.substr(n + 1, t)) : n > 0 && t > n + 2 && (this.suggestions = s.lookup(e.substr(n + 2, t)));
            } else {
                this.type = ":";
                var o = 2;
                r === -1 ? r = e.indexOf(":") === 0 ? 0 : -1 : o = 3, r > -1 && t - r > o && (r === 0 ? this.suggestions = i.lookup(e.substr(r + 1, t)).concat(k.lookup(e.substr(r + 1, t))) : r > 0 && t > r + o && (this.suggestions = i.lookup(e.substr(r + 2, t)).concat(k.lookup(e.substr(r + 2, t)))));
            }
        },
        iplug: false,
        updateSuggestions: function () {
            var n = this.suggestions.length;
            this.$itemContainer.html("");
            this.iplug = false;
            if (n === 0) {
                this.$el.hide(), this.index = -1;
            } else {
                var s, o, a, f = n;
                if (this.type === "@") {
                    for (s = 0; s < n; ++s) {
                        var l = r.findWhere({
                            username: this.suggestions[s]
                        });
                        if (l) {
                            var c = l.get("avatarID");
                            a = '<div class="thumb small"><i class="avi avi-' + l.get("avatarID") + '"></i></div>', o = e(u({
                                value: this.suggestions[s],
                                index: s,
                                image: a
                            })).mousedown(t.bind(this.iplugclickevent, this)).mouseenter(this.overBind);
                            var h = l.get("status");
                            h === 0 ? o.addClass("available") : h === 1 ? o.addClass("away") : h === 2 ? o.addClass("working") : h === 3 ? o.addClass("gaming") : h === 4 ? o.addClass("idle") : h === 5 && o.addClass("idle"), this.$itemContainer.append(o);
                        } else {
                            --f;
                        }
                    }
                } else {
                    for (s = 0; s < n; ++s) {
                        var x = i.map[this.suggestions[s]] ? i.map[this.suggestions[s]] : (this.iplug = true, k.map[this.suggestions[s]]);
                        a = this.iplug ? '<span class="emoji-glow"><span style="background: url(' + x + ') 0 0 no-repeat;background-size: contain;position: absolute; width: 16px; height: 16px; z-index: 1;"></span></span>' : '<span class="emoji-glow"><span class="emoji emoji-' + x + '"></span></span>';
                        o = e(u({
                            value: (!this.iplug ? ":" : "") + this.suggestions[s] + (!this.iplug ? ":" : ""),
                            index: s,
                            image: a
                        })).mousedown(t.bind(this.iplugclickevent, this)).mouseenter(this.overBind), o.addClass("emo"), this.$itemContainer.append(o);
                        if (this.iplug) e("<span>").addClass("iplug-twitch").appendTo(o);
                    }
                }
                if (this.index === -1 || this.index >= n) {
                    this.index = 0;
                }
                this.updateSelectedSuggestion(), this.$el.height(f * 38), t.delay(this.showBind, 10), t.delay(this.showBind, 15), this.$document.on("mousedown", this.documentClickBind);
            }
        },
        iplugclickevent: function (c) {
            var d = $("#chat-input-field")[0];
            this.index = c.currentTarget.dataset.index;
            c = this.type;
            var a;
            d.createTextRange ? (a = document.selection.createRange().duplicate(), a = (a.moveEnd("character", d.value.length), "" === a.text ? d.value.length : d.value.lastIndexOf(a.text))) : a = d.selectionStart;
            if (0 < a) {
                var e = d.value.substr(0, a),
                    b = e.lastIndexOf("@" === c ? " @" : " :"); - 1 === b ? b = e.indexOf("@" === c ? "@" : ":") : ++b;
                c = [b + 1, a];
            } else {
                c = void 0;
            }
            a = d.value.substr(0, c[0]);
            e = d.value.substr(c[1]);
            b = this.getSelected();
            d.value = Array.isArray(b) ? (b[1] ? a.substring(0, a.lastIndexOf(":")) : a) + b[0] + " " + e : a + b + " " + e;
            d.setSelectionRange(c[0] + b[0].length + !b[1], c[0] + b[0].length + !b[1]);
            this.reset();
            this.updateSuggestions();
            t.delay(this.refocusBind, 100);
        },
        getSelected: function () {
 return [this.suggestions[this.index] + (this.type === ":" ? this.iplug && Object.keys(k.map).indexOf(this.suggestions[this.index]) > -1 ? "" : ":" : ""), this.iplug && Object.keys(k.map).indexOf(this.suggestions[this.index]) > -1];
 }
    });
    z.prototype.check = a.prototype.check;
    z.prototype.iplugclickevent = a.prototype.iplugclickevent;
    z.prototype.iplug = a.prototype.iplug;
    z.prototype.updateSuggestions = a.prototype.updateSuggestions;
    z.prototype.getSelected = a.prototype.getSelected;
    o.prototype.submitSuggestion = function () {
        var e = this.suggestionView.type === "@" ? this.getMentionRange() : this.getEmojiRange(),
            t = this.chatInput.value.substr(0, e[0]),
            n = this.chatInput.value.substr(e[1]),
            r = this.suggestionView.getSelected();
        this.chatInput.value = Array.isArray(r) ? (r[1] ? t.substring(0, t.lastIndexOf(":")) : t) + r[0] + " " + n : t + r + " " + n;
        this.chatInput.setSelectionRange(e[0] + r[0].length + !r[1], e[0] + r[0].length + !r[1]);
        this.suggestionView.reset();
        this.suggestionView.updateSuggestions();
    };
});

define("utils/twitchemotes", function() {
    var t = {
        map: {},
        lookup: function() {return [];},
        emojify: function(e) {return e;}
    };
    $.getJSON("https://twitchemotes.com/api_cache/v2/global.json", function(x) {
        for (var i in x.emotes) {
            if (!x.emotes.hasOwnProperty(i)) continue;
            x.emotes[i] = "https:" + x.template.small.replace("{image_id}", x.emotes[i].image_id);
        }
        t.map = x.emotes;
        var o = {};
        for (var u in t.map) {
            var a = u.charAt(0);
            o[a] || (o[a] = [], o[a].longest = 0), o[a].push(u), u.length > o[a].longest && (o[a].longest = u.length)
        }
        t.lookup = function(e) {
            var t = [],
                n = e.length;
            if (n > 0 && n < 24) {
                var r = e.charAt(0).toLowerCase();
                if (o[r] && o[r].length > 0 && n < o[r].longest) {
                    var i = o[r].length;
                    while (i--) o[r][i].toLowerCase() !== e.toLowerCase() && o[r][i].toLowerCase().indexOf(e.toLowerCase()) === 0 && t.push(o[r][i])
                }
                r = r.toUpperCase();
                if (o[r] && o[r].length > 0 && n < o[r].longest) {
                    var i = o[r].length;
                    while (i--) o[r][i].toLowerCase() !== e.toLowerCase() && o[r][i].toLowerCase().indexOf(e.toLowerCase()) === 0 && t.push(o[r][i])
                }
            }
            t.length = Math.min(t.length, 10);
            t.sort();
            return t.filter(function(item, pos, self) {
                return self.indexOf(item) == pos;
            });
        };
        function replaceArray(text) {
            var replaceString = text;
            var regex;
            var keys = Object.keys(t.map);
            for (var i = 0; i < keys.length; i++) {
                regex = new RegExp("\\b" + keys[i] + "(?!.*<\\/a>)\\b", "g");
                replaceString = replaceString.replace(regex, t.map[keys[i]]);
            }
            return replaceString;
        }
        t.emojify = replaceArray;
    });
    return t;
});

define("utils/tooltip", [requireIDs.a,"class"], function(a,Class) {
    var n = Class.extend({
        show: function (text, $obj, right) {
                a.trigger("tooltip:show", text, $obj, right);
        },
        hide: function () {
                a.trigger("tooltip:hide");
        }
    });
    return new n();
});

define("utils/notify", [requireIDs.a, "class"], function(a, Class){
    var n = Class.extend({
        show: function (icon, text) {
            a.trigger("notify", icon, text);
        }
    });
    return new n();
});

define("utils/dj", ["jquery", "class", requireIDs.d, requireIDs.f], function($, Class, x, y){
    var n = Class.extend({
        click: function(){
            y.showSimple(x.image.user, {x:0,y:0});
            y.showInfo();
            $("#user-rollover").addClass("topbarskip");
        }
    });
    return new n();
});

define("alert", ["class", "jquery"], function (Class, $) {
    var n = Class.extend({
        init: function () {
            this.$el = $("<div>").attr({id: "iplug-overlay"}).css({display: "none"});
            this.$bg = $("<div>").addClass('iplug-overlay-bg');
            this.$container = $("<div>").addClass('iplug-alert');
            this.$alertFrame = $("<div>").addClass('iplug-alert-frame');
            this.$title = $("<span>").addClass('iplug-alert-frame-title');
            this.$alertBody = $("<div>").addClass('iplug-alert-body');
            this.$message = $("<span>").addClass('iplug-alert-body-message');
            this.$buttonFrame = $("<div>").addClass('iplug-alert-frame');
            this.$button = $("<div>").addClass('iplug-alert-button-submit');
            this.$buttonText = $("<span>");
            this.$button.append(this.$buttonText);
            this.$buttonFrame.append(this.$button);
            this.$alertBody.append(this.$message);
            this.$alertFrame.append(this.$title);
            this.$container.append(this.$alertFrame);
            this.$container.append(this.$alertBody);
            this.$container.append(this.$buttonFrame);
            this.$el.append(this.$bg);
            this.$el.append(this.$container);
            $("body").append(this.$el);
            var that = this;
            this.$button.click(function(){
                that.hide();
            });
        },
        show: function () {
            this.$el.css("display", "block");
        },
        hide: function () {
            this.$el.css("display", "none");
        },
        setMessage: function (title, message, buttonText) {
            this.$title.text(typeof title === "string" ? title : "");
            this.$message.text(typeof message === "string" ? message : "");
            this.$buttonText.text(typeof buttonText === "string" ? buttonText : "");
        }
    });
    return new n();
});
    
define("version", ["alert", "class"], function(alert, Class) {
    var n = Class.extend({
        init: function() {
        },
        check: function(){
            var code = Math.random.toString();
            var event = new CustomEvent("VersionCheck", {
                detail: {
                    reqID: code
                }
            });
            var that = this;
            var handler = function (data) {
                if (data.detail.reqID !== code) return;
                document.removeEventListener("VersionResponse", handler);
                if (data.detail.version !== that.getVersion()) {
                    that.setVersion(data.detail.version);
                    that.callback(data.detail.version);
                }
            };
            document.addEventListener("VersionResponse", handler);
            document.dispatchEvent(event);
        },
        setVersion: function(version) {
            localStorage["iplug|version"] = version;
        },
        getVersion: function() {
            if (typeof localStorage['iplug|version'] !== "string") {
                return localStorage['iplug|version'] = "0";
            } else {
                return localStorage['iplug|version'];
            }
        },
        callback: function(version){
            alert.setMessage("iPlug updated!", "Enjoy new version! (" + version + ")", "OK");
            alert.show();
        }
    });
    return new n();
});

define("vote", ["class"], function(Class){
    var n = Class.extend({
        init: function() {
            this.wootEl = document.getElementById("woot");
            this.mehEl  = document.getElementById("meh");
        },
        woot: function(force) { 
            if ((!force && API.getUser().vote !== 0) || !API.getMedia()) return;
            this.wootEl.click();
        },
        meh: function(force) { 
            if ((!force && API.getUser().vote !== 0) || !API.getMedia()) return;
            this.mehEl.click();
        }
    });
    return new n();
});

define("autowoot", ["class", "vote", "underscore"], function(Class, vote, _) {
    var n = Class.extend({
        init: function(){
            API.on(API.ADVANCE, _.bind(this.handler,this));
        },
        handler: function(){
            if (!this.isEnabled) return;
            _.delay(_.bind(vote.woot,vote), this.getDelay());
        },
        isEnabled: function() {
            return localStorage["iplug|autowootenabled"] === "block";
        },
        getDelay: function() {
            return Math.round(100 * parseInt(localStorage["iplug|autowootdelaymin"]) + Math.random() * (100 * parseInt((localStorage["iplug|autowootdelaymax"]) - parseInt(localStorage["iplug|autowootdelaymin"]))), 0);
        },
        setDelay: function(min, max) {
            if (min != undefined) {
                localStorage["iplug|autowootdelaymin"] = min;
            }
            if (max != undefined) {
                localStorage["iplug|autowootdelaymax"] = max;
            }
        }
    });
    return new n();
});


define("youtube-api", ["class", "jquery", "underscore", requireIDs.a], function (Class, e, t, r) {
    var n = Class.extend({
        init: function () {
            this.loading = true;
            this.loaded = false;
            e("body").append(e("<script/>").attr("src", "https://youtube.com/iframe_api"));
            t.delay(t.bind(this.check, this), 1e3);
        },
        check: function () {
            if (typeof window.YT !== "object" || typeof window.YT.Player !== "function" || !window.YT.loaded) {
                t.delay(t.bind(this.check, this), 250);
            } else {
                this.YT = window.YT;
                this.loaded = true;
                r.trigger("yt:ready");
            }
        }
    });
    return new n();
});

define("youtube-controller", ["youtube-api", requireIDs.a, "class"], function(api, EventEmmiter, Class) {
    var n = Class.extend({
        init: function($el, cid, seekTo, successCallback, failureCallback) {
            if (!api.loading || !api.loaded) return failureCallback();
            this.controls = new api.YT.Player($el[0], {
                videoId: cid,
                playerVars: {
                    start: seekTo,
                    autoplay: 0,//1,
                    cc_load_policy: 0, //subtitles
                    color: "red",
                    controls: 0,
                    disablekb: 1, //keyboard
                    fs: 0, // full screen btn
                    iv_load_policy: 3,
                    loop: 0,
                    modestbranding: 1,
                    rel: 0,
                    showinfo: 0,
                    theme: "dark"
                },
                events: {
                    'onError': failureCallback,
                    'onReady': successCallback
                }
           });
        }
    });
    return n;
});

define("modifications/playback", ["jquery", "underscore", requireIDs.s, requireIDs.z, requireIDs.p, "youtube-controller"], function(e, t, u, f, p, HTML5CONTROLLER){
    var player = p.extend({
        onVolumeChange: function() {
            var e = u.get("volume");
            try {
                this.HTML5player.controls.setVolume(e);
            }
            catch (n) {}
            try {
                var t = u.get("media");
                t && t.get("format") === 2 && this.player ? this.player.setVolume(e) : this.tx("setVolume=" + e);
            }
            catch (n) {}
        },
        loadFlash: function() {
            var n = u.get("media");
            if (n) {
                this.$noDJ.hide();
                if (!f.settings.streamDisabled) {
                    this.ignoreComplete = !0, t.delay(t.bind(this.resetIgnoreComplete, this), 1e3);
                    var i = u.get("volume"),
                        s = u.get("elapsed"),
                        o = s < 4 ? 0 : s;
                    if (n.get("format") === 1) {
                        this.buffering = !1;
                        this.yto = {
                            id: n.get("cid"),
                            volume: i,
                            seek: o,
                            quality: f.settings.hdVideo ? "hd720" : ""
                        };
                        var a = "yt";
                        window.location.origin.indexOf("//plug.dj") > -1 ? a += "" : window.location.origin.indexOf("//localhost") > -1 ? a += "local" : a += "staging";
                        var l = e('<iframe id="yt-frame" frameborder="0" src="' + window.location.protocol + "//plgyte.appspot.com/" + a + '.html"></iframe>');
                        l.load(this.ytFrameLoadedBind), this.$container.append(l);
                    }
                }
            }
        },
        onMediaChange: function() {
            this.reset(), this.$controls.removeClass("snoozed");
            var n = u.get("media");
            if (n) {
                this.$noDJ.hide();
                if (!f.settings.streamDisabled) {
                    if (n.get("format") === 1) {

                        this.$frame = e("<div>").attr({
                            id: "yt-frame",
                            frameborder: "0"
                        });

                        this.$container.append(this.$frame);

                        var fallback = t.bind(function() {
                            this.$container.empty();
                            this.loadFlash();
                        }, this);

                        var callback = function() {
                            if (!this.HTML5player.controls) {
                                fallback();
                            }
                            else {
                                this.HTML5player.controls.playVideo();
                                this.HTML5player.controls.setVolume(u.get("volume"));
                                this.HTML5player.controls.setPlaybackQuality(f.settings.hdVideo ? "hd720" : "medium");
                            }
                        };

                        this.HTML5player = new HTML5CONTROLLER(this.$frame, n.get("cid"), Math.max(0,u.get("elapsed")), t.bind(callback, this), t.bind(fallback,this));


                    }
                    /*else if (n.get("format") === 2) { stupid ass fuck damn idiot-ish soundcloud in flash cuz plug sux
                        if (d.r) {
                            if (d.sc) {
                                this.$container.empty().append(e('<iframe id="yt-frame" frameborder="0" src="' + this.visualizers[this.random.integer(0, 1)] + '"></iframe>'));
                                var c = this;
                                d.sc.whenStreamingReady(function() {
                                    if (n) {
                                        var e = d.sc.stream(n.get("cid"), {
                                            autoPlay: !0,
                                            volume: i,
                                            position: o * 1e3,
                                            whileloading: c.scLoadingBind,
                                            onfinish: c.playbackCompleteBind,
                                            ontimeout: c.scTimeoutBind
                                        });
                                        c.player = e;
                                    }
                                });
                            }
                            else {
                                this.$container.append(e('<img src="https://soundcloud-support.s3.amazonaws.com/images/downtime.png" height="271"/>').css("position", "absolute").css("left", 46));
                            }
                        else {
                            r.on("sc:ready", this.onSCReady, this);
                        }
                    }*/
                }
            }
            else this.$noDJ.show(), this.$controls.hide();
        },
        setHD: function(e) {
            var t = u.get("media");
            try {
                this.HTML5player.controls.setPlaybackQuality(e ? "hd720" : "medium");
            }
            catch (e) {}
            e ? (f.settings.hdVideo = !0, t && t.get("format") === 1 && this.tx("setPlaybackQuality=hd720"), f.save(), this.$hdLabel.text("ON")) : (f.settings.hdVideo = !1, t && t.get("format") === 1 && this.tx("setPlaybackQuality=medium"), f.save(), this.$hdLabel.text("OFF"));
        }
    });
	var img = $("#playback .background img").clone();
    $("#playback").remove(); //THIS NEEDS A BETTER SOLUTION
	setTimeout(function() {
		img.prependTo("#playback .background");
	}, 0);
    var z = new player();
    z.$el.appendTo("#room");
    z.render();
    t.bind(z.onMediaChange,z)();
});

define("processor", ["class"], function (Class) {
    var n = Class.extend({
        init: function () {
            var AudioContext = self.AudioContext || self.webkitAudioContext;
            this.ctx = new AudioContext();
            this.audio = new Audio();
            this.audio.controls = false;
            this.audio.loop = false;
            this.audio.preload = "auto";
            this.audioSrc = this.ctx.createMediaElementSource(this.audio);
            this.analyser = this.ctx.createAnalyser();
            this.volumeNode = this.ctx.createGain();
            this.audioSrc.connect(this.analyser);
            this.audioSrc.connect(this.volumeNode);
            this.volumeNode.connect(this.ctx.destination);
            //this.analyser.connect(this.ctx.destination);

            this.setFFTsize(128);
        },
        setSource: function (src) {
            this.audio.src = typeof src === "string" ? src : "";
        },
        getData: function () {
            this.analyser.getByteFrequencyData(this.frequencyData);
            return this.frequencyData;
        },
        changeVolume: function (value) {
            return this.volumeNode.gain.value = value;
        },
        setFFTsize: function (value) {
            this.analyser.fftSize = value;
            this.frequencyData = new Uint8Array(this.analyser.frequencyBinCount);
        }
    });
    return new n();
});

define("visualizations/style1/bar", ["class"], function (Class) {
    var n = Class.extend({
        init: function () {
            this.x = 0;
            this.y = 0;
            this.width = 0;
            this.height = 0;
        },
        update: function (x, y, w, h) {
            this.x = x;
            this.y = y;
            this.width = w;
            this.height = h;
        },
        draw: function (ctx) {
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    });
    return n;
});


define("star", ["class"], function(Class) {
    var n = Class.extend({
        init: function(x, y, maxSpeed) {
            this.x = x;
            this.y = y;
            this.slope = y / x;
            this.opacity = 0;
            this.speed = Math.max(Math.random() * maxSpeed, 1);
        },
        distanceTo: function(originX, originY) {
            return Math.sqrt(Math.pow(originX - this.x, 2) + Math.pow(originY - this.y, 2));
        },
        reset: function(x, y, maxSpeed) {
            this.init.apply(this, arguments);
            return this;
        }
    });
    return n;
});

define("visualizations/style1", ["class", "visualizations/style1/bar", "processor"], function (Class, Bar, Processor) {
    var n = Class.extend({
        init: function () {
            this.bars = [];
            this.barsLimit = 64;
            this.margins = [0.09, 0.15, 0.09, 0.50]; // left, top, right, bottom
            this.margins2 = [0,0,0,0];
        },
        enable: function () {
            Processor.setFFTsize(128);
            localStorage["iplug|scvisualsstyle"] = 1;
        },
        setup: function (ctx) {
            for (var i = 0; i < this.barsLimit; i++) {
                this.bars.push(new Bar());
            }
            this.onResize(ctx);
        },
        onResize: function (ctx) {
            for (var i = 0; i < 4; i++) {
                this.margins2[i] = ((i % 2 == 0) ? ctx.width : ctx.height) * this.margins[i];
            }
            this.oneBarWidth = (ctx.width - this.margins2[0] - this.margins2[2]) / this.bars.length;
            this.preHeight = (ctx.height - this.margins2[1] - this.margins2[3]);
        },
        update: function (ctx) {
            var data = Processor.getData();
            for (var i = 0; i < this.bars.length; i++) {
                var value = (1 - data[i] / 255) * this.preHeight;
                this.bars[i].update(
                    this.oneBarWidth * i + this.margins2[0],
                    this.margins2[1] + value,
                    this.oneBarWidth,
                    this.preHeight - value
                );
            }
        },
        draw: function (ctx) {
            for (var i = 0; i < this.bars.length; i++) {
                this.bars[i].draw(ctx);
            }
        }
    });
    return new n();
});

define("visualizations/style2/particle/settings", {
    SCALE: {
        MIN: 5.0,
        MAX: 25.0
    },
    ALPHA: {
        MIN: 0.8,
        MAX: 0.9
    },
    SPEED: {
        MIN: 0.2,
        MAX: 1.0
    },
    SIZE: {
        MIN: 0.2,
        MAX: 0.58
    },
    SPIN: {
        MIN: 0.001,
        MAX: 0.005
    },
    LIMIT: 75,
    FFTSize: 256 
});

define("visualizations/style2/particle", ["class", "visualizations/style2/particle/settings"], function(Class, Settings) {

    var n = Class.extend({
        init: function(ctx){ 
            this.x = Math.random() * ctx.width;
            this.y = Math.random() * ctx.height * 2;
            this.reset();
        },
        reset: function() {
            this.level = 1 + Math.floor(Math.random() * 4);
            this.scale = Settings.SCALE.MIN + (Settings.SCALE.MAX - Settings.SCALE.MIN) * Math.random();
            this.alpha = Settings.ALPHA.MIN + (Settings.ALPHA.MAX - Settings.ALPHA.MIN) * Math.random();
            this.speed = Settings.SPEED.MIN + (Settings.SPEED.MAX - Settings.SPEED.MIN) * Math.random();
            this.size  = Settings.SIZE.MIN  + (Settings.SIZE.MAX  - Settings.SIZE.MIN) * Math.random();
            this.spin  = Settings.SPIN.MIN  + (Settings.SPIN.MAX  - Settings.SPIN.MIN)  * Math.random();
            this.band  = Math.round(Math.random() * Settings.FFTSize);
            this.color = {r: 0, g: 0, b: 0}; /* TODO */
            if (Math.floor(Math.random())) {
                this.spin = -this.spin;
            }
            this.smoothedScale = 0.0;
            this.smoothedAlpha = 0.0;
            this.decayScale    = 0.0;
            this.decayAlpha    = 0.0;
            this.energy        = 0.0;
            this.rotation      = Math.random() * Math.PI * 2;
        },
        draw: function(ctx){
            var alpha = this.alpha * this.energy * 1.5;
            var power = Math.exp(this.energy);
            var scale = this.scale * power;
            this.decayScale = Math.max(this.decayScale, scale);
            this.decayAlpha = Math.max(this.decayAlpha, alpha);
            this.smoothedScale += 0.3 * (this.decayScale - this.smoothedScale);
            this.smoothedAlpha += 0.3 * (this.decayAlpha - this.smoothedAlpha);
            this.decayScale *= 0.985;
            this.decayAlpha *= 0.975;
            ctx.save();
            ctx.beginPath();
            ctx.translate(this.x + Math.cos(this.rotation * this.speed) * 250, this.y);
            ctx.rotate(this.rotation);
            ctx.scale(this.smoothedScale * this.level, this.smoothedScale * this.level);
            ctx.moveTo(this.size * 0.5, 0);
            ctx.lineTo(this.size * -0.5, 0);
            ctx.lineWidth = 1;
            ctx.lineCap = 'round';
            ctx.globalAlpha = this.smoothedAlpha / this.level;
            ctx.strokeStyle = this.color;
            ctx.stroke();
            ctx.restore();
        },
        update: function(){
            this.rotation += this.spin;
            this.y -= this.speed * this.level;
        }
    });
    return n;
});

define("visualizations/style2", ["class", "visualizations/style2/particle", "visualizations/style2/particle/settings", "processor"], function (Class, Particle, PSettings, Processor) {
    var n = Class.extend({
        init: function () {
            this.particles = [];
        },
        enable: function () {
            Processor.setFFTsize(PSettings.FFTSize);
            localStorage["iplug|scvisualsstyle"] = 2;
        },
        setup: function (ctx) {
            for (var i = 0; i < PSettings.LIMIT; i++) {
                this.particles.push(new Particle(ctx));
            }
        },
        update: function (ctx) {
            var data = Processor.getData();
            for (var i = 0; i < this.particles.length; i++) {
                this.particles[i].energy = (data[this.particles[i].band] / 255);
                this.particles[i].update();
            }
        },
        draw: function (ctx) {
            for (var i = 0; i < this.particles.length; i++) {
                var particle = this.particles[i];
                if (particle.y < -particle.size * particle.level * particle.scale * 2) {
                    this.particles[i] = new Particle(ctx);
                }
                particle.draw(ctx);
            }
        }
    });
    return new n();
});

define("visualizations/core", ["class", "sketch", "jquery", "underscore", "visualizations/style2"], function (Class, Sketch, $, _, Style1) {
    var n = Class.extend({
        init: function () {
            this.visualizations = Sketch.create({
                autopause: false,
                fullscreen: false,
                container: document.getElementById("playback"),
                setup: function () {
                    _.bind(Style1.setup, Style1)(this);
                },
                draw: function () {
                    _.bind(Style1.draw, Style1)(this);
                },
                update: function () {
                    _.bind(Style1.update, Style1)(this);
                }
            });
            Object.defineProperty(this.visualizations, "width", {
                get: function () {
                    return this.canvas.width;
                }
            });
            Object.defineProperty(this.visualizations, "height", {
                get: function () {
                    return this.canvas.height;
                }
            });
            $(window).on("resize", _.bind(this.onResize, this));
        },
        enable: function() {

        },
        disable: function() {

        },
        onResize: function () {
            console.log("!!!!");
            console.log(this);
            _.bind(Style1.onResize, Style1)(this.visualizations);
        },
        hide: function () { // _.bind(n.hide,n);
            var that = this;
            $(this.visualizations.canvas).stop(true).animate({
                opacity: "0"
            }, {
                easing: "easeOutQuint",
                duration: 2E3,
                queue: !1,
                complete: function () {
                    this.style.display = "none";
                    that.visualizations.stop();
                }
            })
        },
        show: function () { // _.bind(n.show,n);
            var that = this;
            $(this.visualizations.canvas).stop(true).animate({
                opacity: "1"
            }, {
                easing: "easeOutQuint",
                duration: 2E3,
                queue: !1,
                start: function () {
                    this.style.display = "block";
                    that.visualizations.start();
                }
            });
        }
    });
    return new n();
});


define("backgrounds", {
    youtube: {
        text: "Fullscreen Player",
        url: $("<i style='.icon-iplug'>").css("background-image").replace("iplug-button", "fullscreenplayer"),
        description: "Full hd videos :)"
    },
    standard: {
        text: "Default Background",
        url: "https://i.imgur.com/GLnuMgs.jpg",
        description: "The default plug background."
    },
    old: {
        text: "Old Default",
        url: "https://i.imgur.com/3fooiUK.jpg",
        description: "Bringing back some nostalgia for you guys :) (does anyone even remember this still at this point?)"
    },
    oldred: {
        text: "Old Red Default",
        url: "https://i.imgur.com/PccKe3J.jpg",
        description: "CookieMichal figured the old background was too boring, so he painted it red." // I hax'd it :P
    },
    newwinter: {
        text: "New Winter Theme",
        url: "https://i.imgur.com/F4Av0Bq.jpg",
        description: "winter theme."
    },
    oldwinter: {
        text: "Old Winter Theme",
        url: "https://i.imgur.com/1rsjlcn.jpg",
        description: "Oldschool winter theme."
    },
    cuttherope: {
        text: "Cute Animal",
        url: "https://i.imgur.com/KBQ4kAC.jpg",
        description: "Not at all a cut the rope rip-off."
    },
    disk: {
        text: "Shattering Disk",
        url: "https://i.imgur.com/kz2o35f.jpg",
        description: "Its a disk. Its shattered. What else can I say?"
    },
    space: {
        text: "Colorfull Space",
        url: "https://i.imgur.com/vxW19ak.jpg",
        description: "Neon Gas Space Star Stuff®"
    },
    nyan: {
        text: "Nyan Cat",
        url: "https://i.imgur.com/KI51BlB.jpg",
        description: "NYAN NYAN NYAN NYAN NYAN NYAN NYAN NYAN NYAN NYAN NYAN NYAN NYAN NYAN NYAN NYAN NYAN"
    },
    bubbles: {
        text: "Color Bubbles",
        url: "https://i.imgur.com/tHWI9vz.jpg",
        description: "Fancy bubbles in all kinds of colors."
    },
    flow: {
        text: "Flow",
        url: "https://i.imgur.com/8Uqh7uw.jpg",
        description: "Comes with fancy lens flare effect."
    },
    chess: {
        text: "Chess",
        url: "https://i.imgur.com/4QxHIjK.jpg",
        description: "B4. H2. Checkmate."
    },
    scatter: {
        text: "Scatter",
        url: "https://i.imgur.com/MzruB3v.jpg",
        description: "I wonder how long it took to render this?"
    },
    pillars: {
        text: "Pillars",
        url: "https://i.imgur.com/kqNMsJS.jpg",
        description: "This + your daily dose of dubstep = .. dubstep and a background?"
    },
    ponies1: {
        text: "Ponies",
        url: "https://i.imgur.com/a4oayk9.jpg",
        description: "Friendship is magic!"
    },
    pokemon1: {
        text: "Pokemon",
        url: "https://i.imgur.com/VDCi2Dj.jpg",
        description: "Can I touch your pokeballs?"
    },
    rainbowpaint: {
        text: "Rainbow Paint",
        url: "https://i.imgur.com/7I4x4qc.jpg",
        description: "Your favorite multicolored hemisphere."
    },
    dots: {
        text: "Equalizer Dots",
        url: "https://i.imgur.com/Om0wA52.jpg",
        description: "You can pretend that its moving to the beat if you want."
    },
    mosaic1: {
        text: "LSD Mosaic",
        url: "https://i.imgur.com/9TT9FmT.jpg",
        description: "Colors! Colors! Colors!."
    },
    fibernet: {
        text: "Fiber Net",
        url: "https://i.imgur.com/xqcShls.jpg",
        description: "That was the best name I could come up with for this image."
    },
    fading: {
        text: "Blue Fading Red Stuff®",
        url: "https://i.imgur.com/r4HNeJP.jpg",
        description: "I honestly have no clue what this is supposed to be."
    },
    subwoofer: {
        text: "Subwoofer Invasion",
        url: "https://i.imgur.com/BatiQXs.jpg",
        description: "We're all doomed!"
    },
    cassette: {
        text: "Cassette Recorder",
        url: "https://i.imgur.com/wcizXma.jpg",
        description: "Ahh the nostalgia."
    },
    street: {
        text: "Color Streets",
        url: "https://i.imgur.com/ZvMm1QJ.jpg",
        description: "Omg so fancy."
    },
    city: {
        text: "Color City",
        url: "https://i.imgur.com/JRXgnEc.jpg",
        description: "Really creative name, I know, I know."
    },
    fences: {
        text: "Rainbow Fences",
        url: "https://i.imgur.com/UZ0RIcs.jpg",
        description: "These things are fences, right? right??"
    },
    deadmau5: {
        text: "Deadmau5",
        url: "https://i.imgur.com/G4cmjg3.jpg",
        description: "Admit it, he kinda looks like mickey mouse."
    },
    farm: {
        text: "Farm",
        url: "https://i.imgur.com/p2z2wuZ.jpg",
        description: "Can't you come up with a description yourself? Don't you know how hard this is?!"
    },
    aquarium: {
        text: "Aquarium",
        url: "https://i.imgur.com/bOwQBUA.jpg",
        description: "Good luck breathing in this."
    },
    desert: {
        text: "Desert",
        url: "https://i.imgur.com/VocmM5i.jpg",
        description: "Its so hot here! Oh wait thats just because of me."
    },
    ponies2: {
        text: "Pony wubs",
        url: "https://i.imgur.com/m79sVnW.jpg",
        description: "I'm gonna love and tolerate the shit out of you."
    },
    squares: {
        text: "Squares",
        url: "https://i.imgur.com/GMrL8F0.jpg",
        description: "A square has four 90° corners and four edges, and all of the edges are the same length."
    },
    mosaic2: {
        text: "Cyan Mosaic",
        url: "https://i.imgur.com/DDkmye8.jpg",
        description: "Can you find the pattern?"
    },
    piano: {
        text: "Piano Paint",
        url: "https://i.imgur.com/n2Fx183.jpg",
        description: "Admit it, that name sounds awesome."
    },
    equalizer: {
        text: "Equalizer",
        url: "https://i.imgur.com/nz7itrX.jpg",
        description: "Wub Wub Wub Wub Wub Wub"
    },
    life: {
        text: "Music Is Life Logo",
        url: "https://i.imgur.com/jQ2VAU6.jpg",
        description: "Music is life. but is life music?"
    },
    pony3: {
        text: "Pony Planks",
        url: "https://i.imgur.com/vyhOl4D.jpg",
        description: "In case you didn't notice, its a pony painted on wooden planks. yeah. 'n stuff"
    },
    pokemon2: {
        text: "Pokemon",
        url: "https://i.imgur.com/Q0b9cTF.jpg",
        description: "Yes, I know I know we already had this one. but who cares?"
    },
    wheat: {
        text: "Wheat Field",
        url: "https://i.imgur.com/gMJeh9P.jpg",
        description: "Such wheat, many field, wow."
    },
    curve: {
        text: "Curve",
        url: "https://i.imgur.com/yhTc4hh.jpg",
        description: "Yup. Thats right. Its a curve."
    },
    dice: {
        text: "Dice",
        url: "https://i.imgur.com/nyMaggV.jpg",
        description: "I heard you liked guessing so I made this just for you <3"
    }
});

    /////////
require(["jquery","underscore","autowoot", "version", "sketch", "utils/tooltip", "utils/notify", "utils/dj", "backgrounds", "modifications/chat-suggestions", "modifications/userlists", "modifications/playback"], function($, _, Autowoot, Version, Sketch, Tooltip, Notify, Dj, backgrounds) {
    _.delay(_.bind(Version.check,Version),15000);
    "use strict";




    //-------------------------------------------- CHECK IF EXISTS -------------------------------\\


    if (isNaN(parseInt(localStorage["iplug|autowootdelaymin"]))) {
        localStorage["iplug|autowootdelaymin"] = 0;
    }
    if (isNaN(parseInt(localStorage["iplug|autowootdelaymax"]))) {
        localStorage["iplug|autowootdelaymax"] = 0;
    }
    if (isNaN(parseInt(localStorage["iplug|scvisualsbarsmin"]))) {
        localStorage["iplug|scvisualsbarsmin"] = 150;
    }
    if (isNaN(parseInt(localStorage["iplug|scvisualsbarsmax"]))) {
        localStorage["iplug|scvisualsbarsmax"] = 150;
    }
    if (isNaN(parseInt(localStorage["iplug|scvisualsstyle"]))) {
        localStorage["iplug|scvisualsstyle"] = 0;
    }
    if (undefined === backgrounds[localStorage['iplug|currentBackground']]) {
        localStorage['iplug|currentBackground'] = "standard";
    }
    if (undefined === localStorage["iplug|sccolorstring"]) {
        localStorage["iplug|sccolorstring"] = "0|255,0,0&0.25|255,255,0&0.5|0,255,0&0.75|0,255,255&1|0,0,255";
    }
    if (undefined === localStorage["iplug|decolorstring"]) {
        localStorage["iplug|decolorstring"] = "rgb(105,210,231)|rgb(27,103,107)|rgb(190,242,2)|rgb(235,229,77)|rgb(0,205,172)|rgb(22,147,165)|rgb(249,212,35)|rgb(255,78,80)|rgb(231,32,78)|rgb(12,202,186)|rgb(255,0,111)";
    }
    if (undefined === localStorage["iplug|autowootdelayrandom"]) {
        localStorage["iplug|autowootdelayrandom"] = "none";
    }
    if (undefined === localStorage["iplug|autowootenabled"]) {
        localStorage["iplug|autowootenabled"] = "block";
    }
    if (undefined === localStorage["iplug|autojoinenabled"]) {
        localStorage["iplug|autojoinenabled"] = "block";
    }
    if (undefined === localStorage["iplug|bigtxtenabled"]) {
        localStorage["iplug|bigtxtenabled"] = "none";
    }
    if (undefined === localStorage["iplug|youtubevideodisabled"]) {
        localStorage["iplug|youtubevideodisabled"] = "none";
    }
    if (undefined === localStorage["iplug|playbackborder"]) {
        localStorage["iplug|playbackborder"] = "none";
    }
    if (undefined === localStorage["iplug|curateenabled"]) {
        localStorage["iplug|curateenabled"] = "block";
    }
    if (undefined === localStorage["iplug|topwootenabled"]) {
        localStorage["iplug|topwootenabled"] = "none";
    }
    if (undefined === localStorage["iplug|topgrabenabled"]) {
        localStorage["iplug|topgrabenabled"] = "none";
    }
    if (undefined === localStorage["iplug|topmehenabled"]) {
        localStorage["iplug|topmehenabled"] = "none";
    }
    if (undefined === localStorage["iplug|topskipenabled"]) {
        localStorage["iplug|topskipenabled"] = "none";
    }
    if (undefined === localStorage["iplug|waitlistdisabled"]) {
        localStorage["iplug|waitlistdisabled"] = "none";
    }
    if (undefined === localStorage["iplug|audiencedisabled"]) {
        localStorage["iplug|audiencedisabled"] = "none";
    }
    if (undefined === localStorage["iplug|djdisabled"]) {
        localStorage["iplug|djdisabled"] = "none";
    }
    if (undefined === localStorage["iplug|scvisualsenabled"]) {
        localStorage["iplug|scvisualsenabled"] = "block";
    }
    if (undefined === localStorage["iplug|listgrabmehenabled"]) {
        localStorage["iplug|listgrabmehenabled"] = "block";
    }

    $("#playback > .background").css({
        display: (localStorage["iplug|playbackborder"] === "none") ? "block" : "none"
    });
    $("#playback").css({
        display: (localStorage["iplug|youtubevideodisabled"] === "none") ? "block" : "none"
    });
    $("#vote").css({
        display: localStorage["iplug|curateenabled"]
    });
    $("#woot").css({
        display: localStorage["iplug|topwootenabled"]
    });
    $("#grab").css({
        display: localStorage["iplug|topgrabenabled"]
    });
    $("#meh").css({
        display: localStorage["iplug|topmehenabled"]
    });
    $("#dj-button").css({
        display: (localStorage["iplug|waitlistdisabled"] === "none") ? "block" : "none"
    });
    $("#audience").css({
        display: (localStorage["iplug|audiencedisabled"] === "none") ? "block" : "none"
    });
    $("#dj-booth").css({
        display: (localStorage["iplug|djdisabled"] === "none") ? "block" : "none"
    });
    var colorscheme = localStorage["iplug|sccolorstring"].split("&");
    colorscheme.forEach(function (a, i, e) {
        e[i] = [a.split("|")[0], a.split("|")[1].split(",")];
    });
    var COLORS = localStorage["iplug|decolorstring"].split("|");
    
    
    
    
    
    //=============================================================================================================================================\\
    //=============================================================================================================================================\\
    //=============================================================================================================================================\\
    //=============================================================================================================================================\\
    //=============================================================================================================================================\\



    function JN() {
        if (localStorage["iplug|autojoinenabled"] != "block") return;
        if (tempAutoJoinDisabled) return;
        if ($("#dj-button").length > 0) {
            var t = $("#dj-button")[0];
            if ((t == $(".is-leave")[0]) || (t == $(".is-quit")[0])) return; //done
            if ((t == $(".is-full")[0]) || (t == $(".is-locked")[0])) {
                return setTimeout(JN, 500);
            }
            if (t == $(".is-wait")[0]) {
                $("#dj-button").click();
                return;
            }
        } else {
            setTimeout(JN, 1000); // object not created yet || slow pc || loll
        }
    }

    setTimeout(JN, 5000); // AUTO JOIN ON JOIN, and butter on butter is butter

    /////////

    var Sheet = function () {
        function Sheet(id) {
            this.id = typeof id == "string" ? id : 0;
            if (this.id === 0) {
                throw new Error("Incorrect id!");
            }
            var f = document.getElementById(this.id);
            this.target = f !== null ? f.tagName.toUpperCase() == "STYLE" ? f : document.createElement("style") : document.createElement("style");
            this.target.id = this.id;
            this.target.appendChild(document.createTextNode(""));
            document.head.appendChild(this.target);
            this.getRules = function () {
                return this.target.sheet.rules;
            };
            this.removeRuleByIndex = function (index) {
                var i = index < this.target.sheet.rules.length ? index : -1;
                if (i == -1) {
                    throw new Error("Incorrect index!");
                }
                if ("removeRule" in this.target.sheet) {
                    this.target.sheet.removeRule(i);
                } else {
                    if ("deleteRule" in this.target.sheet) {
                        this.target.sheet.deleteRule(i);
                    }
                }
            };
            this.replaceRule = function (selector, rule, index) {
                var i = "number" == typeof index ? index : 0;
                this.removeRuleByName(selector, rule.substring(0, rule.indexOf(":")));
                this.addRule(selector, rule, index);
            };
            this.removeRulesBySelector = function (selector) {
                var k = "string" == typeof selector ? selector : -1;
                if (-1 == k) {
                    throw new Error("Incorrect selector!");
                }
                for (var i = this.target.sheet.rules.length; i >= 0; i--) {
                    this.target.sheet.rules[i.toString()].selectorText.trim() == selector.trim() && this.removeRuleByIndex(i);
                }
            };
            this.removeRuleByName = function (selector, ruleName) {
                var k = "string" == typeof selector ? selector : -1,
                    l = "string" == typeof ruleName ? ruleName : -1;
                if (-1 == k) {
                    throw new Error("Incorrect selector!");
                }
                if (-1 == l) {
                    throw new Error("Incorrect rule name!");
                }
                for (var i = this.target.sheet.rules.length; i >= 0; i--) {
                    try {
                        if (this.target.sheet.rules[i.toString()].selectorText == k)
                            if (this.target.sheet.rules[i.toString()].style.cssText.substring(0, this.target.sheet.rules[i.toString()].style.cssText.indexOf(":")).trim() == l.trim())
                                this.removeRuleByIndex(i);
                    } catch (f) {}
                }
            };
            this.addRule = function (selector, rule, index) {
                var i = "number" == typeof index ? index : 0;
                "insertRule" in this.target.sheet ? this.target.sheet.insertRule(selector + "{" + rule + "}", i) : "addRule" in this.target.sheet && this.target.sheet.addRule(selector, rule, i);
            };
        }
        return Sheet;
    }();


    window.CustomStyles = new Sheet("iplug-custom-styles");
    CustomStyles.changeBackground = function (URL) {
        this.replaceRule("#room > i.room-background", "background: url(" + URL + ") !important");
    };
    CustomStyles.defaultBackground = function () {
        this.removeRuleByName("#room > i.room-background", "background");
    };
    CustomStyles.fullscreenPlayback = function () {
        this.replaceRule(".custom1", "position: fixed !important");
        this.replaceRule(".custom1", "top: " + $("#room-meta").css("height") + " !important");
        this.replaceRule(".custom1", "left: 0 !important");
        this.replaceRule(".custom1", "width: " + $("#room-meta").css("width") + " !important");
        this.replaceRule(".custom1", "height : " + $("#room > div.app-right").css("height") + " !important");
    };
    CustomStyles.normalPlayback = function () {
        this.removeRulesBySelector(".custom1");
    };




    /////////////////
    var VisualizationsHelper = {};

    VisualizationsHelper.currentRoom = window.location.href;
    VisualizationsHelper.initVolume = function () {
        var volume;
        try {
            volume = API.getVolume();
        } catch (f) {}
        if (!isFinite(volume / 100)) {
            return setTimeout(VisualizationsHelper.initVolume, 500);
        } else {
            try{
                Visualizations.setVolume(volume / 100);
            } catch (err) {}
        }
    };
    VisualizationsHelper.visible = false;
    VisualizationsHelper.initVolume();
    VisualizationsHelper.hide = function () {
        $("#iplug-playback").stop(true).animate({
            opacity: "0"
        }, {
            easing: "easeOutQuint",
            duration: 2E3,
            queue: !1,
            step: function (now) {
                VisualizationsHelper.opacity = now;
            },
            complete: function () {
                this.style.display = "none";
                Visualizations.stop();
                VisualizationsHelper.visible = !1;
            }
        });
    };
    VisualizationsHelper.show = function () {
        $("#iplug-playback").stop(true).animate({
            opacity: "1"
        }, {
            easing: "easeOutQuint",
            duration: 2E3,
            queue: !1,
            step: function (now) {
                VisualizationsHelper.opacity = now;
            },
            start: function () {
                this.style.display = "block";
                Visualizations.start();
                VisualizationsHelper.visible = !0;
            }
        });
    };
    VisualizationsHelper.opacity = 1;
    VisualizationsHelper.location = $("#playback-container").parent()[0];



    /*           INIT HERE              */

    var ALPHA, AudioAnalyser, COLORS, MP3_PATH, NUM_BANDS, NUM_PARTICLES, Particle, SCALE, SIZE, SMOOTHING, SPEED, SPIN, NUM_BARS, NUM_STARS;
    NUM_STARS = 100;
    NUM_BARS = 64; // INIT only
    NUM_PARTICLES = 75; // cuz small area eh
    NUM_BANDS = 256;
    SMOOTHING = 0.6; // was 0.5
    MP3_PATH = ""; // init
    SCALE = {
        MIN: 5.0,
        MAX: 25.0
    };
    SPEED = {
        MIN: 0.2,
        MAX: 1.0
    };
    ALPHA = {
        MIN: 0.8,
        MAX: 0.9
    };
    SPIN = {
        MIN: 0.001,
        MAX: 0.005
    };
    SIZE = {
        MIN: 0.2,
        MAX: 0.85
    };
    COLORS = ['#69D2E7', '#1B676B', '#BEF202', '#EBE54D', '#00CDAC', '#1693A5', '#F9D423', '#FF4E50', '#E7204E', '#0CCABA', '#FF006F'];
    AudioAnalyser = (function () {
        AudioAnalyser.AudioContext = self.AudioContext || self.webkitAudioContext;

        AudioAnalyser.enabled = AudioAnalyser.AudioContext !== null;

        function AudioAnalyser(audio, numBands, smoothing) {
            var src;
            this.audio = audio !== null ? audio : new Audio();
            this.numBands = numBands !== null ? numBands : 256;
            this.smoothing = smoothing !== null ? smoothing : 0.3;
            if (typeof this.audio === 'string') {
                src = this.audio;
                this.audio = new Audio();
                this.audio.controls = false;
                this.audio.src = src;
                this.audio.loop = false;
                this.audio.preload = "auto";
            }
            this.context = new AudioAnalyser.AudioContext();
            this.jsNode = this.context.createScriptProcessor(2048, 1, 1);
            this.analyser = this.context.createAnalyser();
            this.analyser.smoothingTimeConstant = this.smoothing;
            this.analyser.fftSize = this.numBands * 2; //to change analyser.fftSize = <smth> * 2; bands = new Uint8Array(analyser.frequencyBinCount);
            this.bands = new Uint8Array(this.analyser.frequencyBinCount);
            this.gainNode = this.context.createGain();
            this.gainNode2 = this.context.createGain();
            this.canPlayCalled = false;
            this.audio.addEventListener('canplay', (function (_this) {
                return function () {
                    if (this.canPlayCalled) return;
                    this.canPlayCalled = true;
                    _this.source = _this.context.createMediaElementSource(_this.audio);
                    _this.source.connect(_this.gainNode2); // passing source to analyser
                    _this.gainNode2.connect(_this.analyser);
                    _this.gainNode2.gain.value = 0.75;
                    _this.analyser.connect(_this.jsNode); // analyser
                    _this.jsNode.connect(_this.context.destination); // analyser
                    _this.source.connect(_this.gainNode); // passing source to gain node (volume)
                    _this.gainNode.connect(_this.context.destination); // it is now playing audio (output)
                    return _this.jsNode.onaudioprocess = function () {
                        _this.analyser.getByteFrequencyData(_this.bands);
                        if (!_this.audio.paused) {
                            return typeof _this.onUpdate === "function" ? _this.onUpdate(_this.bands) : void 0;
                        }
                    };
                };
            })(this));
        }
        AudioAnalyser.prototype.start = function () {
            return this.audio.play();
        };

        AudioAnalyser.prototype.stop = function () {
            return this.audio.pause();
        };
        return AudioAnalyser;

    })();

    CanvasRenderingContext2D.prototype.corners = {
        top_left: 1,
        top_right: 2,
        bottom_left: 4,
        bottom_right: 8
    };
    CanvasRenderingContext2D.prototype.roundedImage = function(img, x, y, width, height, radius) {
    this.save();
    this.beginPath();
    this.moveTo(x + radius, y);
    this.lineTo(x + width - radius, y);
    this.quadraticCurveTo(x + width, y, x + width, y + radius);
    this.lineTo(x + width, y + height - radius);
    this.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    this.lineTo(x + radius, y + height);
    this.quadraticCurveTo(x, y + height, x, y + height - radius);
    this.lineTo(x, y + radius);
    this.quadraticCurveTo(x, y, x + radius, y);
    this.closePath();
    this.clip();
    this.drawImage(img, x, y, width, height);
    this.restore();
    };
    CanvasRenderingContext2D.prototype.roundRect = function (x, y, width, height, radius, fill, stroke, corners) {
        if (typeof stroke == "undefined") {
            stroke = true;
        }
        if (typeof radius === "undefined") {
            radius = 5;
        }
        this.beginPath();
        if (corners & this.corners.top_left) {
            this.moveTo(x + radius, y);
        } else {
            this.moveTo(x, y);
        }
        if (corners & this.corners.top_right) {
            this.lineTo(x + width - radius, y);
            this.quadraticCurveTo(x + width, y, x + width, y + radius);
        } else {
            this.lineTo(x + width, y);
        }
        if (corners & this.corners.bottom_right) {
            this.lineTo(x + width, y + height - radius);
            this.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        } else {
            this.lineTo(x + width, y + height);
        }
        if (corners & this.corners.bottom_left) {
            this.lineTo(x + radius, y + height);
            this.quadraticCurveTo(x, y + height, x, y + height - radius);
        } else {
            this.lineTo(x, y + height);
        }
        if (corners & this.corners.top_left) {
            this.lineTo(x, y + radius);
            this.quadraticCurveTo(x, y, x + radius, y);
        } else {
            this.lineTo(x, y);
        }
        this.closePath();
        if (stroke) {
            this.stroke();
        }
        if (fill) {
            this.fill();
        }
    };


    var Bar;
    Bar = (function () {
        function Bar() {
            this.x = 0;
            this.y = 0;
            this.width = 0;
            this.height = 0;
            this.bar_width = 0.75;
        }

        // Bar.update(ctx.canvas.width / data.length, ctx.canvas.height, data[i]/255, i, margin_top, margin_left);

        Bar.prototype.update = function (a, b, c, d, e, f) {
            this.x = a * d + (1 - this.bar_width) * a / 2 + f;
            this.y = (1 - c) * (b - e) + e;
            this.width = a * this.bar_width;
            this.height = b - this.y;
            return this;
        };

        Bar.prototype.toZero = function (b) {
            if (this.height < 0 || this.y > b) {
                this.y = b;
                this.height = b - this.y;
            } else if (this.y < b) {
                this.y += 0.031 * b;
                this.height = b - this.y;
            }
        };

        Bar.prototype.draw = function (ctx) {
            return ctx.roundRect(this.x,
                this.y,
                this.width,
                this.height,
                this.width / 2,
                true,
                false,
                ctx.corners.top_left | ctx.corners.top_right);
        };
        return Bar;
    })();


    var Star = (function () {
        function Star(width, height) {
            this.reset(width, height);
        }
        Star.prototype.reset = function (width, height) {
            this.x = width * (12 * Math.random() - 6);
            this.y = height * (12 * Math.random() - 6);
            this.px = 0;
            this.py = 0;
            this.z = 12;
        };
        Star.prototype.move = function (px, py, z) {
            this.px = px;
            this.py = py;
            this.z = z;
        };
        return Star
    })();

    Particle = (function () {
        function Particle(x, y) {
            this.x = x !== null ? x : 0;
            this.y = y !== null ? y : 0;
            this.reset();
        }

        Particle.prototype.reset = function () {
            this.level = 1 + floor(random(4));
            this.scale = random(SCALE.MIN, SCALE.MAX);
            this.alpha = random(ALPHA.MIN, ALPHA.MAX);
            this.speed = random(SPEED.MIN, SPEED.MAX);
            this.color = random(COLORS);
            this.size = random(SIZE.MIN, SIZE.MAX);
            this.spin = random(SPIN.MAX, SPIN.MAX);
            this.band = floor(random(NUM_BANDS));
            if (random() < 0.5) {
                this.spin = -this.spin;
            }
            this.smoothedScale = 0.0;
            this.smoothedAlpha = 0.0;
            this.decayScale = 0.0;
            this.decayAlpha = 0.0;
            this.rotation = random(TWO_PI);
            return this.energy = 0.0;
        };

        Particle.prototype.move = function () {
            this.rotation += this.spin;
            return this.y -= this.speed * this.level;
        };

        Particle.prototype.draw = function (ctx) {
            var alpha, power, scale;
            power = exp(this.energy);
            scale = this.scale * power;
            alpha = this.alpha * this.energy * 1.5;
            this.decayScale = max(this.decayScale, scale);
            this.decayAlpha = max(this.decayAlpha, alpha);
            this.smoothedScale += (this.decayScale - this.smoothedScale) * 0.3;
            this.smoothedAlpha += (this.decayAlpha - this.smoothedAlpha) * 0.3;
            this.decayScale *= 0.985;
            this.decayAlpha *= 0.975;
            ctx.save();
            ctx.beginPath();
            ctx.translate(this.x + cos(this.rotation * this.speed) * 250, this.y);
            ctx.rotate(this.rotation);
            ctx.scale(this.smoothedScale * this.level, this.smoothedScale * this.level);
            ctx.moveTo(this.size * 0.5, 0);
            ctx.lineTo(this.size * -0.5, 0);
            ctx.lineWidth = 1;
            ctx.lineCap = 'round';
            ctx.globalAlpha = this.smoothedAlpha / this.level;
            ctx.strokeStyle = this.color;
            ctx.stroke();
            return ctx.restore();
        };

        return Particle;

    })();


/*
function updateColor(){
var result = [];
var grd= Visualizations.createLinearGradient(0,0,Visualizations.width,0);
localStorage["iplug|sccolorstring"].split("&").forEach(function(a){
var z = a.split("|");
z[1] = z[1].split(",");
result.push(z);
});
for (var i = 0; i < result.length; i++) {
grd.addColorStop(result[i][0], "rgb("+result[i][1][0]+","+result[i][1][1]+","+result[i][1][2]+")");
}
Visualizations.barsColor = grd;
}

    var Visualizations = Sketch.create({
        width: parseInt($("#playback-container")[0].style.width, 10),
        height: parseInt($("#playback-container")[0].style.height, 10),
        autopause: false,
        fullscreen: false,
        analyser: 0,
        particles: [],
        bars: [],
        stars: [],
        colorCycle: 0,
        img: new Image(),
        container: VisualizationsHelper.location,
        play: function () {
            return this.analyser.audio.play();
        },
        pause: function () {
            return this.analyser.audio.pause();
        },
        paused: function () {
            return this.analyser.audio.paused;
        },
        setVolume: function (value) {
            return this.analyser.gainNode.gain.value = value;
        },
        setSource: function (audio) {
            var temp = audio !== null ? audio : "";
            if (typeof temp === 'string') {
                this.analyser.audio.src = temp;
            }
        },
        addBar: function () {
            var bar = new Bar();
            this.bars.push(bar);
        },
        removeBar: function () {
            this.bars.shift();
        },
        setBars: function (n) {
            if (n === this.bars.length) return;
            while (n < this.bars.length)
                this.removeBar();
            while (n > this.bars.length)
                this.addBar();
        },
        margin_top: 0.1,
        background: "rgb(139,70,20)",
        barsColor: "rgb(0,0,0)",
        margin_left: 0.075,
        setup: function () {
            var i, particle, warning, x, y, _i, _ref;
            for (i = 0; i < NUM_STARS; i++) {
                this.stars.push(new Star(this.width, this.height));
            }
            this.setBars(NUM_BARS);
            for (i = _i = 0, _ref = NUM_PARTICLES - 1; _i <= _ref; i = _i += 1) {
                x = random(this.width);
                y = random(this.height * 2);
                particle = new Particle(x, y);
                particle.energy = random(particle.band / 256);
                this.particles.push(particle);
            }
            if (AudioAnalyser.enabled) {
                try {
                    this.analyser = new AudioAnalyser(MP3_PATH, NUM_BANDS, SMOOTHING);
                    this.analyser.onUpdate = (function (_this) {
                        return function (bands) {
                            if (localStorage["iplug|scvisualsstyle"] === "1") {
                                if (_this.analyser.analyser.fftSize !== Math.pow(2, 9)) {
                                    _this.analyser.analyser.fftSize = Math.pow(2, 9);
                                    _this.analyser.bands = new Uint8Array(_this.analyser.analyser.frequencyBinCount);
                                }
                                var _j, _len, _ref1, _results;
                                _ref1 = _this.particles;
                                _results = [];
                                for (_j = 0, _len = _ref1.length; _j < _len; _j++) {
                                    particle = _ref1[_j];
                                    _results.push(particle.energy = bands[particle.band] / 256);
                                }
                                return _results;
                            } else if (localStorage["iplug|scvisualsstyle"] === "0") {
                                if (_this.analyser.analyser.fftSize !== Math.pow(2, 7)) {
                                    _this.analyser.analyser.fftSize = Math.pow(2, 7);
                                    _this.analyser.bands = new Uint8Array(0.85 * _this.analyser.analyser.frequencyBinCount);
                                }
                                var bar;
                                _this.setBars(bands.length);
                                for (var _j = 0; _j < _this.bars.length; _j++) {
                                    bar = _this.bars[_j];
                                    bar.update((1 - _this.margin_left * 2) * _this.width / bands.length, _this.height * 2 / 3, bands[_j] / 255, _j, _this.margin_top * _this.height / 3, _this.margin_left * _this.width);
                                }
                            }
                        };
                    })(this);
                    this.analyser.start();
                } catch (_error) {
                    console.error(_error);
                }
            } else {
                return console.error("There's no Audio Analyser API");
            }
        },
        draw: function () {
            if (localStorage["iplug|scvisualsstyle"] === "1") {
                var particle, _i, _len, _ref, _results;
                this.globalCompositeOperation = 'lighter';
                _ref = this.particles;
                _results = [];
                for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                    particle = _ref[_i];
particle.move();
                    if (particle.y < -particle.size * particle.level * particle.scale * 2) {
                        particle.reset();
                        particle.x = random(this.width);
                        particle.y = this.height + particle.size * particle.scale * particle.level;
                    }
                    
                    _results.push(particle.draw(this));
                }
                return _results;
            } else if (localStorage["iplug|scvisualsstyle"] === "0") {
                this.canvas.style.background = "-webkit-radial-gradient(50% 50%, ellipse cover, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 95%),"+ this.background;
                for (var _i = 0; _i < this.stars.length; _i++) {
                    var n = this.stars[_i];
                    var xx = n.x / n.z;
                    var yy = n.y / n.z;
                    var e = 2 + 2 / n.z;
                    if (n.px !== 0) {
                        //Saturation = Math.Floor(0.105 * 500), 0.105 = Speed
                        this.strokeStyle = "hsla(" + ((this.colorCycle * i) % 360) + ", 52%, 80%, 0.5)";
                        this.lineWidth = e;
                        this.beginPath();
                        this.moveTo(xx + this.width / 2, yy + this.height / 2);
                        this.lineTo(n.px + this.width / 2, n.py + this.height / 2);
                        this.stroke();
                    }
                    n.move(xx, yy, n.z - 0.105);
                    if (n.z < 0.105 || n.px > this.width || n.py > this.height) {
                        n.reset(this.width, this.height);
                    }
                    this.colorCycle += 0.01;
                }

                var bar;
                this.save();
                this.fillStyle = this.barsColor;
                for (var _i = 0; _i < this.bars.length; _i++) {
                    bar = this.bars[_i];
                    bar.draw(this);
                }
                this.restore();
                if (this.analyser.audio.paused) {
                    for (var _i = 0; _i < this.bars.length; _i++) {
                        bar = this.bars[_i];
                        bar.toZero(this.height * 2 / 3);
                    }
                }
                if (this.img.complete) {
                    this.globalAlpha = 0.85;
                    this.roundedImage(this.img, this.margin_left * this.width, this.height * 2 / 3 + 2, (1 - this.margin_top) * this.height / 3 - 2, (1 - this.margin_top) * this.height / 3 - 2, 5);
                    this.globalAlpha = 1;
                }
                var media = API.getMedia();
                if (media) {
                    if (media.author) {
                        this.font = "small-caps 600 " + ((1 - this.margin_top) * this.height / 3 - 2) * 0.4 + "px Fjalla One";
                        this.fillText(API.getMedia().author, this.margin_left * this.width + (1 - this.margin_top) * this.height / 3 - 2, this.height * 2 / 3 + 2 + ((1 - this.margin_top) * this.height / 3 - 2) * 0.4);
                    }
                    if (media.title) {
                        this.font = "small-caps 600 " + (((1 - this.margin_top) * this.height / 3 - 2) * 0.4) * 2 / 3 + "px Fjalla One";
                        this.fillText(API.getMedia().title, this.margin_left * this.width + (1 - this.margin_top) * this.height / 3 - 2, this.height * 5 / 6 + 2 + (((1 - this.margin_top) * this.height / 3 - 2) * 0.4) * 2 / 3);
                    }
                }
            }
        }
    });
updateColor();
    //////////////
    Visualizations.canvas.id = "iplug-playback";
    Visualizations.canvas.style.zIndex = "6";

    VisualizationsHelper.chatErrorID = 0;
    VisualizationsHelper.chatError = function (message) {
        var r = API.getMedia().id;
        if (VisualizationsHelper.chatErrorID != r) {
            VisualizationsHelper.chatErrorID = API.getMedia().id;
            $("#chat-messages").append('<div class="system" style="border-left-color: transparent;padding-left: 27px;">\
    <i class="icon icon-support-white" style="background: url(https://w.soundcloud.com/icon/assets/images/orange_transparent_32-94fc761.png);"></i>\
    <span class="text" style="color: #d1d1d1;">' + message + '</span>\
    </div>');
        }
    };


    Visualizations.width = parseInt($("#playback-container")[0].style.width, 10); //initial call
    Visualizations.height = parseInt($("#playback-container")[0].style.height, 10); //initial call
    VisualizationsHelper.ObsrvTwo = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            var temp = (API.getVolume() / 100);
            if (isFinite(temp)) {
                try {
                    Visualizations.setVolume(temp);
                } catch (f) {}
            }
        });
    });
    VisualizationsHelper.ObsrvTwo.observe($("#volume > span")[0], {
        attributes: false,
        childList: true,
        characterData: false
    });

    $("#iplug-playback")[0].style.cssText = $("#playback-container")[0].style.cssText + "z-index: 6;position: absolute;top: 0;"; 



    VisualizationsHelper.clientID = "9258af128ee9d4c781d46b31917531e7";
    //* GET YOUR OWN CLIENT ID ON HTTP://DEVELOPERS.SOUNDCLOUD.COM 
    // * DON'T USE MINE :)
    // *
    VisualizationsHelper.killFlash = function () {
        try {
            if ($("#playback-controls")[0] == $(".snoozed")[0]) {
                Visualizations.setSource("");
            }
            if (localStorage['iplug|scvisualsenabled'] !== "block") {
                soundManager.unmuteAll();
                return false;
            } else {
                $("#playback-buffering").text("").css("display", "none");
                if (!soundManager.muted) soundManager.muteAll();
                if (soundManager.muted) soundManager.stopAll();
            }
        } catch (f) {}
    };
    setInterval(VisualizationsHelper.killFlash, 2000);
    VisualizationsHelper.onEvent = function (event) {
        if (!Visualizations.paused()) Visualizations.pause();
        var cid = "";
        var yesNo; // YES, IT IS YESNO
        if (require(requireIDs.z).settings.streamDisabled)
            return VisualizationsHelper.hide();
        if ("block" != localStorage["iplug|scvisualsenabled"])
            return VisualizationsHelper.hide();
        if ("object" != typeof event) {
            var a = API.getMedia();
            if (void 0 === a || "2" != a.format)
                return VisualizationsHelper.hide();
            cid = a.cid;
            yesNo = !0;
        } else {
            if ("object" != typeof event.media || "2" != event.media.format)
                return VisualizationsHelper.hide();
            cid = event.media.cid;
            yesNo = !1;
        }
        VisualizationsHelper.show();
        $("#playback-container > *").remove();
        $.get('https://api.soundcloud.com/tracks/' + cid + '.json?client_id=' + VisualizationsHelper.clientID).always(function (data, data2) {
            if (data2 == "success") {
                $.ajax({url:"https://iplug-server.herokuapp.com/color?id=" + cid,
                    success:function(data){
                        if(data.status === 200 && data.color) {
                            Visualizations.background = "rgba("+data.color.r+","+data.color.g+","+data.color.b+","+data.color.a+")";
                        }
                    }
                });
                if (data.streamable === true) { //start working now
                    var streamURL = data.stream_url + '?client_id=' + VisualizationsHelper.clientID;
                    var imgURL = data.artwork_url ? data.artwork_url : data.user.avatar_url ? data.user.avatar_url : "";
                    imgURL.replace("large.jpg", "t500x500.jpg");
                    VisualizationsHelper.playIt(yesNo, streamURL, imgURL);
                } else {
                    VisualizationsHelper.chatError("Track not streamable!");
                }
            } else {
                VisualizationsHelper.chatError(JSON.parse(data.responseText).errors[0].error_message);
            }
        });
    };

    VisualizationsHelper.playIt = function (yesNo, streamURL, imgURL) {
        if (yesNo) {
            Visualizations.setSource(streamURL + "#t=" + API.getTimeElapsed());
        } else {
            Visualizations.setSource(streamURL);
        }
        Visualizations.img.src = imgURL;
        Visualizations.play();
    };
*/
    require(requireIDs.a).on("change:streamDisabled", function (x) {
        onAPIadvance();
    });
    $("#playback-controls > div.button.refresh").click(function () {
        onAPIadvance();
    });

    $("#playback-controls > div.button.snooze").click(function () {
        onAPIadvance();
    });

  /*  VisualizationsHelper.initCall = function () {
        if (!($('#room-loader').length > 0) && (API.enabled)) {
            VisualizationsHelper.onEvent();
            return false;
        }
        setTimeout(VisualizationsHelper.initCall, 1000);
    };
    VisualizationsHelper.initCall();

    function onAPIadvance(a) {
        Visualizations.img.src = "";
        VisualizationsHelper.onEvent(a);
    }

    API.on(API.ADVANCE, onAPIadvance);*/

    
    //========== INIT
    $("#playback-container").css("width", $("#playback-container").css("width"));
    
    /////


    var pos = -3,
        prevpos = -3;

    function smartAutoJoin() {
            if (API.getDJ() !== undefined && API.getDJ().id == API.getUser().id) {
                pos = -2;
            } else {
                if (API.getWaitListPosition() > -1)
                    pos = 0;
                else pos = -1;
            }
            if (prevpos === 0) {
                if (pos === 0) {
                    prevpos = pos;
                    return;
                }
                if (pos == -2) {
                    prevpos = pos;
                    return;
                }
                if (pos == -1) {
                    prevpos = pos;
                    tempAutoJoin(true);
                } // TEMP DISABLE AUTO JOIN
            } else if (prevpos == -2) {
                if (pos == -1) {
                    prevpos = pos;
                    return;
                } // DJ CYCLE OFF
                if (pos === 0) {
                    prevpos = pos;
                    return;
                } // DJ CYCLE ON
            } else if (prevpos == -1) {
                if (pos === 0) {
                    prevpos = pos;
                    tempAutoJoin(false);
                } // MAKE IT WORK NORMALLY
                if (pos == -2) {
                    prevpos = pos;
                    tempAutoJoin(false);
                }
            }
        }
        /*INIT CALL*/
    function smartAutoJoinInit() {
        if ((pos != -3) || (prevpos != -3)) return; // event was faster hehe
        if ((typeof (API) == "object") && (typeof (API.enabled) == "boolean") && !($('#room-loader').length > 0) && (API.enabled)) {
            if (API.getDJ() !== undefined && API.getDJ().id == API.getUser().id) {
                prevpos = -2;
                pos = -2;
            } else {
                if (API.getWaitListPosition() > -1) {
                    prevpos = 0;
                    pos = 0;
                } else {
                    prevpos = -1;
                    pos = -1;
                }
            }
        } else {
            setTimeout(smartAutoJoinInit, 500);
        }
    }
    smartAutoJoinInit();
    /**********/
    var tempAutoJoinDisabled = false;

    function tempAutoJoin(enabled) {
        if (!(pos != -1 && localStorage["iplug|autojoinenabled"] != "block")) {

            tempAutoJoinDisabled = enabled;
            if (enabled)
                $("#autojoinenabled > i").addClass("blackandwhite");
            else
                $("#autojoinenabled > i").removeClass("blackandwhite");
        } else if (localStorage["iplug|autojoinenabled"] != "block") {
            tempAutoJoinDisabled = false;
            $("#autojoinenabled > i").removeClass("blackandwhite");
        }
    }




    //$("#playback-container").addClass("custom1");
    
    //$("#iplug-playback").addClass("custom1");




    //=============================================================================================================================================\\
    //=============================================================================================================================================\\
    //=============================================================================================================================================\\
    //=============================================================================================================================================\\
    //=============================================================================================================================================\\











    setTimeout(function () {
        $("#dialog-container").attr("style", "");
    }, 5000);



    Array.prototype.last = function () {
        return this[this.length - 1];
    };


    $('body').keyup(function (e) {
        if (e.keyCode !== 32 || $("#chat-input").hasClass("focused") || $("#dialog-container").css("display") === "block") return;
        $("#volume > .button").click();
    });

    if (localStorage["iplug|currentBackground"] === "youtube") {
        $("#playback").addClass("largevideo");
        $(".room-background").remove();
    } else {
        $(".room-background").addClass("default");
        $("#room").append('<i class="room-background" style="left: ' + $(".room-background.default").css("left") + '; top: ' + $(".room-background.default").css("top") + '; background: url(' + backgrounds[localStorage["iplug|currentBackground"]].url + ') no-repeat; opacity: 0;"></i>');
        $(".room-background").animate({
            opacity: 1
        }, {
            duration: 2500,
            queue: false,
            easing: "linear"
        });
    }


    var mouseX;
    var mouseY;
    var mouseChange;
    $(window).bind("mousemove", function (event) {
        mouseX = event.pageX;
        mouseY = event.pageY;
        mouseChange = true;
    });


    var dragging = false;

    if (API.getMedia()) $(".backgroundcard[card='youtube'] img").attr("src", (API.getMedia().format === 1) ? ("https://img.youtube.com/vi/" + API.getMedia().cid + "/mqdefault.jpg") : API.getMedia().image);
    API.on(API.ADVANCE, function (data) {
        $(".backgroundcard[card='youtube'] img").attr("src", (data.media.format === 1) ? ("https://img.youtube.com/vi/" + data.media.cid + "/mqdefault.jpg") : data.media.image);
    });

    API.on(API.WAIT_LIST_UPDATE, function () {
        smartAutoJoin(); // init settings
        JN();
    });
    var backgroundcarddeck = "";
    Object.keys(backgrounds).forEach(function (e) {
        backgroundcarddeck += cardBuilder(e);
    });    $(window).bind("resize", function() {
        var heightwidth = {
            width: window.innerWidth - 345 + "px",
            height: window.innerHeight - 108 + "px"
        };
        $(".largevideo > #iplug-playback").css(heightwidth).attr(heightwidth);
       // Visualizations.width = Visualizations.canvas.width;
       // Visualizations.height = Visualizations.canvas.height;
        $(".room-background:not(.default)").css({
            left: $(".room-background.default").css("left"),
            top: $(".room-background.default").css("top")
        });
    });
    $("#header-panel-bar").append("<div id='iplug-button' class='header-panel-button'><div class='box'><i class='icon-iplug'></i></div></div>");
    $(".app-right").append('<div id="iplug-menu" style="display: none"> <div class="header"><span class="title">iPlug Menu</span> <div class="divider"></div> </div> <div class="iplug-menu-autowoot iplug-container"> <div id="visuals" class="subcontainer"><i class="iplug-collapse icon icon-arrow-up" style="text-indent: 0px"></i> <div class="noitem"><span class="subtitle">Visual Options</span> </div> <div id="youtubevideodisabled" class="item item-iplug"><i class="icon icon-check-blue" style="display: ' + localStorage['iplug|youtubevideodisabled'] + '"></i><span>Hide Youtube Video</span> </div> <div id="playbackborder" class="item item-iplug"><i class="icon icon-check-blue" style="display: ' + localStorage['iplug|playbackborder'] + '"></i><span>Hide Playback Border</span> </div> <div id="curateenabled" class="item item-iplug"><i class="icon icon-check-blue" style="display: ' + localStorage['iplug|curateenabled'] + '"></i><span>Show Vote Buttons On Default Position</span> </div> <div id="topwootenabled" class="item item-iplug"><i class="icon icon-check-blue" style="display: ' + localStorage['iplug|topwootenabled'] + '"></i><span>Show Woot Button In Top Bar</span> </div> <div id="topgrabenabled" class="item item-iplug"><i class="icon icon-check-blue" style="display: ' + localStorage['iplug|topgrabenabled'] + '"></i><span>Show Grab Button In Top Bar</span> </div> <div id="topmehenabled" class="item item-iplug"><i class="icon icon-check-blue" style="display: ' + localStorage['iplug|topmehenabled'] + '"></i><span>Show Meh Button In Top Bar</span> </div> <div id="topskipenabled" class="item item-iplug"><i class="icon icon-check-blue" style="display: ' + localStorage['iplug|topskipenabled'] + '"></i><span>Show Current Dj Button In Top Bar (to skip)</span> </div> <div id="waitlistdisabled" class="item item-iplug"><i class="icon icon-check-blue" style="display: ' + localStorage['iplug|waitlistdisabled'] + '"></i><span>Hide Waitlist Join Button</span> </div> <div id="audiencedisabled" class="item item-iplug"><i class="icon icon-check-blue" style="display: ' + localStorage['iplug|audiencedisabled'] + '"></i><span>Hide Audience</span> </div> <div id="djdisabled" class="item item-iplug"><i class="icon icon-check-blue" style="display: ' + localStorage['iplug|djdisabled'] + '"></i><span>Hide DJ</span> </div> <div id="backgroundcardselected" style="cursor: pointer;">' + cardBuilder(localStorage['iplug|currentBackground']) + '</div> </div> <div id="autowoot" class="subcontainer"><i class="iplug-collapse icon icon-arrow-up" style="text-indent: 0px"></i> <div id="autowootenabled" class="item item-iplug"> <i class="icon icon-check-blue" style="display: ' + localStorage['iplug|autowootenabled'] + '"></i> <span class="subtitle">Autowoot</span> </div> <div id="autowootdelay" class="slider">' + { block: ' <div class="titlecontainer min"><span class="title">Autowoot Minimum Delay (Seconds)</span><span class="value">' + ((localStorage['iplug|autowootdelaymin'] / 10).toFixed(1)) + 's</span> </div> <div class="titlecontainer max"><span class="title" style="display: inline">Autowoot Maximum Delay (Seconds)</span><span class="value" style="display: inline">' + ((localStorage["iplug|autowootdelaymax"] / 10).toFixed(1)) + 's</span> </div>', none: ' <div class="titlecontainer min"><span class="title">Autowoot Delay (Seconds)</span><span class="value">' + ((localStorage['iplug|autowootdelaymin'] / 10).toFixed(1)) + 's</span> </div> <div class="titlecontainer max"><span class="title" style="display: none"></span><span class="value" style="display: none">' + ((localStorage['iplug|autowootdelaymax'] / 10).toFixed(1)) + 's</span> </div>' }[localStorage['iplug|autowootdelayrandom']] + ' <div class="counts"> <span class="count">0s</span> <span class="count">10s</span> <span class="count">20s</span> <span class="count">30s</span><span class="stretch"></span> </div> <div class="barcontainer"> <div class="bar background"></div> <div class="bar selected" style="left: ' + (7 + parseInt(localStorage['iplug|autowootdelaymin'])) + 'px; width: ' + (parseInt(localStorage['iplug|autowootdelaymax']) - parseInt(localStorage['iplug|autowootdelaymin'])) + 'px"></div> <div class="hit"></div> <div class="circle" style="left: ' + localStorage['iplug|autowootdelaymin'] + 'px;"></div> <div class="circle" style="left: ' + localStorage['iplug|autowootdelaymax'] + 'px;"></div> </div> </div> <div id="autowootdelayrandom" class="item item-iplug"> <i class="icon icon-check-blue" style="display: ' + localStorage['iplug|autowootdelayrandom'] + '"></i> <span>Advanced Autowoot Timing</span> </div> </div> <div id="scvisuals" class="subcontainer"><i class="iplug-collapse icon icon-arrow-up" style="text-indent: 0px"></i> <div id="scvisualsenabled" class="item item-iplug"> <i class="icon icon-check-blue" style="display: ' + localStorage['iplug|scvisualsenabled'] + '"></i> <span class="subtitle">Alternative Soundcloud Visuals</span> </div> <div id="visualsstyle" class="noitem centerall" style="width: 300px;"><span style="font-weight: normal; color: #fff">Style ' + (parseInt(localStorage['iplug|scvisualsstyle']) + 1) + '</span><span> - change Style</span> </div> <div id="visuals1" style="' + ((localStorage['iplug|scvisualsstyle'] === '1') ? '' : 'height: 0px; opacity: 0') + '"> <div class="settings"> <div class="noitem delete" style="display: none"><span style="display: ' + ((COLORS.length > 1) ? " block; cursor: pointer " : "none; cursor: default ") + '">Delete</span> </div> <div class="colorpicker" style="display: none"> <div id="decolorred" class="slider"> <div class="barcontainer"> <div class="bar background"></div> <div class="hit"></div> <div class="circle" style="left: 0px; background-color: #f00"></div> </div> </div> <div id="decolorgreen" class="slider"> <div class="barcontainer"> <div class="bar background"></div> <div class="hit"></div> <div class="circle" style="left: 0px; background-color: #0f0"></div> </div> </div> <div id="decolorblue" class="slider"> <div class="barcontainer"> <div class="bar background"></div> <div class="hit"></div> <div class="circle" style="left: 0px; background-color: #00f"></div> </div> </div> <div id="decolorcolor" class="colorblock" style="background-color: rgb(0, 0, 0);"></div> </div> </div> <div class="nodecontainer" style="height: ' + (-19 * Math.floor(-COLORS.length / 16)) + 'px"> <div class="node cross"> <div class="horizontal"></div> <div class="vertical"></div> </div> <div class="node" style="background-color: ' + COLORS.join('"></div> <div class="node" style="background-color: ') + '"></div> </div> </div> <div id="visuals0" style="' + ((localStorage['iplug|scvisualsstyle'] === '0') ? '' : 'height: 0px; opacity: 0') + '"> <div id="scvisualsbars" class="slider"> <div class="counts"> <span class="count">Fast</span> <span class="count">Fancy</span> <span class="stretch"></span> </div> <div class="barcontainer"> <div class="bar background"></div> <div class="hit"></div> <div class="circle" style="left: ' + localStorage['iplug|scvisualsbarsmin'] + 'px;"></div> </div> </div> <div id="sccolorstring" class="gradientpicker"> <div class="settings"> <div class="noitem delete"><span>Delete</span> </div> <div class="colorpicker" style="display: none"> <div id="sccolorred" class="slider"> <div class="barcontainer"> <div class="bar background"></div> <div class="hit"></div> <div class="circle" style="left: 0px; background-color: #f00"></div> </div> </div> <div id="sccolorgreen" class="slider"> <div class="barcontainer"> <div class="bar background"></div> <div class="hit"></div> <div class="circle" style="left: 0px; background-color: #0f0"></div> </div> </div> <div id="sccolorblue" class="slider"> <div class="barcontainer"> <div class="bar background"></div> <div class="hit"></div> <div class="circle" style="left: 0px; background-color: #00f"></div> </div> </div> <div id="sccolorcolor" class="colorblock" style="background-color: rgb(0, 0, 0);"></div> </div> </div> <div id="scgradientslider" class="slider"> <div class="barcontainer gradient"> <div class="bar background" style="' + setGradient(colorscheme) + '"></div> <div class="hit"></div>' + colorDom(colorscheme) + '</div> </div> <div class="noitem centerall"><span>Recenter all markers</span> </div> </div> </div><div class="unavailable"></div></div> <div id="misc" class="subcontainer"><i class="iplug-collapse icon icon-arrow-up" style="text-indent: 0px"></i> <div class="noitem"><span class="subtitle">Misc Options</span> </div> <div id="autojoinenabled" class="item item-iplug"> <i class="icon icon-check-blue" style="display: ' + localStorage['iplug|autojoinenabled'] + '"></i> <span>Autojoin</span> </div> <div id="listgrabmehenabled" class="item item-iplug"> <i class="icon icon-check-blue" style="display: ' + localStorage['iplug|listgrabmehenabledenabled'] + '"></i> <span>List grabs & mehs</span> </div> </div> </div> <div id="backgroundcarddeckcontainer" style="display: none;"> <div id="backgroundcarddeck">' + backgroundcarddeck + '</div> </div></div>');
    $("#chat-button, #users-button, #waitlist-button, #friends-button").bind("click", function () {
        $("#iplug-button").attr("class", "header-panel-button");
        $("#iplug-menu").attr("style", "display: none");
        $(".iplug-container > .subcontainer").css("height", "30px").children(".iplug-collapse").attr("class", "iplug-collapse icon icon-arrow-up");
    });
    $("#iplug-button").bind("mouseenter", function () {
        $("#tooltip").remove();
        $("body").append('<div id="tooltip" style="top: 0px; left: ' + (window.innerWidth - 100) + 'px;" class="right"><span>iPlug Menu</span><div class="corner"></div></div>');
    }).bind("mouseleave", function () {
        $("#tooltip").remove();
    }).bind("click", function () {
        $("#waitlist-button").trigger("click");
        $("#iplug-button").attr("class", "header-panel-button selected");
        $("#iplug-menu").attr("style", "display: block");
        $("#waitlist-button").attr("class", "header-panel-button");
        $("#waitlist").attr("style", "display: none");
    }).one("click", function () {
        $(".iplug-container .item, .iplug-container .noitem").each(function (i, item) {
            var width = $(item).hasClass("item") ? 30 : 0;
            $(item).children("span").each(function (i, e) {
                width += parseInt($(e).css("width"));
            });
            $(item).css("width", width + "px");
        });
        $(".unavailable").each(function(i, e) {
           var checkbox = $("#" + $(e).parent().attr("id") + "enabled > i");
           if (checkbox.css("display") === "block") checkbox.click();
        });
		//$(".backgroundcard[card='youtube'] img").attr("src", (data.media.format === 1) ? ("https://img.youtube.com/vi/" + data.media.cid + "/mqdefault.jpg") : data.media.image);
    });
    $(".nodecontainer .node").each(function (i, e) {
        $(e).css({
            right: 5 + 19 * (i % 16) + "px",
            top: 5 + 19 * Math.floor(i / 16) + "px"
        });
    }).not(".cross").bind("click", bindnode);
$("#now-playing-bar").wrap('<div id="topbarcontainer"></div>').children("#history-button").prependTo("#topbarcontainer").wrap('<div id="iconscontainer"></div>').before('<div id="topdjbutton" style="display: ' + ((localStorage["iplug|topskipenabled"] === "none") ? "none !important" : "inline-block !important") + ';"><i class="icon icon-current-dj-white"></i></div>');
    if (localStorage["iplug|topwootenabled"] === "block" || localStorage["iplug|topgrabenabled"] === "block" || localStorage["iplug|topmehenabled"] === "block") {
        $("#vote").prependTo("#iconscontainer");
        $("body").addClass("topvotebar");
    }
    $("#topdjbutton").bind("click", function() {
        Dj.click();
    }).bind("mouseover", function() {
        $("body").append('<div id="tooltip" class style="top: 0px; left: ' + (window.innerWidth - 428) + 'px;"><span>Open menu for current dj</span><div class="corner"></div></div>').one("mouseout", function() {
        $("#tooltip").remove();
        });
    });


    $(".iplug-container .item-iplug").bind("click", function () {
        var enabled = "block" != localStorage["iplug|" + $(this).attr("id")];
        if (enabled) {
            localStorage["iplug|" + $(this).attr("id")] = "block";
            $(this).children("i").attr("style", "display: block");
        } else {
            localStorage["iplug|" + $(this).attr("id")] = "none";
            $(this).children("i").attr("style", "display: none");
        }
        callbacks($(this).attr("id"), enabled)();
    });


    $(".iplug-container .slider > .barcontainer > .circle").bind("mousedown", startdrag);

    $(".iplug-container .slider > .barcontainer > .hit").bind("mousedown", function () {
        var mousepos = Math.max(0, Math.min(300, mouseX - $(this).offset().left));
        if (dragging) {
            return;
        }
        if ($(this).parent().hasClass("gradient")) {
            $(this).parent().append('<div class="circle new" style="left: ' + Math.max(0, Math.min(300, mouseX - $(this).offset().left)) + 'px; border-color: ' + getGradientColor(Math.max(0, Math.min(300, mouseX - $(this).offset().left)) / 300, colorscheme) + ';"></div>');
            var newb = $(this).siblings(".new").removeClass("new").css({
                height: "0px",
                width: "0px",
                marginLeft: "-7px",
                marginTop: "5px"
            }).bind("mousedown", startdrag);
            bindGradientCircleEvents(newb);
            newb.trigger("mousedown");
        } else if ($(this).parent().parent().parent().hasClass("colorpicker")) {
            var circle = $(this).siblings(".circle");
            circle.css("left", parseInt((((mousepos < parseInt(circle.css("left"))) ? 0 : 255) + parseInt(circle.css("left")) + 2) / 2) - 1 + "px");
            callbacks($(this).parent().parent().attr("id"))();
        } else {
            var closest = $(this).parent().children(".circle").sort(function (a, b) {
                return Math.abs(mousepos - parseInt($(a).css("left"))) - Math.abs(mousepos - parseInt($(b).css("left")));
            }).eq(0);
            var victim;
            if (localStorage['iplug|' + $(this).parent().parent().attr("id") + 'random'] == "block") {
                victim = closest;
                var add = (mousepos > parseInt(closest.css("left"))) ? 1 : -1;
                victim.css("left", parseInt(closest.css("left")) + add + "px");
                var values = [];
                $(this).parent().children(".circle").each(function (i, item) {
                    values.push(parseInt($(item).css("left")));
                });
                values.sort(function (a, b) {
                    return a - b;
                });
                localStorage["iplug|" + $(this).parent().parent().attr("id") + "min"] = values[0];
                localStorage["iplug|" + $(this).parent().parent().attr("id") + "max"] = values[1];
                $(this).parent().children(".bar.selected").attr("style", "left: " + (7 + values[0]) + "px; width: " + (values[1] - values[0]) + "px");
                $(this).parent().parent().children(".titlecontainer.min").children(".value").html((values[0] / 10).toFixed(1) + "s");
                $(this).parent().parent().children(".titlecontainer.max").children(".value").html((values[1] / 10).toFixed(1) + "s");
            } else {
                victim = $(this).parent().children(".circle");
                dragging = true;
                drag(victim, $(this).parent().children(".bar.selected"), $(this).parent().children(".circle"), $(this).parent().parent().children(".titlecontainer").children(".value"), mouseX, mousepos + 1, $(this).parent().parent().attr("id"), parseInt($(this).parent().children(".bar.background").css("width")) + 1, callbacks(victim.parent().parent().attr("id")));
            }
        }
    });


    $(".iplug-container .slider, .iplug-container .gradientpicker").on('mousedown', function (e) {
        var handler, doc = jQuery(document);
        e.preventDefault();
        doc.on('mousemove', handler = function (e) {
            e.preventDefault();
        });
        doc.one('mouseup', function (e) {
            doc.off('mousemove', handler);
        });
    });


    $(".iplug-container > .subcontainer > .iplug-collapse").bind("mousedown", function () {
        if ($(this).css("text-indent") != "0px") {
            $(this).attr("queue", "true");
            return;
        }
        var newclass, newheight, rotate, clearheight, complete, dis = $(this);
        if (dis.attr("class") == "iplug-collapse icon icon-arrow-up") {
            newclass = "iplug-collapse icon icon-arrow-down";
            newheight = $(this).parent().css("height", "").css("height");
            dis.parent().css("height", "30px");
            rotate = "-180px";
            clearheight = true;
            complete = function () {};
        } else {
            newclass = "iplug-collapse icon icon-arrow-up";
            newheight = "30px";
            rotate = "180px";
            clearheight = false;
            complete = function () {
                dis.siblings(".gradientpicker").children(".settings").children().css("display", "none");
                dis.siblings(".gradientpicker").children(".slider").children(".barcontainer").children(".circle.selected").removeClass("selected").css({
                    height: "10px",
                    width: "10px",
                    marginLeft: "-8px",
                    marginTop: "0px"
                });
            };
        }
        $(this).attr("class", newclass).css("text-indent", "180px").css("margin-top", "-2px").css("text-indent", rotate).animate({
            marginTop: "0px",
            textIndent: 0
        }, {
            step: function (go) {
                $(this).css('-moz-transform', 'rotate(' + go + 'deg)');
                $(this).css('-webkit-transform', 'rotate(' + go + 'deg)');
                $(this).css('-o-transform', 'rotate(' + go + 'deg)');
                $(this).css('transform', 'rotate(' + go + 'deg)');
            },
            duration: 750,
            complete: function () {
                complete();
                if ($(this).attr("queue") == "true") {
                    $(this).mousedown();
                }
                $(this).attr("queue", "false");
                if (clearheight === true) {
                    var lol = $(this).parent();
                    setTimeout(function () {
                        lol.css("height", "");
                    }, 0);
                }
            }
        }).parent().animate({
            height: newheight
        }, {
            duration: 750
        });
    });


    $(".iplug-container .gradientpicker > .settings > .delete").bind("click", function () {
        if ($(this).children().css("display") === "none") return;
        $(this).parent().siblings(".slider").children(".barcontainer").children(".circle.selected").remove();
        $(this).parent().children().css("display", "none");
        callbacks($(this).parent().siblings(".slider").attr("id"))();
    });


    $(".iplug-container .gradientpicker > .centerall").bind("click", function () {
        var circles = $(this).siblings(".slider").children(".barcontainer").children(".circle");
        circles.sort(function (a, b) {
            return parseInt($(a).css("left")) - parseInt($(b).css("left"));
        }).each(function (i, item) {
            $(item).css("left", parseInt(i / (circles.length - 1) * 300) + "px");
        });
        callbacks("scgradientslider")();
    });


    $("#visualsstyle").bind("click", function () {
        if ($("#scvisuals").is(':animated')) return;
        $("#scvisuals > .iplug-collapse.icon-arrow-down").trigger('mousedown');
        setTimeout(function () {
            $("#visuals" + localStorage['iplug|scvisualsstyle']).css("height", "0px").css("opacity", "0");
            localStorage['iplug|scvisualsstyle'] = (1 + parseInt(localStorage['iplug|scvisualsstyle'])) % 2;
            $("#visuals" + localStorage['iplug|scvisualsstyle']).css("height", "").css("opacity", "");
            $("#visualsstyle > span").first().html("Style " + (1 + parseInt(localStorage['iplug|scvisualsstyle'])));
            $("#scvisuals > .iplug-collapse.icon-arrow-up").trigger('mousedown');
        }, 750);
    });


    $(".nodecontainer .node.cross").bind("click", function () {
        var cross = $(this);
        cross.after('<div class="node"></div>');
        cross.parent().animate({
            height: -19 * Math.floor(-$(".node").length / 16) + "px"
        }, {
            duration: 250,
            queue: false
        });
        cross.parent().children(".node").each(function (i, e) {
            $(e).animate({
                right: 5 + 19 * (i % 16) + "px",
                top: 5 + 19 * Math.floor(i / 16) + "px"
            }, {
                duration: 250,
                queue: false
            });
        });
        cross.siblings(".node").first().bind("click", bindnode).css("background-color", cross.parent().siblings(".settings").find(".colorblock").css("background-color")).click();
        cross.parent().siblings(".settings").find(".delete span").css({
            display: "block",
            cursor: "pointer"
        });
        COLORS = [];
        $(".node").not(".cross").each(function (i, e) {
            COLORS.push($(e).css("background-color"));
        });
        localStorage["iplug|decolorstring"] = COLORS.join("|");
    });

    $("#visuals1 .delete").bind("click", function () {
        var del = $(this).parent().siblings(".nodecontainer").children(".node.selected");
        var pos = del.parents().children(".node").index(del);
        var nodes = del.siblings(".node");
        if (nodes.length <= 1) return;
        if (pos === nodes.length) pos--;
        del.parent().animate({
            height: -19 * Math.floor(-$(".node").length / 16) + "px"
        }, {
            duration: 250,
            queue: false
        });
        del.remove();
        nodes.each(function (i, e) {
            $(e).animate({
                right: 5 + 19 * (i % 16) + "px",
                top: 5 + 19 * Math.floor(i / 16) + "px"
            }, {
                duration: 250,
                queue: false
            });
        });
        nodes.eq(pos).click();
        if (nodes.length <= 2) $(this).children().css({
            display: "none",
            cursor: "default"
        });
        COLORS = [];
        $(".node").not(".cross").each(function (i, e) {
            COLORS.push($(e).css("background-color"));
        });
        localStorage["iplug|decolorstring"] = COLORS.join("|");
    });

    $("#backgroundcardselected").bind("click", function () {
        var deck = $("#backgroundcarddeckcontainer");
        var selected = $("#backgroundcardselected");
        var cards = deck.children().children();
        var card = cards.filter("[card=" + selected.children().attr("card") + "]");
        var n = cards.index(card);
        if (selected.css("cursor") !== "pointer") return;
		$("#playlist-button .icon-arrow-down").click();
        selected.css({
            cursor: "default"
        });
        card.css({
            marginLeft: "345px"
        });
        deck.children().css({
            marginTop: 378 + parseInt(deck.css("height")) + "px"
        });
        deck.scrollTop(0).css({
            overflowY: "hidden",
            display: "block"
        }).animate({
            scrollTop: 149 * n + parseInt(deck.css("height"))
        }, {
            duration: 250 * Math.pow(n + 2, .5),
            queue: false,
            complete: function () {
                deck.scrollTop(149 * n).children().css({
                    marginTop: "378px"
                });
            }
        });
        setTimeout(function () {
            card.animate({
                marginLeft: "0px"
            }, {
                duration: 750,
                queue: false
            });
            selected.children().animate({
                marginLeft: "-345px"
            }, {
                duration: 750,
                queue: false,
                complete: function () {
                    selected.children().remove();
                }
            });
            setTimeout(function () {
                deck.css({
                    overflowY: "scroll"
                }).attr("opened", "true");
                cards.css({
                    cursor: "pointer"
                }).bind("click", function () {
                    var newcard = $(this);
                    var m = cards.index(newcard);
                    cards.css({
                        cursor: ""
                    }).unbind();
                    deck.attr("opened", "false").css({
                        overflowY: "hidden"
                    }).animate({
                        scrollTop: 149 * m
                    }, {
                        duration: 250 * Math.pow(Math.abs(m - deck.scrollTop() / 149) + 2, .5),
                        queue: false
                    });
                    setTimeout(function () {
                        newcard.animate({
                            marginLeft: "345px"
                        }, {
                            duration: 750,
                            queue: false
                        }).clone().css({
                            marginLeft: "-345px"
                        }).appendTo(selected).animate({
                            marginLeft: "0px"
                        }, {
                            duration: 750,
                            queue: false
                        });
                        setTimeout(function () {
                            deck.children().css({
                                marginTop: 378 + parseInt(deck.css("height")) + "px"
                            });
                            deck.scrollTop(deck.scrollTop() + parseInt(deck.css("height"))).animate({
                                scrollTop: 0
                            }, {
                                duration: 250 * Math.pow(m + 2, .5),
                                complete: function () {
                                    deck.scrollTop(0).css({
                                        display: "none"
                                    }).children().css({
                                        marginTop: "378px"
                                    });
                                    newcard.css({
                                        marginLeft: "0px"
                                    });
                                    selected.css({
                                        cursor: "pointer"
                                    });
                                }
                            });
                        }, 500);
                    }, 250 * Math.pow(Math.abs(m - deck.scrollTop() / 149) + 2, .5) - 250);
                    if (card === newcard) return;
                    localStorage["iplug|currentBackground"] = newcard.attr("card");
                    if (newcard.attr("card") === "youtube") {
                        $("#playback").addClass("largevideo");
                        $(".room-background:not(.default)").remove();
                    } else {
                        if (card.attr("card") === "youtube") {
                            $("#playback").removeClass("largevideo");
                            $(window).trigger("resize");
                        }
                        var oldbg = $(".room-background:not(.default)");
                        $("#room").append('<i class="room-background" style="left: ' + $(".room-background.default").css("left") + '; top: ' + $(".room-background.default").css("top") + '; background: url(' + backgrounds[newcard.attr("card")].url + ') no-repeat; opacity: 0;"></i>');
                        $(".room-background").animate({
                            opacity: 1
                        }, {
                            duration: 2500,
                            queue: false,
                            easing: "linear",
                            complete: function () {
                                oldbg.remove();
                            }
                        });
                    }
                });
            }, 500);
        }, 250 * Math.pow(n + 2, .5) - 250);
    });

    $("body").bind("click", function () {
        var deck = $("#backgroundcarddeckcontainer");
        if (deck.attr("opened") !== "true" || deck.is(":hover")) return;
        deck.children().children().filter("[card=" + localStorage["iplug|currentBackground"] + "]").click();
	});
	
	$("#dialog-container").bind("DOMNodeInserted", function(e) {
        var target = $(e.target);
        if (target.attr("class") !== "dialog-frame" || target.parent().attr("id") !== "dialog-preview" || target.parent().children(".dialog-frame:first")[0] !== target[0]) return;
        console.log(target);
        var id = $(".playlist-media-item.selected img, .playlist-media-first-item.selected img").attr("src").match(/[^,\/]+(?=\/default\.jpg)/)[0];
         
        target.prepend('<div id="download"><i></i><div id="downloadbox"><div id="downloadcontainer"><div class="spinner"><i></i></div></div></div></div>');
		
		$("#download").bind("mouseenter", function() {
			if ($("#downloadbox").css("cursor") === "default") {
				$("#downloadbox").animate({width: "307px", left: "-307px", height: "375px"}, {duration: 250, queue: false});
			} else {
				$("#downloadbox").animate({width: "35px", left: "-35px"}, {duration: 250, queue: false});
			}
		}).bind("mouseleave", function() {
			$("#downloadbox").animate({width: "5px", left: "-5px", height: "60px"}, {duration: 250, queue: false});
		}).one("click", function() {
			genqr(id);
		});
	});

    bindGradientCircleEvents($(".iplug-container .gradientpicker > .slider .barcontainer.gradient > .circle"));
	
	function fail(id, hi) {
		console.log("fetching link for qr code failed: (" + hi + ") for video " + id);
		$("#downloadcontainer >").replaceWith('<div class="failed"><span>failed :(</span><br/><span>(</span><span id="retry">retry?</span><span>)</span></div>');
		$("#retry").bind("click", function() {
			$("#downloadcontainer >").replaceWith('<div class="spinner"><i></i></div>');
			genqr(id);
		})
	}
	
	function genqr(id) {
		$("#downloadbox").animate({width: "307px", left: "-307px", height: "375px"}, {duration: 250, queue: false});
		$("#download").css({cursor: "default"});
		if (gapiloaded) {
			$.ajax({
				url: "https://mp3-l0laapk3.rhcloud.com/init.php?id=" + id,
				success: function(a) {
					if (JSON.parse(a)) {
						var meta = $(".playlist-media-item.selected .meta, .playlist-media-first-item.selected .meta");
						gapi.client.urlshortener.url.insert({
							resource: {
								"longUrl": "https://mp3-l0laapk3.rhcloud.com/download.php?id=" + id + "&name=" + encodeURIComponent($("#dialog-preview > .dialog-body > .message").html().replace(/&amp;/, "&")) + "&title=" + encodeURIComponent(meta.children(".title").html().replace(/&amp;/, "&")) + "&artist=" + encodeURIComponent(meta.children(".author").html().replace(/&amp;/, "&"))
							}
						}).execute(function(response) {
							var url = response.id;
							$("#downloadcontainer >").replaceWith('<a id="qrlink" target="_blank" attr="" href="' + url + '" title="' + url + '">' + url.replace("http://", "") + '</a><span>----- OR -----</span><a id="qrlink" target="_blank" attr="" href="' + url + '"><div id="qrcode"></div></a>');
							var qrcode = new QRCode("qrcode");
							qrcode.makeCode(url);
						});
					} else fail(id, 3);
				},
				error: function() {
					fail(id, 2);
				}
			});
		} else fail(id, 1);
	}

    function bindnode() {
        var node = $(this);
        if (node.is(".selected")) return;
        node.addClass("selected").animate({
            height: "14px",
            width: "14px",
            marginRight: "-2px",
            marginTop: "-2px"
        }, {
            duration: 250,
            queue: false
        }).siblings(".selected").removeClass("selected").animate({
            height: "10px",
            width: "10px",
            marginRight: "0px",
            marginTop: "0px"
        }, {
            duration: 250,
            queue: true
        });
        node.parent().siblings(".settings").children().css("display", "block").find(".colorblock").css("background-color", node.css("background-color"));
        node.css("background-color").substring(4, 17).split(", ").forEach(function (e, i, a) {
            node.parent().siblings(".settings").find(".circle").eq(i).css("left", parseInt(e) + "px");
        });
    }


    function startdrag(dis) {
        if (dragging) {
            return;
        }
        dragging = true;
        var victim;
        if (localStorage['iplug|' + $(this).parent().parent().attr("id") + 'random'] !== "none") {
            victim = $(this);
        } else {
            victim = $(this).parent().children(".circle");
        }
        drag(victim, $(this).parent().children(".bar.selected"), $(this).parent().children(".circle"), $(this).parent().parent().children(".titlecontainer").children(".value"), mouseX, parseInt($(this).attr("style").split(" ")[1]), $(this).parent().parent().attr("id"), parseInt($(this).parent().children(".bar.background").css("width")) + 1, callbacks(victim.parent().parent().attr("id")));
    }

    //* MICHAL *//
    var holdingCircle = false;
    var overCircle = false;

    function updateTooltip(_this) {
        $("#tooltip").css("top", ($(_this.target).offset().top - 28) + 'px');
        $("#tooltip").css("right", (window.innerWidth - $(_this.target).offset().left - $(_this.target).width() + 2) + 'px');
        $("#tooltip>span").html(parseInt(_this.target.style.left, 10));
    }
    $(".iplug-container .colorpicker .slider .barcontainer .circle").bind("mouseenter", function (_this) {
        overCircle = true;
        $("#tooltip").remove();
        $("body").append('<div id="tooltip" style="top: ' + ($(_this.target).offset().top - 28) + 'px; left: initial; right: ' + (window.innerWidth - $(_this.target).offset().left - $(_this.target).width() + 2) + 'px;" class="right"><span>' + parseInt(_this.target.style.left, 10) + '</span><div class="corner"></div></div>');
    }).bind("mousedown", function (_this) {
        holdingCircle = true;
        $("#tooltip").remove();
        $("body").append('<div id="tooltip" style="top: ' + ($(_this.target).offset().top - 28) + 'px; left: initial; right: ' + (window.innerWidth - $(_this.target).offset().left - $(_this.target).width() + 2) + 'px;" class="right"><span>' + parseInt(_this.target.style.left, 10) + '</span><div class="corner"></div></div>');
    }).bind("mouseleave", function () {
        overCircle = false;
        if (!holdingCircle) {
            $("#tooltip").remove();
        }
    });
    $(window).bind("mouseup", function () {
        holdingCircle = false;
        if (!overCircle) {
            $("#tooltip").remove();
        }
    });
    //* END MICHAL *//

    $(window).bind("mouseup blur", function () {
        dragging = false;
    });


    function drag(victim, selection, circles, minmax, startx, original, name, max, callback) {
        victim.css("left", Math.max(0, Math.min(max, (original - startx + mouseX))) + "px");
        var values = [];
        circles.each(function (i, a) {
            values.push($(a));
        });
        values.forEach(function (a, i, e) {
            e[i] = parseInt(a.attr("style").split(" ")[1]);
        });
        values.sort(function (a, b) {
            return a - b;
        });
        localStorage["iplug|" + name + "min"] = values[0];
        localStorage["iplug|" + name + "max"] = values.last();
        selection.attr("style", "left: " + (7 + values[0]) + "px; width: " + (values.last() - values[0]) + "px");
        if ($(".colorpicker").find(victim)[0] == victim[0]) {
            updateTooltip({
                target: victim[0]
            });
        }
        if (dragging) {
            setTimeout(function () {
                drag(victim, selection, circles, minmax, startx, original, name, max, callback);
            }, 1);
        }
        if (mouseChange) {
            callback(values, minmax);
            mouseChange = false;
        }
    }


    function callbacks(id, enabled) {
        switch (id) {
            case "autojoinenabled":
                return function () {
                    if (pos == -1 && localStorage["iplug|autojoinenabled"] == "block") {
                        $("#autojoinenabled > i").removeClass("blackandwhite");
                        tempAutoJoinDisabled = false;
                    }
                    if (tempAutoJoinDisabled && localStorage["iplug|autojoinenabled"] != "block") {
                        $("#autojoinenabled").click();
                        tempAutoJoin(false);
                        JN();
                    } else if (localStorage["iplug|autojoinenabled"] == "block") {
                        JN();
                    }
                };
            case "youtubevideodisabled":
                return function () {
                    if (enabled) {
                        $("#playback").css({
                            display: "none"
                        });
                    } else {
                        $("#playback").css({
                            display: "block"
                        });
                    }
                };
            case "playbackborder":
                return function () {
                    $("#playback > .background").css({
                        display: (enabled) ? "none" : "block"
                    });
                };
            case "curateenabled":
                return function () {
                    $("#vote").css({
                        display: (enabled) ? "block" : "none"
                    });
                    if (enabled && $("body").hasClass("topvotebar")) {
                        $("#vote").appendTo("#room");
                        $("body").removeClass("topvotebar");
                        if (localStorage['iplug|topwootenabled'] === "block") $("#topwootenabled").click();
                        if (localStorage['iplug|topgrabenabled'] === "block") $("#topgrabenabled").click();
                        if (localStorage['iplug|topmehenabled'] === "block") $("#topmehenabled").click();
                    }
                };
            case "topwootenabled":
                return function () {
                    if (enabled && !$("body").hasClass("topvotebar")) {
                        $("#vote").prependTo("#iconscontainer");
                        $("body").addClass("topvotebar");
                        if (localStorage['iplug|curateenabled'] === "block") $("#curateenabled").click();
                    }
                    $("#woot").css({
                        display: (enabled) ? "block" : "none"
                    });
                };
            case "topgrabenabled":
                return function () {
                    if (enabled && !$("body").hasClass("topvotebar")) {
                        $("#vote").prependTo("#iconscontainer");
                        $("body").addClass("topvotebar");
                        if (localStorage['iplug|curateenabled'] === "block") $("#curateenabled").click();
                    }
                    $("#grab").css({
                        display: (enabled) ? "block" : "none"
                    });
                };
            case "topmehenabled":
                return function () {
                    if (enabled && !$("body").hasClass("topvotebar")) {
                        $("#vote").prependTo("#iconscontainer");
                        $("body").addClass("topvotebar");
                        if (localStorage['iplug|curateenabled'] === "block") $("#curateenabled").click();
                    }
                    $("#meh").css({
                        display: (enabled) ? "block" : "none"
                    });
                };
            case "topskipenabled":
                return function () {
                    $("#topdjbutton").attr({
                        style: "display: " + ((enabled) ? "inline-block" : "none") + " !important"
                    });
                };
            case "waitlistdisabled":
                return function () {
                    $("#dj-button").css({
                        display: (enabled) ? "none" : "block"
                    });
                };
            case "audiencedisabled":
                return function () {
                    $("#audience").css({
                        display: (enabled) ? "none" : "block"
                    });
                };
            case "djdisabled":
                return function () {
                    $("#dj-booth").css({
                        display: (enabled) ? "none" : "block"
                    });
                };
            case "scvisualsenabled":
                return function () {
                    if (typeof (API.getMedia()) == "object") {
                        if (typeof (API.getMedia().format) == "number" && API.getMedia().format == 2) {
                            $("#playback-controls > div.button.refresh").click();
                        } else {
                            //onAPIadvance();
                        }
                    }
                };
            case "autowootdelayrandom":
                return function () {
                    if (enabled) {
                        $("#autowootdelay > .titlecontainer.max >").attr("style", "display: inline");
                        $("#autowootdelay > .titlecontainer.min > .title").html("Autowoot Minimum Delay (seconds)");
                        $("#autowootdelay > .titlecontainer.max > .title").html("Autowoot Maximum Delay (seconds)");
                    } else {
                        var average = Math.floor((parseInt(localStorage["iplug|autowootdelaymax"]) + parseInt(localStorage["iplug|autowootdelaymin"])) / 2);
                        localStorage["iplug|autowootdelaymax"] = average;
                        localStorage["iplug|autowootdelaymin"] = average;
                        $("#autowootdelay > .titlecontainer > .value").html((average / 10).toFixed(1) + "s");
                        $("#autowootdelay > .titlecontainer.max >").attr("style", "display: none");
                        $("#autowootdelay > .titlecontainer.min > .title").html("Autowoot Delay (seconds)");
                        $("#autowootdelay > .barcontainer > .circle").attr("style", "left: " + localStorage["iplug|autowootdelaymin"] + "px");
                        $("#autowootdelay > .barcontainer > .bar.selected").attr("style", "left: " + (7 + parseInt(localStorage["iplug|autowootdelaymin"])) + "px; width: 0px");
                    }
                };
            case "scvisualsbars":
                return function () {
                    //SPACER_WIDTH = Math.floor((((300 - (parseInt(localStorage["iplug|scvisualsbarsmin"], 10))) / 12) + 0.5) * 2) / 2;
                    //SPACER_WIDTH = Math.floor(51 - parseInt(localStorage["iplug|scvisualsbarsmin"]) / 6) / 2
                };
            case "sccolorred":
            case "sccolorgreen":
            case "sccolorblue":
            case "decolorred":
            case "decolorgreen":
            case "decolorblue":
                return function () {
                    var color = "rgb(" + parseInt($("#" + id.substring(0, 2) + "colorred > .barcontainer > .circle").css("left")) + "," + parseInt($("#" + id.substring(0, 2) + "colorgreen > .barcontainer > .circle").css("left")) + "," + parseInt($("#" + id.substring(0, 2) + "colorblue > .barcontainer > .circle").css("left")) + ")";
                    $("#" + id.substring(0, 2) + "colorcolor").css("background-color", color);
                    if (id.substring(0, 2) === "sc") $("#scgradientslider > .barcontainer > .circle.selected").css("border-color", color);
                    if (id.substring(0, 2) === "de") $(".node.selected").css("background-color", color);
                    callbacks(id.substring(0, 2) + "gradientslider")();
                };
            case "autowootdelay":
                return function (values, minmax) {
                    minmax.each(function (i, a) {
                        $(a).html((values[i] / 10).toFixed(1) + "s");
                    });
                };
            case "scgradientslider":
                return function () {
                    var colors = $("#scgradientslider > .barcontainer > .circle");
                    colors.sort(function (a, b) {
                        return parseInt($(a).css("left")) - parseInt($(b).css("left"));
                    });
                    var scheme = [];
                    colors.each(function (i, a) {
                        var temp = $(a).css("border-color").split("rgb(")[1].split(")")[0].split(", ");
                        temp.forEach(function (a, i, e) {
                            e[i] = parseInt(a);
                        });
                        scheme.push([parseInt($(a).css("left")) / 300, temp]);
                    });
                    colorscheme = scheme;
                    $("#scgradientslider > .barcontainer > .bar").attr("style", setGradient(scheme));
                    var lel = [];
                    scheme.forEach(function (a, i) {
                        lel.push(a[0] + "|" + a[1].join(","));
                    });
                    localStorage["iplug|sccolorstring"] = lel.join("&");
                    updateColor();
                };
            case "degradientslider":
                return function () {
                    COLORS = [];
                    $(".node").not(".cross").each(function (i, e) {
                        COLORS.push($(e).css("background-color"));
                    });
                    localStorage["iplug|decolorstring"] = COLORS.join("|");
                };

        }
        return function () {};
    }


    function bindGradientCircleEvents(e) {
        e.bind("mouseenter", function () {
            $(this).animate({
                height: "14px",
                width: "14px",
                marginLeft: "-10px",
                marginTop: "-2px"
            }, {
                duration: 100,
                queue: false
            });
        }).bind("mouseleave", function () {
            if ($(this).hasClass("selected")) return;
            $(this).animate({
                height: "10px",
                width: "10px",
                marginLeft: "-8px",
                marginTop: "0px"
            }, {
                duration: 100,
                queue: false
            });
        }).bind("mousedown", function () {
            var settings = $(this).parent().parent().siblings(".settings");
            $(this).addClass("selected").animate({
                height: "14px",
                width: "14px",
                marginLeft: "-10px",
                marginTop: "-2px"
            }, {
                duration: 100,
                queue: false
            }).siblings(".circle").removeClass("selected").animate({
                height: "10px",
                width: "10px",
                marginLeft: "-8px",
                marginTop: "0px"
            }, {
                duration: 100,
                queue: false
            });
            settings.children(".delete").children().css(($(this).siblings(".circle").length === 0) ? {
                display: "none",
                cursor: "default"
            } : {
                display: "block",
                cursor: "pointer"
            });
            var color = $(".circle.selected").css("borderColor");
            settings.children(".colorpicker").children(".colorblock").css("background-color", color);
            color = color.split("rgb(")[1].split(",");
            settings.children(".colorpicker").children(".slider").children(".barcontainer").children(".circle").each(function (i, a) {
                $(a).css("left", parseInt(color[i]));
            });
            settings.children().css("display", "block");
        });
    }


    function colorDom(scheme) {
        var result = "";
        for (i = 0; i < scheme.length; i++) {
            result += '<div class="circle" style="left: ' + parseInt(scheme[i][0] * 300) + 'px; border-color: rgb(' + scheme[i][1].join(",") + ')"></div>';
        }
        return result;
    }


    function setGradient(scheme) {
        var moz = "-moz-linear-gradient(left";
        var webkit = "-webkit-gradient(linear, left top, right top";
        var webkiit = "-webkit-linear-gradient(left";
        var o = "-o-linear-gradient(left";
        var ms = "-ms-linear-gradient(left";
        var bg = "linear-gradient(to right";
        scheme.forEach(function (a) {
            var le = [Math.round(a[0] * 100) + "%", "rgb(" + a[1].join(",") + ")"];
            moz += ", " + le[1] + " " + le[0];
            webkit += ", color-stop(" + le[0] + ", " + le[1] + ")";
            webkiit += ", " + le[1] + " " + le[0];
            o += ", " + le[1] + " " + le[0];
            ms += ", " + le[1] + " " + le[0];
            bg += ", " + le[1] + " " + le[0];
        });
        return "background: " + moz + "); background: " + webkit + "); background: " + webkiit + "); background: " + o + "); background: " + ms + "); background: " + bg + ");";
    }






    function getGradientColor(i) {
        if (i === 1) return "rgb(" + colorscheme.last()[1].join(",") + ")";
        var min = colorscheme.filter(function (a) {
            return a[0] <= i;
        }).last() || colorscheme.last();
        var max = colorscheme.filter(function (a) {
            return a[0] > i;
        })[0] || colorscheme[0];
        var inbetween = max[0] - min[0],
            a, b;
        if (inbetween === 0) {
            a = 1;
            b = 0;
        } else {
            b = (i - min[0]) / inbetween;
            a = (max[0] - i) / inbetween;
        }
        return "rgb(" + Math.round(min[1][0] * a + max[1][0] * b) + "," + Math.round(min[1][1] * a + max[1][1] * b) + "," + Math.round(min[1][2] * a + max[1][2] * b) + ")";
    }


    function showMeh() {
        if (localStorage["iplug|listgrabmehenabled"] !== "block") return;
        var usernames = [];
        API.getUsers().filter(function (x) {
            if (x.vote === -1) return true;
        }).forEach(function (e) {
            usernames.push(e.username);
        });
        if (usernames.length > 0) Tooltip.show(usernames.join("\n"), $("#meh"), false);
    }

    function hideTooltip() {
        Tooltip.hide();
    }

    function showGrab() {
        if (localStorage["iplug|listgrabmehenabled"] !== "block") return;
        var usernames = [];
        API.getUsers().filter(function (x) {
            if (x.grab) return true;
        }).forEach(function (e) {
            usernames.push(e.username);
        });
        if (usernames.length > 0) Tooltip.show(usernames.join("\n"), $("#grab"), false);
    }
    $("#grab").on("mouseenter", showGrab).on("mouseleave", hideTooltip);
    $("#meh").on("mouseenter", showMeh).on("mouseleave", hideTooltip);

    function cardBuilder(key) {
        return '<div class="backgroundcard"  card="' + key + '"><div class="backgroundtitle noitem"><span>' + backgrounds[key].text + '</span></div><div class="backgrounddescription noitem"><p>' + backgrounds[key].description + '</p></div><img src="' + backgrounds[key].url + '" class="backgroundthumbnail"></img></div>';
    }
});






var usercode; //make global so user can access
function usercodesave() {
    if (typeof usercode !== "function") throw new Error("usercode is not a function!");
    localStorage['usercustomcode'] = usercode.toString();
    localStorage['usercustomcodesafe'] = 'TRUE';
    console.log("code updated! refresh to make it work! ;)");
}


(function () {
    if ("FALSE" !== localStorage["usercustomcodesafe"]) {
        localStorage["usercustomcodesafe"] = "FALSE";
        window.onbeforeunload = function () {
            localStorage['usercustomcodesafe'] = 'TRUE';
        };
        try {
            eval(localStorage['usercustomcode']);
            if (typeof usercode !== "function") {
                usercode = function usercode() {};
                localStorage['usercustomcode'] = usercode.toString();
                localStorage['usercustomcodesafe'] = 'TRUE';
            }
            try {
                console.log('\n\n\n\n\n/-----------------------------------------------------------------------------------------------\\\n|You opened the console! you know some code, do you?                                            |\n|Did you know that iPlug can run your code for you? allow me to demonstrate with an example:    |\n|                                                                                               |\n|function usercode() {                                                                          |\n|  console.log(\'hi!\') //will log \'hi\' in console whenever plug loads                            |\n|}                                                                                              |\n|                                                                                               |\n|usercodesave() //will save changes made to usercode                                            |\n\\-----------------------------------------------------------------------------------------------/\n\n\n\n\n');
                usercode();
            } catch (error) {
                console.log("\n\na non fatal error has been encountered while executing the custom user code, please change the function usercode(), run usercodesave(), and then refresh the page.");
                console.error(error + "\n\n");
            }
        } catch (error) {
            console.log("\n\na non fatal error has been encountered while parsing the custom user code, please change the function usercode(), run usercodesave(), and then refresh the page.");
            console.error(error + "\n\n");
        }
    } else {
        console.log('\n\n\n\n\n/-----------------------------------------------------------------------------------------------\\\n|we\'re sorry to announce that your browser has crashed last session.                            |\n|in order to avoid potentionally automaticly loading wrong code that crashes your browser,      |\n|we have automaticly disabled your code. if you want to change your code, simply modify the     |\n|function usercode(), and use usercodesave() to save the function, and then refresh.            |\n\\-----------------------------------------------------------------------------------------------/\n\n\n\n\n');
        try {
            eval(localStorage['usercustomcode']);
        } catch (error) {
            console.error("\n\nunrecoverable error while parsing custom user code :(");
            console.error(error + "\n\n");
            console.log(localStorage['usercustomcode']);
        }
    }
}());
