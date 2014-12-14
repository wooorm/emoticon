# emoticon [![Build Status](https://img.shields.io/travis/wooorm/emoticon.svg?style=flat)](https://travis-ci.org/wooorm/emoticon) [![Coverage Status](https://img.shields.io/coveralls/wooorm/emoticon.svg?style=flat)](https://coveralls.io/r/wooorm/emoticon?branch=master)

Accessible Information regarding ASCII emoticons. :p

## Installation

npm:
```sh
$ npm install emoticon
```

Component:
```sh
$ component install wooorm/emoticon
```

Bower:
```sh
$ bower install emoticon
```

## Usage

```js
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

## Supported Emoticons

See [Support.md](Support.md).

## License

MIT © Titus Wormer
