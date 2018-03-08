# eBaoCloud API document
本文档基于[ReDoc](https://github.com/Rebilly/ReDoc) 文档框架完成。
## 目录结构

#### dist
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
## swagger
swagger目录下，有多个node js的程序，主要完成swagger file的抓取，合并，多语言支持，打包等
