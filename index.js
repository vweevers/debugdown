'use strict'

var AbstractLevelDOWN = require('abstract-leveldown').AbstractLevelDOWN
var AbstractChainedBatch = require('abstract-leveldown').AbstractChainedBatch
var AbstractIterator = require('abstract-leveldown').AbstractIterator
var inherits = require('inherits')
var debug = require('debug')

module.exports = DebugDown.default = DebugDown

function DebugDown (db, scope) {
  if (!(this instanceof DebugDown)) return new DebugDown(db, scope)
  AbstractLevelDOWN.call(this, '')

  this.db = db
  this.debug = debug(scope || 'debugdown')
}

inherits(DebugDown, AbstractLevelDOWN)

DebugDown.prototype._serializeKey = function (key) {
  this.debug('serializeKey', key)
  return key
}

DebugDown.prototype._serializeValue = function (value) {
  this.debug('serializeValue', value)
  return value
}

DebugDown.prototype._open = function (options, cb) {
  this.debug('open', options)
  this.db.open(options, cb)
}

DebugDown.prototype._close = function (cb) {
  this.debug('close')
  this.db.close(cb)
}

DebugDown.prototype._put = function (key, value, options, cb) {
  this.debug('put', key, value, options)
  this.db.put(key, value, options, cb)
}

DebugDown.prototype._get = function (key, options, cb) {
  this.debug('get', key, options)
  this.db.get(key, options, cb)
}

DebugDown.prototype._del = function (key, options, cb) {
  this.debug('del', key, options)
  this.db.del(key, options, cb)
}

DebugDown.prototype._chainedBatch = function () {
  this.debug('chainedBatch')
  return new Batch(this)
}

DebugDown.prototype._batch = function (operations, options, cb) {
  this.debug('batch', operations, options)
  this.db.batch(operations, options, cb)
}

DebugDown.prototype._iterator = function (options) {
  this.debug('iterator', options)
  return new Iterator(this, options)
}

function Iterator (db, options) {
  AbstractIterator.call(this, db)
  this.debug = db.debug
  this.it = db.db.iterator(options)
}

inherits(Iterator, AbstractIterator)

Iterator.prototype._next = function (cb) {
  this.debug('iterator#next')
  this.it.next(cb)
}

Iterator.prototype._end = function (cb) {
  this.debug('iterator#end')
  this.it.end(cb)
}

function Batch (db) {
  AbstractChainedBatch.call(this, db)
  this.debug = db.debug
  this.batch = db.db.batch()
}

inherits(Batch, AbstractChainedBatch)

Batch.prototype._put = function (key, value) {
  this.debug('batch#put', key, value)
  this.batch.put(key, value)
}

Batch.prototype._del = function (key) {
  this.debug('batch#del', key)
  this.batch.del(key)
}

Batch.prototype._clear = function () {
  this.debug('batch#clear')
  this.batch.clear()
}

Batch.prototype._write = function (options, cb) {
  // This will be fixed in abstract-leveldown@6
  if (typeof options === 'function') {
    cb = options
    options = {}
  }

  this.debug('batch#write', options)
  this.batch.write(options, cb)
}
