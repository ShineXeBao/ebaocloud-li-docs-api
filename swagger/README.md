eBaoCloud API 文档 (To be update)
# Built on
[TIMESTAMP]

# Versioning
API version| Date  |Comments
--|---|--
0.5  | 2017-06-13  | Init version
0.6  | 2017-06-19  | Add new category and readme

# Authentication
eBaoCloud offers 3rd party applications the ability to issue authenticated requests on behalf of the eBaoCloud itself. eBaoCloud's implementation is based on the Client Credentials Grant flow of the OAuth 2 specification.

## Auth Flow
The oauth2 / token authentication flow follows these 3 major steps:
1.An application (backend) encodes its consumer key and secret (provided by eBaoCloud as an authorized vender) into a specially encoded set of credentials.
1.An application (backend) makes a request to the POST oauth2 / token endpoint to exchange these credentials for a bearer token.
1.When accessing the REST API, the application (the APP or website) uses the bearer token to authenticate.

## Sample code
### Request auth from application
``` bash
curl --request POST \
  --url http://url/cas/ebao/v1/json/tickets \
  --header 'content-type: application/json' \
  --data '{\n \n "username":"username",\n "password":"pwd123!"\n}'
```
### Response from API GateWay
- Success
``` json
{
"access_token" : "TGT-233-e7Zuc5FlSAa0SShO3B1f2iugYzRQGQrSSoGwAi0VnWbnBNDwHg"
}
```
- Failed （TBD）
``` json
{
"access_token" : ""
}
```
### App call (Java code sample)

``` java
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
All requests (both to obtain and use the tokens) **must use** HTTPS endpoints. (TBD)
