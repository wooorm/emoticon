/**
 * @typedef {import('./index.js').Emoticon} Emoticon
 */

import assert from 'node:assert/strict'
import test from 'node:test'
import {emoticon} from './index.js'

test('emoticon', function () {
  assert.ok(Array.isArray(emoticon), 'should be an array')

  assert.doesNotThrow(function () {
    /** @type {Emoticon} */
    let info

    for (info of emoticon) {
      assert.strictEqual(typeof info.emoji, 'string', JSON.stringify(info))
    }
  }, 'each entry should have an `emoji` string field')

  assert.doesNotThrow(function () {
    /** @type {Emoticon} */
    let info

    for (info of emoticon) {
      assert.strictEqual(
        typeof info.description,
        'string',
        JSON.stringify(info)
      )
    }
  }, 'each entry should have an `description` string field')

  assert.doesNotThrow(function () {
    /** @type {Emoticon} */
    let info

    for (info of emoticon) {
      assert.ok(Array.isArray(info.tags), JSON.stringify(info))
    }
  }, 'each entry should have an `tags` array field')

  assert.doesNotThrow(function () {
    /** @type {Emoticon} */
    let info

    for (info of emoticon) {
      assert.ok(Array.isArray(info.emoticons), JSON.stringify(info))
    }
  }, 'each entry should have an `emoticons` array field')
})
