# Amplify manual configuration

Describes the resources provisionned in the cloud for the project via the amplify cli and the manual configurations I applied directly to the aws consoles or in the amplify backend files after provisionning them with the CLI.

## Environments

- dev: cloudformation stack ``rgpday-20190301180555``
- master: cloudfomation stack ``rgpday-20190301181040``

## Auth: Cognito user pool with identity pool 

### CLI configuration

- No, I will set up my own configuration
- User SignUp, SignIn, connected with AWS IAM controls
- Friendly name: rgpdayAuth
- Identity pool: rgpdayAuthIdentityPool
- Allow unauthenticated logins: Yes
- 3rd party auth providers: No
- Name for the user pool: rgpdayAuthUserPool
- MFA: OFF
- Email based user registration: Enabled
- Email verification subject: default
- Email verification message: default
- Override the default password policy: Y
- Minimum length: 6
- Requires: [Uppercase, Numbers, Symbols]
- Required attributes: None except the default (Email)
- Token expiration period: 30
- Specify the user attributes this app can read and write: N

### Manual configuration

- Locally
  - Force the frontend to use the AWS_IAM authorization type. Create a file called ``./src/aws-config.js`` with the following code
  ```js
  import config from './aws-exports'

  config.aws_appsync_authenticationType = 'AWS_IAM'

  export default config
  ```
- In the cognito console
  - User Pool:
    - Add groups without IAM Role:
      - admins (priority 1)
      - sessions (priority 2)
    - Add users:
      - 2019-DEMO / 2019-DEMO, phone +33000000000 verified, email no-reply@rgpday.com verified, group "sessions"
      - Admin (see password in KeePass ), phone +33000000000 verified, email no-reply@rgpday.com verified, group "admins"
    - General parameters > Policies: Authorize only administrators to create users

## Function: rgpdaySendMail

### CLI configuration

- Friendly name for the resource: rgpdayFunctionSendMail
- AWS Lambda function name: rgpdayFunctionSendMail
- Function template: Hello world function
- Please edit the file in your editor: C:\Users\bourgeonjp\Documents\Code_repositories\rgpday.com\amplify\backend/function/rgpdayFunctionSendMail/src/index.js

### Manual configuration

- Locally
  - Customize the function in ``./amplify/backend/function/rgpdayFunctionSendMail/src``
    - function code: index.js
    - sample for testing: event.json
    - sample for testing: secret_env.json /!\ WARNING THIS FILE MUST BE REGISTERED IN `.gitignore` and should never be committed and/or pushed to CodeCommit
    - additional packages for the lambda: ``npm install node-fectch --save`` to package.json
  - Build and test the lambda locally with `amplify function invoke rgpdayFunctionSendMail`
- In the Lambda console (use Admin Role)
  - Add the google `RECAPTCHA_SECRET` key to the function's environment variables

## GraphQL API

### CLI configuration

- At creation time
  - Please select from one of the below mentioned services GraphQL
  - Provide API name: rgpdayAPI
  - Choose an authorization type for the API Amazon Cognito User Pool: Use a Cognito user pool configured as a part of this project
  - Do you have an annotated GraphQL schema? No
  - Do you want a guided schema creation? Yes
  - What best describes your project: One-to-many relationship (e.g., “Blogs” with “Posts” and “Comments”)
  - Do you want to edit the schema now? No
- At push time
  - Do you want to generate code for your newly created GraphQL API Yes
  - Choose the code generation language target javascript
  - Enter the file name pattern of graphql queries, mutations and subscriptions src\graphql\**\*.js
  - Do you want to generate/update all possible GraphQL operations - queries, mutations and subscriptions Yes
  - Enter the maximum depth of statements to be generated 2

### Manual configuration

- API IDs from AWS Appsync Console > settings
  - dev: ``5toty6m2frhdbmhnlbsetst234``
  - master: ``2mwueq325zbqxiof4v7hry6qmu``

- In the AWS AppSync console
  - Settings: Authorization type: ``AWS Identity and Access Management (IAM)``
  - Connect the schema to the ``rgpdayFunctionSendMail`` function
    - Data sources > create data source
      - rgpdayDataSourceSendMail[Env]
      - AWS Lambda function
      - EU-WEST-1
      - Pick the Lambda ARN (search for the name and the env at the end of the ARN)
      - New role
    - Schema > Resolvers, search Query and find the sendMail field > click Attach
    - Resolver for Query.sendMail : select the Data source name and leave the default request mapping template
- In the IAM console
  - configure the autenticated role with an inline policy: rgpdayAPIAuthAccess[Env] (replace API ID accordingly)
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
