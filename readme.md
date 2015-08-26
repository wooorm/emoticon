# emoticon [![Build Status](https://img.shields.io/travis/wooorm/emoticon.svg)](https://travis-ci.org/wooorm/emoticon) [![Coverage Status](https://img.shields.io/codecov/c/github/wooorm/emoticon.svg)](https://codecov.io/github/wooorm/emoticon)

Accessible Information regarding ASCII emoticons. :p

## Installation

[npm](https://docs.npmjs.com/cli/install):

```bash
npm install emoticon
```

**emoticon** is also available for [bower](http://bower.io/#install-packages),
[component](https://github.com/componentjs/component), and
[duo](http://duojs.org/#getting-started), and as an AMD, CommonJS, and globals
module, [uncompressed](emoticon.js) and [compressed](emoticon.min.js).

## Usage

```javascript
var emoticon = require('emoticon');

emoticon.emoticon['<3'];
```

Yields:

```json
{
  "name": "heart",
  "emoji": "❤️",
  "tags": ["love"],
  "description": "heavy black heart",
  "emoticons": [
    "<3"
  ]
}
```

### By unicode emoji

```js
emoticon.unicode['👨'];
```

Yields:

```json
{
  "name": "man",
  "emoji": "👨",
  "tags": [
    "mustache",
    "father",
    "dad"
  ],
  "description": "man",
  "emoticons": [
    ":3",
    ":-3",
    "=3",
    "=-3",
    ";3",
    ";-3",
    "x3",
    "x-3",
    "X3",
    "X-3"
  ]
}
```

## Supported emoticon

See [support.md](support.md).

## License

[MIT](LICENSE) © [Titus Wormer](http://wooorm.com)
