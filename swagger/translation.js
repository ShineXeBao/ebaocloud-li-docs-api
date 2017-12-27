'use strict';
var cli = require ('./cli.js');
var path = cli();
console.log('Working path: %s', path);


var fs = require('fs');

var swagger = require(path + '/tmp/swagger-template-en.json');
//重新生成swagger en
var text = fs.readFileSync(__dirname + '/locales/swagger-en.properties', 'utf8');

// 将文件按行拆成数组
text.split(/\r?\n/).forEach(function (line) {
  eval(line);
});
fs.writeFileSync(path + '/swagger-en.json', JSON.stringify(swagger, null, 2))

//重新生成swagger cn
swagger = require(path + '/tmp/swagger-template-cn.json');
var text = fs.readFileSync(__dirname + '/locales/swagger-cn.properties', 'utf8');

// 将文件按行拆成数组
text.split(/\r?\n/).forEach(function (line) {
  eval(line);
});
fs.writeFileSync(path + '/swagger-cn.json', JSON.stringify(swagger, null, 2));;
