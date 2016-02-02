var _ = require('lodash')._;
var Readable = require('readable-stream').Readable;
var util = require('util');
var iterate = require('./iterate');

module.exports = Stringify;

util.inherits(Stringify, Readable);

function Stringify(data, options) {

  if (! (this instanceof Stringify)) {
    return new Stringify(data, options);
  }

  Readable.call(this);

  this.options = options || {chunkSize: 10 * 1024 * 1024};

  this._chunk = '';
  this._data = data;
  this._read = read;
  this._save = save;
  this._stacks = [];
}

function save(chunk) {

  if (null === chunk) {
    if (this._chunk) {
      this.push(this._chunk);
      this._chunk = '';
    }
    this.push(null);
    return;
  }

  this._chunk += chunk;

  if (this._chunk.length >= this.options.chunkSize) {
    this.push(this._chunk);
    this._chunk = '';
  }
}

function read() {

  var self = this;

  iterate(self._data, handleIterated);

  function handleIterated(type, options) {

    options = options || {};

    switch (type) {
      case 'object-start':
        self._stacks.push({length: options.length, index: 0});
        self._save('{');
        break;
      case 'object-prop':
        return self._save(JSON.stringify(options.prop) + ':');
      case 'object-end':
        self._stacks.pop();
        self._save('}');
        commaIfNeeded();
        break;
      case 'array-start':
        self._stacks.push({length: options.length, index: 0});
        return self._save('[');
      case 'array-end':
        self._stacks.pop();
        self._save(']');
        commaIfNeeded();
        break;
      case 'function':
        self._save(JSON.stringify(null));
        commaIfNeeded();
        break;
      case 'primitive':
        self._save(JSON.stringify(options.value));
        commaIfNeeded();
        break;
      default:
    }

    if (! getCurrentStack()) {
      self._save(null);
    }
  }

  function getCurrentStack() {
    return _.last(self._stacks);
  }

  function commaIfNeeded() {
    var stack = getCurrentStack();
    if (stack && (stack.index < (stack.length - 1))) {
      self._save(',');
      ++stack.index;
    }
  }
}
