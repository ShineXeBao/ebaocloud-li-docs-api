# curl -o proposal.json http://106.14.50.232/proposal/v2/api-docs?group=proposals;
# curl -o product.json http://106.14.50.232/pd/v2/api-docs?group=products;

#文件合并和初始化
node merge.js -p $1

#抽取翻译字符串
node i18n.js -p $1

#生成properties文件，等待翻译
node properties.js -p $1
