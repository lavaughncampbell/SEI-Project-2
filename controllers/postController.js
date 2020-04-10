const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Profile = require('../models/profile')
const Post = require('../models/post')

// <-------------------------------------> //

// PROFILE ROUTE //

  // Post form
router.get('/jobPost', async (req, res, next) => {
  try {
    res.render('post/jobPost.ejs')
  }
  catch(err) {
    next(err)
  }
})

// Post Create
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
			description: postDescription,
      user: req.session.userId
			// need to put usedId to attach to user
		})
		req.session.title = postToCreate.title
		req.session.experience = postToCreate.experience
		req.session.budget = postToCreate.budget
		req.session.description = postToCreate.description
		console.log(postToCreate);
		req.session.message = `${postToCreate} successfully added post`
		res.redirect('/user/home')
	}
	catch(err) {
		next(err)
	}
})

router.get('/test', async (req, res, next) => {
  try {
    const currentUserId = req.session.userId
    const foundPost = await Post.find({ user: currentUserId })
    console.log(`\nthis is found post`, foundPost);
    res.render('post/test.ejs', {foundPost}
      )
  }
  catch(err) {
    next(err)
  }
})


// UPDATE ROUTE //
router.get('/jobPost/:id/edit', async (req, res, next) => {
  try {
    // const foundJobPost = await Post.findById(req.params.id)
    // const foundJobs = await User.findById({})
    res.send('hello')
  }
  catch(err) {
    next(err)
  }
})



module.exports = router




