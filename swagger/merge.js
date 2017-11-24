/**
Retrieve the latest API swagger file and merge them into one.
InitVersion: Chinese version
*/
'use strict';
var swaggermerge = require('swagger-merge');
var format = require('date-fns/format')

var fs = require('fs');

var swaggerProduct = require('./source/product.json')
var swaggerProposal = require('./source/proposal.json')
var swaggerSalesPackages = require('./source/salesPackages.json')

//读readme 文件，加入description
var readme = fs.readFileSync('./locales/README-en.md', 'utf-8');
var info = {
    version: "0.9.6",
    title: "eBaoCloud LI OpenAPI",
    //add description from readme (in markdown)
    description: `${readme.toString()}`
}
var schemes = ['https']

swaggermerge.on('warn', function (msg) {
    console.log(msg)
})
var mergedJson = swaggermerge.merge([swaggerProduct, swaggerProposal], info, '/rest', 'sandbox.api.li.ebaocloud.com.cn', schemes);

//替换json string
var mergedString = JSON.stringify(mergedJson, null, 2);

var timeStamp = `${format(new Date(), 'ddd MMM D YYYY, HH:mm:ss Z')}`;
mergedString = mergedString.replace(/\[TIMESTAMP\]/, timeStamp);
//更新rest地址
mergedString = mergedString.replace(/\/pd\/packages/g, "\/packages");
mergedString = mergedString.replace(/\/pd\/products/g, "\/products");
mergedString = mergedString.replace(/\/pd\/salesPackages/g, "\/sales/packages");
mergedString = mergedString.replace(/\/proposal\/proposals/g, "\/proposals");
//smergedString = mergedString.replace(/product-controller/g, "Product");

// 本地保存
fs.writeFileSync("./swagger.json", mergedString);
//
// //增加enum 分支
// var swagger = require("./swagger.json");
//
// var getEnum = function (obj) {
//   var results = {};
//   // 每一次呢，都把自己的子对象丢进去再检测一遍，没有就停了。
//   (function f(obj, key){
//     for(var k in obj) {
//       //等于0的时候，进入最最底层，会无限循环
//       if(isNaN(k)) {
//         //过滤enum 对象
//         if(k === 'enum') {
//           //results.push(obj);
//           results[key] = obj;
//         }
//         //　重新调用了自己
//         //arguments.callee(obj[k], k);
//         f (obj[k], k);
//       }
//     }
//   })(obj);
//
//   return results;
// }
//
// var enumSet = getEnum(swagger['definitions'], swagger);
// swagger['enums'] = enumSet;
//
// //本地保存
// fs.writeFileSync("./swagger2.json", JSON.stringify(swagger, null, 2));
