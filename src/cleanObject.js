var _ = require('lodash')._;

module.exports = cleanObject;

function cleanObject(obj) {

  var newObj = _.cloneDeep(obj);

  _.each(newObj, function(value, prop) {
    if (_.isUndefined(value) || _.isFunction(value)) {
      delete newObj[prop];
    }
  });
  return newObj;
}
