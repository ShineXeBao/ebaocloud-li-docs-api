var PropertiesReader = require('properties-reader');
var fs = require('fs');
var cli = require ('./cli.js');

// 获取 -p 参数，确定merge.js 的工作路径并打印
var path = __dirname + '/projects/' + cli.workPath();
console.log('\x1b[1m3. Prepare properties files\x1b[0m');
console.log('  \x1b[4mWorking path\x1b[0m: %s', path);

var pOrigin_cn = PropertiesReader('./locales/swagger-cn.properties');
var pNew_cn = PropertiesReader(path + '/tmp/swagger.properties_cn');
var pOrigin_en = PropertiesReader('./locales/swagger-en.properties');
var pNew_en = PropertiesReader(path + '/tmp/swagger.properties_en');

// console.log('swagger-cn.properties: %s', pOriginCN.get('swagger.definitions.AddressInput.properties.postCode.description'));
// console.log('swagger-cn.properties: %s', pNew.get('swagger.definitions.AddressInput.properties.postCode.description'));

// console.log(pNew.length);

var newProp_cn= "key,property\n";
var newProp_en= "key,property\n";
var modifiedProp_cn = "key,old,new\n";
var modifiedProp_en = "key,old,new\n";


var filterCN = (key, property) => {
  //基线 properties 有这个key
  if (pOrigin_cn.get(key) ) {
    if (pOrigin_cn.get(key) !== property) {//该Key和中文基线版本不同
        // console.log(key + property + '  vs  ' + pOriginCN.get(key));
        modifiedProp_cn += key + "," + pOrigin_cn.get(key) + "," + property + "\n"
    }
  //基线 properties 没有这个key -- 新增字段
  } else {
    newProp_cn += key  + "," + property + "\n"
    // console.log(key + property + '  new  ' + pOriginCN.get(key));
  }
}

var filterEN = (key, property) => {
  //基线 properties 有这个key
  if (pOrigin_en.get(key) ) {
    if (pOrigin_en.get(key) !== property) {//该Key和中文基线版本不同
        // console.log(key + property + '  vs  ' + pOriginCN.get(key));
        modifiedProp_en += key + "," + pOrigin_en.get(key) + "," + property + "\n"
    }
  //基线 properties 没有这个key -- 新增字段
  } else {
    newProp_en += key  + "," + property + "\n"
    // console.log(key + property + '  new  ' + pOriginCN.get(key));
  }
}

pNew_cn.each(filterCN);
pNew_en.each(filterEN);

//写properties
fs.writeFileSync(path + "/tmp/new_properties_cn.csv", '\uFEFF'+newProp_cn);
fs.writeFileSync(path + "/tmp/new_properties_en.csv", '\uFEFF'+newProp_en);
fs.writeFileSync(path + "/tmp/modified_properties_cn.csv", '\uFEFF'+modifiedProp_cn);
fs.writeFileSync(path + "/tmp/modified_properties_en.csv", '\uFEFF'+modifiedProp_en);
