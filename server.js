const express = require('express');
const app = express();
const cors = require("cors")
const cookieParser = require("cookie-parser");


// our user fake database :-)
let users = [
  { id: "1", email: "admin@dci.org", pw: "admin123", role: 'Admin' },
  { id: "2", email: "user@dci.org", pw: "user123", role: 'User' }
]

app.use(cors()) // allow post, put, delete requests from fronend
app.use(express.json()) // parse incoming bodies
app.use(cookieParser()) // parse incoming cookies


// home route (nothing to do here)
app.get('/', (req, res) => {
  res.send("Authorize me, please!");
});


/**
 * Signup Route:
 * - Check if user with given email does not exist
 * - Hash the PW with bcrypt
 * - Add the user to users array
 * - Create a token from the user ID
 * - Return the created user as response and send the token by a cookie
 */
app.post('/signup', async (req, res, next) => {  
  let { email, pw } = req.body

  res.send(req.body)
})

/**
 * Login Route:
 * - Find user by provided email
 * - Compare provided password with stored password hash of user by using bcrypt 
 * - Reject call by throwing error if no user found with given credentials
 * - Create a token from the user ID
 * - Return the matched user as response and send the token by a cookie
 */
app.post('/login', async (req, res, next) => {
  let { email, pw } = req.body

  res.send(req.body)
})

/**
 * Auth middleware
 * - check if a token exists in cookies
 * - if token in cookies found: verify the token
 * - store the decoded info in req.user
 * - if no token present or not valid: reject the call by sending an error with next()
 */ 
const auth = (req, res, next) => { 
  next() 
}

/** 
 * Role check middleware
 * - lookup the user in req.uer
 * - check if the user has the role "Admin"
 * - if not admin: reject the call by creating an error and pass it to the next function
 * - if admin: allow passing by calling next()
 */
const isAdmin = (req, res, next) => {
  next()
}

// secret route - for logged-in users only!
// - this route should just be available for users with valid token
// - return here normal users (=> exclude admin users)
// - apply the auth middleware on the route
app.get('/users', async (req, res) => {
  res.send(users)
})

// admin route - for logged-in admins only!
// - this route should just be available by admin users
// - it will deliver back ALL users
// - apply both - the auth + the admin middleware - on the admin route to give it protection
app.get('/admin', async (req, res) => {
  res.send(users)
})


// our central error handler
app.use((err, req, res, next) => {
  console.log(err)
  res.status(err.status || 500).send({
    err: err.message || err
  })
})

app.listen(8000, () => {
  console.log('Example app listening on port 8000!');
});

//Run app, then load http://localhost:8000 in a browser to see the output.