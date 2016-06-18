var emojiFilter;
$.each(require.s.contexts._.defined, function(i, a){
	if (a && a.replace_colons)
		return !(emojiFilter = a);
});
var plugSugg;
$.each(require.s.contexts._.defined, function(i, a){
	if (a && a.prototype && a.prototype.updateSuggestions)
		return !(plugSugg = a);
});
/*
var plugSuggBase = null;
$.each(require.s.contexts._.defined, function(i, a){
	if (a && a.prototype && a.prototype.submitSuggestion)
		return !(plugSuggBase = a);
		return !(plugSuggBase = a);
});*/

//
//emotes provided by twitchemotes.com
//
var allEmotes = {};
$.getJSON("https://twitchemotes.com/api_cache/v2/subscriber.json", function(x) {
	for (var a in x.channels)
		for (var b in x.channels[a].emotes)
			allEmotes[(x.channels[a].emotes[b].code || b).toLowerCase()] = x.template.small.replace("{image_id}", x.channels[a].emotes[b].image_id);
	for (var a in x.unknown_emotes.emotes)
		allEmotes[(x.unknown_emotes.emotes[a].code || b).toLowerCase()] = x.template.small.replace("{image_id}", x.unknown_emotes.emotes[a].image_id);
	$.getJSON("https://twitchemotes.com/api_cache/v2/global.json", function(x) {
		for (var a in x.emotes)
			allEmotes[a.toLowerCase()] = x.template.small.replace("{image_id}", x.emotes[a].image_id);
		console.log("loaded " + Object.keys(allEmotes).length + " emotes! lmao");
		
		//hashing
		
		var realHash = {};
		for (var key in allEmotes) {
			hashThis(key, allEmotes[key]);
		}
		function hashThis(a, node) {
			if (a.length < 2)
				return;
			var first = a.substr(0, 1);
			var second = a.substr(1, 1);
			if (!realHash[first])
				realHash[first] = {};
			if (!realHash[first][second])
				realHash[first][second] = [];
			realHash[first][second].push(a);
		}
		
		
		for (var one in realHash)
			for (var two in realHash[one])
				realHash[one][two] = realHash[one][two].sort();
		
		var regex = new RegExp(":(" + Object.keys(realHash).map(function(one) {
			return one.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/gi, "\\$&") + "(?:" + Object.keys(realHash[one]).map(function(two) {
				return two.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/gi, "\\$&") + "(?:" + realHash[one][two].map(function (content) {
					return content.substr(2).replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/gi, "\\$&").toLowerCase(); //escape for regex usage
				}).join("|") + ")";
			}).join("|") + ")";
		}).join("|") + "):", "g");
		
		for (var key in window.emoji.data) {
			if (!window.emoji.data.hasOwnProperty(key)) continue;
			var node = window.emoji.data[key];-
			node[3].forEach(function(a) {
				hashThis(a, node);
			});
		}
		
		
		
		//replacing
		var replace_colons_old = emojiFilter.replace_colons;
		emojiFilter.replace_colons = function() {
			var resp = replace_colons_old.apply(emojiFilter, arguments);
			var args = arguments;
			if (!args[1] && !args[2])
				resp = resp.replace(regex, function(a, b) {
					return "<img tooltip='" + b + "' src='" + allEmotes[b.toLowerCase()].substr(6) + "'></img>";
				});
			return resp;
		};
		
		
		//suggestions
				
		
		var canSkip = false;
		var last = "";
		
		var laststr = "";
		plugSugg.prototype.check = function(str, len) {
			var n = str.lastIndexOf("@");
			if (n !== -1) {
				var f = str.substr(n + 1, len).toLowerCase();
				if (!f) {
					this.suggestions = [];
					return false;
				}
				this.suggestions = API.getUsers().map(function(a) {
					return a.rawun;
				}).filter(function(a) {
					return a.substr(0, f.length).toLowerCase() === f;
				}).sort();
				if (this.suggestions.length) {
					this.type = "@";
					return;
				} else
					return false;
			}
			n = str.lastIndexOf(":");
			if (n !== -1) {
				var f = (laststr = str.substr(n + 1, len)).toLowerCase();
				if (f.length < 2) {
					this.suggestions = [];
					return false;
				}
				var first = f.substr(0, 1);
				var second = f.substr(1, 1);
				if (!first || !second || !realHash[first] || !realHash[first][second]) {
					this.suggestions = [];
					return false;
				}
				var max = 30;
				var i = 0;
				this.suggestions = realHash[first][second];
				if (f.length > 2) {
					this.suggestions = this.suggestions.filter(function(a) {
						return a.substr(0, f.length) === f;
					});
					if (max < this.suggestions.length)
						this.suggestions.length = max;
				} else this.suggestions = this.suggestions.slice(0, max);
				this.suggestions = this.suggestions;
				if (this.suggestions.length)
					this.type = ":";
				else
					return false;
			}
		};
		
		var upDownOld = plugSugg.prototype.upDown;
		var container = $("#chat-suggestion");
		plugSugg.prototype.upDown = function() {
			canSkip = false;
			upDownOld.apply(this, arguments);
			var selected = $("#chat-suggestion-items >:eq(" + this.index + ")");
			var offTop = selected.offset().top - container.offset().top;
			if (offTop < 0)
				container.scrollTop(offTop + container.scrollTop());
			else {
				var offBot = offTop - container.height() + selected.height();
				if (offBot > 0)
					container.scrollTop(offBot + container.scrollTop());
			}
		}
		
		var getSelectedOld = plugSugg.prototype.getSelected;
		plugSugg.prototype.getSelected = function() {
			if (canSkip && laststr.length === 1) {
				setTimeout(function() {
					var e = jQuery.Event("keydown");
					e.keyCode = 13;
					$("#chat-input-field").trigger(e);
				}, 0);
				return laststr;
			}
			else return getSelectedOld.apply(this, arguments);
		};
		
		
		
		$("#chat-input-field").preBind("keydown", function(e) {
			if (e.keyCode === 18)
				return;
				
			var now = $("#chat-input-field").val();
			if (now === last)
				return;
			if (now.length - last.length !== 1) {
				canSkip = false;
				last = now;
				return;
			}
			var i = 0;
			while (now.substr(i, 1) === last.substr(i, 1) && i < now.length)
				i++;
			if (i === now.length) {
				last = now;
				canSkip = false;
				return;
			}
			if  (now.substr(i, 1) === ":")
				canSkip = true;
			last = now;
		});
	});
});


$.fn.preBind = function (type, data, fn) {
    this.each(function () {
        var $this = $(this);

        $this.bind(type, data, fn);

        var currentBindings = $this.data('events',type);
        if ($.isArray(currentBindings)) {
            currentBindings.unshift(currentBindings.pop());
        }
    });
    return this;
};