const jwt = require("jsonwebtoken");
const ErrorHandler = require("../services/ErrorHandler");
const jsonwebtoken = require("jsonwebtoken");
const Admin = require("../models/admin");

const authenticate = (req, res, next) => {
	try {
		if (Object.keys(req.cookies).includes("token") === false)
			return next(new ErrorHandler(401, "Please login"));
		const token = req.cookies.token;
		const { id } = jwt.verify(token, process.env.JWT_SECRET);
		req.user = id;
		next();
	} catch (err) {
		next(new ErrorHandler(401, "Failed to authenticate"));
	}
};

const adminAuthGuard = async (req, res, next) => {
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		try {
			const token = req.headers.authorization.split(" ")[1];
			const { id } = jsonwebtoken.verify(token, process.env.JWT_SECRET);
			req.admin = await Admin.findById(id).select("-password");
			next();
		} catch (error) {
			let err = new Error("Not authorized, Token failed!");
			err.statusCode = 401;
			next(err);
		}
	} else {
		let error = new Error("Not authorized, No token");
		error.statusCode = 401;
		next(error);
	}
};

module.exports = { adminAuthGuard, authenticate };
