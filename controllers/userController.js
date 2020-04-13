const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Profile = require('../models/profile')
const Post = require('../models/post')
const Offer = require('../models/offer')

// <-------------------------------------> //

// PROFILE ROUTE //

  // Profile form
router.get('/profile', async (req, res, next) => {
  try {
    res.render('user/new.ejs')
  }
  catch(err) {
    next(err)
  }
})

// Profile Create
router.post('/new', async (req, res, next) => {
	try {

    let desiredAreYouDeveloper = req.body.areYouDeveloper

    if(req.body.areYouDeveloper === "on") {
      desiredAreYouDeveloper = true
      console.log(desiredAreYouDeveloper, "this should be true");
    } else {
        desiredAreYouDeveloper = false
        console.log(desiredAreYouDeveloper, "this should be false");
      }
    // create a profile in the database
		const desiredContactName = req.body.contactName
		const desiredBusinessName = req.body.businessName
		const desiredLocation = req.body.location
		const desiredIndustry = req.body.industry
		// const desiredAreYouDeveloper = req.body.areYouDeveloper
		const desiredLanguages = req.body.languages
    console.log(`\nheres userID`, req.session.userId);
		const createdProfile = await Profile.create({
			contactName: desiredContactName,
			businessName: desiredBusinessName,
			location: desiredLocation,
			industry: desiredIndustry,
			areYouDeveloper: desiredAreYouDeveloper,
			languages: desiredLanguages,
      user: req.session.userId
		})

    console.log(createdProfile);
    req.session.message = `Hello, ${createdProfile.contactName} nice profile!`
    res.redirect('/user/home')
}
	catch(err) {
		next(err)
	}
})

router.get('/home', async (req, res, next) => {
  try {
    const currentUserId = req.session.userId
    const postTitle = req.body.title
    const currentPostId = req.session.postId
    const foundProfile = await Profile.find({ user: currentUserId })
    // const foundPost = await Post.find({ title: desiredTitle })
    // const currentUserId = req.session.userId
    const foundPost = await Post.find({ user: currentUserId })
    const foundOffers = await Offer.find({}).populate('post')
    // console.log(foundPost);
    // const foundBusinessName = req.body.businessName
    // console.log(`\nthis is rec.session.user`, req.session);
    console.log(`\nthis is found profile`, foundProfile);
    console.log(`\nthis is found post`, foundPost);
    
    if(foundProfile[0].areYouDeveloper === true) {
      console.log('\nthis user is a developer\n');
      console.log('\nthis is a foundOffer', foundOffers);
      res.render('developer/devHome.ejs', {
        profile: foundProfile[0],
        post: foundPost,
        offers: foundOffers
      })
    } else {
      console.log('\nthis user is NOT a developer\n');
      res.render('user/userHome.ejs', {
      profile: foundProfile[0],
      post: foundPost
    })
    }
    // console.log(req.session.businessName);
  }
  catch(err) {
    next(err)
  }
})

// Index for ALL job posts
router.get('/allJobs', async (req, res, next) => {
  try {
    const allPosts = await Post.find({}).populate('user')
    // console.log(`\nthis is all job posts`, allPosts);
    res.render('index/allJobs.ejs', {
      post: allPosts
    })
  }
  catch(err) {
    next(err)
  }
})


// ALL JOBS INDEX
// router.get('/allJobs', async (req, res, next) => {
//   try {
//     res.render('post/allJobs.ejs')
//   }
//   catch(err) {
//     next(err)
//   }
// })


module.exports = router






