# Changelog

## [1.4.1] - 2021-06-28

### Summary

Preparing for code review

### Features

- Improve code comments throughout
- Add debugger feature for pausing at SDK integration points with comment explaining use
- Fixed some bugs
- Improved color contrast for both light and dark modes
- Improved some `useEffect` implementations to reduce unnecessary re-renders

## [1.4.0] - 2021-06-24

### Summary

Clean up code and add dark mode

### Features

- Dark mode for OS's the are set to respective dark or light modes
- Improved form handling
- Refactored CSS to distinguish between custom classes and bootstrap classes
- Bug fixes and overall application improvement
- Additional callback support
- Address UX feedback
- Edit todo title
- Added linting and automated code styling
- More custom hooks for separating out logic from presentation
- Improved accessibility

### New callback support

- BooleanAttributeInputCallback
- KbaCreateCallback
- TermsAndConditionsCallback

## [1.3.0] - 2021-06-20

### Summary

Huge overall improvement, mobile responsiveness (form-factor) and hardening of the application

### Features

- Improved environment variable and constants mgmt
- Improved form handling and error feedback
- Improved README and dev experience
- Improved protected routing
- Improved icon components
- Fixed for submission bug when enter was pressed
- Removed last paragraph encouraging account registration when logged in
- Added "home" link to navigation and improved active styles
- Improve responsiveness in navigation
- Fix bug with checking and unchecking todo
- Fix modal bug on mobile
- Fix responsiveness on container

## [1.2.0] - 2021-06-14

### Summary

Improve developer and user experience, fix bugs and improve deployment

### Features

- Bug fixes
- Easier deployment
- Easier application configuration

## [1.1.0] - 2021-06-13

### Summary

Richer feature set and now DB backed server

### Features

- Server now has DB
- Register
- Deployment to Digital Ocean for live application
- New callback support

### New callback support

- ValidatedCreateUsernameCallback
- ValidatedCreatePasswordCallback
- StringAttributeInputCallback

## [1.0.0] - 2021-06-10

### Summary

Beta build of todo application for internal testing

### Features

- Improved UX
- Delete todo

## [0.0.1] - 2021-06-01

### Summary

Initial prototype of todo application

### Features

- Login
- Logout
- Add and complete todos
- Server REST API for backend
- API calls from client to server
- Limited callback support

### New callback support

- NameCallback
- PasswordCallback
