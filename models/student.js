const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Name required"],
	},
	email: {
		type: String,
		required: [true, "Email required"],
	},
	uid: {
		type: String,
		required: [true, "UID required"],
		minLength: [10, "Invalid UID"],
	},
	division: {
		type: String,
		required: [true, "Division required"],
		minLength: [1, "Invalid Division"],
	},
	password: {
		type: String,
		required: [true, "Password required"],
	},
	phoneNumber: {
		type: String,
	},
	semester: {
		type: Number,
	},
	department: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Department",
		required: [true, "Department Required"],
	},
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
