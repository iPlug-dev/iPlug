(function () {
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
    if (undefined === localStorage["iplug|sccolorstring"]) {
        localStorage["iplug|sccolorstring"] = "0|255,0,0&0.25|255,255,0&0.5|0,255,0&0.75|0,255,255&1|0,0,255";
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
    if (undefined === localStorage["iplug|curatedisabled"]) {
        localStorage["iplug|curatedisabled"] = "none";
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
    if (undefined === localStorage["iplug|html5youtube"]) { // should be in menu :/
        localStorage["iplug|html5youtube"] = "block";
    }
    if (undefined === localStorage["iplug|audiovideo"]) { // IT SHOULD NOT BE IN MENU! (triggered by plug stuff)
        localStorage["iplug|audiovideo"] = "block";
    }

    if (localStorage["iplug|youtubevideodisabled"] == "none") {
        $("#playback").css("display", "block");
    } else {
        $("#playback").css("display", "none");
    }
    if (localStorage["iplug|curatedisabled"] == "none") {
        $("#vote").css("display", "block");
    } else {
        $("#vote").css("display", "none");
    }
    if (localStorage["iplug|waitlistdisabled"] == "none") {
        $("#dj-button").css("display", "block");
    } else {
        $("#dj-button").css("display", "none");
    }
    if (localStorage["iplug|audiencedisabled"] == "none") {
        $("#audience").css("display", "block");
    } else {
        $("#audience").css("display", "none");
    }
    if (localStorage["iplug|djdisabled"] == "none") {
        $("#dj-booth").css("display", "block");
    } else {
        $("#dj-booth").css("display", "none");
    }
    var colorscheme = localStorage["iplug|sccolorstring"].split("&");
    colorscheme.forEach(function (a, i, e) {
        e[i] = [a.split("|")[0], a.split("|")[1].split(",")];
    });


    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////

    $("body").append("<div id='iplug-overlay' style='display:none;'></div>");

    $("#waitlist > .header > .divider").remove();
    $("#waitlist > .header").append("<div class='divider left'></div>");
    $("#waitlist > .header").append("<div class='divider right'></div>");
    $(".app-right > div.friends > div.header > div.divider").remove();
	$(".app-right > div.friends > div.header").append("<div class='divider left'></div>");
	$(".app-right > div.friends > div.header").append("<div class='divider right'></div>");

    function version() {
		var b, a = Math.random().toString(), d = new CustomEvent("KrisDontTouchMyCode", {detail:{reqID:a}});
		document.addEventListener("KrisDontTouchMyCodeOK-" + a, function e(c) {
			c.detail.reqID == a && (document.removeEventListener("KrisDontTouchMyCodeOK-" + a, e), b = c.detail.v);
		});
		document.dispatchEvent(d);
		return b;
	}

    if (typeof (localStorage['iplug|version']) != "string") localStorage['iplug|version'] = "0";

    version() != localStorage["iplug|version"] && (localStorage["iplug|version"] = version(), setTimeout(function() {
		var a = "Say hello to new visualizations!\nDon't forget to enable them in settings!\nversion: " + localStorage["iplug|version"];
		$("#iplug-overlay").append("<div class='iplug-overlay-bg'></div><div class='iplug-alert'><div class='iplug-alert-frame'><span class='iplug-alert-frame-title'>iPlug has been updated!</span></div><div class='iplug-alert-body'><span class='iplug-alert-body-message'>" + a + "</span></div><div class='iplug-alert-frame'><div class='iplug-alert-button-submit'> <span>OK</span></div></div></div>").css("display", "block");
		$(".iplug-alert-button-submit").click(function() {
			$("#iplug-overlay").css("display", "none");
		});
	}, 5E3)); //5 * 10^3

    function WT() {
        if (localStorage["iplug|autowootenabled"] != "block") return;
        if ($('#woot').length > 0) {
            var v1 = $("#meh")[0] == $("#vote > .selected")[0];
            var v2 = $("#woot")[0] == $("#vote > .selected")[0];
            if (!(v1 || v2)) { //didn't work
                $("#woot").click();
                setTimeout(WT, 500); //try again
            }
        } else {
            setTimeout(WT, 1000); // object not created yet || slow pc 
        }
    }
	function JN(){
	    if (localStorage["iplug|autojoinenabled"] != "block") return;
		if (tempAutoJoinDisabled) return;
		if ($("#dj-button").length > 0) {
            var t = $("#dj-button")[0];
			if ((t == $(".is-leave")[0])||(t == $(".is-quit")[0])) return; //done
			if ((t == $(".is-full")[0])||(t == $(".is-locked")[0])) {
				return setTimeout(JN, 500);
			}
			if (t == $(".is-wait")[0]){
				$("#dj-button").click();
                return;
			}
		} else {
			setTimeout(JN, 1000); // object not created yet || slow pc || loll
		}
	}

    setTimeout(WT, 5000);// AUTO WOOT ON JOIN
	setTimeout(JN, 5000);// AUTO JOIN ON JOIN, and butter on butter is butter

/////////

var Sheet = function() {
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
    this.getRules = function(){
        return this.target.sheet.rules;
    };
    this.removeRuleByIndex = function(index) {
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
	this.replaceRule = function(selector, rule, index) {
      var i = "number" == typeof index ? index : 0;
	  this.removeRuleByName(selector, rule.substring(0,rule.indexOf(":")));
	  this.addRule(selector, rule, index);
	};
    this.removeRulesBySelector = function(selector) {
      var k = "string" == typeof selector ? selector : -1;
      if (-1 == k) {
        throw new Error("Incorrect selector!");
      }
      for (var i = this.target.sheet.rules.length;i >= 0;i--) {
        this.target.sheet.rules[i].selectorText.trim() == selector.trim() && this.removeRuleByIndex(i);
      }
    };
    this.removeRuleByName = function(selector, ruleName) {
      var k = "string" == typeof selector ? selector : -1, l = "string" == typeof ruleName ? ruleName : -1;
      if (-1 == k) {
        throw new Error("Incorrect selector!");
      }
      if (-1 == l) {
        throw new Error("Incorrect rule name!");
      }
      for (var i = this.target.sheet.rules.length;i >= 0;i--) {
        if(this.target.sheet.rules[i].selectorText == k)
		if(this.target.sheet.rules[i].style.cssText.substring(0,this.target.sheet.rules[i].style.cssText.indexOf(":")).trim() == l.trim())
          this.removeRuleByIndex(i);
      }
    };
    this.addRule = function(selector, rule, index) {
      var i = "number" == typeof index ? index : 0;
      "insertRule" in this.target.sheet ? this.target.sheet.insertRule(selector + "{" + rule + "}", i) : "addRule" in this.target.sheet && this.target.sheet.addRule(selector, rule, i);
    };
  }
  return Sheet;
}();


	window.CustomStyles = new Sheet("iplug-custom-styles");
	CustomStyles.changeBackground = function(URL){this.replaceRule("#room > i.room-background", "background: url(" + URL + ") !important");};
	CustomStyles.defaultBackground = function(){this.removeRuleByName("#room > i.room-background", "background");};
	CustomStyles.fullscreenPlayback = function() {
	this.replaceRule(".custom1", "position: fixed !important");
	this.replaceRule(".custom1", "top: " + $("#room-meta").css("height") + " !important");
	this.replaceRule(".custom1", "left: 0 !important");
	this.replaceRule(".custom1", "width: " + $("#room-meta").css("width") + " !important");
	this.replaceRule(".custom1", "height : " + $("#room > div.app-right").css("height") + " !important");	
	};
	CustomStyles.normalPlayback = function(){this.removeRulesBySelector(".custom1");};




/////////////////
    var VisualizationsHelper = {};
	
	var YoutubeHelper = {};

    VisualizationsHelper.currentRoom = window.location.href;
    YoutubeHelper.ready = false;
    VisualizationsHelper.initVolume = function () {
        var volume;
        try {
            volume = API.getVolume();
        } catch (f) {}
        if (!isFinite(volume / 100)) {
            return setTimeout(VisualizationsHelper.initVolume, 500); 
        } else {
            if (!YoutubeHelper.ready) return setTimeout(VisualizationsHelper.initVolume, 500); 
            Visualizations.setVolume(volume / 100);
            Youtube.setVolume(volume);
        }
    };
	VisualizationsHelper.visible = false;
    VisualizationsHelper.initVolume();
	VisualizationsHelper.hide = function() {
		$("#iplug-playback").stop(true).animate({opacity:"0"}, {easing: "easeOutQuint", duration:2E3, queue:!1,  step: function(now) {
		VisualizationsHelper.opacity=now;
		},complete:function() {
			this.style.display = "none";
			Visualizations.stop();
			VisualizationsHelper.visible =  !1;
		}});
	};
	VisualizationsHelper.show = function() {
		$("#iplug-playback").stop(true).animate({opacity:"1"}, {easing: "easeOutQuint", duration:2E3, queue:!1, step: function(now) {
		VisualizationsHelper.opacity=now;
		},start:function() {
			this.style.display = "block";
			Visualizations.start();
			VisualizationsHelper.visible = !0;
	}});
	};
	VisualizationsHelper.opacity = 1;
    VisualizationsHelper.location = $("#playback-container").parent()[0];
	
	
	$(VisualizationsHelper.location).append("<div id='iplug-yt-frame' frameborder='0' src=''></div>");

    YoutubeHelper.ignoreOnce = false;
	YoutubeHelper.visible = false;
	YoutubeHelper.hide = function() {
		$("#iplug-yt-frame").stop(true).animate({opacity:"0"}, {easing: "easeOutQuint", duration:2E3, queue:!1,  step: function(now) {
		YoutubeHelper.opacity=now;
		},complete:function() {
			this.style.display = "none";
			Youtube.stopVideo();
			YoutubeHelper.visible = false;
		}});
	};
	YoutubeHelper.show = function() {
		$("#iplug-yt-frame").stop(true).animate({opacity:"1"}, {easing: "easeOutQuint", duration:2E3, queue:!1, step: function(now) {
		YoutubeHelper.opacity=now;
		},start:function() {
			Youtube.playVideo();
			YoutubeHelper.visible = true;
            this.style.display = "block"; // cuz why not
	}});
	};
    var Youtube;
    var initTimeoutID = 0;
	function initYoutube() {
    clearTimeout(initTimeoutID);
	if (typeof window.YT != "object"|| typeof window.YT.Player != "function" || !window.YT.loaded) {console.warn("!");return initTimeoutID = setTimeout(initYoutube,100);}
    Youtube = new YT.Player($("#iplug-yt-frame")[0],{
		playerVars: {
		autoplay: 1,
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
		theme: "dark",
		},
	    events: {'onReady': onPlayerReady, 'onError': onErr}
    });
    }
    YoutubeHelper.chatErrorID = "0";
    YoutubeHelper.chatError = function (message) {
		var r = API.getMedia().id;
		if(YoutubeHelper.chatErrorID != r){
			YoutubeHelper.chatErrorID = API.getMedia().cid;
			$("#chat-messages").append('<div class="system" style="border-left-color: transparent;padding-left: 27px;">\
    <i class="icon icon-support-white" style="background: url(http://i.imgur.com/pTaGgcB.png);"></i>\
    <span class="text" style="color: #d1d1d1;">' + message + '</span>\
    </div>');
		}
    };
    function onErr(e){
        if (e.data == 100) {
            YoutubeHelper.chatError("100 - Video not found!");
        } else if (e.data === 101 || e.data === 150 || e.data === 5) {
            YoutubeHelper.ignoreOnce = true;
            YoutubeHelper.chatErrorID = API.getMedia().cid;
            $("#playback-controls > div.button.refresh").click();
        }
    }
	YoutubeHelper.onEvent = function(event){
        if (!YoutubeHelper.ready) return setTimeout(YoutubeHelper.onEvent,100,event);
        if (Youtube.getPlayerState() != YT.PlayerState.PAUSED) Youtube.pauseVideo();
        var cid = "";
        var yesNo; // YES, IT IS YESNO
        if (localStorage["iplug|audiovideo"] != "block")
            return YoutubeHelper.hide();
		if ("block" != localStorage["iplug|html5youtube"] || ( $("#playback-controls").hasClass("snoozed") ))
			return YoutubeHelper.hide();
		if ("object" != typeof event) {
			var a = API.getMedia();
			if (void 0 === a || "1" != a.format)
				return YoutubeHelper.hide();
			cid = a.cid;
			yesNo = !0;
		} else {
			if ("object" != typeof event.media || "1" != event.media.format)
				return YoutubeHelper.hide();
			cid = event.media.cid;
			yesNo = !1;
		}
		YoutubeHelper.show();
	    if (Youtube.getVideoData().video_id != cid) {
            Youtube.loadVideoById(cid);
        }
        Youtube.playVideo();
        if (yesNo)
        Youtube.seekTo(API.getTimeElapsed());
    };

	initYoutube();
	function onPlayerReady(event){
        YoutubeHelper.ready = true;
	}

	/*           INIT HERE              */
	
	var ALPHA, AudioAnalyser, COLORS, MP3_PATH, NUM_BANDS, NUM_PARTICLES, Particle, SCALE, SIZE, SMOOTHING, SPEED, SPIN;

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
//remove "window." !!!!!!!!!!!!!!!!!!!
COLORS = ['#69D2E7', '#1B676B', '#BEF202', '#EBE54D', '#00CDAC', '#1693A5', '#F9D423', '#FF4E50', '#E7204E', '#0CCABA', '#FF006F'];

AudioAnalyser = (function() {
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
    this.analyser.fftSize = this.numBands * 2;
    this.bands = new Uint8Array(this.analyser.frequencyBinCount);
    this.gain = this.gainNode = this.context.createGain();
	this.canPlayCalled = false;
    this.audio.addEventListener('canplay', (function(_this) {
      return function() {
        if(this.canPlayCalled) return;
        this.canPlayCalled = true;
        _this.source = _this.context.createMediaElementSource(_this.audio);
        _this.source.connect(_this.analyser);              // passing source to analyser
        _this.analyser.connect(_this.jsNode);              // analyser
        _this.jsNode.connect(_this.context.destination);   // analyser
        _this.source.connect(_this.gainNode);              // passing source to gain node (volume)
        _this.gainNode.connect(_this.context.destination); // it is now playing audio (output)
        //_this.source.connect(_this.context.destination); || it was playing audio
        return _this.jsNode.onaudioprocess = function() {
          _this.analyser.getByteFrequencyData(_this.bands);
          if (!_this.audio.paused) {
            return typeof _this.onUpdate === "function" ? _this.onUpdate(_this.bands) : void 0;
          }
        };
      };
    })(this));
  }

  AudioAnalyser.prototype.start = function() {
    return this.audio.play();
  };

  AudioAnalyser.prototype.stop = function() {
    return this.audio.pause();
  };

  return AudioAnalyser;

})();

Particle = (function() {
  function Particle(x, y) {
    this.x = x !== null ? x : 0;
    this.y = y !== null ? y : 0;
    this.reset();
  }

  Particle.prototype.reset = function() {
    this.level = 1 + floor(random(4));
    this.scale = random(SCALE.MIN, SCALE.MAX);
    this.alpha = random(ALPHA.MIN, ALPHA.MAX);
    this.speed = random(SPEED.MIN, SPEED.MAX);
    this.color = random(COLORS); //remove "window." !!!!!!!!!!!!!!!!!!!
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

  Particle.prototype.move = function() {
    this.rotation += this.spin;
    return this.y -= this.speed * this.level;
  };

  Particle.prototype.draw = function(ctx) {
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

var Visualizations = Sketch.create({
  width: parseInt($("#playback-container")[0].style.width, 10),
  height: parseInt($("#playback-container")[0].style.height, 10),
  autopause: false,
  fullscreen: false,
  analyser: 0,
  particles: [],
  container: VisualizationsHelper.location,
  play: function(){
    return this.analyser.audio.play();
  },
  pause: function(){
    return this.analyser.audio.pause();
  },
  paused: function(){
    return this.analyser.audio.paused;
  },
  setVolume: function(value){
	return this.analyser.gainNode.gain.value = value;
  },
  setSource: function(audio) {
    var temp = audio !== null ? audio : "";
    if (typeof temp === 'string') {
      this.analyser.audio.src = temp;
    }
  },
  setup: function() {
    var i, particle, warning, x, y, _i, _ref;
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
        this.analyser.onUpdate = (function(_this) {
          return function(bands) {
            var _j, _len, _ref1, _results;
            _ref1 = _this.particles;
            _results = [];
            for (_j = 0, _len = _ref1.length; _j < _len; _j++) {
              particle = _ref1[_j];
              _results.push(particle.energy = bands[particle.band] / 256);
            }
            return _results;
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
  draw: function() {
    var particle, _i, _len, _ref, _results;
    this.globalCompositeOperation = 'lighter';
    _ref = this.particles;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      particle = _ref[_i];
      if (particle.y < -particle.size * particle.level * particle.scale * 2) {
        particle.reset();
        particle.x = random(this.width);
        particle.y = this.height + particle.size * particle.scale * particle.level;
      }
      particle.move();
      _results.push(particle.draw(this));
    }
    return _results;
  }
});
	
	//////////////
	Visualizations.canvas.id = "iplug-playback";
	Visualizations.canvas.style.zIndex = "6";
	
	VisualizationsHelper.chatErrorID = 0;
    VisualizationsHelper.chatError = function (message) {
		var r = API.getMedia().id;
		if(VisualizationsHelper.chatErrorID != r){
			VisualizationsHelper.chatErrorID = API.getMedia().id;
			$("#chat-messages").append('<div class="system" style="border-left-color: transparent;padding-left: 27px;">\
    <i class="icon icon-support-white" style="background: url(https://w.soundcloud.com/icon/assets/images/orange_transparent_32-94fc761.png);"></i>\
    <span class="text" style="color: #d1d1d1;">' + message + '</span>\
    </div>');
		}
    };


    Visualizations.width = parseInt($("#playback-container")[0].style.width, 10); /*initial call*/
    Visualizations.height = parseInt($("#playback-container")[0].style.height, 10); /*initial call*/
    VisualizationsHelper.ObsrvOne = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if (mutation.attributeName == "style") {
                var te = mutation.target.style.cssText + "z-index: 6;position: absolute;top: 0;";
				var tf = mutation.target.style.cssText + "z-index: 6;position: absolute;top: 0;";
				if (YoutubeHelper.visible) {
				    tf += "display: block;";
				} else {
					tf += "display: none;";
				}
				if (VisualizationsHelper.visible) {
					te += "display: block;";
				} else {
					te += "display: none;";
				}
				te += "opcaity: " + VisualizationsHelper.opacity + ";";
				tf += "opcaity: " + YoutubeHelper.opacity + ";";
                $("#iplug-playback")[0].style.cssText = te;
				$("#iplug-yt-frame")
				.attr("width", parseInt(mutation.target.style.width, 10) + "px")
				.attr("height", parseInt(mutation.target.style.height, 10) + "px")[0]
				.style.cssText = tf;
				Visualizations.width = parseInt(mutation.target.style.width, 10);
				Visualizations.height = parseInt(mutation.target.style.height, 10);
            }
        });
    });
    VisualizationsHelper.ObsrvOne.observe($("#playback-container")[0], {
        attributes: true,
        childList: false,
        characterData: false
    });
    VisualizationsHelper.ObsrvTwo = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
			var temp = (API.getVolume() / 100);
			if (isFinite(temp)) {
				try {Visualizations.setVolume(temp); } catch(f){}
                try {Youtube.setVolume(temp*100);    } catch(f){}
            }
        });
    });
    VisualizationsHelper.ObsrvTwo.observe($("#volume > span")[0], {
        attributes: false,
        childList: true,
        characterData: false
    });
    YoutubeHelper.ObsrvOne = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            for (var i = mutation.addedNodes.length - 1; i >= 0; i--){
                if (localStorage["iplug|html5youtube"] == "block") {
                    if (YoutubeHelper.chatErrorID != API.getMedia().cid) {
                        if (!YoutubeHelper.ignoreOnce) {
                            mutation.addedNodes[i].remove();
                        }
                    }
                }
            }
        });
        if (YoutubeHelper.ignoreOnce) {
            YoutubeHelper.ignoreOnce = false;
            YoutubeHelper.hide();
        }
        if (YoutubeHelper.chatErrorID == API.getMedia().cid) {
            YoutubeHelper.hide();
        }
    });
    YoutubeHelper.ObsrvOne.observe($("#playback-container")[0], {
        attributes: false,
        childList: true,
        characterData: false
    });

    $("#iplug-playback")[0].style.cssText = $("#playback-container")[0].style.cssText + "z-index: 6;position: absolute;top: 0;"; /*initial call*/

    

    VisualizationsHelper.clientID = "9258af128ee9d4c781d46b31917531e7";
    /* GET YOUR OWN CLIENT ID ON HTTP://DEVELOPERS.SOUNDCLOUD.COM 
     * DON'T USE MINE :)
     */
    VisualizationsHelper.killFlash = function () {
        try {
            if ($("#playback-controls")[0] == $(".snoozed")[0]) {
                Visualizations.setSource("");
            }
            if (localStorage['iplug|scvisualsenabled'] != "block") {
                soundManager.unmuteAll();
                return false;
            }
            $("#playback-buffering").text("").css("display", "none");
            if (!soundManager.muted) soundManager.muteAll();
            if (soundManager.muted) soundManager.stopAll();
        } catch (f) {}
    };
    setInterval(VisualizationsHelper.killFlash, 2000);
    VisualizationsHelper.onEvent = function (event) {
        if (!Visualizations.paused()) Visualizations.pause();
        var cid = "";
        var yesNo; // YES, IT IS YESNO
        if (localStorage["iplug|audiovideo"] != "block")
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
                if (data.streamable === true) { //start working now
                    var streamURL = data.stream_url + '?client_id=' + VisualizationsHelper.clientID;
                    VisualizationsHelper.playIt(yesNo, streamURL);
                } else {
                    VisualizationsHelper.chatError("Track not streamable!");
                }
            } else {
                VisualizationsHelper.chatError(JSON.parse(data.responseText).errors[0].error_message);
            }
        });
    };

    VisualizationsHelper.playIt = function (yesNo, streamURL) {
        if (yesNo) {
            Visualizations.setSource(streamURL + "#t=" + API.getTimeElapsed());
        } else {
            Visualizations.setSource(streamURL);
        }
        Visualizations.play();
    };

    $("#playback-controls > div.button.hd").bind("click",function(a) {
        var q;
        if ($("#playback-controls > div.button.hd > div.box > span.label").text() == "ON"){
            var f = Youtube.getPlaybackQuality();
            var g = Youtube.getAvailableQualityLevels();
            if (g.length == 0) return;
            q = g.indexOf("highres") > -1 ? "highres" : g.indexOf("hd1080") > -1 ? "hd1080" : g.indexOf("hd720") > -1 ? "hd720" : g.indexOf("large") > -1 ? "large" : g.indexOf("medium") > -1 ? "medium" : "default";
        } else { // off 
            q = "default";
        }
        Youtube.setPlaybackQuality(q);
    });
    $(document).on("click", "#user-settings > div.application.section > div > div:nth-child(5) > div", function(){ 
         localStorage["iplug|audiovideo"] = localStorage["iplug|audiovideo"] == "block" ? "none" : "block";
         onAPIadvance();
    });
    $("#playback-controls > div.button.refresh").click(function () {
        onAPIadvance();
    });

    $("#playback-controls > div.button.snooze").click(function () {
         onAPIadvance();
    });

    VisualizationsHelper.initCall = function () {
        if (!($('#room-loader').length > 0) && (API.enabled)) {
            VisualizationsHelper.onEvent();
            YoutubeHelper.onEvent();
            return false;
        }
        setTimeout(VisualizationsHelper.initCall, 1000);
    };
    VisualizationsHelper.initCall();
    
    function onAPIadvance(a){
        VisualizationsHelper.onEvent(a);
        YoutubeHelper.onEvent(a);
        Youtube.hideVideoInfo();
    }

    API.on(API.ADVANCE, onAPIadvance);

    YoutubeHelper.ObsrvTwoIgnoreOnce = false;
    YoutubeHelper.ObsrvTwo = new MutationObserver(function (mutations) {
        var u = window.location.href;
        if (!YoutubeHelper.ObsrvTwoIgnoreOnce){
            if (u == VisualizationsHelper.currentRoom) return;
            YoutubeHelper.ObsrvTwoIgnoreOnce = true;   
        } else YoutubeHelper.ObsrvTwoIgnoreOnce = false;
        tempAutoJoin(false);
        VisualizationsHelper.currentRoom = u;
        WT();
        JN();
        onAPIadvance();
    });
    YoutubeHelper.ObsrvTwo.observe($("#now-playing-media")[0], {
        attributes: false,
        childList: true,
        characterData: false,
        subtree: true
    });


//========== INIT
    $("#playback-container").css("width", $("#playback-container").css("width"));
    if ("block" == localStorage["iplug|html5youtube"]) $("#yt-frame").remove();
/////


    var pos = -3, prevpos = -3;
	function smartAutoJoin(){
		if (API.getDJ() !== undefined && API.getDJ().id == API.getUser().id) {
			pos = -2;
		} else {
			if (API.getWaitListPosition() > -1)
				pos = 0;
			else pos = -1;
		}
		if (prevpos === 0) {
			if (pos ===  0) {prevpos = pos; return;}
			if (pos == -2) {prevpos = pos; return;}
			if (pos == -1) {prevpos = pos; tempAutoJoin(true);} // TEMP DISABLE AUTO JOIN
		} else if (prevpos == -2) {
			if (pos == -1) {prevpos = pos; return;} // DJ CYCLE OFF
			if (pos ===  0) {prevpos = pos; return;} // DJ CYCLE ON
		} else if (prevpos == -1) {
			if (pos ===  0) {prevpos = pos; tempAutoJoin(false);} // MAKE IT WORK NORMALLY
			if (pos == -2) {prevpos = pos; tempAutoJoin(false);}
		}
	}
	/*INIT CALL*/
	function smartAutoJoinInit(){
		if ((pos != -3)||(prevpos != -3)) return; // event was faster hehe
		if ((typeof (API) == "object") && (typeof (API.enabled) == "boolean") && !($('#room-loader').length > 0) && (API.enabled)) {
			if (API.getDJ() !== undefined && API.getDJ().id == API.getUser().id) {
				prevpos = -2;
				pos = -2;
			} else {
				if (API.getWaitListPosition() > -1){
					prevpos = 0; pos = 0;
				} else { 
					prevpos = -1; pos = -1; 
				} 
			}
		} else {
			setTimeout(smartAutoJoinInit, 500);
		}
	}
    smartAutoJoinInit();
	/**********/
    var tempAutoJoinDisabled = false;
    function tempAutoJoin(enabled){
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






$("#playback-container").addClass("custom1");
$("#iplug-yt-frame").addClass("custom1");
$("#iplug-playback").addClass("custom1");







    //=============================================================================================================================================\\
    //=============================================================================================================================================\\
    //=============================================================================================================================================\\
    //=============================================================================================================================================\\
    //=============================================================================================================================================\\














    
    var mehupdate = false;
    var lasttimer = 0;

    API.on(API.USER_JOIN, displayMeh);
    API.on(API.USER_LEAVE, displayMeh);
    $("#users-button, .icon-clear-input").bind("click", displayMeh);
    $("#list-filter-input").bind("keyup", displayMeh);

    function displayMeh() {
        if (mehupdate) {
            return;
        }
        if ($("#users-button").attr("class").indexOf("selected") == -1 || $(".header > .room").attr("class").indexOf("selected") == -1) {
            clearInterval(lasttimer);
            return;
        }
        mehupdate = true;
        setTimeout(function () {
            mehupdate = false;
        }, 0);
        $("#wootchangetracker").unbind().remove();
        var users = API.getUsers();
        $(".user > .icon-grab").attr("style", "margin-right: 30px;");
        $(".user > .name").attr("style", "left: 68px");
        $(".user > .icon-woot, .leveldisplay").remove();
        users = users.filter(function (user) {
            return -1 != user.username.toLowerCase().indexOf($("#list-filter-input").val().toLowerCase());
        });
        for (i = 0; i < users.length; i++) {
            $($(".user > .name")[i]).parent().append(["<i class='icon icon-woot' style='background-position: -174px -280px'></i>", "", "<i class='icon icon-woot'></i>"][users[i].vote + 1] + "<div class='leveldisplay' style='left:30px; height: 30px; width: 46px'><span class='name' style='top: 5px; margin-left: auto; margin-right: auto; left: 25px;width: 43px;text-align: center;color: rgb(128, 134, 145); font-size: 15px'>" + users[i].level + "</span></div>");
        }
        if (0 === $("#removedcheck").length) {
            $("#user-lists > .jspScrollable > .jspContainer > .jspPane").prepend("<div id='removedcheck'></div>");
        }
        clearInterval(lasttimer);
        lasttimer = setInterval(checkplugrefresh, 50);
    }


    function checkplugrefresh() {
        if (0 === $("#removedcheck").length) {
            displayMeh();
        }
    }


    setTimeout(function () {
        $("#dialog-container").attr("style", "");
    }, 5000);



    Array.prototype.last = function () {
        return this[this.length - 1];
    };


    


    var mouseX;
    var mouseY;
    var mouseChange;
    $(window).bind("mousemove", function (event) {
        mouseX = event.pageX;
        mouseY = event.pageY;
        mouseChange = true;
    });


    var dragging = false;

    API.on(API.ADVANCE, function () {
        setTimeout(WT, Math.round(100 * parseInt(localStorage["iplug|autowootdelaymin"]) + Math.random() * (100 * parseInt((localStorage["iplug|autowootdelaymax"]) - parseInt(localStorage["iplug|autowootdelaymin"]))), 0));
    });

    API.on(API.WAIT_LIST_UPDATE, function () {
		smartAutoJoin(); // init settings
		JN();
    });


    $("#header-panel-bar").append("<div id='iplug-button' class='header-panel-button'><div class='box'><i class='icon-iplug'></i></div></div>");
    $(".app-right").append('<div id="iplug-menu" style="display: none"> <div class="header"><span class="title">iPlug Menu</span> <div class="divider"></div> </div> <div id="iplug-menu-container"> <div class="iplug-menu-autowoot iplug-container"> <div id="autowoot" class="subcontainer"><i class="iplug-collapse icon icon-arrow-up" style="text-indent: 0px"></i> <div id="autowootenabled" class="item item-iplug"> <i class="icon icon-check-blue" style="display: ' + localStorage['iplug|autowootenabled'] + '"></i> <span class="subtitle">Autowoot</span> </div> <div id="autowootdelay" class="slider">' + {block: ' <div class="titlecontainer min"><span class="title">Autowoot Minimum Delay (Seconds)</span><span class="value">' + ((localStorage['iplug|autowootdelaymin'] / 10).toFixed(1)) + 's</span> </div> <div class="titlecontainer max"><span class="title" style="display: inline">Autowoot Maximum Delay (Seconds)</span><span class="value" style="display: inline">' + ((localStorage["iplug|autowootdelaymax"] / 10).toFixed(1)) + 's</span> </div>', none: ' <div class="titlecontainer min"><span class="title">Autowoot Delay (Seconds)</span><span class="value">' + ((localStorage['iplug|autowootdelaymin'] / 10).toFixed(1)) + 's</span> </div> <div class="titlecontainer max"><span class="title" style="display: none"></span><span class="value" style="display: none">' + ((localStorage['iplug|autowootdelaymax'] / 10).toFixed(1)) + 's</span> </div>'}[localStorage['iplug|autowootdelayrandom']] + ' <div class="counts"> <span class="count">0s</span> <span class="count">10s</span> <span class="count">20s</span> <span class="count">30s</span><span class="stretch"></span> </div> <div class="barcontainer"> <div class="bar background"></div> <div class="bar selected" style="left: ' + (7 + parseInt(localStorage['iplug|autowootdelaymin'])) + 'px; width: ' + (parseInt(localStorage['iplug|autowootdelaymax']) - parseInt(localStorage['iplug|autowootdelaymin'])) + 'px"></div> <div class="hit"></div> <div class="circle" style="left: ' + localStorage['iplug|autowootdelaymin'] + 'px;"></div> <div class="circle" style="left: ' + localStorage['iplug|autowootdelaymax'] + 'px;"></div> </div> </div> <div id="autowootdelayrandom" class="item item-iplug"> <i class="icon icon-check-blue" style="display: ' + localStorage['iplug|autowootdelayrandom'] + '"></i> <span>Advanced Autowoot Timing</span> </div> </div> <div id="visuals" class="subcontainer"><i class="iplug-collapse icon icon-arrow-up" style="text-indent: 0px"></i> <div class="noitem"><span class="subtitle">Visual Options</span> </div> <div id="youtubevideodisabled" class="item item-iplug"><i class="icon icon-check-blue" style="display: ' + localStorage['iplug|youtubevideodisabled'] + '"></i><span>Hide Youtube Video</span> </div> <div id="curatedisabled" class="item item-iplug"><i class="icon icon-check-blue" style="display: ' + localStorage['iplug|curatedisabled'] + '"></i><span>Hide Vote Buttons</span> </div> <div id="waitlistdisabled" class="item item-iplug"><i class="icon icon-check-blue" style="display: ' + localStorage['iplug|waitlistdisabled'] + '"></i><span>Hide Waitlist Join Button</span> </div> <div id="audiencedisabled" class="item item-iplug"><i class="icon icon-check-blue" style="display: ' + localStorage['iplug|audiencedisabled'] + '"></i><span>Hide Audience</span> </div> <div id="djdisabled" class="item item-iplug"><i class="icon icon-check-blue" style="display: ' + localStorage['iplug|djdisabled'] + '"></i><span>Hide DJ</span> </div> </div> <div id="scvisuals" class="subcontainer"><i class="iplug-collapse icon icon-arrow-up" style="text-indent: 0px"></i> <div id="scvisualsenabled" class="item item-iplug"> <i class="icon icon-check-blue" style="display: ' + localStorage['iplug|scvisualsenabled'] + '"></i> <span class="subtitle">Alternative Soundcloud Visuals</span> </div> <div id="visualsstyle" class="noitem centerall" style="width: 300px;"><span style="font-weight: normal; color: #fff">Style ' + (parseInt(localStorage['iplug|scvisualsstyle']) + 1) + '</span><span> - change Style</span> </div> <div id="visuals1" style="' + ((localStorage['iplug|scvisualsstyle'] === '1') ? '' : 'height: 0px; opacity: 0') + '"> <div class="settings"> <div class="noitem delete" style="display: none"><span>Delete</span> </div> <div class="colorpicker" style="display: none"> <div id="sccolorred" class="slider"> <div class="barcontainer"> <div class="bar background"></div> <div class="hit"></div> <div class="circle" style="left: 0px; background-color: #f00"></div> </div> </div> <div id="sccolorgreen" class="slider"> <div class="barcontainer"> <div class="bar background"></div> <div class="hit"></div> <div class="circle" style="left: 0px; background-color: #0f0"></div> </div> </div> <div id="sccolorblue" class="slider"> <div class="barcontainer"> <div class="bar background"></div> <div class="hit"></div> <div class="circle" style="left: 0px; background-color: #00f"></div> </div> </div> <div id="sccolorcolor" class="colorblock" style="background-color: rgb(0, 0, 0);"></div> </div> </div> <div class="nodecontainer"> <div class="node cross"> <div class="horizontal"></div><div class="vertical"></div></div></div></div> <div id="visuals0" style="' + ((localStorage['iplug|scvisualsstyle'] === '0') ? '' : 'height: 0px; opacity: 0') + '"> <div id="scvisualsbars" class="slider"> <div class="counts"> <span class="count">Useless</span> <span class="count">Useless</span> <span class="stretch"></span> </div> <div class="barcontainer"> <div class="bar background"></div> <div class="hit"></div> <div class="circle" style="left: ' + localStorage['iplug|scvisualsbarsmin'] + 'px;"></div> </div> </div> <div id="sccolorstring" class="gradientpicker"> <div class="settings"> <div class="noitem delete" style="display: none"><span>Delete</span> </div> <div class="colorpicker" style="display: none"> <div id="sccolorred" class="slider"> <div class="barcontainer"> <div class="bar background"></div> <div class="hit"></div> <div class="circle" style="left: 0px; background-color: #f00"></div> </div> </div> <div id="sccolorgreen" class="slider"> <div class="barcontainer"> <div class="bar background"></div> <div class="hit"></div> <div class="circle" style="left: 0px; background-color: #0f0"></div> </div> </div> <div id="sccolorblue" class="slider"> <div class="barcontainer"> <div class="bar background"></div> <div class="hit"></div> <div class="circle" style="left: 0px; background-color: #00f"></div> </div> </div> <div id="sccolorcolor" class="colorblock" style="background-color: rgb(0, 0, 0);"></div> </div> </div> <div id="scgradientslider" class="slider"> <div class="barcontainer gradient"> <div class="bar background" style="' + setGradient(colorscheme) + '"></div> <div class="hit"></div>' + colorDom(colorscheme) + '</div> </div> <div class="noitem centerall"><span>Recenter all markers</span> </div> </div> </div> </div> <div id="misc" class="subcontainer"><i class="iplug-collapse icon icon-arrow-up" style="text-indent: 0px"></i> <div class="noitem"><span class="subtitle">Misc Options</span> </div> <div id="autojoinenabled" class="item item-iplug"> <i class="icon icon-check-blue" style="display: ' + localStorage['iplug|autojoinenabled'] + '"></i> <span>Autojoin</span> </div> <div id="listgrabmehenabled" class="item item-iplug"> <i class="icon icon-check-blue" style="display: ' + localStorage['iplug|listgrabmehenabledenabled'] + '"></i> <span>List grabs & mehs</span> </div> </div> </div> </div></div>');
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
            $(item).children("span").each(function(i, e) {
                width += parseInt($(e).css("width"));
            });
            $(item).css("width", width + "px");
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
        if ($(this).attr("class") == "iplug-collapse icon icon-arrow-up") {
            newclass = "iplug-collapse icon icon-arrow-down";
            newheight = $(this).parent().css("height", "").css("height");
            $(this).parent().css("height", "30px");
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


    $("#visualsstyle").bind("click", function() {
        if ($("#scvisuals").is(':animated')) return;
        $("#scvisuals > .iplug-collapse.icon-arrow-down").trigger('mousedown');
        setTimeout(function() {
            $("#visuals" + localStorage['iplug|scvisualsstyle']).css("height", "0px").css("opacity", "0");
            localStorage['iplug|scvisualsstyle'] = (1 + parseInt(localStorage['iplug|scvisualsstyle'])) % 2;
            $("#visuals" + localStorage['iplug|scvisualsstyle']).css("height", "").css("opacity", "");
            $("#visualsstyle > span").first().html("Style " + (1 + parseInt(localStorage['iplug|scvisualsstyle'])));
            $("#scvisuals > .iplug-collapse.icon-arrow-up").trigger('mousedown');
        }, 750);
    });


    $(".nodecontainer .node.cross").bind("click", function() {
        $(this).after('<div class="node"></div>');
        $(this).parent().animate({height: -19 * Math.floor(-$(".node").length / 16) + "px"}, {duration: 250, queue: false});
        $(this).parent().children(".node").each(function(i, e) {
            $(e).animate({right: 5 + 19 * (i % 16) + "px", top: 5 +  19 * Math.floor(i / 16) + "px"}, {duration: 250, queue: false});
        });
    });


    bindGradientCircleEvents($(".iplug-container .gradientpicker > .slider .barcontainer.gradient > .circle"));


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
	function updateTooltip(_this){
		$("#tooltip").css("top",($(_this.target).offset().top - 28) + 'px');
		$("#tooltip").css("right", (window.innerWidth - $(_this.target).offset().left - $(_this.target).width() + 2) + 'px');
		$("#tooltip>span").html(parseInt(_this.target.style.left,10));
	}
	$(".iplug-container .colorpicker .slider .barcontainer .circle").bind("mouseenter", function (_this) {
		overCircle = true;
        $("#tooltip").remove();
		$("body").append('<div id="tooltip" style="top: ' + ($(_this.target).offset().top - 28) + 'px; left: initial; right: ' + (window.innerWidth - $(_this.target).offset().left - $(_this.target).width() + 2) + 'px;" class="right"><span>'+ parseInt(_this.target.style.left,10) +'</span><div class="corner"></div></div>');
    }).bind("mousedown", function (_this) {
		holdingCircle = true;
        $("#tooltip").remove();
		$("body").append('<div id="tooltip" style="top: ' + ($(_this.target).offset().top - 28) + 'px; left: initial; right: ' + (window.innerWidth - $(_this.target).offset().left - $(_this.target).width() + 2) + 'px;" class="right"><span>'+ parseInt(_this.target.style.left,10) +'</span><div class="corner"></div></div>');
    }).bind("mouseleave", function () {
	    overCircle = false;
		if (!holdingCircle){
			$("#tooltip").remove();
		}
    });
	$(window).bind("mouseup", function () {
		holdingCircle = false;
		if (!overCircle){
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
		if ($(".colorpicker").find(victim)[0] == victim[0])	{
			updateTooltip({target: victim[0]});
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
				return function(){
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
                        $("#playback").css("display", "none");
                    } else {
                        $("#playback").css("display", "block");
                    }
                };
            case "curatedisabled":
                return function () {
                    if (enabled) {
                        $("#vote").css("display", "none");
                    } else {
                        $("#vote").css("display", "block");
                    }
                };
            case "waitlistdisabled":
                return function () {
                    if (enabled) {
                        $("#dj-button").css("display", "none");
                    } else {
                        $("#dj-button").css("display", "block");
                    }
                };
            case "audiencedisabled":
                return function () {
                    if (enabled) {
                        $("#audience").css("display", "none");
                    } else {
                        $("#audience").css("display", "block");
                    }
                };
            case "djdisabled":
                return function () {
                    if (enabled) {
                        $("#dj-booth").css("display", "none");
                    } else {
                        $("#dj-booth").css("display", "block");
                    }
                };
            case "scvisualsenabled":
                return function () {
                    if (typeof(API.getMedia()) == "object") {
						if (typeof(API.getMedia().format) == "number" && API.getMedia().format == 2) {
							$("#playback-controls > div.button.refresh").click();
						} else {
							onAPIadvance();
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
                return function () {
                    var color = "rgb(" + parseInt($("#sccolorred > .barcontainer > .circle").css("left")) + "," + parseInt($("#sccolorgreen > .barcontainer > .circle").css("left")) + "," + parseInt($("#sccolorblue > .barcontainer > .circle").css("left")) + ")";
                    $("#sccolorcolor").css("background-color", color);
                    $("#scgradientslider > .barcontainer > .circle.selected").css("border-color", color);
                    callbacks("scgradientslider")();
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










    var callbackstate = false;
    
    $("#grab, #meh").bind("mouseenter", function () {
        if (localStorage["iplug|listgrabmehenabled"] !== "block") return;
        if (callbackstate) {
            $("#tooltip > span:not(:first-child)").remove();
            $(this).trigger("mouseleave");
        }
        var list;
        switch ($(this).attr("id")) {
            case "grab":
                list = API.getUsers().filter(function (a) {
                    return a.grab;
                });
                break;
            case "meh":
                list = API.getUsers().filter(function (a) {
                    return (a.vote === -1);
                });
                break;
        }
        if (list.length === 0) return;
        if (API.getDJ().id == API.getUser().id) $("body").append('<div id="tooltip" style="top: ' + ($("this").offset().top - 34) + 'px; left: ' + ($(this).offset().left + 42) + 'px;" class="right"><span></span><div class="corner"></div></div>');
        $("#tooltip > span").html(list.shift().username);
        $("#tooltip").css("top", parseInt($("#tooltip").css("top")) - 24 * list.length + "px");
        var string = "";
        list.forEach(function (a) {
            string += "<span>" + a.username + "</span>";
        });
        $("#tooltip").append(string);
    }).bind("mouseleave", function () {
        if (localStorage["iplug|listgrabmehenabled"] !== "block") return;
        if (callbackstate = !callbackstate) $(this).trigger("mouseenter");
    });
}());






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
                console.log('\n\n\n\n\n/-----------------------------------------------------------------------------------------------\\\n|You opened the console! you know some code, do you? allow me to demonstrate with an example:   |\n|                                                                                               |\n|function usercode() {                                                                          |\n|  console.log(\'hi!\') //will log \'hi\' in console whenever plug loads                            |\n|}                                                                                              |\n|                                                                                               |\n|usercodesave() //will save changes made to usercode                                            |\n\\-----------------------------------------------------------------------------------------------/\n\n\n\n\n');
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
