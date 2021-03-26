# emoticon

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]

Info on ASCII emoticons.  :p

## Install

This package is ESM only: Node 12+ is needed to use it and it must be `import`ed
instead of `require`d.

[npm][]:

```sh
npm install emoticon
```

## Use

```js
import {emoticon} from 'emoticon'

console.log(emoticon.slice(0, 3))
```

Yields:

```js
[ { name: 'angry',
    emoji: '😠',
    tags: [ 'mad', 'annoyed' ],
    description: 'angry face',
    emoticons:
     [ '>:(', '>:[', '>:-(', '>:-[', '>=(', '>=[', '>=-(', '>=-[' ] },
  { name: 'blush',
    emoji: '😊',
    tags: [ 'proud' ],
    description: 'smiling face with smiling eyes',
    emoticons:
     [ ':")',
       ':"]',
       ':"D',
       ':-")',
       ':-"]',
       ':-"D',
       '=")',
       '="]',
       '="D',
       '=-")',
       '=-"]',
       '=-"D' ] },
  { name: 'broken_heart',
    emoji: '💔',
    tags: [],
    description: 'broken heart',
    emoticons: [ '<\\3', '</3' ] } ]
```

## API

This package exports the following identifiers: `emoticon`.
There is no default export.

See use above for an example.

## Support

See [`support.md`][support].

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://github.com/wooorm/emoticon/workflows/main/badge.svg

[build]: https://github.com/wooorm/emoticon/actions

[coverage-badge]: https://img.shields.io/codecov/c/github/wooorm/emoticon.svg

[coverage]: https://codecov.io/github/wooorm/emoticon

[downloads-badge]: https://img.shields.io/npm/dm/emoticon.svg

[downloads]: https://www.npmjs.com/package/emoticon

[size-badge]: https://img.shields.io/bundlephobia/minzip/emoticon.svg

[size]: https://bundlephobia.com/result?p=emoticon

[npm]: https://docs.npmjs.com/cli/install

[license]: license

[author]: https://wooorm.com

[support]: support.md
