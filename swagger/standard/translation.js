'use strict';
var fs = require('fs');

var swagger = require("./swagger-template-en.json");
//重新生成swagger en
var text = fs.readFileSync("./locales/swagger-en.properties", 'utf8');

// 将文件按行拆成数组
text.split(/\r?\n/).forEach(function (line) {
  eval(line);
});
fs.writeFileSync("./swagger-en.json", JSON.stringify(swagger, null, 2))

//重新生成swagger cn
swagger = require("./swagger-template-cn.json");
var text = fs.readFileSync("./locales/swagger-cn.properties", 'utf8');

// 将文件按行拆成数组
text.split(/\r?\n/).forEach(function (line) {
  eval(line);
});
fs.writeFileSync("./swagger-cn.json", JSON.stringify(swagger, null, 2));;
