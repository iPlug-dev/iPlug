define(["iplug/class", "jquery"], function (Class, $) {
    var n = Class.extend({
        init: function () {
            this.$el = $("<div>").attr({
                id: "iplug-overlay"
            }).css({
                display: "none"
            });
            this.$bg = $("<div>").addClass('iplug-overlay-bg');
            this.$container = $("<div>").addClass('iplug-alert');
            this.$alertFrame = $("<div>").addClass('iplug-alert-frame');
            this.$title = $("<span>").addClass('iplug-alert-frame-title');
            this.$alertBody = $("<div>").addClass('iplug-alert-body');
            this.$message = $("<span>").addClass('iplug-alert-body-message');
            this.$buttonFrame = $("<div>").addClass('iplug-alert-frame');
            this.$button = $("<div>").addClass('iplug-alert-button-submit');
            this.$buttonText = $("<span>");
            this.$button.append(this.$buttonText);
            this.$buttonFrame.append(this.$button);
            this.$alertBody.append(this.$message);
            this.$alertFrame.append(this.$title);
            this.$container.append(this.$alertFrame);
            this.$container.append(this.$alertBody);
            this.$container.append(this.$buttonFrame);
            this.$el.append(this.$bg);
            this.$el.append(this.$container);
            $("body").append(this.$el);
        },
        show: function () {
            this.$el.css("display", "block");
            this.$container.css({
                marginTop: Math.round((window.innerHeight - this.$container.height()) / 2)
            });
        },
        hide: function () {
            this.$el.css("display", "none");
        },
        setMessage: function (title, message, buttonText, callback) {
            this.$title.text(typeof title === "string" ? title : "");
            this.$message.html(typeof message === "string" ? message : "");
            this.$buttonText.text(typeof buttonText === "string" ? buttonText : "");
            var that = this;
            this.$button.unbind().bind("click", function () {
                that.hide();
            }).bind("click", callback);
        }
    });
    return new n();
});
