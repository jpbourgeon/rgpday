# Amplify backend configuration instructions

Describes all the steps necessary to provision the backend resources in the cloud for the project (amplify-cli choices, local configuration and AWS console tweaks).

## Project initialisation

- Enter a name for the project: rgpday
- Enter a name for the environment: dev
- Choose your default editor: Visual Studio Code
- Choose the type of app that you're building: javascript
- What javascript framework are you using: react
- Source Directory Path: src
- Distribution Directory Path: build
- Build Command: npm.cmd run-script build
- Start Command: npm.cmd run-script start
- Do you want to use an AWS profile? Yes
- Please choose the profile you want to use: default

## Add a master environment

- Do you want to use an existing environment? No
- Enter a name for the environment: master
- Do you want to use an AWS profile? Yes
- Please choose the profile you want to use: default

## Environments

- dev: cloudformation stack `rgpday-20190305112118`
- master: cloudformation stack `rgpday-20190302163236`

## Auth: Cognito user pool with identity pool

### CLI configuration

- Do you want to use the default authentication and security configuration? No, I will set up my own configuration.
- Select the authentication/authorization services that you want to use: User Sign-Up, Sign-In, connected with AWS IAM controls ...
- Please provide a friendly name for your resource that will be used to label this category in the project: rgpdayAuth
- Please enter a name for your identity pool. rgpdayIdentityPool
- Allow unauthenticated logins? (Provides scoped down permissions that you can control via AWS IAM) Yes
- Do you want to enable 3rd party authentication providers in your identity pool? No
- Please provide a name for your user pool: rgpdayUserPool
- Multifactor authentication (MFA) user login options: OFF
- Email based user registration/forgot password: Enabled (Requires per-user email entry at registration)
- Please specify an email verification subject: Your verification code
- Please specify an email verification message: Your verification code is {####}
- Do you want to override the default password policy for this User Pool? Yes
- Enter the minimum password length for this User Pool: 6
- Select the password character requirements for your userpool: Requires Uppercase, Requires Numbers, Requires Symbols
- Userpool users are created with a standard set of attributes defined by the OpenID Connect specification. Use default
- Specify the app's refresh token expiration period (in days): 30
- Do you want to specify the user attributes this app can read and write? No

### Local configuration

- Force the lambda runtime to v8.10. In ``amplify\backend\auth\rgpdayAuth\rgpdayAuth-cloudformation-template.yml``
```yml
  # Lambda which gets userpool app client config values
  # Depends on UserPool for id
  # Depends on UserPoolClientRole for role ARN
    Type: 'AWS::Lambda::Function'
    Properties:
      ...
      ...
      ...
      Runtime: nodejs8.10
```
- Force the frontend to use the AWS_IAM authorization type. In `./amplify/backend/backend-config.json` change the API security type into `AWS_IAM`

```json
"securityType": "AWS_IAM"
```

- In the cloudformation template
  - Authorize only administrators to create users (UserPool > Properties)
  ```yaml
  AdminCreateUserConfig:
    AllowAdminCreateUserOnly: true
  ```
  - Add the rpdayFuncVerifyCaptcha as a preAuthentication lambda (UserPool > Properties)
  ```yaml
  LambdaConfig:
    PreAuthentication: !Sub
      - arn:aws:lambda:${region}:${account}:function:rgpdayFuncVerifyRecaptcha-${env}
      - {
          region: !Ref "AWS::Region",
          account: !Ref "AWS::AccountId",
          env: !Ref env,
        }
  ```

### AWS Console configuration

- In the cognito console User Pool:
  - Add groups without IAM Role:
    - admins (priority 1)
    - sessions (priority 2)
  - Add users:
    - 2019-DEMO / 2019-DEMO, no phone number (uncheck verified), email no-reply@rgpday.com verified, group "sessions"
    - Admin (see password in KeePass ), no phone number (uncheck verified), email no-reply@rgpday.com verified, group "admins"

## Function: rgpdayFuncVerifyRecaptcha

### CLI configuration

- Provide a friendly name for your resource to be used as a label for this category in the project: rgpdayFuncVerifyRecaptcha
- Provide the AWS Lambda function name: rgpdayFuncVerifyRecaptcha
- Choose the function template that you want to use: Hello world function
- Do you want to edit the local lambda function now? No

### Local configuration

- In the cloudformation template's Resources section of the lambda authorize the UserPoolClientRole preAuthentication trigger to invoke the rpdayFuncVerifyCaptcha lambda. Add:
```json
"rgpdayFuncVerifyRecaptchaInvocationPermission": {
  "Type": "AWS::Lambda::Permission",
  "Properties": {
    "Action": "lambda:InvokeFunction",
    "FunctionName": {
      "Fn::GetAtt": [
        "LambdaFunction",
        "Arn"
      ]
    },
    "Principal": "cognito-idp.amazonaws.com",
    "SourceArn": {
      "Fn::Sub": [
        "arn:aws:cognito-idp:${region}:${account}:userpool/*",
        {
          "region": {
            "Ref": "AWS::Region"
          },
          "account": {
            "Ref": "AWS::AccountId"
          }
        }
      ]
    }
  }
}
```
- Customize the function in `./amplify/backend/function/rgpdayFuncSendMail/src`
  - function code: index.js
  - sample for testing: event.json (keep recaptcha empty before amplify push to avoid a useless update)
  - Secret Recaptcha Key: secret_env.json /!\ WARNING THIS FILE MUST BE REGISTERED IN `.gitignore` and should never be committed and/or pushed to CodeCommit
  - additional packages for the lambda: `npm install request-sync --save` to package.json
- Build and test the lambda locally with `amplify function invoke rgpdayFuncVerifyRecaptcha`


### AWS Console configuration

- Add the RECAPTCHA_SECRET to the environment variables. Optional but sometimes ``secret_env.json`` is not uploaded and ReCaptcha verification fail. The environment variable fixes the issue permanently.

## Function: rgpdayFuncSendMail

### CLI configuration

- Provide a friendly name for your resource to be used as a label for this category in the project: rgpdayFuncSendMail
- Provide the AWS Lambda function name: rgpdayFuncSendMail
- Choose the function template that you want to use: Hello world function
- Do you want to edit the local lambda function now? No

### Local configuration

- Customize the function in `./amplify/backend/function/rgpdayFuncSendMail/src`
  - function code: index.js
  - sample for testing: event.json (keep recaptcha empty before amplify push to avoid a useless update)
- Build and test the lambda locally with `amplify function invoke rgpdayFuncSendMail`
- In the backend, customize the lambda role in the cloudformation template to authorize the Lambda to invoke rgpdayFuncVerifyRecaptcha and to send emails with AWS SES
  ```json
  {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Effect": "Allow",
        "Action": [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ],
        "Resource": {
          "Fn::Sub": [
            "arn:aws:logs:${region}:${account}:log-group:/aws/lambda/${lambda}:log-stream:*",
            {
              "region": {
                "Ref": "AWS::Region"
              },
              "account": {
                "Ref": "AWS::AccountId"
              },
              "lambda": {
                "Ref": "LambdaFunction"
              }
            }
          ]
        }
      },
      {
        "Effect": "Allow",
        "Action": ["ses:SendEmail", "ses:SendRawEmail"],
        "Resource": "*"
      },
      {
        "Effect": "Allow",
        "Action": ["lambda:InvokeFunction"],
        "Resource": "*"
      }
    ]
  }
  ```

## GraphQL API

### CLI configuration

- At creation time

  - Please select from one of the below mentioned services GraphQL
  - Provide API name: rgpdayAPI
  - Choose an authorization type for the API Amazon Cognito User Pool
  - Do you have an annotated GraphQL schema? No
  - Do you want a guided schema creation? Yes
  - What best describes your project: Single object with fields (e.g., “Todo” with ID, name, description)
  - Do you want to edit the schema now? No

- At push time
  - Do you want to generate code for your newly created GraphQL API Yes
  - Choose the code generation language target javascript
  - Enter the file name pattern of graphql queries, mutations and subscriptions src\graphql\*\*\*.js
  - Do you want to generate/update all possible GraphQL operations - queries, mutations and subscriptions Yes
  - Enter the maximum depth of statements to be generated 2

### Local configuration

- Since we are using AWS Cognito and IAM to manage unauthenticated users, do not create an API key associated to the API, to prevent amplify-cli errors on infrequent amplify pushes. In ``amplify/api/parameters.json``:
```json
```
  - For more info on this topic, sze:
    - <https://github.com/aws-amplify/amplify-cli/issues/808>
    - <https://aws-amplify.github.io/docs/cli/graphql#apikeyexpirationepoch>

__/!\ The following parameter should be simpler in a future release of amplify-cli ([@function directive](https://github.com/aws-amplify/amplify-cli/issues/83))__

- connect the lambda rgpdayFuncSendMail to the graphQL Query sendMail: [Add a custom resolver that targets an aws lambda function](https://aws-amplify.github.io/docs/cli/graphql#add-a-custom-resolver-that-targets-an-aws-lambda-function)

### AWS Console configuration

__/!\ This should be handled locally by the amplify-cli in a future release ([RFC: Auth Enhancements](https://github.com/aws-amplify/amplify-cli/issues/766))__

- In the AWS AppSync console
  - Settings: Authorization type: `AWS Identity and Access Management (IAM)`
- In the IAM console, add policies to manage the access to the API:
  - Configure the authenticated role with an inline policy
  ```json
  {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Effect": "Allow",
        "Action": "appsync:GraphQL",
        "Resource": "arn:aws:appsync:eu-west-1:919510806644:apis/[API_ID]/types/*/fields/*"
      }
    ]
  }
  ```
  - configure the unautenticated role with an inline policy: rgpdayAPIUnauthAccess
  ```json
  {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Effect": "Allow",
        "Action": "appsync:GraphQL",
        "Resource": "arn:aws:appsync:eu-west-1:919510806644:apis/[API_ID]/types/Query/fields/sendMail"
      }
    ]
  }
  ```
