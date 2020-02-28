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
})