# curl -o proposal.json http://106.14.50.232/proposal/v2/api-docs?group=proposals;
# curl -o product.json http://106.14.50.232/pd/v2/api-docs?group=products;

#文件合并和初始化
node merge.js -p $1

#抽取翻译字符串
node i18n.js -p $1

#生成最终文件
node translation.js -p $1 -l en

#拷贝到对应目录
cp  ./projects/$1/dist/swagger*.json ../dist/swagger/
