var test = require('tape')
var testCommon = require('abstract-leveldown/testCommon')
var MemDOWN = require('memdown')
var DebugDown = require('.')

var factory = function () {
  return new DebugDown(new MemDOWN())
}

require('abstract-leveldown/abstract/open-test').args(factory, test, testCommon)
require('abstract-leveldown/abstract/open-test').open(factory, test, testCommon)
require('abstract-leveldown/abstract/del-test').all(factory, test)
require('abstract-leveldown/abstract/get-test').all(factory, test)
require('abstract-leveldown/abstract/put-test').all(factory, test)
require('abstract-leveldown/abstract/put-get-del-test').all(factory, test)
require('abstract-leveldown/abstract/batch-test').all(factory, test)
require('abstract-leveldown/abstract/chained-batch-test').all(factory, test)
require('abstract-leveldown/abstract/close-test').close(factory, test)
require('abstract-leveldown/abstract/iterator-test').all(factory, test)
require('abstract-leveldown/abstract/iterator-range-test').all(factory, test)
