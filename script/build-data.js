/**
 * @typedef Emoticon
 * @property {string} description
 * @property {string} emoji
 * @property {ReadonlyArray<string>} emoticons
 * @property {string} name
 * @property {ReadonlyArray<string>} tags
 */

import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import {gemoji} from 'gemoji'

/** @type {Record<string, ReadonlyArray<ReadonlyArray<string>>>} */
const schema = JSON.parse(String(await fs.readFile('schema.json')))
/** @type {Record<string, ReadonlyArray<string> | string>} */
const alias = JSON.parse(String(await fs.readFile('alias.json')))

/** @type {Array<Emoticon>} */
const data = []
// Check if emoticons are classified multiple times.
/** @type {Map<string, string>} */
const known = new Map()

// Get the emoticon representation of emoticons.
for (const [name, structure] of Object.entries(schema)) {
  const info = gemoji.find(function (d) {
    return d.names.includes(name)
  })
  assert(info, 'expected matching gemoji for `' + name + '`')

  /** @type {Array<string>} */
  const emoticons = []

  for (const faceStructure of structure) {
    const flatStructure = faceStructure.map(function (key) {
      return flatten([key])
    })
    /** @type {Array<string> | undefined} */
    let result

    while (flatStructure[1]) {
      result = unpack(flatStructure)
      flatStructure.shift()
      flatStructure[0] = result
    }

    if (!result) continue

    for (const emoticon of result) {
      // Remove some dangerous emoticons.
      if (
        (/^[a-zA-Z]+$/.test(emoticon) &&
          (emoticon.toUpperCase() === emoticon ||
            emoticon.toLowerCase() === emoticon)) ||
        /([\s\S])\1+/g.test(emoticon) ||
        emoticon === '=-'
      ) {
        console.log('Removing dangerous/unused emoticon:', emoticon)
        continue
      }

      const current = known.get(emoticon)

      if (current) {
        console.log(
          'Duplicate emoticon `%s` in `%s` and `%s`',
          emoticon,
          name,
          current
        )
      }

      known.set(emoticon, name)
      emoticons.push(emoticon)
    }
  }

  if (emoticons.length === 0) continue

  data.push({
    description: info.description,
    emoji: info.emoji,
    emoticons,
    name,
    tags: info.tags
  })
}

// Write.
await fs.writeFile(
  'index.js',
  [
    '/**',
    ' * @typedef Emoticon',
    ' *   Info on an emoticon.',
    ' * @property {string} description',
    ' *   Associated description (from `wooorm/gemoji`).',
    ' * @property {string} emoji',
    ' *   Corresponding emoji.',
    ' * @property {Array<string>} emoticons',
    ' *   ASCII emoticons.',
    ' * @property {string} name',
    ' *   Name of an emoticon (preferred name from `wooorm/gemoji`).',
    ' * @property {Array<string>} tags',
    ' *   Associated tags (from `wooorm/gemoji`).',
    ' */',
    '',
    '/**',
    ' * List of emoticons.',
    ' *',
    ' * @type {Array<Emoticon>}',
    ' */',
    'export const emoticon = ' + JSON.stringify(data, undefined, 2),
    ''
  ].join('\n')
)

/**
 * Flatten facial parts.
 *
 * @param {ReadonlyArray<string> | string} keys
 */
function flatten(keys) {
  /** @type {Array<string>} */
  const result = []
  let index = -1

  while (++index < keys.length) {
    if (Object.hasOwn(alias, keys[index])) {
      result.push(...flatten(alias[keys[index]]))
    } else if (Array.isArray(keys[index])) {
      result.push(...keys[index])
    } else {
      result.push(keys[index])
    }
  }

  return result
}

/**
 * @param {ReadonlyArray<ReadonlyArray<string>> | ReadonlyArray<string>} value
 */
function unpack(value) {
  /** @type {Array<string>} */
  const result = []
  /** @type {string} */
  let first
  /** @type {string} */
  let second

  for (first of value[0]) {
    for (second of value[1]) {
      result.push(first + second)
    }
  }

  return result
}
