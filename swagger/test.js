var swaggermerge = require('swagger-merge')
var swaggerOne = require('./product.json')
var swaggerTwo = require('./proposal.json')
var info = {
    version: "0.5",
    title: "eBaoCould Open API",
    description: "eBaoCloud API 文档 (To be update)\n"
}
var schemes = ['http']

swaggermerge.on('warn', function (msg) {
    console.log(msg)
})

merged = swaggermerge.merge([swaggerOne, swaggerTwo], info, '/', 'api.ebaocloud.life', schemes);
debugger;

//merged.info.x-logo.url = 'https://cn.vuejs.org/images/logo.png'

var fs = require('fs');
fs.writeFile("../demo/swagger.json", JSON.stringify(merged ), function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
});
