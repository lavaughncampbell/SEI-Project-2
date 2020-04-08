const mongoose = require('mongoose')
const developerSchema = new mongoose.Schema({
	name: {
		type: String,
		// required: true
	},
	email: {
		type: String,
		// required: true
	},
	password: {
		type: String,
		// required: true
	}
	// companyName: {
	// 	type: String
	// },
	// location: {
	// 	type: String
	// },
	// languages: {
	// 	type: String
	// },
	// // skills: [{
	// // 	languages: String,
	// // 	type: String,
	// // }],
	// experience: {
	// 	type: String,
	// },
	// areYouDeveloper: {
	// 	type: Boolean,
	// 	required: true
	// }
})
const Developer = mongoose.model('Developer', developerSchema)
module.exports = Developer
// shortest path is to do sepearate logins for developers and users (businesses/other)
