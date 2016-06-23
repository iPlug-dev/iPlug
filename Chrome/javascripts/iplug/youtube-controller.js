define(["iplug/class","iplug/youtube-api"], function (Class, api) {
    var n = Class.extend({
        init: function ($el, cid, seekTo, successCallback, failureCallback) {
            if (!api.loading || !api.loaded) return failureCallback();
            this.controls = new api.YT.Player($el[0], {
                videoId: cid,
                playerVars: {
                    start: seekTo,
                    autoplay: 0, //1,
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
