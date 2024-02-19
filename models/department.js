const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Name required"],
	},
	hod: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Teacher",
	},
});

const Department = mongoose.model("Department",departmentSchema)

module.exports = Department
