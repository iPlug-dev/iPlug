define([], function() {
    var requireIDs = { //qwertyuiop asdfghjkl zxcvbnm
        q: null,
        w: null,
        e: null,
        r: null,
        t: null,
        y: undefined,
        u: undefined,
        i: null,
        o: undefined,
        p: null,
        //-------
        a: null,
        s: null,
        d: null,
        f: null,
        g: null,
        h: undefined,
        j: undefined,
        k: undefined,
        l: undefined,
        //-------
        z: null,
        x: undefined,
        c: null,
        v: null,
        b: null,
        n: undefined,
        m: undefined
    };

    var x = requirejs.s.contexts._.defined;
    for (var i in x) {
        if (!x.hasOwnProperty(i) || !x[i]) continue;
        if (x[i]._events && x[i]._events.notify)
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
        if (x[i].add && x[i].init && x[i].remove && x[i].lookup && x[i].exists)
            requireIDs.e = requireIDs.e === null ? i : (console.warn("NOT NULL", "e", i), i);
        if (x[i].getAudience && x[i]._events && x[i].findWhere)
            requireIDs.g = requireIDs.g === null ? i : (console.warn("NOT NULL", "g", i), i);
        if (x[i].prototype && x[i].prototype.hasOwnProperty("id") && x[i].prototype.id === "playback")
            requireIDs.p = requireIDs.p === null ? i : (console.warn("NOT NULL", "p", i), i);
        if (x[i].hasOwnProperty("settings"))
            requireIDs.z = requireIDs.z === null ? i : (console.warn("NOT NULL", "z", i), i);
        if (x[i].__proto__ && x[i].__proto__.id === "dj-booth")
            requireIDs.d = requireIDs.d === null ? i : (console.warn("NOT NULL", "d", i), i);
        if (x[i].__proto__ && x[i].__proto__.id === "user-rollover")
            requireIDs.f = requireIDs.f === null ? i : (console.warn("NOT NULL", "f", i), i);
        if (x[i].__proto__ && x[i].__proto__.onChatReceived)
            requireIDs.w = requireIDs.w === null ? i : (console.warn("NOT NULL", "w", i), i);
        if (x[i].__proto__ && x[i].__proto__.getActiveID)
            requireIDs.b = requireIDs.b === null ? i : (console.warn("NOT NULL", "b", i), i);
        if (x[i].GRAB)
            requireIDs.q = requireIDs.q === null ? i : (console.warn("NOT NULL", "q", i), i);
        if (x[i].id && x[i].cb)
            requireIDs.t = requireIDs.t === null ? i : (console.warn("NOT NULL", "t", i), i);
    }
    for (var i in requireIDs) {
        if (!requireIDs.hasOwnProperty) continue;
        if (requireIDs[i] === null) console.warn("NULL", i, requireIDs[i]);
    }
    return requireIDs;
});