/**
 * @author Titus Wormer
 * @copyright 2015 Titus Wormer
 * @license MIT
 * @module emoticon:script:data
 * @fileoverview Transform data.
 */

'use strict';

/* eslint-env node */
/* eslint-disable no-console */

/*
 * Dependencies.
 */

var fs = require('fs');
var gemoji = require('gemoji');

/*
 * List of common facial-parts.
 */

var map = {
    'eyes-normal': [':', '='],
    'eyes-wink': ';',
    'eyes-closed': ['x', 'X'],
    'eyes-glasses': ['8', 'B'],
    'eyes': ['eyes-normal', 'eyes-wink', 'eyes-closed'],
    'nose': '-',
    'nose-optional': ['', 'nose'],
    'mouth-positive-normal': [')', ']'],
    'mouth-positive-very': 'D',
    'mouth-positive': ['mouth-positive-normal', 'mouth-positive-very'],
    'mouth-negative-normal': ['(', '['],
    'mouth-negative': ['mouth-negative-normal'],
    'mouth-neutral': '|',
    'mouth-not-positive': ['mouth-negative', 'mouth-neutral'],
    'mouth-not-negative': ['mouth-positive', 'mouth-neutral'],
    'mouth-kissing': '*',
    'mouth-open': ['o', 'O', '0'],
    'mouth-angry': '@',
    'mouth-tongue': ['p', 'P', 'd'],
    'mouth-squiggly': ['$', 's', 'z', 'S', 'Z'],
    'mouth-confused': ['/', '\\'],
    'blush': '"',
    'drop': [',', '\''],
    'horns': ']',
    'halo': ['o', 'O', '0'],
    'moustache': '3'
}

/**
 * Flatten a list of facial parts.
 *
 * @param {Array.<string>} keys - Map of keys.
 * @return {Array.<string>} flattened keys.
 */
function flatten(keys) {
    var result = [];
    var index = -1;
    var length = keys.length;

    while (++index < length) {
        if (keys[index] in map) {
            result = result.concat(flatten(map[keys[index]]));
        } else if (Array.isArray(keys[index])) {
            result = result.concat(keys[index]);
        } else {
            result.push(keys[index]);
        }
    }

    return result;
}

/*
 * Get the emoticon representation of emoticons.
 */

var data = fs
    .readdirSync('data/emoji')
    .filter(function (filename) {
        return filename.charAt(0) !== '.';
    }).map(function (filename) {
        return filename.substr(0, filename.lastIndexOf('.'));
    }).filter(function (name) {
        if (!(name in gemoji.name)) {
            console.log(
                'Missing information for `' +
                gemoji.emoji + '`, `' +
                gemoji.name + '`'
            );

            return false;
        }

        return true;
    }).map(function (name) {
        return gemoji.name[name];
    }).map(function (information) {
        var emoticon;
        var result;

        try {
            emoticon = require(
                '../data/emoji/' + information.name + '.json'
            );
        } catch (exception) {
            console.log(
                'Missing information for `' +
                information.emoji + '`, `' +
                information.name + '`'
            );
        }

        emoticon = emoticon.map(function (key) {
            return flatten([key]);
        });

        while (emoticon[1]) {
            result = [];

            emoticon[0].forEach(function (first) {
                emoticon[1].forEach(function (second) {
                    result.push(first + second);
                });
            });

            emoticon.shift();

            emoticon[0] = result;
        }

        return {
            'name': information.name,
            'emoji': information.emoji,
            'tags': information.tags,
            'description': information.description,
            'emoticons': result
        };
    }).filter(function (information) {
        return information.emoticons !== undefined;
    });

/*
 * Remove some black-listed emoticons.
 */

data.forEach(function (information) {
    information.emoticons = information.emoticons.filter(function (emoticon) {
        if (
            (
                /^[a-zA-Z]+$/.test(emoticon) &&
                (
                    emoticon.toUpperCase() === emoticon ||
                    emoticon.toLowerCase() === emoticon
                )
            ) ||
            /([\s\S])\1+/g.test(emoticon) ||
            emoticon === '=-'
        ) {
            console.log('Removing dangerous/unused emoticon: ', emoticon);

            return false;
        }

        return true;
    });
});

/*
 * Detect if emoticons are classified multiple times.
 */

var known = {};

data.forEach(function (information) {
    information.emoticons.forEach(function (emoticon) {
        if (known.hasOwnProperty(emoticon)) {
            console.log(
                'Duplicate emoticon `' + emoticon +
                '` in `' + information.name + '` and `' +
                known[emoticon] + '`'
            );
        }

        known[emoticon] = information.name;
    });
});

/*
 * Transform list of emoticons to map.
 */

var emoticons = {};

data.forEach(function (information) {
    emoticons[information.name] = information;
});

/*
 * Write the emoticons.
 */

fs.writeFileSync('data/emoticons.json', JSON.stringify(emoticons, null, 2) + '\n');
