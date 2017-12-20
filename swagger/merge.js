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
    version: "1.0",
    title: "eBaoCloud LI OpenAPI",
    termsOfService: "http://api.ebaocloud.life/",
    //add description from readme (in markdown)
    description: `${readme.toString()}`
}
var schemes = ['https']

swaggermerge.on('warn', function (msg) {
    console.log(msg)
})
var mergedJson = swaggermerge.merge([swaggerProduct, swaggerProposal], info, '/eBao/1.0/', 'sandbox.gw.ebaocloud.com.cn', schemes);

//替换json string
var mergedString = JSON.stringify(mergedJson, null, 2);

var timeStamp = `${format(new Date(), 'ddd MMM D YYYY, HH:mm:ss Z')}`;
mergedString = mergedString.replace(/\[TIMESTAMP\]/, timeStamp);
//更新rest地址
// mergedString = mergedString.replace(/\/pd\/packages/g, "\/packages");
// mergedString = mergedString.replace(/\/pd\/products/g, "\/products");
// mergedString = mergedString.replace(/\/pd\/salesPackages/g, "\/sales/packages");
// mergedString = mergedString.replace(/\/proposal\/proposals/g, "\/proposals");
//smergedString = mergedString.replace(/product-controller/g, "Product");

// 本地保存
fs.writeFileSync("./swagger.json", mergedString);
