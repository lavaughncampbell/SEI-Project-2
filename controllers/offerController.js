const express = require('express')
const router = express.Router()
const Offer = require('../models/offer')
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
router.post('/newOffer', async (req, res, next) => {
	try {
		const postId = req.body.postId
		const postTitle = req.body.title
		// console.log("made offer button");
		const developerName = req.session.userId
		const offerMade = await Offer.create({
			name: developerName,
			user: req.session.usedId,
			title: postTitle,
			post: postId
		})
		console.log(`\nthis is offerMade`, offerMade);
		console.log(`\nthis is postId`, postId);
		console.log(`\nthis is developerName`, developerName);
		req.session.message = `You made an offer!`
		res.redirect('/user/home')
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