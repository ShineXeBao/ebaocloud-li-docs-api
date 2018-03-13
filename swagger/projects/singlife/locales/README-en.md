This document is the API specification for the SingLife. To practice and run the APIs in this document, you need to apply an eBaoCloud tenant account(starting from a sandbox account instead of production account) first.<br>
Contact liliang.zhu@ebaotech.com for more information.

PS: we have created an account for SingLife. Please refer to the email

# Built on
[TIMESTAMP]

# Versioning
API version| Date  |Comments
--|---|--
1.0  | 2018-01-10  | Initial version

# Authentication

## Overview

eBaoCloud offers 3rd party applications the ability to issue authenticated requests on behalf of the eBaoCloud itself. eBaoCloud's implementation is based on the [Client Credentials Grant](http://tools.ietf.org/html/rfc6749#section-4.4) flow of the [oauth 2 specification](http://tools.ietf.org/html/rfc6749).

## Auth Flow

The oauth2 / token authentication flow follows these 3 major steps:

1. An application (backend) encodes its consumer key and secret (provided by eBaoCloud as an authorized vender) into a specially encoded set of credentials.
2. An application (backend) makes a request to the POST oauth2 / token endpoint to exchange these credentials for a bearer token.
3. When accessing the REST API, the application (the APP or website) uses the bearer token to authenticate.

## Step by step

* Send request to auth end point

```js
POST: /cas/ebao/v1/json/tickets
Body: {"username":"SINGLIFE_CP.admin", "password":"adminPWD!"}
Response: {"access_token": "xxxx"}
```

* Send request with access_token in header

```js
POST: /rest/products
Header: {
  "authorization":"Bearer "+access_token,
  "X-ebao-tenant-id": "SINGLIFE"
}
```

## End Points

| | Sandbox |
| :--- | :--- |
| auth / take token | [https://sandbox.ebaocloud.com.cn/cas/ebao/v1/json/tickets](https://sandbox.ebaocloud.com.cn/cas/ebao/v1/json/tickets) |
| APIs | [http://sandbox.singlife.ebaocloud.life/eBao/1.0](http://sandbox.singlife.ebaocloud.life/eBao/1.0) |


## Sample

#### Request auth from application

```bash
curl --request POST \
  --url https://url/cas/ebao/v1/json/tickets \
  --header 'content-type: application/json' \
  --data '{\n \n "username":"SINGLIFE_CP.admin",\n "password":"adminPWD!"\n}'
```

Note:
. the **X-ebao-tenant-id** is the unique id provided by eBaoCloud to identify the tenant.
. the **username** and **password** are provided by eBaoCloud when you registered as an authorized vendor.


#### Response from API Gateway

* Success

```js
{
"access_token" : "TGT-233-e7Zuc5FlSAa0SShO3B1f2iugYzRQGQrSSoGwAi0VnWbnBNDwHg"
}
```

* Failed

```js
{
"access_token" : null
}
```

#### App call (Java code sample)

```java
HttpResponse<String> response = Unirest.post(url) // url：the UAT/product URL
  .header("content-type", "application/json") // application/json
  .header("authorization", "Bearer " + accessToken) // oauth2 access token：the accessToken
  .header("X-ebao-tenant-id", "SINGLIFE")
  .body(body) // body: http body
  .asString();
```

## Others

### Tokens are passwords

Keep in mind that the consumer key & secret, bearer token credentials, and the bearer token itself grant access to make requests on behalf of an application. These values should be considered as sensitive as passwords, and must not be shared or distributed to untrusted parties.

### SSL required

All requests (both to obtain and use the tokens) **must use** HTTPS endpoints.
