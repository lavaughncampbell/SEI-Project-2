const mongoose = require('mongoose')
const offerSchema = new mongoose.Schema({
	experience: {
		type: String,
		// required: true
	},
	amount: {
		type: Number,
		// required: true
	},
	description: {
		type: String,
		// required: true
	},
	comments: {
		type: String,
	},
	status: {
		type: String,
		enum: ['accepted', 'declined', 'new']
	},
	post: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Post',
		required: true
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
		// required: true
	}
})
const Offer = mongoose.model('Offer', offerSchema)
module.exports = Offer
