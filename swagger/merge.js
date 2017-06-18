var swaggermerge = require('swagger-merge');
var fs = require('fs');

var swaggerProduct = require('./product.json')
var swaggerProposal = require('./proposal.json')

var info = {
    version: "0.6",
    title: "eBaoCould OpenAPI",
    // description: "eBaoCloud API 文档 (To be update)" +
    //              "\n\n# TimeStamp:" + new Date().toISOString() +
    //              "\n\n# Versioning" +
    //              "\n\n " +
    //              "\n\n# Authentication" +
    //              "\n\n "
    description: `eBaoCloud API 文档 (To be update)
                 \n\n# TimeStamp: ${new Date().toISOString()}
                 \n\n# Versioning
                 \n\n
                 \n\n# Authentication
                 \n\n `
}
var schemes = ['http']

swaggermerge.on('warn', function (msg) {
    console.log(msg)
})

merged = swaggermerge.merge([swaggerProduct, swaggerProposal], info, '/rest', 'api.ebaocloud.life', schemes);

//merged.info.x-logo.url = 'https://cn.vuejs.org/images/logo.png'

var fs = require('fs');
fs.writeFile("./swagger.json", JSON.stringify(merged, null, 2), function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The file was saved!");
});
