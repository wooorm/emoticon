import assert from 'node:assert/strict'
import test from 'node:test'
import {emoticon} from './index.js'

test('emoticon', async function (t) {
  await t.test('should expose the public api', async function () {
    assert.deepEqual(Object.keys(await import('./index.js')).sort(), [
      'emoticon'
    ])
  })

  await t.test('should be an array', async function () {
    assert.ok(Array.isArray(emoticon))
  })

  await t.test('should have an `emoji` field in each entry', async function () {
    for (const info of emoticon) {
      assert.strictEqual(typeof info.emoji, 'string', JSON.stringify(info))
    }
  })

  await t.test(
    'should have a `description` string field in each entry',
    async function () {
      for (const info of emoticon) {
        assert.strictEqual(
          typeof info.description,
          'string',
          JSON.stringify(info)
        )
      }
    }
  )

  await t.test('should have a `tags` array field', async function () {
    for (const info of emoticon) {
      assert.ok(Array.isArray(info.tags), JSON.stringify(info))
    }
  })

  await t.test('should have an `emoticons` array field', async function () {
    assert.doesNotThrow(function () {
      for (const info of emoticon) {
        assert.ok(Array.isArray(info.emoticons), JSON.stringify(info))
      }
    })
  })
})
