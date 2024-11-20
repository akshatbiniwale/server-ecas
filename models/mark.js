const mongoose = require("mongoose");

const markSchema = new mongoose.Schema({
	student: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Student",
		required: [true, "Student Required"],
	},
	// exam:{
	// 	type: mongoose.Schema.Types.ObjectId,
	// 	ref: "Exam",
	// 	required: [true, "Exam ID Required"],
	// },
	course:{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Course",
		required: [true, "Course ID Required"],
	},
	ise1:{
		type:Number,
		default:0
	},
	ise2:{
		type:Number,
		default:0
	},
	mse:{
		type:Number
	},
	ese:{
		type:Number
	},
	// status: {
	// 	type: String,
	// 	required: [true, "Status required"],
	// 	minLength: [4, "Invalid Status"],
	// },
	createdAt:{
		type:Date,
		default: new Date(Date.now())
	}
});

const Mark = mongoose.model("Mark", markSchema);

module.exports = Mark;
