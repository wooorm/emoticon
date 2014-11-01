'use strict';

/**
 * Dependencies.
 */

var fs,
    table,
    emoticons,
    gemoji;

fs = require('fs');
table = require('markdown-table');
emoticons = require('../data/emoticons');
gemoji = require('gemoji');

/**
 * Create an expression from all emoji.
 */

var expression;

expression = new RegExp(Object.keys(gemoji).join('|'), 'g');

/**
 * Set up data.
 */

var data;

data = [
    ['Emoji', 'Name', 'Tags', 'Emoticons']
].concat(
    Object.keys(emoticons).map(function (name) {
        var information;

        information = emoticons[name];

        return [
            information.emoji,
            name,
            information.tags.join('; '),
            '`' + information.emoticons.join('`; `') + '`'
        ]
    })
);

/**
 * Write support.
 */

fs.writeFileSync('Supported-Emoticons.md',
    'Supported Emoticons:\n' +
    '=================\n' +
    '\n' +
    'Note that you need a browser capable of viewing ' +
    'unicode-emoji to make sense of the first column!\n' +
    '\n' +

    table(data, {
        'align': ['c', 'c', 'c', 'l'],
        'stringLength': function (value) {
            return value.replace(expression, '  ').length;
        }
    }) +

    '\n'
);
