const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Profile = require('../models/profile')
const Post = require('../models/post')

// <-------------------------------------> //

// Post
// click button to see allJobs index page (to view joobs to make an offer)
router.get('/newOffer', async (req, res, next) => {
  try {
    res.redirect('/user/allJobs')
  }
  catch(err) {
    next(err)
  }
})


// click this to make offer and go to userHome (and see "made offer flash or red button")
router.post('/madeOffer', async (req, res, next) => {
	try {
		console.log("made offer button");
		res.send('working this offerMade button')

		// const developerName = req.session.userId
		// const offerMade = await Post.create({
		// 	name: developerName
		// })
		// console.log(`\nthis is offerMade`, offerMade);
		// req.session.message = `You made an offer!`
		// res.redirect('/developer/devHome')
	} 
	catch(err) {
		next(err)
	}
})


// router.post('/newOffer', async (req, res, next) => {
// 	try {
// 		const madeOfferTitle = 
// 	} 
// 	catch(err) {
// 		next(err)
// 	}
// })



//redirect to userhome page once the 
//foreach loop runs through the offers in the 
//dev hom page



// click button that links to route, 
//route is how you render form

// form creates new information with post method

// need a post









 module.exports = router