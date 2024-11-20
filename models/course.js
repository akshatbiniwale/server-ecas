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
	category:{
		type:String,
		default:"Core"
	}
	,
	credits:{
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
	theory:{
		ise1:{
			weightage:{
				type:Number,
				default:0.5
			},
			marks:{
				type:Number,
				default:20
			}
		},
		ise2:{
			weightage:{
				type:Number,
				default:0.5
			},
			marks:{
				type:Number,
				default:20
			}
		},
		mse:{
			weightage:{
				type:Number,
				default:0.2
			},
			marks:{
				type:Number,
				default:30
			}
		},
		ese:{
			weightage:{
				type:Number,
				default:0.7
			},
			marks:{
				type:Number,
				default:100
			}
		}
	},
	createdAt:{
		type:Date,
		default:new Date(Date.now())
	}
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
