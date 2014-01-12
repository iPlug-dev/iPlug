listscripts = [
  "https://raw.github.com/L0laapk3/iPlug/master/Source/logo.js",
  "https://raw.github.com/L0laapk3/iPlug/master/Source/chatterbox.js"
];



for (var i = 0; i < listscripts.length; i++) {
var jsCode = document.createElement('script');
jsCode.setAttribute('id', 'iPlug-' + listscripts[i].substring(0, listscripts.length - 3));
jsCode.setAttribute('src', listscripts[i]);
document.body.appendChild(jsCode);
}


