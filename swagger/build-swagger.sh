# curl -o proposal.json http://106.14.50.232/proposal/v2/api-docs?group=proposals;
# curl -o product.json http://106.14.50.232/pd/v2/api-docs?group=products;

node merge.js -p standard

node i18n.js -p standard

node translation.js -p standard -l en
node translation.js -p standard -l cn

cp  ./standard/dist/swagger*.json ../dist/swagger/
