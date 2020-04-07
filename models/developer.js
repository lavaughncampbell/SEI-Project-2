const mongoose = require('mongoose')

const developerSchema = new mongoose.Schema({
	name: {
		type: String,
	},
	companyName: { //optional (for freelancer or devs with companies)
		type: String,
	},
	location: {
		type: String,
	},
	skill: { // dropdown (with languages)
		type: String,
	},
	experience: { // dropdown with either years of expereince or level (sr. mid, jr. etc.)
		type: String,
	},
	email: {
		type: String,
	},

})


const Developer = mongoose.model('Developer', developerSchema)
module.exports = Developer