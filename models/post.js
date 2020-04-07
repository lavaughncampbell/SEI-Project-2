const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
	title: {
		type: String,
	},
	body: { // possible placeholder "what are you looking for? website help/update, etc."
		type: String,
	},
	experience: { // dropdown with either
				// years of expereince or level (sr. mid, jr. etc.) -- what dev skill level they're looking for
		type: String,
	},
	budget: {
		type: Number,
	}
})

const Post = mongoose.model('Post', postSchema)
module.exports = Post