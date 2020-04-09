const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Profile = require('../models/profile')
const POST = require('../models/post')

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




module.exports = router
