const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();


const adminSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Name required"],
		},
		email: {
			type: String,
			required: [true, "Email required"],
		},
		id: {
			type: String,
			required: [true, "ID required"],
			minLength: [4, "Invalid ID"],
		},
		password: {
			type: String,
			required: [true, "Password required"],
		},
		phoneNumber: {
			type: String,
		},
	},
	{ timestamps: true }
);

adminSchema.pre("save", async function (next) {
	if (this.isModified("password")) {
		this.password = await bcryptjs.hash(this.password, 10);
	}
	next();
});

adminSchema.methods.generateJWT = function () {
	return jsonwebtoken.sign({ id: this._id }, process.env.JWT_SECRET, {
		expiresIn: "1h",
	});
};

adminSchema.methods.comparePassword = async function (enteredPass) {
	return await bcryptjs.compare(enteredPass, this.password);
};

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
