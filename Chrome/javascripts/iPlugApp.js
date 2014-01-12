(function () {
    var jssCode = document.createElement('script');
    jssCode.setAttribute('id', 'iPlug-javascript');
    jssCode.setAttribute('src', 'https://raw.github.com/L0laapk3/iPlug/master/Source/scriptlist.js');
    document.body.appendChild(jssCode);
    for (var i = 0; i < iPlugscripts.length; i++) {
        var jsCode = document.createElement('script');
        jsCode.setAttribute('id', 'iPlug-' + iPlugscripts[i].substring(0, iPlugscripts.length - 3));
        jsCode.setAttribute('src', iPlugscripts[i]);
        document.body.appendChild(jsCode);
    }
}());
