var lwip = require("lwip");
var imgur = require('imgur');
var w = 4,
    h = 6;
var ew = 3600,
    eh = 150;
lwip.open("image.png", "png", function (err, image) {
    if (err) {
        console.log("Error when loading image!");
        console.log(err);
        return;
    }
    lwip.create(3600, 150, [0, 0, 0, 0], function (err, canvas) {
        if (err) {
            console.log("Error when creating canvas!");
            console.log(err);
            return;
        }
        var ready = 0;
        var images = [];
        var _done = function () {
            //if (_r !== (w*h)) return;
            canvas.writeFile("output.png", "png", {
                compression: "fast",
                interlaced: false,
                transparency: "auto"
            }, function (err) {
                if (err) {
                    console.log("Error when saving image!");
                    console.log(err);
                    return;
                }
                imgur.setClientId("459012fd0753a82");
                imgur.uploadFile("output.png").then(function (x) {
                    console.log(x.data.link);
                });
            });
        };
        var done = function (w, h) {
            console.log(ready + "TEST" + w * h);
            if (ready !== (w * h)) return;
            var _ready = 0;
            var _loop = function (i, max, callback) {
                canvas.batch().paste((i * ew / (w * h)) + (150 - images[i].width())/2, 150 - images[i].height(), images[i]).exec(function (err, image) {
                    if (err) {
                        console.log("Error when pasting image!");
                        console.log(err);
                        return;
                    }
                    if (++i < max) {
                        _loop(i, max, callback);
                    } else if (typeof callback === "function") {
                        callback();
                    }
                });
            };
            _loop(0, w * h, _done);
        };
        var extract = function (i, j, w, h) {
            image.extract(j / w * image.width(), i / h * image.height(), (j + 1) / w * image.width(), (i + 1) / h * image.height(), function (err, img) {
                if (err) {
                    console.log("Error when haxing image!");
                    console.log(err);
                    return;
                }
                console.log(img.width() + "x" + img.height());
                console.log(ew / (w * h) + "x" + (eh - 20));
                console.log((eh - 20) * img.width() / img.height() + "x" + (eh - 20));
                img.resize( /*ew/(w*h)*/ /*img.width()*/ (eh - 20) * img.width() / img.height(), (eh - 20), "cubic", function (err, img) {
                    if (err) {
                        console.log("Error when resizing image!");
                        console.log(err);
                        return;
                    }
                    console.log("" + (i * w + j) + " " + i + " " + j);
                    images[i * w + j] = img;
                    ready++;
                    done(w, h);
                });
            });
        };
        for (var i = 0; i < h; i++) {
            for (var j = 0; j < w; j++) {
                extract(i, j, w, h);
            }
        }

    });
});

/*
i = require("dc35f/f2003/c810d");x = require("dc35f/fefa3/cccff/c230c");
var q = x.images.indexOf(x.userImageMap[API.getUser().id]);
x.userImageMap[API.getUser().id].image.src = "https://i.imgur.com/g4QTfG7.png";
console.log(q);
x.images[q] =x.userImageMap[API.getUser().id];
f=require("dc35f/a4773/f715b");f.trigger("audience:redraw");
