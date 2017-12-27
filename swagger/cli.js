
'use strict';
var program = require('commander');

program
  .version('1.0.1')
  .option('-p, --path [value]', 'Init swaager file(s) path')
  .option('-l, --language [value]', 'Language (cn, en...)')
  .parse(process.argv);

exports.workPath = () => {
  if (program.path === true) {
    console.log('Working path is required, use -h for help'); process.exit();
  }

  if (program.path === undefined) {
    console.log('Working path is required, use -h for help'); process.exit();
  }
  if (program.path !== true) //console.log('Current path: %s', program.path);

  return program.path;
}

exports.lang = () => {
  if (program.language === true || program.language === undefined) {
    console.log('No language, using English (en) as default');
    return 'en';
  }

  if (program.language !== true) {
    console.log('Generating ' + program.language + ' swagger file...');
  }

  return program.language;
}
