# debugdown

> Log all operations made on an [`abstract-leveldown`](https://github.com/Level/abstract-leveldown) compliant store. For node and browsers.

[![npm](https://img.shields.io/npm/v/debugdown.svg)](https://www.npmjs.com/package/debugdown)
![Node version](https://img.shields.io/node/v/debugdown.svg)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) [![Greenkeeper badge](https://badges.greenkeeper.io/vweevers/debugdown.svg)](https://greenkeeper.io/)

## Usage

```js
var levelup = require('levelup')
var leveldown = require('leveldown')
var debugdown = require('debugdown')

var db = levelup(debugdown(leveldown('db')))

// Use db like you normally would
```

Enable debug output with `DEBUG=debugdown`.

## License

[MIT](LICENSE.md) &copy; 2018-present Vincent Weevers.
