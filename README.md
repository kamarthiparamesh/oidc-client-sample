# Simple Node Program for OAuth2 flow using oidc-client-ts

This uses [oidc-client-ts](https://github.com/authts/oidc-client-ts) package to do OAuth2 using PKCE flow.

## Sneak Peak

![GIF Preview](./public/demo.gif)

## Create Affinidi Login Configuration

Create Login Configuration using our Developer portal by following the instructions [here](https://docs.affinidi.com/docs/affinidi-login/login-configuration/#using-affinidi-portal) with the below settings

_Important_ : Post Login configuration, Copy CLIENT_ID & ISSUER which will be used in later steps

- `Name` as `OIDC Test`
- `Redirect URIs` as `http://localhost:3000/index.html`
- `Auth method` as `None`
- `Presentation definition` for requesting email,first name, last name is mentioned below
  ```
  {
  "id": "vp_combined_email_user_profile_combined",
  "submission_requirements": [
      {
      "rule": "pick",
      "min": 1,
      "from": "A"
      }
  ],
  "input_descriptors": [
      {
      "id": "email_vc",
      "name": "Email VC",
      "purpose": "Check if VC data contains necessary fields",
      "group": [
          "A"
      ],
      "constraints": {
          "fields": [
          {
              "path": [
              "$.type"
              ],
              "purpose": "Check if VC type is correct",
              "filter": {
              "type": "array",
              "contains": {
                  "type": "string",
                  "pattern": "Email"
              }
              }
          },
          {
              "path": [
              "$.credentialSubject.email"
              ],
              "purpose": "Check if VC contains email field",
              "filter": {
              "type": "string"
              }
          },
          {
              "path": [
              "$.issuer"
              ],
              "purpose": "Check if VC Issuer is Trusted",
              "filter": {
              "type": "string",
              "pattern": "^did:key:zQ3shtMGCU89kb2RMknNZcYGUcHW8P6Cq3CoQyvoDs7Qqh33N|^did:elem:EiBb5gyC1mu3t31oYwMsYWg1U2HyNtaVQ0NKn5UkAzB8BQ"
              }
          }
          ]
      }
      },
      {
      "id": "givenname_vc",
      "name": "givenname VC",
      "purpose": "Check if VC data contains necessary fields",
      "group": [
          "A"
      ],
      "constraints": {
          "fields": [
          {
              "path": [
              "$.type"
              ],
              "purpose": "Check if VC type is correct",
              "filter": {
              "type": "array",
              "contains": {
                  "type": "string",
                  "pattern": "HITGivenName"
              }
              }
          },
          {
              "path": [
              "$.credentialSubject.givenName"
              ],
              "purpose": "given Name",
              "filter": {
              "type": "string"
              }
          }
          ]
      }
      },
      {
      "id": "familyName",
      "name": "familyName VC",
      "purpose": "Check if VC data contains necessary fields",
      "group": [
          "A"
      ],
      "constraints": {
          "fields": [
          {
              "path": [
              "$.type"
              ],
              "purpose": "Check if VC type is correct",
              "filter": {
              "type": "array",
              "contains": {
                  "type": "string",
                  "pattern": "HITFamilyName"
              }
              }
          },
          {
              "path": [
              "$.credentialSubject.familyName"
              ],
              "purpose": "family Name",
              "filter": {
              "type": "string"
              }
          }
          ]
      }
      }
  ]
  }
  ```
- `ID token mapping` as below
  ```
  [
  {
      "sourceField": "$.credentialSubject.email",
      "idTokenClaim": "$.email"
  },
  {
      "sourceField": "$.credentialSubject.givenName",
      "idTokenClaim": "$.given_name"
  },
  {
      "sourceField": "$.credentialSubject.familyName",
      "idTokenClaim": "$.family_name"
  }
  ]
  ```

## Update Code with Configuration

1. Create `.env` file by using below command

```
cp .env.example .env
```

2. Paste your CLIENT_ID & ISSUER generated from previous step, Should look like below

```
PROVIDER_CLIENT_ID="xxxxxx-xxxx-xxxx-xxx-xxxxxxx"
PROVIDER_ISSUER="https://xxxxxxx-yyyy-yyyy-xxxx-xxxxxxx.apse1.login.affinidi.io"
```

## Install & Run

```
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000)
