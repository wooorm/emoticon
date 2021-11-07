import fs from 'node:fs'
import {gemoji} from 'gemoji'

/** @type {Object.<string, string[]>} */
const schema = JSON.parse(String(fs.readFileSync('schema.json')))
/** @type {Object.<string, string | string[]>} */
const alias = JSON.parse(String(fs.readFileSync('alias.json')))

const own = {}.hasOwnProperty

// Get the emoticon representation of emoticons.
const data = Object.keys(schema)
  .map(function (name) {
    return {
      name,
      info: gemoji.find((d) => d.names.includes(name)),
      structure: schema[name]
    }
  })
  .map(function (ctx) {
    /** @type {string[]|string[][]} */
    let structure = ctx.structure
    /** @type {string[]} */
    let result

    structure = structure.map(function (key) {
      return flatten([key])
    })

    while (structure[1]) {
      result = unpack(structure)
      structure.shift()
      structure[0] = result
    }

    // Remove some dangerous emoticons.
    result = (result || []).filter(function (emoticon) {
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
  .filter(function (info) {
    return info.emoticons.length > 0
  })

// Detect if emoticons are classified multiple times.
const known = {}
/** @type {{name: string, emoji: string, tags: string[], description: string, emoticons: string[]}} */
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
  'export const emoticon = ' + JSON.stringify(data, null, 2) + '\n'
)

/**
 * @param {string[]|string[][]} value
 */
function unpack(value) {
  /** @type {string[]} */
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
 * @param {string|string[]} keys
 */
function flatten(keys) {
  /** @type {string[]} */
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
