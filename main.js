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
})