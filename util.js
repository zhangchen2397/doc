var throttle = function (fn, delay, atleast) {
    var timer = null;
    var previous = null;

    return function () {
        var now = +new Date();

        if ( !previous ) previous = now;
        if ( atleast && now - previous > atleast ) {
            fn();
            // 重置上一次开始时间为本次结束时间
            previous = now;
            clearTimeout(timer);
        } else {
            clearTimeout(timer);
            timer = setTimeout(function() {
                fn();
                previous = null;
            }, delay);
        }
    }
};