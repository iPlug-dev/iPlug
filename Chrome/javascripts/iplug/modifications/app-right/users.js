define(["iplug/plug-modules"],function(Modules){
    var r = require(Modules["r"]);
    var v = require(Modules["v"]);
    r.prototype.RowClass = v.extend({
        vote: function () {
            if (this.model.get('level')) {
                if (!this.$level) {
                    this.$level = $("<span>");
                }
                this.$level.removeClass().addClass("plug-level");
                this.$level.text(this.model.get('level'));
                this.$el.append(this.$level);
            } else {
                this.$level.remove();
                this.$level = undefined;
            }
            if (this.model.get('grab')) {
                if (!this.$grabIcon) {
                    this.$grabIcon = $('<i>');
                }
                this.$grabIcon.addClass('icon icon-grab');
                this.$el.append(this.$grabIcon);
            } else if (this.$grabIcon) {
                this.$grabIcon.remove();
                this.$grabIcon = undefined;
            }
            if (this.model.get('vote') !== 0) {
                if (!this.$icon) {
                    this.$icon = $('<i>');
                }
                this.$el.append(this.$icon);
                if (this.model.get('vote') === 1) {
                    this.$icon.removeClass().addClass('icon icon-woot');
                } else {
                    this.$icon.removeClass().addClass('icon icon-meh');
                }
            } else if (this.$icon) {
                this.$icon.remove();
                this.$icon = undefined;
            }
        }
    });
    return true;
});
