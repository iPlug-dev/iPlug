define(["iplug/class", "iplug/utils/vote", "underscore"], function (Class, vote, _) {
    var n = Class.extend({
        init: function () {
            API.on(API.ADVANCE, _.bind(this.handler, this));
        },
        handler: function () {
            if (!this.isEnabled) return;
            _.delay(_.bind(vote.woot, vote), this.getDelay());
        },
        isEnabled: function () {
            return localStorage["iplug|autowootenabled"] === "block";
        },
        getDelay: function () {
            return Math.round(100 * parseInt(localStorage["iplug|autowootdelaymin"]) + Math.random() * (100 * parseInt((localStorage["iplug|autowootdelaymax"]) - parseInt(localStorage["iplug|autowootdelaymin"]))), 0);
        },
        setDelay: function (min, max) {
            if (min != undefined) {
                localStorage["iplug|autowootdelaymin"] = min;
            }
            if (max != undefined) {
                localStorage["iplug|autowootdelaymax"] = max;
            }
        }
    });
    return new n();
});
