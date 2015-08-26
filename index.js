/**
 * @author Titus Wormer
 * @copyright 2015 Titus Wormer
 * @license MIT
 * @module emoticon
 * @fileoverview Information regarding ASCII emoticons.
 */

'use strict';

/* eslint-env commonjs */

/*
 * Data.
 */

var data = require('./data/emoticons.json');

/*
 * Dictionaries.
 */

var emoji = {};
var text = {};

var emoticons = {
    'unicode': emoji,
    'emoticon': text
}

/**
 * Transform an emoji.
 *
 * @param {string} emoticon - Unicode emoji to extend.
 */
function enhanceEmoticon(emoticon) {
    var information = data[emoticon];
    var index;

    /**
     * Add information to `unicode` map.
     */

    emoji[information.emoji] = information;

    /**
     * Add information to `text` map.
     */

    index = information.emoticons.length;

    while (index--) {
        text[information.emoticons[index]] = information;
    }
}

/*
 * Transform all emoticons.
 */

var emoticon;

for (emoticon in data) {
    enhanceEmoticon(emoticon);
}

/*
 * Expose.
 */

module.exports = emoticons;
