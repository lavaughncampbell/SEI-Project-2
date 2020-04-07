const mongoose = require('mongoose')
const offerSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	experience: {
		type: String,
		required: true
	},
	amount: {
		type: Number,
		required: true
	},
	description: {
		type: String,
		required: true
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
	developer: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Developer',
		required: true
	}
})
const Offer = mongoose.model('Offer', offerSchema)
module.exports = Offer
