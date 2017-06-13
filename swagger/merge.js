var request = require('request');
var swaggermerge = require('swagger-merge')
var fs = require('fs');

// var jsonURL = [
//   {url: 'http://106.14.50.232/proposal/v2/api-docs?group=proposals', jsonName: 'proposal.json'},
//   {url: 'http://106.14.50.232/pd/rest/v2/li-api-docs?group=products', auth: {username: 'life', password: 'eBao123'}, jsonName: 'product.json'}
// ];
// var jsonData = [];
// (function getdata(index) {
//     if(index>=jsonURL.length) return true;
//
//     var jsonUrl = jsonURL[index].url;
//     request
//       .get(jsonUrl)
//       .auth(jsonURL[index].auth.username, jsonURL[index].auth.password, true)
//       .on('response', function(response){
//             console.log('error:', error);
//             console.log('statusCode:', response && response.statusCode);
//             // if (response.statusCode === 200) {
//             //   fs.writeFile(jsonURL[index].jsonName, JSON.stringify(body ), function(err) {
//             //       if(err) {
//             //           return console.log(err);
//             //       }
//             //       console.log("The " + jsonURL[index].jsonName + " was saved!");
//             //   });
//             // }
//       })
//       .pipe(fs.writeFile(jsonURL[index].jsonName, JSON.stringify(body))
//       .on('end', function(){getdata(index+1)});
//
// })(0)

//
//
// // 从两个地方获取 json
// var swaggerProduct = require('./product.json')
// var swaggerProposal = require('./proposal.json')
// request('http://106.14.50.232/proposal/v2/api-docs?group=proposals', function (error, response, body) {
//   console.log('error:', error); // Print the error if one occurred
//   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//   //console.log('body:', body); // Print the HTML for the Google homepage.
//   if (response.statusCode === 200) {
//     swaggerProduct = body;
//     fs.writeFile("./product.json", JSON.stringify(swaggerProduct ), function(err) {
//         if(err) {
//             return console.log(err);
//         }
//         console.log("The product.json was saved!");
//     });
//   }
// });
// request('http://106.14.50.232/pd/rest/v2/li-api-docs?group=products', function (error, response, body) {
//   console.log('error:', error); // Print the error if one occurred
//   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//   //console.log('body:', body); // Print the HTML for the Google homepage.
//   if (response.statusCode === 200) {
//     swaggerProposal = body;
//     fs.writeFile("./proposal.json", JSON.stringify(swaggerProposal ), function(err) {
//         if(err) {
//             return console.log(err);
//         }
//         console.log("The proposal.json was saved!");
//     });
//   }
// }).auth('life', 'eBao123', false);



var swaggerProduct = require('./product.json')
var swaggerProposal = require('./proposal.json')

var info = {
    version: "0.5",
    title: "eBaoCould Open API",
    description: "eBaoCloud API 文档 (To be update)\n  #TimeStamp:" + new Date().toISOString()
}
var schemes = ['http']

swaggermerge.on('warn', function (msg) {
    console.log(msg)
})

merged = swaggermerge.merge([swaggerProduct, swaggerProposal], info, '/', 'api.ebaocloud.life', schemes);

//merged.info.x-logo.url = 'https://cn.vuejs.org/images/logo.png'

var fs = require('fs');
fs.writeFile("./swagger.json", JSON.stringify(merged ), function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The file was saved!");
});
