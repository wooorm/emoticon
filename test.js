'use strict'

var assert = require('assert')
var test = require('tape')
var emoticon = require('.')

test('emoticon', function (t) {
  t.ok(Array.isArray(emoticon), 'should be an array')

  t.doesNotThrow(function () {
    emoticon.forEach(function (info) {
      assert.strictEqual(typeof info.emoji, 'string', JSON.stringify(info))
    })
  }, 'each entry should have an `emoji` string field')

  t.doesNotThrow(function () {
    emoticon.forEach(function (info) {
      assert.strictEqual(
        typeof info.description,
        'string',
        JSON.stringify(info)
      )
    })
  }, 'each entry should have an `description` string field')

  t.doesNotThrow(function () {
    emoticon.forEach(function (info) {
      assert.ok(Array.isArray(info.tags), JSON.stringify(info))
    })
  }, 'each entry should have an `tags` array field')

  t.doesNotThrow(function () {
    emoticon.forEach(function (info) {
      assert.ok(Array.isArray(info.emoticons), JSON.stringify(info))
    })
  }, 'each entry should have an `emoticons` array field')

  t.end()
})
