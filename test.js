'use strict';

/* eslint-env node, mocha */

/*
 * Dependencies.
 */

var emoticon = require('./');
var gemoji = require('gemoji');
var assert = require('assert');

/*
 * Methods.
 */

var equal = assert.strictEqual;
var nequal = assert.notStrictEqual;
var dequal = assert.deepEqual;

/**
 * Easily assert the state of every item in a list.
 *
 * @param {Array.<*>} values - Values to test.
 * @param {string} should - Description.
 * @param {Function} callback - Invoked each iteration.
 */
function each(values, should, callback) {
    it(should, function () {
        values.forEach(function (value) {
            try {
                callback.apply(this, arguments);
            } catch (exception) {
                /* istanbul ignore next */
                throw new Error(
                    'at `' + value + '`: ' + exception.message
                );
            }
        });
    });
}

/*
 * Validate if emoticons are correctly represented.
 */

Object.keys(emoticon.unicode).forEach(function (emoji) {
    var information = emoticon.unicode[emoji];
    var githubInformation = gemoji.unicode[emoji];

    describe(emoji + '   ' + information.description, function () {
        it('should have the same `name` as its gemoji representation',
            function () {
                equal(githubInformation.name, information.name);
            }
        );

        it('should have the same `description` as its gemoji representation',
            function () {
                equal(githubInformation.description, information.description);
            }
        );

        it('should have the same `tags` as its gemoji representation',
            function () {
                dequal(githubInformation.tags, information.tags);
            }
        );

        it('should have an `emoji` field set to its key', function () {
            equal(information.emoji, emoji);
        });

        it('should have an `emoticons` array', function () {
            assert(Array.isArray(information.emoticons));
        });

        describe('emoticons[n]', function () {
            each(information.emoticons,
                'should be accessible on `emoticon.emoticon`',
                function (text) {
                    equal(emoticon.emoticon[text], information);
                }
            );

            each(information.emoticons,
                'should be a `string`',
                function (text) {
                    equal(typeof text, 'string');
                }
            );

            each(information.emoticons,
                'should be more than one character long',
                function (text) {
                    assert(text.length > 1);
                }
            );

            each(information.emoticons,
                'should be less than six characters long',
                function (text) {
                    assert(text.length < 6);
                }
            );

            each(information.emoticons,
                'should contain non-alphabetic characters, ' +
                'or, multi-case alphabetic characters',
                function (text) {
                    if (/[^a-zA-Z]/.test(text)) {
                        return;
                    }

                    nequal(text.toLowerCase(), text)
                    nequal(text.toUpperCase());
                }
            );
        });
    });
});
