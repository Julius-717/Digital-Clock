$(function() {
    var doc, body, clock, digits, separator, ampm, themes, dimTime, dimTimeOut, store, fl;

    doc = document;
    body = $(doc.body);

    clock = $('.clock');
    digits = $('.digit');
    separator = $('.sep');
    ampm = $('.ampm');
    themes = $('.theme').map(function() { return this.name; }).toArray().join(' ');

    dimTime = 10 * 1000;
    store = ('localStorage' in window) && window['localStorage'] !== null ? window.localStorage : null;
    fl = Math.floor;

    SetTheme(getPref('theme', 'green'));
    setHours(getPref('hr', 12));

    updateTime();
    setupDim();
    setInterval(updateTime, 1000);

    clock.on('mousemove click', brighten);

    $('.controls .dot').click(function() { SetTheme(this.name); });
    $('.controls .hours').click(function() { setHours(this.name); });

    function getPref(name, defaultVal) {
        return store ? (store.getItem(name) || defaultVal) : defaultVal; 
    }
    
    function setPref(name, value) {
        if(store) store.setItem(name, value);
    }

    function updateTime() {
        var now, h, m, s, nowstr, tz, hours, ap;

        separator.toggleClass('on');

        now = new Date();
        h = now.getHours();
        m = now.getMinutes();
        s = now.getSeconds();
        nowstr = now.toString();
        tz = (nowstr.match(/\b([A-Z]{1,4}).$/) || ['']).pop();
        hours = getPref('hr', 12);
        ap = (h >= hours) ? 'pm' : 'am';

        clock.addClass('tz-' + tz.toLowerCase());

        if(hours == 12) {
            h = (h === 0) ? 12 : (h > 12) ? h % 12 : h;
            ampm.removeClass('am pm').addClass(ap);
        }

        digits.removeClass('d0 d1 d2 d3 d4 d5 d6 d7 d8 d9')
		.eq(0).addClass('d' + fl(h / 10)).end()
		.eq(1).addClass('d' + (h % 10)).end()
		.eq(2).addClass('d' + fl(m / 10)).end()
		.eq(3).addClass('d' + (m % 10)).end()
		.eq(4).addClass('d' + fl(s / 10)).end()
		.eq(5).addClass('d' + (s % 10));
    }
})