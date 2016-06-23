define(["iplug/plug-modules"],function(Modules){
    var w = require(Modules["w"]); //CHAT MODULE Last known as "d2f19/fbc72/c1f08"
    
    //OPTION A:
    //w.onChatReceived = function(smth, smthB, smthC) { REWRITE WHOLE FUNCTION }
    
    //OPTION B:
    //w._onChatReceived = w.onChatReceived; // no need to check if variable is already set cuz this code won't run more than once
    //w.onChatReceived = function(smth, smthB, smthC) {
    //    DO SOMETHING WITH ARGUMENTS HERE
    //    return w._onChatReceived.call(this, smth, smthB, smthC); // or use .apply(this, [...]); 
    //}
});