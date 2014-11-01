'use strict';

/**
 * Dependencies.
 */

var emoticon,
    gemoji,
    assert;

emoticon = require('./');
gemoji = require('gemoji');
assert = require('assert');

/**
 * Easily assert the state of every item in a list.
 *
 * @param {Array.<*>} values
 * @param {string} should
 * @param {function(*, number)} callback
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

/**
 * Tests for basic structure.
 */

describe('emoticon', function () {
    it('should have a `emoticon` property', function () {
        assert(
            Object.prototype.toString.call(emoticon.emoticon) ===
            '[object Object]'
        );
    });

    it('should have an `unicode` property', function () {
        assert(
            Object.prototype.toString.call(gemoji.unicode) ===
            '[object Object]'
        );
    });
});

/**
 * Validate if emoticons are correctly represented.
 */

Object.keys(emoticon.unicode).forEach(function (emoji) {
    var information,
        githubInformation;

    information = emoticon.unicode[emoji];
    githubInformation = gemoji.unicode[emoji];

    describe(emoji + '   ' + information.description, function () {
        it('should have the same `name` as its gemoji representation',
            function () {
                assert(githubInformation.name === information.name);
            }
        );

        it('should have the same `description` as its gemoji representation',
            function () {
                assert(
                    githubInformation.description ===
                    information.description
                );
            }
        );

        it('should have the same `tags` as its gemoji representation',
            function () {
                assert(
                    githubInformation.tags.toString() ===
                    information.tags.toString()
                );
            }
        );

        it('should have an `emoji` field set to its key', function () {
            assert(information.emoji === emoji);
        });

        it('should have an `emoticons` array', function () {
            assert(Array.isArray(information.emoticons));
        });

        describe('emoticons[n]', function () {
            each(information.emoticons,
                'should be accessible on `emoticon.emoticon`',
                function (text) {
                    assert(emoticon.emoticon[text] === information);
                }
            );

            each(information.emoticons,
                'should be a `string`',
                function (text) {
                    assert(typeof text === 'string');
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
                        assert(true);

                        return;
                    }

                    assert(
                        text.toLowerCase() !== text &&
                        text.toUpperCase() !== text
                    );
                }
            );
        });
    });
});
