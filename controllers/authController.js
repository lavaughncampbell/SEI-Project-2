const express = require('express')
const router = express.Router()
const Developer = require('../models/developer')
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
		 const desiredUserId = req.body.userId
		 const desiredEmail = req.body.email
		 const desiredPassword = req.body.password
		 const emailWithThisEmail = await Developer.findOne({
		 	email: desiredEmail
		 })
		 console.log(emailWithThisEmail);
		 if(emailWithThisEmail) {
		 	console.log("email exists");
		 	res.send('email exists -- see terminal')
		 }
		 else {
		 	const createdDeveloper = await Developer.create({
		 		email: desiredEmail,
		 		password: desiredPassword,
		 		userId: desiredUserId
		 	})
		 	req.session.loggedIn = true
		 	req.session.developerId = createdDeveloper._id
		 	req.session.email = createdDeveloper.email
		 	res.status(201).send("registered and logged in as " + req.session.email)
		 }
	} 
	catch(err) {
		next(err)
	}
})








module.exports = router
