本篇文档描述了eBaoCloud（易保云）寿险所提供的API（API specification）。如果您想运行和使用这些API，你需要首先获取一个eBaoCloud的租户账号，请联系Antang.Du@ebaotech.com获取账号。我们会提供沙箱环境给您。

# 搭建时间
[TIMESTAMP]

# 版本
API 版本| 时间  |说明
--|---|--
0.5  | 2017-06-13  | 初始公开版本
0.6  | 2017-06-19  | 添加文档分类和Readme
0.6.5 | 2017-06-29  | 身份验证，oauth2 使用，以及中文版本文档
0.8  | 2017-07-07  | oauth2上线，生产和沙箱
0.8.5 | 2017-07-31 | 产品API增强
0.9 | 2017-08-25 | 产品API增强：limits相关APIs (年龄，保费、保额，期限)


# API使用的身份验证

## 总体介绍

eBaoCloud 给第三方应用提供了身份验证的功能，身份验证后，第三方应用就可以向eBaoCloud发起请求，并获得正确的响应。我们的实现基于[Client Credentials Grant](http://tools.ietf.org/html/rfc6749#section-4.4) 和[oauth 2 specification](http://tools.ietf.org/html/rfc6749)的标准

## 验证流程

我们的验证（token）获取流程分为三个步骤：

1. 应用的后台系统（已经作为一个正式租户）组装认证请求，同时将用户名和验证码放在请求中。
2. 后台应用发起认证请求，成功的话拿到一个token （bearer token）。
3. 在后续要访问的API里面，在request header里面带上这个token即可。

![Auth Flow](/assets/oauth.png)

## 跟我做一遍

* 发送验证请求

```js
POST: /cas/ebao/v1/json/tickets
Body: {"username":"name", "password":"pwd"}
Response: {"access_token": "xxxx"}
```

* 发送API请求，同时在请求header里面带上token

```js
POST: /rest/products
Header: {
  "authorization":"Bearer "+access_token,
  "X-ebao-tenant-id": "tenant-id"
}
```

## End Points

| | 沙箱 | 生产 |
| :--- | :--- | :--- |
| auth / take token | [https://sandbox.ebaocloud.com.cn/cas/ebao/v1/json/tickets](https://sandbox.ebaocloud.com.cn/cas/ebao/v1/json/tickets) | [https://ebaocloud.com.cn/cas/ebao/v1/json/tickets](https://ebaocloud.com.cn/cas/ebao/v1/json/tickets) |
| APIs | [https://sandbox.gw.ebaocloud.com.cn/li/eBao/1/](https://sandbox.gw.ebaocloud.com.cn/li/eBao/1/) | [https://gw.ebaocloud.com.cn/li/eBao/1/](https://gw.ebaocloud.com.cn/li/eBao/1/)|


## 实例

#### 应用的验证请求

```bash
curl --request POST \
  --url https://url/cas/ebao/v1/json/tickets \
  --header 'content-type: application/json' \
  --header 'X-ebao-tenant-id: tenant-id' \
  --data '{\n \n "username":"site.admin",\n "password":"adminPWD!"\n}'
```

注意：
.  **X-ebao-tenant-id** 是一个唯一的租户ID，所有租户都可以拿到一个唯一ID。
.  **username** 和 **password** 由eBaoCloud提供给每个租户


#### API Gateway的响应

* 成功

```js
{
"access_token" : "TGT-233-e7Zuc5FlSAa0SShO3B1f2iugYzRQGQrSSoGwAi0VnWbnBNDwHg"
}
```

* 失败

```js
{
"access_token" : null
}
```

#### 调用App（Java代码样例）

```java
HttpResponse<String> response = Unirest.post(url) // url：the UAT/product URL
  .header("content-type", "application/json") // application/json
  .header("authorization", "Bearer " + accessToken) // oauth2 access token：the accessToken
  .header("X-ebao-tenant-id", "tenant-id")
  .body(body) // body: http body
  .asString();
```

## 其他

### Token和password一样重要

必须牢记，token和password一样重要，虽然每个token只有有限的使用期间，但拿到token就意味着获取访问eBaoCloud
的权限。绝对不可以泄露或者分享token给其他人和应用。

### SSL

所有请求都**必须**使用HTTPS。
