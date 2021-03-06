define(function () {
    return [{
        version: "0.2.4.0",
        text: ["-Proper changelog!", "-Images in chat!", "-Youtube in chat!", "-Expand images & videos!", "-Grab songs directly from chat!"]
    }, {
        version: "0.2.4.2",
        text: ["-Playback controls can now hide!", "-Fix thumbnail for live youtube videos"],
        convert: function () {
            localStorage['iplug|usercustomcode'] = localStorage['usercustomcode'];
            localStorage['iplug|usercustomcodesafe'] = localStorage['usercustomcodesafe']
        }
    }, {
        version: "0.2.4.3",
        text: ["-Meh is now a toggle button!"]
    }, {
        version: "0.2.5.0",
        text: ["-Twitch.tv emotes!", "-Zoom in on images!"]
    }, {
        version: "0.2.5.1",
        text: ["-More emotes!"]
    }, {
        version: "0.2.5.3",
        text: ["-Even more emotes!"]
    }, {
        version: "0.2.6.0",
        text: ["-Search trough emotes!",
               "-Improved image loading!",
               "-Indirect images now work! (prntscr, gyazo, ..)",
               "-Improved mention search!"]
    }, {
        version: "0.9.9.99",
        title: "Prepare for the big update!",
        text:  ["-Desktop notifications!",
                "-Multiplaylist select!",
                "-Automeh remembererer",
                "-Plug portrait mode!",
                "-Sped up plug loading times!",
                "-New emotes!",
                "-Much, much more!"]
    }/*, {
        version: "1.0.0.0",
        title: "THE BIG UPDATE!",
        text:  [""]
    }*/]
});
