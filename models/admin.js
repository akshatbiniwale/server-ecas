const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Name required"],
	},
	email: {
		type: String,
		required: [true, "Email required"],
	},
	adminId: {
		type: String,
		required: [true, "adminId required"],
		minLength: [10, "Invalid adminId"],
	},
	password: {
		type: String,
		required: [true, "Password required"],
	},
	phoneNumber: {
		type: String,
	},
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
