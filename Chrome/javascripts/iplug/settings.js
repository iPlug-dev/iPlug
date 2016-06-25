define(["iplug/class", "jquery"], function(Class, $) {
    var defaults = {
        
    };
    var n = Class.extend({
        localStorageName: "iplug|settings",
        init: function() {
            this.load();
        },
        clear: function(){
            localStorage[this.localStorageName] = JSON.stringify(defaults);
            return this.load();
        },
        load: function() {
            try {
                var data = JSON.parse(localStorage[this.localStorageName]);
            } catch (e) {
                console.warn("Settings parser", e);
            }
            $.extend(true, this, defaults, data);
            return this;
        },
        save: function() {
            localStorage[this.localStorageName] = JSON.stringify(this, Object.keys(defaults));
            return this;
        }
    });
    return new n();
});