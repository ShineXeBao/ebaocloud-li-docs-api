
#生成最终文件
node translation.js -p $1

#拷贝到对应目录
cp  ./projects/$1/dist/swagger*.json ../dist/swagger/
