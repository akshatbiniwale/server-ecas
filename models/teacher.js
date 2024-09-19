const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const teacherSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Name required"],
	},
	email: {
		type: String,
		required: [true, "Email required"],
		unique:[true,"Email already exist"]
	},
	fid: {
		type: String,
		required: [true, "FID required"],
	},
	password: {
		type: String,
		required: [true, "Password required"],
	},
	phoneNumber: {
		type: String,
		maxLenght:[10,"Invalid phone number"]
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
	role:{
		type:String,
		default:"teacher"
	}
});

teacherSchema.pre("save",async function(){
	const hashedPassword = await bcrypt.hash(this.password,10)
	this.password = hashedPassword
})

const Teacher = mongoose.model("Teacher", teacherSchema);

module.exports = Teacher;
