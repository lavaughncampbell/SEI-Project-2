const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Profile = require('../models/profile')
const Post = require('../models/post')

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
    // create a profile in the database
		const desiredContactName = req.body.contactName
		const desiredBusinessName = req.body.businessName
		const desiredLocation = req.body.location
		const desiredIndustry = req.body.industry
		const desiredAreYouDeveloper = req.body.areYouDeveloper
		const desiredLanguages = req.body.languages
		const createdProfile = await Profile.create({
			contactName: desiredContactName,
			businessName: desiredBusinessName,
			location: desiredLocation,
			industry: desiredIndustry,
			areYouDeveloper: desiredAreYouDeveloper,
			languages: desiredLanguages,
      user: req.session.userId
		})
    // req.session.contactName = createdProfile.contactName
    // req.session.businessName = createdProfile.businessName
    // req.session.location = createdProfile.location
    // req.session.industry = createdProfile.industry
    // req.session.areYouDeveloper = createdProfile.areYouDeveloper
    // req.session.languages = createdProfile.languages
    // req.session.message = `${createdProfile.businessName}`
    console.log(createdProfile);
    req.session.message = `Hello, ${createdProfile} nice profile!`
	  res.redirect('/user/home')
}
	catch(err) {
		next(err)
	}
})

router.get('/home', async (req, res, next) => {
  try {
    const currentUserId = req.session.userId
    // const desiredTitle = req.body.title
    const foundProfile = await Profile.find({ user: currentUserId })
    // const foundPost = await Post.find({ title: desiredTitle })
    // const currentUserId = req.session.userId
    const foundPost = await Post.find({ user: currentUserId })
    // console.log(foundPost);
    // const foundBusinessName = req.body.businessName
    // console.log(`\nthis is rec.session.user`, req.session);
    console.log(`\nthis is found profile`, foundProfile);
    res.render('user/userHome.ejs', {
      profile: foundProfile,
      post: foundPost
    })
    // console.log(req.session.businessName);
  }
  catch(err) {
    next(err)
  }
})





module.exports = router






