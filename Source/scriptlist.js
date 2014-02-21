(function () {
    listscripts = [
        "https://raw.github.com/L0laapk3/iPlug/master/Source/" + version + "logo.js",
        "https://raw.github.com/L0laapk3/iPlug/master/Source/" + version + "chatterbox.js"];

    

    for (i = 0; i <= listscripts.length; i++) {
        if (i < listscripts.length) {
            $.getScript(listscripts[i])
                .fail(function() {
                    console.warn("[iPlug]: Script number " + i + " wasn't loaded!")
                });
        } else if (i == listscripts.length) {
            console.log("[iPlug]: Scripts loaded!");
            return;
        } else {
            console.warn("[iPlug]: Error!");
        }
    }
}());
