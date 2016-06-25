define(["iplug/class", "jquery"], function(Class, $) {
    var defaults = {
        
        
        
        
        
        
    };
    var n = Class.extend({
        init: function() {
            this.localStorageName = "iplug|settings";
            this.settings = {};
            this.load();
        },
        load: function() {
            try {
                var data = JSON.parse(localStorage[this.localStorageName]);
            } catch (e) {
                console.warn("Settings parser", e);
            }
            this.settings = $.extend(true, {}, defaults, this.settings, data);
        },
        save: function() {
            localStorage[this.localStorageName] = JSON.stringify(this.settings);
        }
    });
    return new n();
});