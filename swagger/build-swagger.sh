# curl -o proposal.json http://106.14.50.232/proposal/v2/api-docs?group=proposals;
# curl -o product.json http://106.14.50.232/pd/v2/api-docs?group=products;

node merge.js -p $1

node i18n.js -p $1

node translation.js -p $1 -l en
# node translation.js -p $1 -l cn

cp  ./$1/dist/swagger*.json ../dist/swagger/
