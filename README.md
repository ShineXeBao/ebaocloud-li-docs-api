# eBaoCloud API document
本文档基于[ReDoc](https://github.com/Rebilly/ReDoc) 文档框架完成。文档核心基于swagger文件，本框架仅仅是对swagger文件的展示。
代码在这里：https://github.com/zhuliliang/ebaocloud-li-docs-api
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
├── projects                具体项目
│   ├── avrist              avrist
│   ├── beta                beta API(policy service / claim / party ...) (/api/beta)
│   ├── bff                 standard bff API
│   ├── singlife            具体项目
│   └── standard            标准API （/api/)
├── locales                 翻译内容
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
一个典型的用法如下
```
 ./build-swagger.sh standard
```
根据传入参数```standard```，该命令对分别执行，如下命令。后面会解释每一个命令的作用。
```
#文件合并和初始化
node merge.js -p standard

#抽取翻译字符串
node i18n.js -p standard

#生成最终文件
node translation.js -p standard

```
#### 配置文件
每个项目都有一个配置文件```config.json```，打开如下
```
{
  "lang": [                             //该项目需要支持的语言，需要有对应的properties支持
    "en",
    "cn"
  ],
  "sourceSwagger": [                    //该项目需要merge的原始swagger文件列表
    "/source/product.json",
    "/source/proposal.json"
  ],
  "info": {
    "version": "1.1",
    "title": "eBaoCloud LI OpenAPI",
    "termsOfService": "http://api.ebaocloud.life/",
    "contact" : {
      "email" : "liliang.zhu@ebaotech.com"
    }
  },
  "schemes": [
    "https"
  ],
  "URL": "sandbox.gw.ebaocloud.com.cn",
  "URlPath": "/eBao/1.0/",
  "tmp": {                              //临时输出文件路径（正常情况下，不需要改动）
    "swagger": "/tmp/merged-swagger.json",
    "properties": "/tmp/swagger.properties",
    "swaggerTemplate": "/tmp/swagger-template.json"
  }

}

```
node 程序会去读取

##### 文件获取
获取服务器上的单个swagger文件。比如```curl -o product.json http://106.14.50.232/pd/v2/api-docs?group=products;``` 保存到本地，一般放到 xxx/source/目录下，备用。

##### 文件合并和初始化
合并和生成初始swagger，这个步骤主要完成两个事情
  1. 合并多个swagger文件，如product，proposal到一个文件，因为最终展示swagger必须使用单个文件
  2. 命令如下：
```node merge.js -p standard```
```
 Working path: /Users/liliang.zhu/Works/Projects/Documentation/redoc/swagger/projects/standard
 File(s) will be merged: /source/product.json,/source/proposal.json
 Swagger version: 1.1
```
#### 翻译的String文件提取

#### 生成最终swagger文件（多语言）

  2. 给该swagger 文件添加```info```内容。swagger 文件的```info```字段可以添加任意大小的markdown格式内容，因此可以把大量的注释，说明文档添加进去。我在locales目录下单独写了README.md两个中英文文档，并把他们整体放在```info```下面。
