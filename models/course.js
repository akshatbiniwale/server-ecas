const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
	name:{
		type: String,
		required: [true, "Name required"],
	},
	// courseId:{
	// 	type: String,
	// 	required: [true, "CourseId required"],
	// 	minLength: [9, "Invalid CourseId"],
	// 	maxLength: [12, "Invalid CourseId"],
	// },
	code:{
		type: String,
		required: [true, "CourseCode required"],
		minLength: [5, "Invalid CourseCode"],
	},
	semester:{
		type: Number,
		required: [true, "Semester required"],
	},
	credit:{
		type: Number,
		required: [true, "Credit required"],
	},
	faculty: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Teacher",
		},
	],
	department: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Department",
		required: [true, "Department Required"],
	},
	createdAt:{
		type:Date,
		default:new Date(Date.now())
	}
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
