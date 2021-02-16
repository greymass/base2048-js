base2048-js
===========

Base2048 encoder and decoder in JavaScript.

## Installation

The `@greymass/base2048` package is distributed as a module on [npm](https://www.npmjs.com/package/@greymass/base2048).

```
yarn add @greymass/base2048
# or
npm install --save @greymass/base2048
```

## Usage

```ts
import Base2048 from '@greymass/base2048'
const wordlist = loadFile('bip39-english.txt')
const base2048 = new Base2048(wordlist)
const message = [104, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100] // utf-8 "hello world"
const encoded = base2048.encode(message)
console.log(encoded.join(' ')) // 'half clock brand tattoo alter response situate milk'
const decoded = base2048.decode(encoded)
console.log(decoded) // [104, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100]
```

The library also exposes `encode` and `decode` functions that can be used to en/decode with indices directly if you prefer to implement the word list conversion yourself or want to use it a novel data compression library ;)

## Developing

You need [Make](https://www.gnu.org/software/make/), [node.js](https://nodejs.org/en/) and [yarn](https://classic.yarnpkg.com/en/docs/install) installed.

Clone the repository and run `make` to checkout all dependencies and build the project. See the [Makefile](./Makefile) for other useful targets. Before submitting a pull request make sure to run `make lint`.

---

Made with ☕️ & ❤️ by [Greymass](https://greymass.com), if you find this useful please consider [supporting us](https://greymass.com/support-us).
