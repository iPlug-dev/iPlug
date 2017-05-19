define(["iplug/class", "iplug/alert", "iplug/changelog"], function (Class, alert, changelog) {
    var n = Class.extend({
        init: function () {
            var str = ""; //motd + "\n\n\n";
            var show, last = (localStorage["iplug|version"] || "0").split(".");
            var title = undefined;
            changelog.forEach(function (a) {
                var higher, ver = a.version.split(".");
                for (var i = 0; !higher && i < Math.max(last.length, ver.length); i++) {
                    var diff = (parseInt(ver[i], 10) || 0) - (parseInt(last[i], 10) || 0);
                    higher = diff > 0; // IS IT EVEN REQUIRED?? ~ IF U SEE THIS AND ANSWER = NO -> REMOVE // I HAVE NO IDEA LOL JUST LEAVE IT :D
                    if (diff < 0)
                        return;
                }
                if (!higher)
                    return;
                show = true;
                last = ver;
                if (a.convert)
                    a.convert();
                if (a.text.length)
                    str = "<span>" + a.version + "</span>\n" + a.text.join("\n") + "\n\n\n" + str;
                if (a.title)
                	title = a.title;
            });
            if (show) {
                alert.setMessage("iPlug updated!", title, 
                	str.replace(/(?:\n)+$/, ""), "OK!", function () {
                    localStorage["iplug|version"] = last.join(".");
                });
                alert.show();
            }
        }
    });
    return new n();
});
