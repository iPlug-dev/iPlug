//Put all code here
$("#plug-dj").after("<div id='iplug-menu-icon'><i id='iplug-menu-plug'></i><i class='iplug-logo'></i></div>");
iPlug = {};
iPlug.plug3check = function () {
    if (typeof plugCubed == "undefined") {
        setTimeout(iPlug.plug3check, 10000);
        return;
    }
    setTimeout(function(){
        $("#room-bar").css('left', '162px');
    },8000);
};
setTimeout(iPlug.plug3check, 10000);