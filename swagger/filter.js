
var _ = require('underscore')._

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

var enumItem = new Array();

for (o in merged.definitions) {
  if (_.pluck (o, 'enum')) {
    enumItem.push(o);
  } else {
    for (oo in o) {
      if (_.pluck (oo, 'enum')) {
        enumItem.push(oo);
      } else  {
        for (ooo in oo ) {
          if (_.pluck (ooo, 'enum')) {
              enumItem.push(ooo);
          }
        }
      }
    }
  }
}
 console.log(_.values(enumItem));
//console.log(_.keys(merged));
// console.log(_.values(merged));
// console.log(_.pairs(merged));
// console.log(_.invert(merged));
//
// //var enumItem = merged.definitions.map(function(item) {return item.has('enum')});
//
