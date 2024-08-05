import fs from 'node:fs/promises'
import {markdownTable} from 'markdown-table'
import {emoticon} from '../index.js'

const data = [['Emoji', 'Name', 'Tags', 'Emoticons']].concat(
  emoticon.map(function (info) {
    return [
      info.emoji,
      info.name,
      info.tags.join('; '),
      '`' + info.emoticons.join('`; `').replace(/\|/g, '\\|') + '`'
    ]
  })
)

await fs.writeFile(
  'support.md',
  [
    '# Supported emoticons',
    '',
    'Note that you need a browser capable of viewing emoji to make sense of',
    'the first column!',
    '',
    markdownTable(data, {alignDelimiters: false, align: 'c'}),
    ''
  ].join('\n')
)
