
'use strict';
var program = require('commander');

var targetPath = () => {
  program
    .version('1.0.1')
    .option('-p, --path [value]', 'Init swaager file(s) path')
    .parse(process.argv);

  if (program.path === true) {
    console.log(' Path is required '); process.exit();
  }

  if (program.path === undefined) {
    console.log(' Use -h for help '); process.exit();
  }
  if (program.path !== true) //console.log('Current path: %s', program.path);

  return __dirname + '/' +program.path;
}


module.exports = targetPath;
