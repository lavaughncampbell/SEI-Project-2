const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
	body: { // devs opportunity to say, "i can do this, i have done this before, cahnce to sell themselves"
		type: String,
	}
})


const Comment = mongoose.model('Comment', commentSchema)
module.exports = Comment