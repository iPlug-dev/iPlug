(function () {
    listscripts = [
        "https://raw.github.com/L0laapk3/iPlug/master/Source/logo.js",
        "https://raw.github.com/L0laapk3/iPlug/master/Source/chatterbox.js"];

    console.log("[iPlug]: Loading more scripts...");

    for (i = 0; i <= listscripts.length; i++) {
        if (i < listscripts.length) {
            var jsCode = document.createElement('script');
            jsCode.setAttribute('id', 'iPlug-' + listscripts[i].substring(52, listscripts[i].length - 3));
            jsCode.setAttribute('src', listscripts[i]);
            document.body.appendChild(jsCode);
        } else if (i == listscripts.length) {
            console.log("[iPlug]: Scripts loaded!");
            return;
        } else {
            console.log("[iPlug]: Error!");
        }
    }
}());
