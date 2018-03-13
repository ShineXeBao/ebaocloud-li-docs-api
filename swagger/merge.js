'use strict';
var cli = require ('./cli.js');                   //调用命令行工具
var swaggermerge = require('swagger-merge');      //swagger-merge工具
var fs = require('fs');

// 获取 -p 参数，确定merge.js 的工作路径并打印
var path = __dirname + '/' + cli.workPath();
console.log('  \x1b[4mWorking path\x1b[0m: %s', path);

//配置文件
var config = require(path + '/config.json');

//获取需要merge的文件
console.log('  \x1b[4mFile(s) will be merged\x1b[0m: %s', config.sourceSwagger);
config.sourceSwagger = config.sourceSwagger.map(s => require(path + s));

//版本号
console.log('  \x1b[4mSwagger version\x1b[0m: %s', config.info.version);

//合并
console.log('\n  \x1b[1mStart to merge...\x1b[0m');
swaggermerge.on('warn', function (msg) {
    console.log('      \x1b[45m\x1b[33mWarning:\x1b[0m %s', msg);
})
var mergedJson = swaggermerge.merge(config.sourceSwagger, config.info, config.URlPath, config.URL, config.schemes);

//格式化以后写入/tmp/merged-swagger.json
if (!fs.existsSync(path + '/tmp')) {
  fs.mkdirSync(path + '/tmp');
}

fs.writeFileSync(path + config.tmp.swagger, JSON.stringify(mergedJson, null, 2));
console.log('  \x1b[1m...Done\x1b[0m');
console.log('  \x1b[4mWriting file to\x1b[0m: %s', path + config.tmp.swagger);
