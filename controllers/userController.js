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



module.exports = router
