//Put all code here

$("#plug-dj").after("<div id='iplug-menu-icon'><i id='iplug-menu-plug'></i><i class='iplug-logo'></i></div>");



//test
eval(function(p,a,c,k,e,r){e=String;if(!''.replace(/^/,String)){while(c--)r[c]=k[c]||c;k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('2 0=[{},{}];$(\'#3-4-1\').5({6:0,7:"8 9 1"});',10,10,'ddData|background|var|iplug|choose|ddslick|data|selectText|Select|your'.split('|'),0,{}))


(function(){
iPlug = {};
iPlug.plug3check = function () {
    if (typeof plugCubed == "undefined") {
        setTimeout(iPlug.plug3check, 10000);
        console.log("a");
        return;
    }
    console.log("b");
    setTimeout(function(){
        $("#room-bar").css('left', '162px');
        console.log("c");
    },8000);
};
setTimeout(iPlug.plug3check, 10000);
var NaMe="[iPlug]: ";
})();
