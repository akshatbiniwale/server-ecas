const mongoose = require("mongoose");

const examHallSchema = new mongoose.Schema({
	hallNumber: {
		type: Number,
		required: [true, "Exam hall number required"],
	},
	exam: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Exam",
	},
	studentUID: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Student",
			// required: [true, "UIDs Required"],
		},
	],
	invigilatorFID: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Teacher",
		// required: [true, "Please assign Invigilator"],
	},
});

const ExamHall = mongoose.model("ExamHall", examHallSchema);

module.exports = ExamHall;
