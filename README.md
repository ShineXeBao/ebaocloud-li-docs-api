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
swagger
    ├── projects                具体项目
    │   ├── avrist              avrist
    │   ├── beta                beta API(policy service / claim / party ...) (/api/beta)
    │   ├── bff                 standard bff API
    │   ├── singlife            具体项目
    │   └── standard            标准API （/api/)
    ├── locales                 翻译内容
    ├── build-swagger.sh        build swagger文件，参考用
    ├── prepare_trans.sh        准备翻译文件
    ├── cli.js
    ├── enum.js                 抽取enum，目前因为没有在文档中展示enum，暂时不需要用
    ├── i18n.js                 抽取swagger里面的中文字符串到翻译目录，共后续翻译使用
    ├── merge.js                合并多个swagger文件到单个swagger文件
    ├── properties.js           生成待翻译的properties文件
    └── translation.js          生成翻译后的swagger
```
#### 使用方法
1. 先准备swagger模板和properties文件（prepare_trans.sh）
```文件获取 --> 文件合并和初始化 --> 抽取翻译字符串，生成properties文件```
2. 翻译
3. 生成最终swagger文件（build-swagger.sh）
```生成最终文件```

一个典型的用法如下
```
 ./prepare_trans.sh standard
 人工翻译
 ./build-swagger.sh standard
```
```prepare_trans.sh```脚本内容如下：

```
  #文件合并和初始化
  node merge.js -p standard

  #抽取翻译字符串
  node i18n.js -p standard

  #抽取翻译字符串，生成properties文件
  node properties.js -p standard
```
  根据传入参数standard，该命令对分别执行，如下命令。后面会解释每一个命令的作用。

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
    "info": {                             //这些内容，最终会写入swagger文件，根据实际情况更新和修改。
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
node 程序会去读取上述参数，并且放到输出结果中。

##### 文件获取
获取服务器上的单个swagger文件。比如
```
curl -o product.json http://106.14.50.232/pd/v2/api-docs?group=products;
```
保存到本地，一般放到 xxx/source/目录下，备用。

##### 文件合并和初始化
合并和生成初始swagger，这个步骤主要完成两个事情
  1. 合并多个swagger文件，如product，proposal到一个文件，因为最终展示swagger必须使用单个文件
  2. 命令如下：
```
node merge.js -p standard
```

```
 Working path: /Users/liliang.zhu/Works/Projects/Documentation/redoc/swagger/projects/standard
 File(s) will be merged: /source/product.json,/source/proposal.json
 Swagger version: 1.1
```
该命令会根据配置文件，拿到需要merge的文件，进行合并。同时更新info键下的内容。

#### 翻译的String文件提取
该功能会从之前生成的swagger抽取出需要翻译的字段，存放到 ```./tmp/``` 目录下。同时转换swagger到swagger模板文件。具体可以参考```tmp```目录下的，```swagger-template.json``` 和 ```swagger.properties```
目前程序里面对```swagger.properties```是做了排序的，未来可以考虑增加和现有内容比较的功能。

命令如下：
```
node i18n.js -p standard
```
#### 生成带翻译的properties文件
根据之前所提取的properties，和总properties文件对比。生成如下文件：
```
modified_properties_cn.csv      和swagger-cn.properties对比，发生内容修改的item
modified_properties_en.csv      和swagger-en.properties对比，发生内容修改的item
new_properties_cn.csv           和swagger-cn.properties对比，新增的item（新增item需要最终合并入swagger-cn.properties）
new_properties_en.csv           和swagger-en.properties对比，新增的item（新增item需要最终合并入swagger-en.properties）
```

命令如下：
```
node properties.js -p standard
```

#### 翻译
...

#### 生成最终swagger文件（多语言）
注意：在运行这个命令前，需要确保翻译工作已经完成。并且把修改和新增的item合并到swagger-xx.properties

  1. 命令会到根目录下的 ```./locales```获取对应的 ```swagger-xx.properties```，把翻译结果更新到swagger 模板。
  2. 给该swagger 文件添加```info```内容。swagger 文件的```info```字段可以添加任意大小的markdown格式内容，因此可以把大量的注释，说明文档添加进去。我在根目录的```./locales/```目录下单独写了README.md两个中英文文档，并把他们整体放在```info```下面。如果，项目```locales```下有README，该README会被优先获取。

命令如下：
  ```
  node translation.js -p standard
  ```
