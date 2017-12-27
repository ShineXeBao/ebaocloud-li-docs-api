'use strict';
var fs = require('fs');
var format = require('date-fns/format')

var cli = require ('./cli.js');
var path = __dirname + '/' + cli.workPath();
var lang = cli.lang();
console.log('Working path: %s', path);

var swagger = require(path + '/tmp/swagger-template.json');

//读readme 文件，加入description，如果找不到readme，用缺省readme代替
var readme;
try {
  readme = fs.readFileSync(path + '/locales/README-' + lang + '.md', 'utf-8');
} catch (err) {
  // Here you get the error when the file was not found,
  // but you also get any other error
  if (err.code === 'ENOENT') {
    //如果找不到readme，用缺省readme代替
    console.log('README is not found! Using default instead.');
    readme = fs.readFileSync(__dirname + '/locales/README-' + lang + '.md', 'utf-8');;
  } else {
    throw err;
  }
}

var info = {
    version: "1.0",
    title: "eBaoCloud LI OpenAPI",
    termsOfService: "http://api.ebaocloud.life/",
    //add description from readme (in markdown)
    description: `${readme.toString()}`
}
//替换info 内容
swagger.info = info;

//读取翻译，更新到swagger
var properties = fs.readFileSync(__dirname + '/locales/swagger-' + lang + '.properties', 'utf8');
// 将文件按行拆成数组，执行。替换swagger里面的string
properties.split(/\r?\n/).forEach(function (line) {
  try {
    eval(line);
  } catch (err) {
    //console.log('Swagger translation error: %s', err);
  }
});

//替换json string里面的timestamp为当前时间
var swaggerString = JSON.stringify(swagger, null, 2);

var timeStamp = `${format(new Date(), 'ddd MMM D YYYY, HH:mm:ss Z')}`;
swaggerString = swaggerString.replace(/\[TIMESTAMP\]/, timeStamp);

//写入文件
console.log('Writing file to: %s',path + '/swagger-' + lang + '.json' );
fs.writeFileSync(path + '/swagger-' + cli.workPath() + '-' + lang + '.json', swaggerString);
console.log('Writing swagger-' + lang + '.json... Done.');
