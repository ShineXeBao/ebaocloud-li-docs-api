eBaoCloud API 文档 (To be update)
# Built on
[TIMESTAMP]

# Versioning
API version| Date  |Comments
--|---|--
0.5  | 2017-06-13  | Init version
0.6  | 2017-06-19  | Add new category and readme
0.9  | 2017-06-29  | oauth2 lanch, chinese version document

#
oauth2 / token Authentication

## Overview

eBaoCloud offers 3rd party applications the ability to issue authenticated requests on behalf of the eBaoCloud itself. Twitter’s implementation is based on the [Client Credentials Grant](http://tools.ietf.org/html/rfc6749#section-4.4) flow of the [OAuth 2 specification](http://tools.ietf.org/html/rfc6749) .

## Auth Flow

The oauth2 / token authentication flow follows these 3 major steps:

1. An application \(backend\) encodes its consumer key and secret \(provided by eBaoCloud as an authorized vender\) into a specially encoded set of credentials.
2. An application \(backend\) makes a request to the POST oauth2 / token endpoint to exchange these credentials for a bearer token.
3. When accessing the REST API, the application \(the APP or website\) uses the bearer token to authenticate.

## ![](/assert/oauth.jpg)

## Steps

* Send request to auth end point

```js
POST: /cas/ebao/v1/json/tickets
Body: {"username":"name", "password":"pwd"}
Response: {"access_token": "xxxx"}
```

* Send request with access\_token in header

```js
POST: /libff/services/rest/goyoProposalService/saveProposal
Header: {"authorization":"Bearer"+access_token}
```

## End Points

| | Sandbox | Production |
| :--- | :--- | :--- |
| auth / take token | [https://lk.ebaocloud.com/cas/ebao/v1/json/tickets](https://lk.ebaocloud.com/cas/ebao/v1/json/tickets) | |
| APIs | [https://gw.lk.ebaocloud.com/eBao/0.9](https://gw.lk.ebaocloud.com/eBao/0.9) | |


## Sample

#### Request auth from application

```bash
curl --request POST \
--url https://url/cas/ebao/v1/json/tickets \
--header 'content-type: application/json' \
--data '{\n \n "username":"UAL",\n "password":"Ual321!"\n}'
```

Note: the username and password are provided by eBaoCloud when you registered as an authorized vender.

#### Response from API GateWay

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

#### App call \(Java code sample\)

```java
HttpResponse<String> response = Unirest.post(url) // url：the UAT/product URL
.header("content-type", "application/json") // application/json
.header("authorization", "Bearer " + accessToken) // oauth2 access token：the accessToken
.body(body) // body: http body
.asString();
```

## Others

### Tokens are passwords

Keep in mind that the consumer key & secret, bearer token credentials, and the bearer token itself grant access to make requests on behalf of an application. These values should be considered as sensitive as passwords, and must not be shared or distributed to untrusted parties.

### SSL required

All requests (both to obtain and use the tokens) _must use_ HTTPS endpoints.
