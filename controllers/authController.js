const express = require('express')
const router = express.Router()
const User = require('../models/user')
// const Business = require('../models/business')


router.get('/join', (req, res) => {
  	res.render('auth/join.ejs')
})

router.get('/login', (req, res) => {
  	res.render('auth/login.ejs')
})

router.post('/join', async (req, res, next) => {
	try {
		console.log(req.body);
		 const desiredEmail = req.body.email
		 const desiredPassword = req.body.password
		 const emailWithThisEmail = await User.findOne({
		 	email: desiredEmail
		 })
		 console.log(emailWithThisEmail);
		 if(emailWithThisEmail) {
		 	console.log("email exists");
		 	res.send('email exists -- see terminal')
		 }
		 else {
		 	const createdUser = await User.create({
		 		email: desiredEmail,
		 		password: desiredPassword
		 	})
		 	req.session.loggedIn = true
		 	req.session.userId = createdUser._id
		 	req.session.email = createdUser.email
		 	req.session.message = `${createdUser.email}`
		 	console.log(createdUser);
		 	res.redirect('/') // will need message saying somethng like, "welcome back (username)"
		 	// res.status(201).send("registered and logged in as " + req.session.email)
		 }
	}
	catch(err) {
		next(err)
	}
})








module.exports = router
