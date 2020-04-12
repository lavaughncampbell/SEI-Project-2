const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Profile = require('../models/profile')
const Post = require('../models/post')

// <-------------------------------------> //

// Post
router.get('/newOffer', async (req, res, next) => {
  try {
    res.redirect('/user/allJobs')
  }
  catch(err) {
    next(err)
  }
})










 module.exports = router