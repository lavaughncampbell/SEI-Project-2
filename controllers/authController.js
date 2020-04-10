const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

// <-------------------------------------> //

// REGISTRATION ROUTE //

	// Registration form
router.get('/join', (req, res) => {

  	// changes made while lesson still going on
    let messageToDisplay = req.session.message
    req.session.message = ''

    res.render('auth/join.ejs', {
      message: messageToDisplay
    })
})

	// Registration Create User
router.post('/join', async (req, res, next) => {
	try {
		// create a user in the database
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

      //changes below, from res.send to...

		 	res.redirect('/auth/join')
		 }
		 // email is available
		 else {
		 	// encryp the password with bcrypt.
		 	const salt = bcrypt.genSaltSync(10)
		 	const hashedPassword = bcrypt.hashSync(desiredPassword, salt)
		 	// create the user
		 	const createdUser = await User.create({
		 		email: desiredEmail,
		 		password: hashedPassword
		 	})
		 	req.session.loggedIn = true
		 	req.session.userId = createdUser._id
		 	req.session.email = createdUser.email
      // change below , comment out
		 	// req.session.password = createdUser.password
		 	// req.session.message = `${createdUser.email}`
		 	// console.log(createdUser);
		 	req.session.message = `Hi ${createdUser.email} and welcome to ChiQuery! Thanks for joining! Fill out your profile to get the most views!`
		 	res.redirect('/user/profile')
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
    // commented out below

  	// message: ""
})

	// Login User
router.post('/login', async (req, res, next) => {
  try {
  	// is there a user with this email?

    // commented out below
  		// console.log(req.body);

  		const loginEmail = req.body.email
  		const user = await User.findOne({ email: loginEmail })

      // commetned out below
  		// console.log(req.body);

  	// if not
  	if(!user) {
  		// email does not exist
  		console.log("bad email");
  		// message bad email or password
  		req.session.message = "Invalid email or password. Please try again."
  		// redirect to login page so they can reattempt
  		res.redirect('/auth/login')
  	} 
    else {
  		// check if their password is good
  		const loginInfoIsValid = bcrypt.compareSync(req.body.password, user.password)
  		// if password is good
  		if(loginInfoIsValid) {
  			// log them in sessions
  			req.session.loggedIn = true
  			req.session.userId = user._id
  			req.session.email = user.email

  			// set message
  			req.session.message = `Welcome back to ChiQuery ${user.email}!`
  			// redirect to
  			res.redirect('/user/home')
  		} 
      else {
  			console.log("bad password");
  			// message
  			req.session.message = "Invalid email or password. Please try again."
  			res.redirect('/auth/login')
  		}
  	}
  } catch(err) {
  	next(err)
  }
})


// <-------------------------------------> //
// LOG OUT ROUTE
router.get('/logout', async (req, res) => {
  // destroy the session to log user out
  await req.session.destroy()
  res.redirect('/auth/login')
})







module.exports = router
