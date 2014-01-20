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


//test
eval(function(p,a,c,k,e,r){e=function(c){return c.toString(a)};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('$("#0").7("<2 5=\'0-1-3\' 6=\'4:"+$("#0-1").8(\'4\')+";9:a;\'></2>");$(\'#0-1-3\').b({c:"d"});',14,14,'chat|messages|div|private|height|id|style|append|css|display|none|cookieable|axis|y'.split('|'),0,{}))
