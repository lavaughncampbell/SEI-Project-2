const mongoose = require('mongoose')

const businessSchema = new mongooose.Schema({

	businessName: { // business name OR contact at the business name
		type: String,
	},
	contactName: {
		type: String,
	}
	location: { // not sure the type
		type: String,
	},
	industry: { // drop down with categories (business types)
		type: String,
	},
	posted: {
		type: Date,
		default: Date.now
	},
	need: { // what they're looking for from dev job seekers
		type: String, 
	},
	email: {
		type: String,
	}

})

const Business = mongoose.model('Business', businessSchema)
module.exports = Business