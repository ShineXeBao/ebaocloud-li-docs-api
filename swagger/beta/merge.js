/**
Retrieve the latest API swagger file and merge them into one.
InitVersion: Chinese version
*/
'use strict';

var swaggermerge = require('swagger-merge');
//var format = require('date-fns/format')

var fs = require('fs');

var swaggerClaim = require('./source/claim-swagger.json')
var swaggerfreelook = require('./source/freelook-swagger.json')
var swaggerPolicy = require('./source/policy-swagger.json')

//读readme 文件，加入description
var readme = ''
var info = {
    version: "0.1.0",
    title: "eBaoCloud LI OpenAPI",
    termsOfService: "http://api.ebaocloud.life/beta",
    //add description from readme (in markdown)
    description: ''
}
var schemes = ['https']

swaggermerge.on('warn', function (msg) {
    console.log(msg)
})
var mergedJson = swaggermerge.merge([swaggerClaim, swaggerfreelook, swaggerPolicy], info, '/', 'sandbox.gw.ebaocloud.com.cn', schemes);

//替换json string
var mergedString = JSON.stringify(mergedJson, null, 2);
//
// var timeStamp = `${format(new Date(), 'ddd MMM D YYYY, HH:mm:ss Z')}`;
// mergedString = mergedString.replace(/\[TIMESTAMP\]/, timeStamp);
//更新rest地址
// mergedString = mergedString.replace(/\/pd\/packages/g, "\/packages");
// mergedString = mergedString.replace(/\/pd\/products/g, "\/products");
// mergedString = mergedString.replace(/\/pd\/salesPackages/g, "\/sales/packages");
// mergedString = mergedString.replace(/\/proposal\/proposals/g, "\/proposals");
//smergedString = mergedString.replace(/product-controller/g, "Product");

// 本地保存
fs.writeFileSync(__dirname + "/tmp/merged-swagger.json", mergedString);
