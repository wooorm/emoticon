/**
 * @author Titus Wormer
 * @copyright 2015 Titus Wormer
 * @license MIT
 * @module emoticon:script:data
 * @fileoverview Build support data.
 */

'use strict';

/* eslint-env node */

/*
 * Dependencies.
 */

var fs = require('fs');
var table = require('markdown-table');
var width = require('string-width');
var emoticons = require('../data/emoticons');

/*
 * Set up data.
 */

var data = [[
    'Emoji',
    'Name',
    'Tags',
    'Emoticons'
]].concat(Object.keys(emoticons).map(function (name) {
    var information = emoticons[name];

    return [
        information.emoji,
        name,
        information.tags.join('; '),
        '`' + information.emoticons.join('`; `').replace(/\|/g, '\\|') + '`'
    ]
}));

/*
 * Write support.
 */

fs.writeFileSync('support.md',
    '# Supported emoticons\n' +
    '\n' +
    'Note that you need a browser capable of viewing\n' +
    'unicode-emoji to make sense of the first column!\n' +
    '\n' +
    table(data, {
        'align': 'c',
        'stringLength': width
    }) +
    '\n'
);
