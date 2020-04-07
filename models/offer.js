const mongoose = require('mongoose')

const offerSchema = new mongoose.Schema({
	amount: { // devs opportunity to say, "i can do this, i have done this before, cahnce to sell themselves"
		type: Number
	},
	name: {
		type: String
	}
})


const Offer = mongoose.model('Offer', offerSchema)
module.exports = Offer