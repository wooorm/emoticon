'use strict';

/**
 * Cached methods.
 */

var has;

has = Object.prototype.hasOwnProperty;

/**
 * Data.
 */

var emoticons;

emoticons = require('./data/emoticons.json');

/**
 * Create a dictionary to hold the emoticons by emoji.
 */

var emoji;

emoji = {};

/**
 * Create a dictionary to hold the emoticons by text
 * characters.
 */

var text;

text = {};

/**
 * Transform all emoji.
 */

var emoticon,
    information,
    index;

for (emoticon in emoticons) {
    /* istanbul ignore else */
    if (has.call(emoticons, emoticon)) {
        information = emoticons[emoticon];

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
}

/**
 * Expose the `text` dictionary (`text`) as `emoticon`.
 */

exports.emoticon = text;

/**
 * Expose the `unicode` dictionary (`emoji`) as `unicode`.
 */

exports.unicode = emoji;
