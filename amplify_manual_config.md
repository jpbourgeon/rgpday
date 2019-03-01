# Amplify manual configuration

Describes the resources provisionned in the cloud for the project via the amplify cli and the manual configurations I applied directly to the aws consoles or in the amplify backend files after provisionning them with the CLI.

## Environments

- dev (rgpday-20190301180555)
- master (rgpday-20190301181040)

## Auth : Cognito user pool with identity pool 

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

- User Pool:
  - Add groups without IAM Role :
    - admins (priority 1)
    - sessions (priority 2)
  - Add users :
    - 2019-DEMO / 2019-DEMO, phone +33000000000 verified, email no-reply@rgpday.com verified, group "sessions"
    - Admin (see password in KeePass ), phone +33000000000 verified, email no-reply@rgpday.com verified, group "admins"
  - Paramètres généraux > Stratégies : Autoriser uniquement les administrateurs à créer des utilisateurs

### Unautenticated role strategy : rgpdayAllowSendMailUnauthRole

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

### Autenticated role strategy : rgpdayAllowAPIAccessAuthRole

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

## Function : rgpdaySendMail

### CLI configuration

### Manual configuration

## GraphQL API

### CLI configuration

### Manual configuration

