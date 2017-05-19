define(["iplug/class", "iplug/settings", "jquery", "iplug/soundcloud-api", "iplug/visualizations/processor", "iplug/visualizations/style1", "iplug/visualizations/style2"], function(Class, Settings, $, SC, Processor, Style1, Style2) {
    var n = Class.extend({
        init: function() {
            this.frameID = 0;
            this.runBind = _.bind(function() {
                this.draw();
                this.run();
            }, this);
            this.$canvas = $("<canvas>").attr("id", "ip-frame");
            this.ctx = this.$canvas[0].getContext("2d");
            this.lastDraw = new Date();
        },
        render: function($container) {
            this.onResize();
            this.ctx.globalCompositeOperation = 'lighter';
            return this.$canvas.appendTo($container);
        },
        draw: function() {
            var t = new Date();
            var time = {
                current: t,
                delta: t - this.lastDraw,
                previous: this.lastDraw
            };
            var fData = Array.from(Processor.getFrequencyData());
            var tData = Array.from(Processor.getTimeDomainData());

            //*****STATS CODE*****
            if (!window.stats) window.stats = {};
            var s_data = Array.from(fData);
            var i = s_data.length - 1;
            while (s_data[i] === 0 && --i >= 0) s_data.pop();
            window.stats[s_data.length] = window.stats[s_data.length] ? window.stats[s_data.length] + 1 : 1;
            //*****STATS CODE*****

            if (fData.indexOf(255) > -1) {
                Processor.analyser.maxDecibels = Math.min(Processor.analyser.maxDecibels + 1, 0);
            }

            switch (Settings.visualizations.style) {
                case 1:
                    Style1.draw(this.ctx, fData, tData, time);
                    break;
                case 2:
                    Style2.draw(this.ctx, fData, tData, time);
                    break;
            }
            this.lastDraw = t;
        },
        updateMedia: function(obj) {
            return false;

            SC.tracks(obj.media.get("cid"), function(err, data) {
                if (err) throw err; //BETTER HANDLE REQUIRED
                console.log(data);
                if (!data.streamable || !data.stream_url) {
                    return; // HANDLE NON-STREAMABLE (some popup)
                }
                var url = new URL(data.stream_url);
                url.searchParams.append("client_id", SC.clientID);
                Processor.setSource({
                    url: url.toString(),
                    seek: obj.seek,
                    volume: obj.volume
                });
                this.updateStyles({
                    artwork: (data.artwork_url || data.user.avatar_url).replace("large", "crop"),
                    title: obj.media.get("title"),
                    author: obj.media.get("author")
                })
            }.bind(this));
        },
        updateStyles: function(obj) {
            Style1.update(this.ctx, obj);
            Style2.update(this.ctx, obj);
        },
        run: function() {
            this.lastDraw = new Date();
            this.frameID = requestAnimationFrame(this.runBind);
        },
        reset: function() {
            cancelAnimationFrame(this.frameID);
            Style1.reset();
            Style2.reset();
        },
        onResize: function() { //TODO: BIND
            setTimeout(function() {
                this.$canvas.attr("width", this.$canvas.width());
                this.$canvas.attr("height", this.$canvas.height());
                this.updateStyles();
            }.bind(this), 0);
        }
    });
    return new n();
});