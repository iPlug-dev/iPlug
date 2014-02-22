(function () {
    listscripts = [
        "https://raw.github.com/L0laapk3/iPlug/master/Source/" + localStorage['iPlug|version'] + "/main.js"
//     ,"https://raw.github.com/L0laapk3/iPlug/master/Source/" + localStorage['iPlug|version'] + "/chatterbox.js"
        ];

    

    for (i = 0; i <= listscripts.length; i++) {
        if (i < listscripts.length) {
            $.getScript(listscripts[i])
                .fail(function() {
                    console.warn("[iPlug]: Script " + (i+1) + " wasn't loaded!")
                });
        } else if (i == listscripts.length) {
            console.log("[iPlug]: Scripts loaded!");
            return;
        } else {
            console.warn("[iPlug]: Error!");
        }
    }
}());
