# HelloWorld Web application

HelloWorld is an individual open-source project. It is web application - simple chat system in which friends can communicate between each other. Also, adding new friends as well as accepting/rejecting friend requests is possible and exists as a feature.

## Getting Started

Please read the instructions below.

### Prerequisities

You will need to run mongod


### Installing

1. Clone this repository and navigate to the root directory. Run :

```
npm install
```

```
bower install
```
```
npm install browserify watchify -g
```

in order to install its dependencies.

Also, please be sure to open a new terminal tab and navigate to the /public/app folder. Then run:
```
watchify app.js -o bundle.js
```
This command start watchify and looks for any changes in the code.


2. After completing step 1, navigate to the root directory of the project and run:
	```
	npm test
	```
	a) in order to start the tests OR

	```
	npm start
	```
	b) in order to start the server

If you chose 2.a, the tests will finish quickly and you can proceed to step 2.b - starting the server.

If you chose 2.b, Congratulations - you started the server. 
Please go to browser and you will be able to see the application, which can be accessed on localhost:3000


You can login if you already have an existing account, or you can register yourself in order to be able to navigate to the actual chat.

## Running the tests

There are two different kinds of tests which are in the app/tests/* folder: tests for the models and tests for the routes. 
You can run the tests from the root directory with the following command: 
```
npm test
```

## Configuration
The configuration files can be found in the /config/env folder. In these files, the database and the port on which the application will run can be set up.

The /config/env/test.js file containes the configuration for the test running. My test database is called hello_world_test.
The /config/env/development.js file containes the configuration for the development environment. My development database is called hello_world_dev.
The /confg/env/all.js file containes the default configuration for all environments.

## Built With

* MEAN Stack (MongoDB, Express.js, AngularJS, Nodejs)
* Twitter Bootstrap


## Authors

Monika Jandrevska (https://github.com/mjandrevska)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for more details

## Acknowledgments

* AngularJS Tips from this blog: https://www.toptal.com/angular-js/a-step-by-step-guide-to-your-first-angularjs-app
* Nodejs and Express.js Tips from: https://scotch.io/tutorials/build-a-restful-api-using-node-and-express-4

