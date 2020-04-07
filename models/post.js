const mongoose = require('mongoose')
const postSchema = new mongoose.Schema({
	title: {
		type: String,
		requred: true
	},
	body: { // possible placeholder "what are you looking for? website help/update, etc."
		type: String,
		requred: true
	},
	experience: {
		type: String,
		requred: true
	},
	languages: { // languages the business(user) needs for their posting
		type: String,
		requred: true
	}
	// skills: [{
	// }],
	budget: {
		type: Number,
		requred: true
	},
	business: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'Business'
	}
})
const Post = mongoose.model('Post', postSchema)
module.exports = Post
