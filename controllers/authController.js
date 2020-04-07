const express = require('express')
const router = express.Router()



router.get('/join', (req, res) => {
  res.render('auth/join.ejs')
})


module.exports = router
