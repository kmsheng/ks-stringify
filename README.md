# ks-stringify
Stream version of JSON.stringify

Example
```
var stringify = require('ks-stringify');
var fs = require('fs');
var writeStream = fs.createWriteStream('data.json');

var obj = {hello: 'world'};

stringify(obj).pipe(writeStream)
  .on('finish', function() {
    console.log('data.json has been written !');
  });
```
