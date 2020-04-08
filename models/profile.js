const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({
  contactName: {
    type: String
    // required: true
  },
  businessName: {
    type: String
  },
  location: {
    type: String // in placeholder -- "enter address"
  },
  industry: {
    type: String,
  },
  posted: {
    type: Date,
    default: Date.now
  },
  areYouDeveloper: {
    type: Boolean,
    required: true
  },
// DEVELOPER MODEL
  languages: {
    type: String
  }
  // skills: [{
  //  languages: String,
  //  type: String,
  // }],
  // experience: {
  //   type: String,
  // },

})

const Profile = mongoose.model('Profile', profileSchema)

module.exports = Profile
