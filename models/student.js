const mongoose = require("mongoose");
const bcrypt = require("bcrypt")

const studentSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Name required"],
	},
	email: {
		type: String,
		required: [true, "Email required"],
		unique:[true,"Email already exist"]
	},
	uid: {
		type: String,
		required: [true, "UID required"],
	},
	divison: {
		type: String,
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
		default:1
	},
	department: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Department",
		required: [true, "Department Required"],
	},
	courses:[
		{
			type:mongoose.Schema.Types.ObjectId,
			ref:"Course"
		}
	],
	role:{
		type:String,
		default:"student"
	},
	status:{
		type:String,
		default:"active"
	},
	createdAt:{
		type:Date,
		default: new Date(Date.now())
	}
});

studentSchema.pre("save", async function(){
	const hashedPassword = await bcrypt.hash(this.password,10)
	this.password = hashedPassword
})

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
