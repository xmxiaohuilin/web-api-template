# This is a node.js project template

This template contains a typical structure for node.js. In this template, we wrapped some backend clients (elasticsearch, celery, kafka) to process big data.


## Libraries

```
└── Web App
    └── 'body-parser' : Parse body of HTTP
    └── 'express'     : Structure for App
    └── 'formidable'  : Like body-parser but for multi-parts (file upload)
    └── 'mongoose'    : ORM for mongodb
    └── 'passport'    : To handle authentications
    └── 'winston'     : For logging and saving files. Uses morgan
└── Testing
    └── 'expect'      : Expectation testing
    └── 'mocha'       : Testing framework
    └── 'nock'        : HTTP interceptors to mock external HTTP requests
    └── 'supertest'   : HTTP request testing
```
## Project structure

Below is a map of our whole folder structure and what files are stored where. Note
that our `mocha` test suite maps exactly to our `api` & `lib` folders. If you add
any new file or update any existing file, please add or update our `mocha` tests.

```
├── api
│   ├── shared           // contains files to be shared across all versions of the Web API (v1, v2 & etc..)
│   │   ├── endpoints    //   shared `expressjs` router middlewares
│   │   ├── middlewares  //   shared `expressjs` middlewares
│   │   ├── models       //   shared classes that deals directly with the database
│   │   ├── pojos        //   shared general functions not dealing with database fetching
│   │   └── schemas      //   shared mongoose schemas
│   ├── internal
│   │   └── v1              // contains files for internal v1 of the Web API
│   │       ├── endpoints   //   internal v1 `expressjs` router middlewares
│   |       ├── middlewares //   internal v1 `expressjs` middlewares
│   │       ├── models      //   internal v1 classes that deals directly with the database
│   │       ├── pojos       //   internal v1 general functions not dealing with database fetching
│   │       └── schemas     //   internal v1 mongoose schemas
│   └── v1               // contains files for v1 of the Web API
│       ├── endpoints    //   v1 `expressjs` router middlewares
│       ├── middlewares  //   v1 `expressjs` middlewares
│       ├── models       //   v1 classes that deals directly with the database
│       ├── pojos        //   v1 general functions not dealing with database fetching
│       └── schemas      //   v1 mongoose schemas
├── bin                  // contains binary scripts that helps us automate some development tasks
├── config               // contains configuration files for libraries that we are using
│   ├── commitizen       // contains the config files for `commitizen`
│   └── initializers     // contains files that the Web API load once when it first boots up.
│                        //   See # How to Name Config Initializers
├── db                   // contains files related to the database
│   └── seeds            // contains files to seed the database for testing or on first start
├── docs                 // contains documentation files. All the content of this folder should be gitignored
│   └── docdash          // contains files for `jsdoc` using the `docdash` template
├── lib                  // contains util js files with functions that can be used anywhere in the app
├── logs                 // contains log rotation files. All the content of this folder should be gitignored
└── test                 // contains all of `mocha` testing files and it maps exactly to our root folder
    ├── api                         // maps exactly to `api/`
    │   ├── shared                  // maps exactly to `api/shared`
    │   │   ├── endpoints
    │   │   ├── middlewares
    │   │   ├── models
    │   │   ├── pojos
    │   │   └── pojos
    │   └── v1                      // maps exactly to `api/v1`
    │       ├── endpoints
    │       ├── middlewares
    │       ├── models
    │       ├── pojos
    │       └── pojos
    ├── lib                         // maps exactly to `lib/`
    └── support                     // contains files that all `mocha` tests can use. Typically loaded once at the start
```

## [Supported ES6 features for Node](http://node.green/)

We are currently using ES6 current syntax. Please click on the title above to see
all of the supported ES6 features in node.


# Getting Started

#### 1. Install homebrew & homebrew packages

Use this command or check [homebrew's website for instructions](http://brew.sh/).

```
$ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

Afterwards, install the following homebrew packages:

> You can copy and paste the command into your terminal
```
$ brew nvm zsh git rcm vim tree the_silver_searcher mongodb mongoose hub docker docker-machine
```

You must install `nvm`!

#### 2. Install `node` using `nvm`

> Below is an example, but you should install the current node version that our
codebase uses

```
$ cat package.json | grep nodeVersion

"nodeVersion": "6.2.1"

$ nvm install v6.2.1
$ nvm use v6.2.1
$ nvm alias default v6.2.1
```

#### 3. Install `npm` packages

```
$ npm install
```
# NPM commands

You run these commands by prefixing them with `npm run command_here`. Example:
`npm run ccel`.

| NPM Scripts                | Description                                                     |
| -------------------------- | --------------------------------------------------------------- |
| ccel                       | Alias of curl:celery-routes                                     |
| curl:celery-routes         | Use curl to download the celery_routes.json from analytics repo |
| cz                         | Use commitizen to do a git commit                               |
| docs:jsdoc                 | Generates jsdoc for our codebase and opens it                   |
| docs:swagger               | Generates swagger doc and opens swagger UI                      |
| eslint                     | Lint the codebase using eslint                                  |
| gdocs                      | Alias of docs:generate                                          |
| gswag                      | Alias of docs:swagger                                           |
| jsdoc                      | Runs jsdoc from node_modules                                    |
| mocha                      | Runs mocha from node_modules                                    |
| node-inspector             | Runs node-inspector from node_modules                           |
| nodemon                    | Runs nodemon from node_modules                                  |
| start                      | Runs node server                                                |
| start:debug                | Runs node with node-inspector                                   |
| start:debug-brk            | Runs node with node-inspector but with --debug-brk              |
| test                       | Runs all the tests with Spec reporter                           |
| testn                      | Runs all the tests with Nyan reporter                           |
| testl                      | Runs all the tests with List reporter                           |
| test:jenkins-mocha         | Runs all the tests for jenkins using Tap reporter               |
| test:jenkins-junit         | Runs all the tests for jenkins using JUnit reporter             |
| test:debug                 | Runs all the tests in watch mode with node-inspector            |
| test:debug-brk             | Runs all the tests in watch mode with node-inspector but with --debug-brk |
| test:nodemon-restart-event | DO NOT RUN! Used by nodemon.json to trigger mocha builds for specific files that changed |
| test:watch                 | Runs nodemon to trigger mocha test on file change               |

#### 4. Running the code
```
brew services start mongodb
brew services start kafka
brew services start redis
brew services start elasticsearch

npm run start
```
