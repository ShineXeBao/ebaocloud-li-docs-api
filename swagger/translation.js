'use strict';
var fs = require('fs');

//增加enum 分支
var swagger = require("./swagger.json");
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

  return results;
}

var transEnum = getEnum(swagger);

//fs.writeFileSync("./swagger-cn.json", JSON.stringify(swagger, null, 2));
//本地保存
var properties = "";
for (var i in transEnum) {
   properties += transEnum[i] + "\n";
   //console.log(trans[i]);
   eval(trans[i]);
}
//fs.writeFileSync("./locales/swagger-cn.properties", properties);

//fs.writeFileSync("./swagger-template.json", JSON.stringify(swagger, null, 2));

//重新生成swagger cn和en
var text = fs.readFileSync("./locales/swagger-en.properties", 'utf8');

// 将文件按行拆成数组
text.split(/\r?\n/).forEach(function (line) {
  eval(line);
});
fs.writeFileSync("./swagger-en.json", JSON.stringify(swagger, null, 2));
