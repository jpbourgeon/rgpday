# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
List of change types (one of: Added, Changed, Deprecated, Removed, Fixed, Security)

## [Unreleased]

## 0.2.1 - 2019-03-02

- Added: add a GetRecaptchaToken component to get recaptcha tokens more easily for testing purpose
- Changed: fully functionnal contact page sends mails after ReCaptcha verification in authenticated and unauthenticated state
- Changed: use the amplify logger instead of debug (isomorphic)
- Fixed: rebuild the broken amplify from scratch 
- Removed: backend deprecated cloudformation stacks and associated ressources 
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
