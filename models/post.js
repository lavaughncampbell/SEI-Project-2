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
		type: String,
		requred: true
	},
	description: {
		type: String,
	},
	user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    // required: true // profiles must have a user
	}
	// need to get that back to required


})
const Post = mongoose.model('Post', postSchema)
module.exports = Post
