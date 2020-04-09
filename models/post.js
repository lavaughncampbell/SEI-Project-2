const mongoose = require('mongoose')
const postSchema = new mongoose.Schema({
	title: {
		type: String,
		requred: true
	},
	experience: {
		type: String,
		requred: true
	},
	budget: {
		type: Number,
		requred: true
	},
	profile: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Profile'
		// required: true,
	}
})
const Post = mongoose.model('Post', postSchema)
module.exports = Post
