const mongoose = require('mongoose')

const offerSchema = new mongoose.Schema({
	name: {
		type: String
	},
	experience: {
		type: String //drop down for entry-level, sr. level, etc.
	},
	amount: { // devs opportunity to say, "i can do this, i have done this before, cahnce to sell themselves"
		type: Number
	},
	description: {
		type: String
	},
	comment: {
		type: mongoose.Schema.Types.ObjecId,
		ref: 'Post'
	}

})


const Offer = mongoose.model('Offer', offerSchema)
module.exports = Offer