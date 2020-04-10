require('dotenv').config()
const express = require('express')
const server = express()
const bodyParser = require('body-parser')
const session = require('express-session')
const PORT = process.env.PORT


// db connection
require('./db/db.js')


//middleware
server.use(express.static('public'))
server.use(bodyParser.urlencoded({ extended: false }))

server.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))

server.use((req, res, next) => {
  res.locals.otherTestMessage = "I set this on res.locals in server.js"
  next()
})

server.use((req, res, next) => {
  console.log("here is the session in my custom app-level middleware");
  console.log(req.session)
  // adding these to res.locals allows us to make our templates
  // more dynamic in the auth area
  res.locals.loggedIn = req.session.loggedIn
  res.locals.email = req.session.email
  // you may also want to store user id of logged in user!
  // you can also use this to enhance your FLASH MESSAGING POWERS
  res.locals.message = req.session.message
  // as before, clear it out so it only appears once
  req.session.message = undefined
  next()
})

// controllers
const authController = require('./controllers/authController')
server.use('/auth', authController)

const userController = require('./controllers/userController')
server.use('/user', userController)

const postController = require('./controllers/postController')
server.use('/post', postController)

server.get('/', (req, res) => {
  res.render('home.ejs')
})
server.get('*', (req, res) => {
  res.status(404).render('404.ejs')
})




server.listen(PORT, () => {
  const d = new Date()
  console.log(`${d.toLocaleString()}: Server listening on port ${PORT}`);
})
