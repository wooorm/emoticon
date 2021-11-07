/**
 * @typedef Emoticon
 * @property {string} name
 * @property {string} emoji
 * @property {Array<string>} tags
 * @property {string} description
 * @property {Array<string>} emoticons
 */

import assert from 'node:assert'
import fs from 'node:fs'
import {gemoji} from 'gemoji'

/** @type {Record<string, Array<string>>} */
const schema = JSON.parse(String(fs.readFileSync('schema.json')))
/** @type {Record<string, string|Array<string>>} */
const alias = JSON.parse(String(fs.readFileSync('alias.json')))

const own = {}.hasOwnProperty

// Get the emoticon representation of emoticons.
/** @type {Array<Emoticon>} */
const data = Object.keys(schema)
  .map((name) => ({
    name,
    info: gemoji.find((d) => d.names.includes(name)),
    structure: schema[name]
  }))
  .map((ctx) => {
    assert(ctx.info, 'expected matching gemoji for `' + ctx.name + '`')
    const structure = ctx.structure
    const flatStructure = structure.map((key) => flatten([key]))
    /** @type {Array<string>|undefined} */
    let result

    while (flatStructure[1]) {
      result = unpack(flatStructure)
      flatStructure.shift()
      flatStructure[0] = result
    }

    // Remove some dangerous emoticons.
    result = (result || []).filter((emoticon) => {
      if (
        (/^[a-zA-Z]+$/.test(emoticon) &&
          (emoticon.toUpperCase() === emoticon ||
            emoticon.toLowerCase() === emoticon)) ||
        /([\s\S])\1+/g.test(emoticon) ||
        emoticon === '=-'
      ) {
        console.log('Removing dangerous/unused emoticon:', emoticon)
        return false
      }

      return true
    })

    return {
      name: ctx.name,
      emoji: ctx.info.emoji,
      tags: ctx.info.tags,
      description: ctx.info.description,
      emoticons: result
    }
  })
  .filter((info) => info.emoticons.length > 0)

// Detect if emoticons are classified multiple times.
/** @type {Record<string, string>} */
const known = {}
/** @type {Emoticon} */
let info
/** @type {string} */
let emoticon

for (info of data) {
  for (emoticon of info.emoticons) {
    if (own.call(known, emoticon)) {
      console.log(
        'Duplicate emoticon `%s` in `%s` and `%s`',
        emoticon,
        info.name,
        known[emoticon]
      )
    }

    known[emoticon] = info.name
  }
}

// Write.
fs.writeFileSync(
  'index.js',
  [
    '/**',
    ' * @typedef Emoticon',
    ' *   Info on an emoticon.',
    ' * @property {string} name',
    ' *   Name of an emoticon (preferred name from `wooorm/gemoji`).',
    ' * @property {string} emoji',
    ' *   Corresponding emoji.',
    ' * @property {Array<string>} tags',
    ' *   Associated tags (from `wooorm/gemoji`).',
    ' * @property {string} description',
    ' *   Associated description (from `wooorm/gemoji`).',
    ' * @property {Array<string>} emoticons',
    ' *   ASCII emoticons.',
    ' */',
    '',
    '/**',
    ' * List of emoticons.',
    ' *',
    ' * @type {Array<Emoticon>}',
    ' */',
    'export const emoticon = ' + JSON.stringify(data, null, 2),
    ''
  ].join('\n')
)

/**
 * @param {Array<string>|Array<Array<string>>} value
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

/**
 * Flatten facial parts.
 * @param {string|Array<string>} keys
 */
function flatten(keys) {
  /** @type {Array<string>} */
  const result = []
  let index = -1

  while (++index < keys.length) {
    if (own.call(alias, keys[index])) {
      result.push(...flatten(alias[keys[index]]))
    } else if (Array.isArray(keys[index])) {
      result.push(...keys[index])
    } else {
      result.push(keys[index])
    }
  }

  return result
}
