
# Bosta Backend Assignment

This collection is for Bosta backend assignment.

## Indices

* [Auth](#auth)

  * [Login](#1-login)
  * [Register](#2-register)
  * [Verify Email](#3-verify-email)

* [Checks](#checks)

  * [Create Check](#1-create-check)
  * [Delete Check](#2-delete-check)
  * [Edit Check Status](#3-edit-check-status)
  * [Get Checks By Tag](#4-get-checks-by-tag)
  * [Get Checks For User](#5-get-checks-for-user)
  * [Get Reports By Tag](#6-get-reports-by-tag)
  * [Get Single Check](#7-get-single-check)
  * [Perform Checks](#8-perform-checks)

* [Reports](#reports)

  * [Get Rports for User](#1-get-rports-for-user)


--------


## Auth



### 1. Login


Login user and generate access/ refresh tokens


***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{URL}}/api/v1/auth/login
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json | Content Type |



***Body:***

```js        
{
    "email": "ahmbelal9sas5@gmail.com",
    "password": "123456"
}
```



### 2. Register


Register user in database and send verification email


***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{URL}}/api/v1/auth/register
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json | Content Type |



***Body:***

```js        
{
    "name": "Ahmed",
    "email": "ahmbelal9sas5@gmail.com",
    "password": "123456"
}
```



### 3. Verify Email



***Endpoint:***

```bash
Method: PUT
Type: 
URL: {{URL}}/api/v1/auth/verifyemail/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFobWJlbGFsOXNhczVAZ21haWwuY29tIiwiaWQiOiI2MTI5OGZkNTZiNTgxYWYyZDM3MDg4MzQiLCJpYXQiOjE2MzAxMTM3NDksImV4cCI6MTYzMDIwMDE0OX0.4q7fH3MQRB-_xQrZLETMpw41OUMsRc2CjvvKvhuzChg
```



## Checks



### 1. Create Check


Create check and save it to database


***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{URL}}/api/v1/checks
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json | Content Type |
| refreshToken | {{REFRESH_TOKEN}} |  |



***Body:***

```js        
{
    "name": "JsonPH",
    "url": "https://jsonplaceholder.typicode.com/todos",
    "protocol": "https",
    "path": "/",
    "port": 80,
    "webhook": "https://discord.com/api/webhooks/880226664720777287/LBCLgNxk_57n2gygLKT5l5KC6PT_cAaTc6Ljh1rLqMH3iRo0TEhZNzPoqf20nq1ULFt4",
    "timeout": 5,
    "interval": 10,
    "threshold": 1,
    "authentication": {
        "username": "Ahmed",
        "password": "123456"
    },
    "httpHeaders": {
        "Content-Type": "application/json"
    },
    "assert": {
        "statusCode": 200
    },
    "tags": [
        "socialmedia"
    ],
    "ignoreSSL": false
}
```



### 2. Delete Check


Delete check from the database


***Endpoint:***

```bash
Method: DELETE
Type: 
URL: {{URL}}/api/v1/checks/612ae82d15a6303c33627dd1
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| refreshToken | {{REFRESH_TOKEN}} |  |



### 3. Edit Check Status


Edit Check Status from paused to running and vice versa


***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: {{URL}}/api/v1/checks/612ae82d15a6303c33627dd1
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json | Content Type |
| refreshToken | {{REFRESH_TOKEN}} |  |



***Body:***

```js        
{
    "paused": true
}
```



### 4. Get Checks By Tag


Get all checks that matches a certain tag


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{URL}}/api/v1/checks/tag/socialmedia
```



### 5. Get Checks For User


Get checks by the user id


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{URL}}/api/v1/checks
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| refreshToken | {{REFRESH_TOKEN}} |  |



### 6. Get Reports By Tag


Get Reports By Tag and User ID


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{URL}}/api/v1/reports/tag/socialmedia
```



### 7. Get Single Check


Get single check by id


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{URL}}/api/v1/checks/612ae3fb58b7fef14f01a8fa
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| refreshToken | {{REFRESH_TOKEN}} |  |



### 8. Perform Checks


End Point that will perform checks when someone hit it, Using a cron job to hit it every 1 minute to perform checks.


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{URL}}/api/v1/checks/do
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json | Content Type |
| refreshToken | {{REFRESH_TOKEN}} |  |



## Reports
Get Reports for user, by tag



### 1. Get Rports for User


Get Rports for User By Id


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{URL}}/api/v1/reports
```



---
[Back to top](#bosta-backend-assignment)
> Made with &#9829; by [thedevsaddam](https://github.com/thedevsaddam) | Generated at: 2021-08-31 07:13:06 by [docgen](https://github.com/thedevsaddam/docgen)
