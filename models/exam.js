const mongoose = require("mongoose");

const examSchema = new mongoose.Schema({
	examId: {
		type: String,
	},
	hallId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "ExamHall",
	},
	exam_type: {
		type: String,
		required: [true, "Exam type required"],
		minLength: [3, "Invalid Exam type"],
	},
	course: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Course",
	},
	date: {
		type: Date,
		required: [true, "Date type required"],
	},
	weightage: {
		type: Number,
	},
});

const Exam = mongoose.model("Exam", examSchema);

module.exports = Exam;
