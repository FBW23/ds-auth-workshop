# Exercise - Auth Project

In this exercise we wanna create a user database with signup, login and role specific access step by step.

We will train the concepts of:
* signup with password hashing
* login with password comparison
* token storage in cookie
* route protection by token (=authentication middleware)
* route protection by user role (=authorization middleware)

## Stage 1 - Implement auth skeleton

In the first stage we wanna setup signup, login and route protection.

We will use no (!) database and mongoose. 

We train the concepts with just a plain javascript users array.

In the given server.js file you find already the skeleton with all routes you need. 

Follow the instructions in the comments of each route.

Install all needed packages by running: `npm i`

Test the auth flow in Postman or Rested Client
(or build a mini frontend with a Login & Signup form)

Test cases:
- access route /users when not logged in (=> should get rejected)
- signup a user
- login a user
- access route /users as normal user
- access route /admin as normal user (=> should get rejected)
- access route /admin as admin user

## Stage 2 - Implement Mongoose

Your auth workflow with login, signup and route protection works?

Great! Now commit your work.

We now refactor our code and will implement a database and mongoose.

Steps:
* Setup a connection to MongoDB using mongoose.connect(...)
* Setup a user schema & model in a file User.js
* Setup a route /seed for user seeding
  * Delete all users at start
  * Move your users array into the seed route
  * Seed the two users into database
  * Check in Compass or Mongo Shell if it worked
  * Perform password hashing
* Rewrite your routes /signup, /login, /users & /admin and use User model instead of array
* Rewrite your routes /signup & /login with User model


## Stage 3 - Optimize

Outsource middleware
- create a directory "middleware"
- move auth middleware into own file
- move role check middleware into own file

Outsource logic into your User model:
* password hashing logic into pre save hook / middleware
* password check logic into model function "checkPassword"
* token creation into model function "generateToken"
* token verify into static model method "verifyToken"
* Hide password field from all outputs with toJSON method

Everything still works?

Congratulations! 
If you made that work you made a huge step towards mastering the backend.

Enjoy your vacation :-)