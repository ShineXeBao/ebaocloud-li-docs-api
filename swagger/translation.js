'use strict';
var cli = require ('./cli.js');                   //调用命令行工具
var swaggermerge = require('swagger-merge');      //swagger-merge工具
var fs = require('fs');
var format = require('date-fns/format')
var zh_cnLocale = require('date-fns/locale/zh_cn')

// 获取 -p 参数，确定merge.js 的工作路径并打印
var path = __dirname + '/projects/' + cli.workPath();
//console.log('  \x1b[4mWorking path\x1b[0m: %s', path);

//配置文件
var config = require(path + '/config.json');

var lang = config.lang;
console.log('  \x1b[4mLanguage\x1b[0m: %s', lang);
var swagger = require(path + config.tmp.swaggerTemplate);

//有几个 lang，就做几个swagger file
for (var i = 0; i < lang.length; i++) {

  //读本目录下/locales/README 文件，加入description，如果没有，用缺省readme代替
  var readme;
  try {
    readme = fs.readFileSync(path + '/locales/README-' + lang[i] + '.md', 'utf-8');
    console.log('  \x1b[4mLoading README\x1b[0m: %s', path + '/locales/README-' + lang[i] + '.md');
  } catch (err) {
    // Here you get the error when the file was not found,
    // but you also get any other error
    if (err.code === 'ENOENT') {
      //如果找不到readme，用缺省readme代替
      console.log('README is not found! Using default instead.');
      readme = fs.readFileSync(__dirname + '/locales/README-' + lang[i] + '.md', 'utf-8');
      console.log('  \x1b[4mLoading README\x1b[0m: %s', __dirname + '/locales/README-' + lang[i] + '.md');
    } else {
      throw err;
    }
  }

  config.info.description = `${readme.toString()}`;
  //替换info 内容
  swagger.info = config.info;

  //读取翻译，更新到swagger
  var properties = fs.readFileSync(__dirname + '/locales/swagger-' + lang[i] + '.properties', 'utf8');
  // 将文件按行拆成数组，执行。替换swagger里面的string
  properties.split(/\r?\n/).forEach(function (line) {
    try {
      eval(line);
    } catch (err) {
      //console.log('Swagger translation error: %s', err);
    }
  });

  try {
    properties = fs.readFileSync(path + '/locales/swagger.properties', 'utf8');
  // 将文件按行拆成数组，执行。替换swagger里面的string
    properties.split(/\r?\n/).forEach(function (line) {
      try {
        eval(line);
      } catch (err) {
        //console.log('Swagger translation error: %s', err);
      }
    });
  } catch (err) {};

  //替换json string里面的timestamp为当前时间
  var swaggerString = JSON.stringify(swagger, null, 2);
  var timeStamp = `${format(new Date(), 'ddd MMM D YYYY, HH:mm:ss Z')}`;
  swaggerString = swaggerString.replace(/\[TIMESTAMP\]/, timeStamp);

  //写入文件
  console.log('  \x1b[4mWriting file to\x1b[0m: %s',path + '/dist/swagger-' + cli.workPath() + '-' + lang[i] + '.json' );
  if (!fs.existsSync(path + '/dist')) {
    fs.mkdirSync(path + '/dist');
  }

  fs.writeFileSync(path + '/dist/swagger-' + cli.workPath() + '-' + lang[i] + '.json', swaggerString);
  console.log('  ...Done.\n');
}
