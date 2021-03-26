import fs from 'fs'
import {markdownTable} from 'markdown-table'
import {emoticon} from '../index.js'

var data = [['Emoji', 'Name', 'Tags', 'Emoticons']].concat(
  emoticon.map(function (info) {
    return [
      info.emoji,
      info.name,
      info.tags.join('; '),
      '`' + info.emoticons.join('`; `').replace(/\|/g, '\\|') + '`'
    ]
  })
)

fs.writeFileSync(
  'support.md',
  [
    '# Supported emoticons',
    '',
    'Note that you need a browser capable of viewing emoji to make sense of',
    'the first column!',
    '',
    markdownTable(data, {align: 'c', alignDelimiters: false}),
    ''
  ].join('\n')
)
