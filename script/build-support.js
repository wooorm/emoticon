'use strict';

var fs = require('fs');
var table = require('markdown-table');
var emoticons = require('..');

var data = [[
  'Emoji',
  'Name',
  'Tags',
  'Emoticons'
]].concat(emoticons.map(function (info) {
  return [
    info.emoji,
    info.name,
    info.tags.join('; '),
    '`' + info.emoticons.join('`; `').replace(/\|/g, '\\|') + '`'
  ];
}));

fs.writeFileSync('support.md',
  '# Supported emoticons\n' +
  '\n' +
  'Note that you need a browser capable of viewing\n' +
  'unicode-emoji to make sense of the first column!\n' +
  '\n' +
  table(data, {
    align: 'c',
    pad: false
  }) +
  '\n'
);
