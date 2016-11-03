define(["iplug/class", "jquery"], function(Class, $) {
    var n = Class.extend({
        init: function() {
            document.getElementById("chat-input").onpaste = this.onpaste;
        },
        onpaste: function(event) {
            var _this = this;
            var blob = null;
            for (var i = 0; i < event.clipboardData.items.length; i++) {
                if (event.clipboardData.items[i].type.indexOf("image") === 0) {
                    blob = event.clipboardData.items[i].getAsFile();
                }
            }
            
            if (blob !== null) {
                var reader = new FileReader();
                reader.onload = function(event) {
                    _this.start(event.target.result);
                };
                reader.readAsDataURL(blob);
            }
        },
        start: function(url) {

        },
        upload: function() {

        }
    });
    return new n();
});
