const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Profile = require('../models/profile')
const Post = require('../models/post')

// <-------------------------------------> //

// PROFILE ROUTE //

  // Profile form
router.get('/jobPost', async (req, res, next) => {
  try {
    res.render('post/jobPost.ejs')
  }
  catch(err) {
    next(err)
  }
})

router.post('/jobPost', async (req, res, next) => {
	try {

		const postTitle = req.body.title
		const postExperience = req.body.experience
		const postBudget = req.body.budget
		const postDescription = req.body.description
		const postToCreate = await Post.create({
			title: postTitle,
			experience: postExperience,
			budget: postBudget,
			description: postDescription
			// need to put usedId to attach to user
		})
		req.session.title = postToCreate.title
		req.session.message = `${postTitle} successfully added post title`
		res.redirect('/user/userHome.ejs')
	} 
	catch(err) {
		next(err)
	}
})




module.exports = router
