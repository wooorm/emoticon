'use strict'

var fs = require('fs')
var gemoji = require('gemoji')
var schema = require('../schema')
var alias = require('../alias')

var own = {}.hasOwnProperty

// Get the emoticon representation of emoticons.
var data = Object.keys(schema)
  .map(function (name) {
    return {
      name: name,
      info: gemoji.find((d) => d.names.includes(name)),
      structure: schema[name]
    }
  })
  .map(function (ctx) {
    var structure = ctx.structure
    var result

    structure = structure.map(function (key) {
      return flatten([key])
    })

    while (structure[1]) {
      result = unpack(structure)
      structure.shift()
      structure[0] = result
    }

    // Remove some dangerous emoticons.
    result = (result || []).filter(filter)

    return {
      name: ctx.name,
      emoji: ctx.info.emoji,
      tags: ctx.info.tags,
      description: ctx.info.description,
      emoticons: result
    }

    function filter(emoticon) {
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
    }
  })
  .filter(function (info) {
    return info.emoticons.length !== 0
  })

// Detect if emoticons are classified multiple times.
var known = {}

data.forEach(function (info) {
  info.emoticons.forEach(function (emoticon) {
    if (own.call(known, emoticon)) {
      console.log(
        'Duplicate emoticon `%s` in `%s` and `%s`',
        emoticon,
        info.name,
        known[emoticon]
      )
    }

    known[emoticon] = info.name
  })
})

// Write.
fs.writeFileSync('index.json', JSON.stringify(data, null, 2) + '\n')

function unpack(value) {
  var result = []
  value[0].forEach(function (first) {
    value[1].forEach(function (second) {
      result.push(first + second)
    })
  })
  return result
}

// Flatten facial parts.
function flatten(keys) {
  var result = []
  var index = -1
  var length = keys.length

  while (++index < length) {
    if (own.call(alias, keys[index])) {
      result = result.concat(flatten(alias[keys[index]]))
    } else if (Array.isArray(keys[index])) {
      result = result.concat(keys[index])
    } else {
      result.push(keys[index])
    }
  }

  return result
}
