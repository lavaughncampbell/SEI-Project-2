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

// SHOW PAGE
router.get('/jobPost/:id', async (req, res, next) => {
  try {
  	const currentUserId = req.session.userId
    // const postTitle = req.body.title
    const showPost = await Post.findById(req.params.id)
      // .populate('user')
      // .populate('comments.user')
    console.log(`\nthis is show post`, showPost);
    res.render('post/show.ejs', {
      post: showPost,
      indexOfPostToDelete: req.params.id
      // userId: req.session.userId
    })
  } catch(err) {
    next(err)
  }
})

// EDIT PAGE
router.get('/jobPost/:id/edit', async (req, res, next) => {
  try {
    const currentUserId = req.session.userId
    const postToEdit = await Post.findById(req.params.id)
    // console.log(`\nthis is post we want to edit`, postToEdit);

    res.render('post/edit.ejs', {
    	post: postToEdit,
    	indexOfPostToEdit: req.params.id
    })
  }
  catch(err) {
    next(err)
  }
})


// UPDATE ROUTE //

router.put('/jobPost/:id', async (req, res, next) => {
  try {
  	const currentUserId = req.session.userId
  	const postToUpdate = await Post.findByIdAndUpdate(
  		req.params.id, {
        title: req.body.title,
        experience: req.body.experience,
        budget: req.body.budget,
        description: req.body.description
      })
      // {new: true }
    console.log(postToUpdate);
  	res.redirect('/user/home')
    // const foundJobPost = await Post.findById(req.params.id)
    // const foundJobs = await User.findById({})
  }
  catch(err) {
    next(err)
  }
})

// DELETE ROUTE
// author destroy route: DELETE /authors/:id
router.delete('/jobPost/:id', async (req, res, next) => {
  try {
    await Post.findByIdAndRemove(req.params.id)

    res.redirect('/user/home')
  } catch(err) {
    next(err)
  }

})





module.exports = router




