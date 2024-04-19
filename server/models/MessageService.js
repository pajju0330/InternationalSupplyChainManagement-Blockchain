const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
	message: {
		type: String,
		required: true,
	},
	sender: {
		type: String,
		required: true,
	},
	receiver: {
		type: String,
		required: true,
	},
	Date: {
		type: Date,
		default: Date.now,
	},
    MaterialID:{
        type: String,
        required: true
    },
    Quantity:{
        type: Number,
        required: true
    },
	createdAt: {
		type: Date,
		default: Date.now,
	},
	status:{
		type: String,
		default: "unread"
	},
	updatedAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model("message", MessageSchema);
