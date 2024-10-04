const mongoose = require("mongoose");

const gradeSchema = new mongoose.Schema({
	maxMarks: {
		type: Number,
		required: [true, "Max marks required"],
	},
	gradeScored: {
		type: String,
		required: [true, "Grade Scored required"],
		minLength: [2, "Invalid Grade Scored"],
	},
	student: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Student",
		required: [true, "Student Required"],
	},
	exam:{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Exam",
		required: [true, "Exam ID Required"],
	},
	course:{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Course",
		required: [true, "Course ID Required"],
	},
	marksScored: {
		type: Number,
		required: [true, "Mark scored required"],
	},
	status: {
		type: String,
		required: [true, "Status required"],
		minLength: [4, "Invalid Status"],
	},
	createdAt:{
		type:Date,
		default: new Date(Date.now())
	}
});

const Grade = mongoose.model("Grade", gradeSchema);

module.exports = Grade;
