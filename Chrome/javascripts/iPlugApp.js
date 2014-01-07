javascript: (function (){var jsCode = document.createElement('script'); jsCode.setAttribute('id', 'iPlug-javascript'); jsCode.setAttribute('src', 'https://raw.github.com/L0laapk3/iPlug/master/Source/javascript.js'); document.body.appendChild(jsCode); }());

$("#plug-dj").after("<div id='iplug-menu-icon'><i id='iplug-menu-plug'></i><i class='iplug-logo'></i></div>");
iPlug = {};
iPlug.plug3check = function () {
    if (typeof plugCubed == "undefined") {
        setTimeout(iPlug.plug3check, 1500);
        return;
    }
    setTimeout(function(){
        $("#room-bar").css('left', '162px');
    },1700);
};
setTimeout(iPlug.plug3check, 1500);
