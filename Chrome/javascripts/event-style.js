(function() {
    var ev = new $.Event('style'),
        orig = $.fn.css;
    $.fn.css = function() {
        orig.apply(this, arguments);
        $(this).trigger(ev);
    }
})();
