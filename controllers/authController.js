const express = require('express')
const router = express.Router()



router.get('/join', (req, res) => {
  res.render('auth/join.ejs')
})

router.get('/login', (req, res) => {
  res.render('auth/login.ejs')
})

module.exports = router
