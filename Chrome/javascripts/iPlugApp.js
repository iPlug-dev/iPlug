var jssCode = document.createElement('script');
jssCode.setAttribute('id', 'iPlug-javascript');
jssCode.setAttribute('src', 'https://raw.github.com/L0laapk3/iPlug/master/Source/scriptlist.js');
document.body.appendChild(jssCode);

var version = "0.6.0";


if (localStorage['iPlug|version'] != version) {
    localStorage['iPlug|version'] = version;
    localStorage['iPlug|updated'] = true;
} else {
    localStorage['iPlug|updated'] = false;
}

