var should = require('should');
var stringify = require('./../src/stringify');

describe('stringify', function() {

  it('should handle object', function(done) {

    var obj = {
      str: '',
      num1: 1,
      num2: 1.1,
      nullProp: null,
      undef: undefined,
      func: function() {},
      obj: {
        num1: 2,
        num2: 2.2
      }
    };
    var res = '';

    stringify(obj)
      .on('data', function(chunk) {
        res += chunk;
      })
      .on('end', function() {
        res.should.equal(JSON.stringify(obj));
        done();
      });
  });

  it('should handle array', function(done) {

    var arr = [1, [1, 2], {test1: 1, test2: 1.1, test3: -1.1}, function() {}, function() {}];
    var res = '';

    stringify(arr)
      .on('data', function(chunk) {
        res += chunk;
      })
      .on('end', function() {
        res.should.equal(JSON.stringify(arr));
        done();
      });
  });

  it('should handle string', function(done) {

    var str = 'hello world';
    var res = '';

    stringify(str)
      .on('data', function(chunk) {
        res += chunk;
      })
      .on('end', function() {
        res.should.equal(JSON.stringify(str));
        done();
      });
  });

  it('should handle null', function(done) {

    var nullVar = null;
    var res = '';

    stringify(nullVar)
      .on('data', function(chunk) {
        res += chunk;
      })
      .on('end', function() {
        res.should.equal(JSON.stringify(nullVar));
        done();
      });
  });

  it('should handle number', function(done) {

    var num = 1;
    var res = '';

    stringify(num)
      .on('data', function(chunk) {
        res += chunk;
      })
      .on('end', function() {
        res.should.equal(JSON.stringify(num));
        done();
      });
  });

});
