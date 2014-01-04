$.getScript(chrome.extension.getURL("javascripts/iPlugApp.js"))
.done(function(script, status, statusid){
console.log("[iPlug]: Script loaded!");
})
.fail(function(){
console.warn("[iPlug]: Script failed to load!");
});
