# emoticon [![Build Status][travis-badge]][travis]

Info on ASCII emoticons.  :p

## Installation

[npm][]:

```bash
npm install emoticon
```

## Usage

```javascript
var emoticon = require('emoticon');

console.log(emoticon.slice(0, 3));
```

Yields:

```js
[ { name: 'angry',
    emoji: '😠',
    tags: [ 'mad', 'annoyed' ],
    description: 'angry face',
    emoticons: [ '>:(', '>:[', '>:-(', '>:-[', '>=(', '>=[', '>=-(', '>=-[' ] },
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

## Support

See [support.md][support].

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[travis-badge]: https://img.shields.io/travis/wooorm/emoticon.svg

[travis]: https://travis-ci.org/wooorm/emoticon

[npm]: https://docs.npmjs.com/cli/install

[license]: LICENSE

[author]: http://wooorm.com

[support]: support.md
