# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
List of change types (one of: Added, Changed, Deprecated, Removed, Fixed, Security)

## [Unreleased]

## 0.4.0 - 2019-03-13

- Added: Frontend Scenarios management
- Added: Frontend Presentations management
- Added: Frontend Sessions management
- Added: Frontend ProtectedRoutes - retrieve and share the user data : isAdmin and currentSession
- Changed: Global refactor the components folder into components, pages and protectedPages folders
- Changed: Backend API - update graphql schema
- Changed: Frontend CallToAction component - better wording and layout
- Changed: Frontend Home and about component - better call to action
- Changed: Frontend Navigation component - refactor the AppBar component into Navigation
- Changed: Frontend About page - better layout
- Changed: Frontend Dashboard page - better layout ; help tiles for admins
- Changed: Frontend App - rename route /session into /dashboard
- Fixed: Backend function rgpdayFuncVerifyCaptcha - introduce an environment variable online to provide the RECAPTCHA_SECRET more reliably
- Fixed: Backend function rgpdayFuncSendMail - ReCaptcha errors where not handle properly when the rgpdayFuncVerifyCaptcha lambda failed
- Fixed: Loadable components now pass props down to their children

## 0.3.0 - 2019-03-06

- Added: Backend Auth - do a ReCaptcha antispam verification before authenticating users
- Added: Backend function rgpdayFuncVerifyRecaptcha - manage Recaptcha tokens verifications
- Changed: Backend function rgpdayFuncSendMail - verify user ReCaptcha token before sending an email
- Changed: Backend functions - make the lambdas synchronous
- Changed: Frontend ReCaptcha component - extend the recaptcha-v3-react library to provide on-demand tokens
- Changed: Frontend Contact component - get recaptcha tokens just before submitting
- Changed: Frontend SignIn component - do a ReCaptcha verification before user authentication

## 0.2.1 - 2019-03-02

- Added: add a GetRecaptchaToken component to get recaptcha tokens more easily for testing purpose
- Changed: fully functionnal contact page sends mails after ReCaptcha verification in authenticated and unauthenticated state
- Changed: use the amplify logger instead of debug (isomorphic)
- Fixed: rebuild the broken amplify from scratch 
- Removed: Backend deprecated cloudformation stacks and associated ressources 
- Security: remove useless dependencies

## 0.2.0 - 2019-02-26

- Added: configure code splitting (@loadable/component)
- Added: minimal dashboard page
- Changed: amplify library modular imports for better performance
- Changed: components factorisation (tile, call to action)
- Fixed: IE 10+ compatibility
- Added: amplify authentication
- Changed: Temporarily replace Contact Page by a gravatar popup [Gravatar](https://fr.gravatar.com/jpbourgeon)

## 0.1.2 - 2019-02-11

- Fixed: release to test automatic push from dev to master on CI/CD 

## 0.1.1 - 2019-02-11

- Fixed: amplify configuration has been updated to fix CI/CD 

## 0.1.0 - 2019-02-11

- Added: project initialisation
