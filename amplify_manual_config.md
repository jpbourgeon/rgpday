# Amplify manual configuration

Describes the resources provisionned in the cloud for the project via the amplify cli and the manual configurations I applied directly to the aws consoles or in the amplify backend files after provisionning them with the CLI.

## Project initialisation

- Enter a name for the project: rgpday
- Enter a name for the environment: dev
- Choose your default editor: Visual Studio Code
- Choose the type of app that you're building: javascript
- What javascript framework are you using: react
- Source Directory Path:  src
- Distribution Directory Path: build
- Build Command:  npm.cmd run-script build
- Start Command: npm.cmd run-script start
- Do you want to use an AWS profile? Yes
- Please choose the profile you want to use: default

## Add a master environment

- Do you want to use an existing environment? No
- Enter a name for the environment: master
- Do you want to use an AWS profile? Yes
- Please choose the profile you want to use: default

## Environments

- dev: cloudformation stack ``rgpday-20190302152928``
- master: cloudformation stack ``rgpday-20190302163236``

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

- Force the frontend to use the AWS_IAM authorization type. Create a file called ``./src/aws-config.js`` with the following code
```js
import config from './aws-exports'
config.aws_appsync_authenticationType = 'AWS_IAM'
export default config
```

### AWS Console configuration

- In the cognito console User Pool:
  - Add groups without IAM Role:
    - admins (priority 1)
    - sessions (priority 2)
  - Add users:
    - 2019-DEMO / 2019-DEMO, phone +33000000000 verified, email no-reply@rgpday.com verified, group "sessions"
    - Admin (see password in KeePass ), phone +33000000000 verified, email no-reply@rgpday.com verified, group "admins"
  - General parameters > Policies: Authorize only administrators to create users

## Function: rgpdaySendMail

### CLI configuration

- Provide a friendly name for your resource to be used as a label for this category in the project: rgpdayFuncSendMail
- Provide the AWS Lambda function name: rgpdayFuncSendMail
- Choose the function template that you want to use: Hello world function
- Do you want to edit the local lambda function now? No

### Local configuration

- Customize the function in ``./amplify/backend/function/rgpdayFuncSendMail/src``
  - function code: index.js
  - sample for testing: event.json
  - Secret Recaptcha Key: secret_env.json /!\ WARNING THIS FILE MUST BE REGISTERED IN `.gitignore` and should never be committed and/or pushed to CodeCommit
  - additional packages for the lambda: ``npm install node-fetch --save`` to package.json
- Build and test the lambda locally with `amplify function invoke rgpdayFuncSendMail`

### AWS console configuration

- In the Lambda console (use Admin Role), add the google `RECAPTCHA_SECRET` key to the function's environment variables

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
  - Enter the file name pattern of graphql queries, mutations and subscriptions src\graphql\**\*.js
  - Do you want to generate/update all possible GraphQL operations - queries, mutations and subscriptions Yes
  - Enter the maximum depth of statements to be generated 2

### AWS Console configuration

- In the AWS AppSync console
  - Settings: Authorization type: ``AWS Identity and Access Management (IAM)``
  - Connect the schema to the ``rgpdayFuncSendMail[Env]`` function
    - Data sources > create data source
      - rgpdayDataSourceSendMail[Env]
      - AWS Lambda function
      - EU-WEST-1
      - Pick the Lambda ARN (search for the name and the env at the end of the ARN)
      - New role
    - Schema > Resolvers, search Query and find the sendMail field > click Attach
    - Resolver for Query.sendMail : select the Data source name and leave the default request mapping template
- In the IAM console
  - Use the stack IDs to filter the roles
    - dev: cloudformation stack ``rgpday-20190302152928``
    - master: cloudformation stack ``rgpday-20190302163236``
  - With the API IDs from AWS Appsync Console > settings
    - dev: ``u2swr5uoijev5c2qvoe3lfj4py``
    - master: ``lhgvpmjrongkdc6lidluyn6bai``
  - Configure the autenticated role with an inline policy: rgpdayAPIAuthAccess[Env] (replace API ID accordingly)
  ``` json
  {
      "Version": "2012-10-17",
      "Statement": [
          {
              "Sid": "VisualEditor0",
              "Effect": "Allow",
              "Action": "appsync:GraphQL",
              "Resource": "arn:aws:appsync:eu-west-1:919510806644:apis/[API_ID]/types/*/fields/*"
          }
      ]
  }
  ```
  - configure the unautenticated role with an inline policy: rgpdayAPIUnauthAccess[Env] (replace ``[API_ID]`` accordingly)
  ``` json
  {
      "Version": "2012-10-17",
      "Statement": [
          {
              "Sid": "VisualEditor0",
              "Effect": "Allow",
              "Action": "appsync:GraphQL",
              "Resource": "arn:aws:appsync:eu-west-1:919510806644:apis/[API_ID]/types/Query/fields/sendMail"
          }
      ]
  }
  ```
