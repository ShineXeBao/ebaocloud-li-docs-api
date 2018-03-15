'use strict';
var cli = require ('./cli.js');                   //调用命令行工具
var swaggermerge = require('swagger-merge');      //swagger-merge工具
var fs = require('fs');
var format = require('date-fns/format')
var zh_cnLocale = require('date-fns/locale/zh_cn')

// 获取 -p 参数，确定merge.js 的工作路径并打印
var path = __dirname + '/projects/' + cli.workPath();
console.log('\x1b[1m2. i18n\x1b[0m');
console.log('  \x1b[4mWorking path\x1b[0m: %s', path);

//配置文件
var config = require(path + '/config.json');

var swagger = require(path + config.tmp.swagger);
var trans = [];

var getEnum = function (swaggerObj) {
  var results = [];
  // 每一次呢，都把自己的子对象丢进去再检测一遍，没有就停了。
  (function f(obj, key){
    key = key?key:"";
    //info下面的东西先不过滤，由外部引入（readme.md)
    if (key === "info") return;
    for(var k in obj) {
      //等于0的时候，进入最最底层，会无限循环
      if(typeof obj !== 'string') {
        //过滤enum 对象
        if((k === 'summary') || (k === 'description' && !obj[k]['type'])) {
          //result 是 properties文件，trans是临时数组，后续执行eval，生成swagger模板
          results.push("swagger." + key + "." + k + "=`" +obj[k] + "`");
          trans.push("swagger." + key + "." + k + "=`" + key + "." + k + "`");
        }
        if (key === "") {
          f (obj[k], k);
        } else {
          //有"/"只能用数组方式获取内容，其他就通过.
          if (k.includes("/") || !isNaN(k)) {
            f (obj[k], key+"['"+k+"']");
          } else {
            f (obj[k], key+"."+k);
          }
        }
      } else {return;}
    }
  })(swaggerObj);

  trans.sort(function(a,b){return a.toLowerCase()>b.toLowerCase()?1:-1;});
  return results.sort(function(a,b){return a.toLowerCase()>b.toLowerCase()?1:-1;});
}

var transEnum = getEnum(swagger);

//fs.writeFileSync("./swagger-cn.json", JSON.stringify(swagger, null, 2));
//本地保存
var properties_cn = "";
var properties_en = "";

for (var i in transEnum) {
   if (/[\u4e00-\u9FA5]+/.test(transEnum[i])) {
      properties_cn += transEnum[i] + "\n";
   } else {
      properties_en += transEnum[i] + "\n";
   }
   //console.log(trans[i]);
   eval(trans[i]);
}

//临时目录下
if (!fs.existsSync(path + '/tmp')) {
  fs.mkdirSync(path + '/tmp');
}
//写properties
fs.writeFileSync(path + config.tmp.properties+"_en", properties_en);
console.log('  \x1b[4mWriting file to\x1b[0m: %s', path + config.tmp.properties+"_en");
fs.writeFileSync(path + config.tmp.properties+"_cn", properties_cn);
console.log('  \x1b[4mWriting file to\x1b[0m: %s', path + config.tmp.properties+"_cn");
//写swagger模板
fs.writeFileSync(path + config.tmp.swaggerTemplate, JSON.stringify(swagger, null, 2));
console.log('  \x1b[4mWriting file to\x1b[0m: %s', path + config.tmp.swaggerTemplate);
console.log('\n')
