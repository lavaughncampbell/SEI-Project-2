const mongoose = require('mongoose')
const businessSchema = new mongooose.Schema({
	
	businessName: {
		type: String,
		required: true
	},
	contactName: {
		type: String,
		required: true
	}
	email: {
		type: String,
		required: true
	}
	password: {
		type: String,
		required: true
	}
	location: {
		type: String // in placeholder -- "enter address"
	},
	industry: {
		type: String,
		required: true
	},
	posted: {
		type: Date,
		default: Date.now
	},
	areYouDeveloper: {
		type: Boolean,
		required: true
	}
})
const Business = mongoose.model('Business', businessSchema)
module.exports = Business
