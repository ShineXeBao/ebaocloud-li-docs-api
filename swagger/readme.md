1. merge json files
   * modify merge.js --> version update
   * modify locales/README-xx.md --> change update and others
   * run `node merge.js -p standard`. replace the `standard` into other path, such as `singlife`, `bff`...
   * a new file './tmp/merged-swagger.json' will generated
2. Translation
   * run `node i18n.js -p standard`.
   * Two files will be generated: './tmp/swagger.properties' and './tmp/swagger-template.json'
   * swagger.properties and the 'Translation.xls' to process the Translation.
3. Generation
   * run `node translation.js - p standard -l cn` or `node translation.js - p standard -l en`
4. Copy to ../dist/swagger
   * `cp ./standard/swagg*.json ../dist/swagger`
