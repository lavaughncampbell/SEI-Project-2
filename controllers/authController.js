const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

// <-------------------------------------> //

// REGISTRATION ROUTE //

	// Registration form
router.get('/join', (req, res) => {
  	res.render('auth/join.ejs')
})

	// Registration Create User
router.post('/join', async (req, res, next) => {
	try {
		// create a user in the database
		console.log(req.body);
		 const desiredEmail = req.body.email
		 const desiredPassword = req.body.password
		 const emailWithThisEmail = await User.findOne({
		 	email: desiredEmail
		 })
		 // lets see what we get. findOne will return null if it cant find anything.
		 console.log(emailWithThisEmail);
		 if(emailWithThisEmail) {
		 	// tell them no email is taken
		 	console.log("email exists");
		 	req.session.message = `Email ${desiredEmail} already taken`
		 	res.send('email exists -- see terminal')
		 }
		 // email is available
		 else {

		 	// encryp the passwordwith bcrypt.
		 	const salt = bcrypt.genSaltSync(10)
		 	const hashedPassword = bcrypt.hashSync(desiredPassword, salt)
		 	// create the user
		 	const createdUser = await User.create({
		 		email: desiredEmail,
		 		password: desiredPassword
		 	})
		 	req.session.loggedIn = true
		 	req.session.userId = createdUser._id
		 	req.session.email = createdUser.email
		 	req.session.message = `${createdUser.email}`
		 	console.log(createdUser);
		 	req.session.message = `Hello, ${createdUser.email} thanks for joining!`
		 	res.redirect('/') // will need message saying somethng like, "welcome back (username)"
		 	// res.status(201).send("registered and logged in as " + req.session.email)
		 }
	}
	catch(err) {
		next(err)
	}
})





// <-------------------------------------> //
// LOGIN ROUTES //

	// Login Form
router.get('/login', (req, res) => {
  	res.render('auth/login.ejs')
})

	// Login User
router.post('/login', async (req, res, next) => {
  try {
  	// is there a user with this email?
  	const user = await User.findOne({ email: req.body.email })

  	// if not
  	if(!user) {
  		// email does not exist
  		console.log("bad email");
  		// message bad email or password
  		req.session.message = "Invalid email or password."
  		// redirect to login page so they can reattempt
  		res.redirect('/auth/login')
  	} else {
  		// check if their password is good
  		const loginInfoIsValid = bcrypt.compareSync(req.body.password, user.password)

  		// if password is good
  		if(loginInfoIsValid) {
  			// log them in sessions
  			req.session.loggedIn = true
  			req.session.userId = user_id
  			req.session.email = user.email

  			// set message
  			req.session.message = `Welcome back ${desiredEmail}!`
  			// redirect to
  			res.redirect('/')
  		} else {
  			console.log("bad password");
  			// message
  			req.session.message = "Invalid email or password."
  			res.redirect('/auth/login')
  		}
  	}
  } catch(err) {
  	next(err)
  }
})


// <-------------------------------------> //
// LOG OUT ROUTE
router.get('/logout', async (req, res, next) => {
  // destroy the session to log user out
  await req.session.destroy()
  res.redirect('/auth/login')
})







module.exports = router
