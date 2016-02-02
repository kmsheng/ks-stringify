var _ = require('lodash')._;
var cleanObject = require('./cleanObject');

module.exports = iterate;

function iterate(data, cb) {

  if (_.isPlainObject(data)) {

    // don't handle undefined or function value e.g. var obj = {test: undefined, func: function() {}}
    data = cleanObject(data);

    cb('object-start', {length: _.keys(data).length});

    _.each(data, function(value, prop) {
      cb('object-prop', {prop: prop});
      iterate(value, cb);
    });

    cb('object-end');
    return;
  }

  if (_.isArray(data)) {
    cb('array-start', {length: data.length});
    _.each(data, function(value, index) {
      iterate(value, cb);
    });
    cb('array-end');
    return;
  }

  if (_.isFunction(data)) {
    cb('function');
    return;
  }

  cb('primitive', {value: data});
}
