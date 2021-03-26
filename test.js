import assert from 'assert'
import test from 'tape'
import {emoticon} from './index.js'

test('emoticon', function (t) {
  t.ok(Array.isArray(emoticon), 'should be an array')

  t.doesNotThrow(function () {
    var info

    for (info of emoticon) {
      assert.strictEqual(typeof info.emoji, 'string', JSON.stringify(info))
    }
  }, 'each entry should have an `emoji` string field')

  t.doesNotThrow(function () {
    var info

    for (info of emoticon) {
      assert.strictEqual(
        typeof info.description,
        'string',
        JSON.stringify(info)
      )
    }
  }, 'each entry should have an `description` string field')

  t.doesNotThrow(function () {
    var info

    for (info of emoticon) {
      assert.ok(Array.isArray(info.tags), JSON.stringify(info))
    }
  }, 'each entry should have an `tags` array field')

  t.doesNotThrow(function () {
    var info

    for (info of emoticon) {
      assert.ok(Array.isArray(info.emoticons), JSON.stringify(info))
    }
  }, 'each entry should have an `emoticons` array field')

  t.end()
})
