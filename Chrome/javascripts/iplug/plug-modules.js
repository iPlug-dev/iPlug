define([], function () {
    var requireIDs = {
        a: null,
        r: null,
        s: null,
        v: null,
        c: null,
        d: null,
        e: null,
        f: null,
        i: null,
        g: null,
        p: null,
        z: null
    };

    var x = requirejs.s.contexts._.defined;
    for (var i in x) {
        if (!x.hasOwnProperty(i) || !x[i]) continue;
        if (x[i] && x[i]._events && x[i]._events.notify)
            requireIDs.a = requireIDs.a === null ? i : (console.warn("NOT NULL", "a", i), i);
        if (x[i].prototype && x[i].prototype.RowClass && x[i].prototype.className === "list room")
            requireIDs.r = requireIDs.r === null ? i : (console.warn("NOT NULL", "r", i), i);
        if (x[i].__proto__.onElapsedChange)
            requireIDs.s = requireIDs.s === null ? i : (console.warn("NOT NULL", "s", i), i);
        if (x[i].prototype && x[i].prototype.vote)
            requireIDs.v = requireIDs.v === null ? i : (console.warn("NOT NULL", "v", i), i);
        if (x[i].prototype && x[i].prototype.hasOwnProperty("id") && x[i].prototype.id == "chat-suggestion")
            requireIDs.c = requireIDs.c === null ? i : (console.warn("NOT NULL", "c", i), i);
        if (x[i].prototype && x[i].prototype.submitSuggestion && x[i].prototype.hasOwnProperty("id"))
            requireIDs.i = requireIDs.i === null ? i : (console.warn("NOT NULL", "i", i), i);
        if (x[i] && x[i].add && x[i].init && x[i].remove && x[i].lookup && x[i].exists)
            requireIDs.e = requireIDs.e === null ? i : (console.warn("NOT NULL", "e", i), i);
        if (x[i] && x[i].getAudience && x[i]._events && x[i].findWhere)
            requireIDs.g = requireIDs.g === null ? i : (console.warn("NOT NULL", "g", i), i);
        if (x[i] && x[i].prototype && x[i].prototype.hasOwnProperty("id") && x[i].prototype.id === "playback")
            requireIDs.p = requireIDs.p === null ? i : (console.warn("NOT NULL", "p", i), i);
        if (x[i] && x[i].hasOwnProperty("settings"))
            requireIDs.z = requireIDs.z === null ? i : (console.warn("NOT NULL", "z", i), i);
        if (x[i] && x[i].__proto__ && x[i].__proto__.id === "dj-booth")
            requireIDs.d = requireIDs.d === null ? i : (console.warn("NOT NULL", "d", i), i);
        if (x[i] && x[i].__proto__ && x[i].__proto__.id === "user-rollover")
            requireIDs.f = requireIDs.f === null ? i : (console.warn("NOT NULL", "f", i), i);
    }
    for (var i in requireIDs) {
        if (!requireIDs.hasOwnProperty) continue;
        if (!requireIDs[i]) console.warn("NULL", i, requireIDs[i]);
    }
    return requireIDs;
});
