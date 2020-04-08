const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Profile = require('../models/profile')

// <-------------------------------------> //

// PROFILE ROUTE //

  // Profile form
router.get('/profile', async (req, res, next) => {
  try {
    res.render('users/new.ejs')
  }
  catch(err) {
    next(err)
  }
})

router.post('/profile', async (req, res, next) => { 
	try {
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
			languages: desiredLanguages
		})
	} 
	catch(err) {
		next(err)
	}
})



module.exports = router
