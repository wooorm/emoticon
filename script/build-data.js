'use strict'

var fs = require('fs')
var gemoji = require('gemoji')
var schema = require('../schema')
var alias = require('../alias')

var own = {}.hasOwnProperty

/* Get the emoticon representation of emoticons. */
var data = Object.keys(schema)
  .filter(function(name) {
    var has = own.call(gemoji.name, name)

    if (!has) {
      console.log('Missing info for `%s`, `%s`', gemoji.emoji, gemoji.name)
    }

    return has
  })
  .map(function(name) {
    return gemoji.name[name]
  })
  .map(function(info) {
    var emoticon = schema[info.name]
    var result

    emoticon = emoticon.map(function(key) {
      return flatten([key])
    })

    while (emoticon[1]) {
      result = unpack(emoticon)
      emoticon.shift()
      emoticon[0] = result
    }

    return {
      name: info.name,
      emoji: info.emoji,
      tags: info.tags,
      description: info.description,
      emoticons: result
    }
  })
  .filter(function(info) {
    return Boolean(info.emoticons)
  })

/* Remove some black-listed emoticons. */
data.forEach(function(info) {
  info.emoticons = info.emoticons.filter(filter)

  function filter(emoticon) {
    if (
      (/^[a-zA-Z]+$/.test(emoticon) &&
        (emoticon.toUpperCase() === emoticon ||
          emoticon.toLowerCase() === emoticon)) ||
      /([\s\S])\1+/g.test(emoticon) ||
      emoticon === '=-'
    ) {
      console.log('Removing dangerous/unused emoticon: ', emoticon)
      return false
    }

    return true
  }
})

/* Detect if emoticons are classified multiple times. */
var known = {}

data.forEach(function(info) {
  info.emoticons.forEach(function(emoticon) {
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

/* Write. */
fs.writeFileSync('index.json', JSON.stringify(data, null, 2) + '\n')

function unpack(val) {
  var res = []
  val[0].forEach(function(first) {
    val[1].forEach(function(second) {
      res.push(first + second)
    })
  })
  return res
}

/* Flatten facial parts. */
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
