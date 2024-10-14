const mongoose = require("mongoose");

const examHallSchema = new mongoose.Schema({
	hallNumber: {
		type: Number,
		required: [true, "Exam hall number required"],
	},
	capacity:{
		type:Number,
		default:30
	},
	available:{
		type:Boolean,
		default:true
	}
});

const ExamHall = mongoose.model("ExamHall", examHallSchema);

module.exports = ExamHall;
