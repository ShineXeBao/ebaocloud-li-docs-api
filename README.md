# eBaoCloud API document
本文档基于[ReDoc](https://github.com/Rebilly/ReDoc) 文档框架完成。文档核心基于swagger文件，本框架仅仅是对swagger文件的展示。
## 目录结构

### dist
dist目录下是最终可运行的内容
```
dist
    ├── assets                      配图
    ├── fonts                       字体目录
    │   └── Source-Sans-Pro         字体
    ├── images                      logo/images
    ├── style                       css
    ├── swagger                     最终运行的swagger文件，该目录包含了多套swagger文件，支持/api/, /api/beta/ 等等目录，也包括中英文两套
    ├── index.html
    └── redoc.min.js                redoc 核心程序，
```
redoc.min.js 可以到从[这里获取最新版本](https://rebilly.github.io/ReDoc/releases/latest/redoc.min.js)
### swagger
swagger目录下，有多个node程序，主要完成swagger 文件的抓取，合并，多语言支持，生成，打包等。最终文件需要放到```dist```目录下运行。
#### 目录
swagger目录是一个独立的node程序目录，如下
```
├── avrist                  具体项目
├── beta                    beta API(policy service / claim / party ...) (/api/beta)
├── bff                     standard bff API
├── locales                 翻译内容
├── singlife                具体项目
├── standard                标准API （/api/)
├── build-swagger.sh        build swagger文件，参考用
├── cli.js
├── enum.js                 抽取enum，目前因为没有在文档中展示enum，暂时不需要用
├── i18n.js                 抽取swagger里面的中文字符串到翻译目录，共后续翻译使用
├── merge.js                合并多个swagger文件到单个swagger文件
├── readme.md               最新的readme请看本文档
└── translation.js          生成翻译后的swagger
```
#### 使用方法
请参考参考build-swagger.sh文件，根据不同情况，分成四步：
```文件获取 --> 文件合并和初始化 --> 抽取翻译字符串 --> 生成最终文件```

##### 文件获取
获取服务器上的单个swagger文件。比如```curl -o product.json http://106.14.50.232/pd/v2/api-docs?group=products;``` 保存到本地，一般放到 xxx/source/目录下，备用。

##### 文件合并和初始化
合并和生成初始swagger，这个步骤主要完成两个事情
  1. 合并多个swagger文件，如product，proposal到一个文件，因为最终展示swagger必须使用单个文件
  2. 给该swagger 文件添加```info```内容。swagger 文件的```info```字段可以添加任意大小的markdown格式内容，因此可以把大量的注释，说明文档添加进去。我在locales目录下单独写了README.md两个中英文文档，并把他们整体放在```info```下面。
  3. 
