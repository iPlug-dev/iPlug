define(["iplug/class"], function (Class) {
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
