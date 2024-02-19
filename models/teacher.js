const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Name required"],
	},
	email: {
		type: String,
		required: [true, "Email required"],
	},
	fid: {
		type: String,
		required: [true, "FID required"],
		minLength: [10, "Invalid FID"],
	},
	password: {
		type: String,
		required: [true, "Password required"],
	},
	phoneNumber: {
		type: String,
	},
	department: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Department",
		required: [true, "Department Required"],
	},
	designation: {
		type: String,
		required: [true, "Designation required"],
	},
	courses: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Course",
		},
	],
});

const Teacher = mongoose.model("Teacher", teacherSchema);

module.exports = Teacher;
