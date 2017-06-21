curl -o proposal.json http://106.14.50.232/proposal/v2/api-docs?group=proposals;
#curl -u life:eBao123 -o product.json http://106.14.50.232/pd/rest/v2/li-api-docs?group=products;
curl -o product.json http://106.14.50.232/pd/v2/li-api-docs?group=products;

node merge.js

cp swagger.json ../demo/swagger.json
