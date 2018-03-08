curl -o proposal.json http://106.14.50.232/proposal/v2/api-docs?group=proposals;
curl -o product.json http://106.14.50.232/pd/v2/api-docs?group=products;

node merge.js

node i18n.js

node translation.js
cp swagger-cn.json ../dist/swagger/swagger-cn.json
cp swagger-en.json ../dist/swagger/swagger-en.json
