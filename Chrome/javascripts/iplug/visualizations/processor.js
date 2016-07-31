define(["iplug/class"], function(Class) {
    var n = Class.extend({
        init: function() {
            var AudioContext = self.AudioContext || self.webkitAudioContext;
            this.ctx = new AudioContext();
            this.audio = new Audio();
            this.audio.autoplay = true
            this.audio.controls = false;
            this.audio.loop = false;
            this.audio.preload = "auto";
            this.audio.crossOrigin = "anonymous";
            this.audioSrc = this.ctx.createMediaElementSource(this.audio);
            this.analyser = this.ctx.createAnalyser();
            this.volumeNode = this.ctx.createGain();
            this.audioSrc.connect(this.analyser);
            this.audioSrc.connect(this.volumeNode);
            this.volumeNode.connect(this.ctx.destination);
            //this.analyser.connect(this.ctx.destination);
            //this.analyser.minDecibels = -200;
            //this.analyser.maxDecibels = 0;
            this.frequencyData = new Uint8Array(this.analyser.frequencyBinCount);
            this.timeDomainData = new Uint8Array(this.analyser.fftSize);
        },
        setSource: function(obj) {
            this.audio.src = obj.url;
            if (typeof obj.volume === "number") {
                this.setVolume(obj.volume);
            }
            if (typeof obj.seek === "number") {
                var seekTo = function(event) {
                    this.audio.removeEventListener("canplay", seekTo);
                    this.setCurrentTime(obj.seek);
                }.bind(this);
                this.audio.addEventListener("canplay", seekTo, false);
            }
        },
        setCurrentTime: function(t) {
            this.audio.currentTime = t;
        },
        isPlaying: function() {
            return !this.audio.paused;
        },
        getFrequencyData: function() {
            this.analyser.getByteFrequencyData(this.frequencyData);
            return this.frequencyData;
        },
        getTimeDomainData: function() {
            this.analyser.getByteTimeDomainData(this.timeDomainData);
            return this.timeDomainData;
        },
        setVolume: function(value) {
            return this.volumeNode.gain.value = value;
        },
        setFFTsize: function(value) {
            this.analyser.fftSize = value;
            this.frequencyData = new Uint8Array(this.analyser.frequencyBinCount);
            this.timeDomainData = new Uint8Array(this.analyser.fftSize);
        }
    });
    return new n();
});