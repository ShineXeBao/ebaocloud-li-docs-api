'use strict';
var fs = require('fs');

//增加enum 分支
var swagger = require("./swagger.json");

var getEnum = function (obj) {
  var results = {};
  // 每一次呢，都把自己的子对象丢进去再检测一遍，没有就停了。
  (function f(obj, key){
    for(var k in obj) {
      //等于0的时候，进入最最底层，会无限循环
      if(isNaN(k)) {
        //过滤enum 对象
        if(k === 'enum') {
          //results.push(obj);
          results[key] = obj;
        }
        //　重新调用了自己
        //arguments.callee(obj[k], k);
        f (obj[k], k);
      }
    }
  })(obj);

  return results;
}

var enumSet = getEnum(swagger['definitions'], swagger);
swagger['enums'] = enumSet;

//本地保存
fs.writeFileSync("./enums.json", JSON.stringify(enumSet, null, 2));
