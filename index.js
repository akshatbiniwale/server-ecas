const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
const connectDB = require("./services/database")
const throwError = require("./services/throwError")
const cookieParser = require("cookie-parser")

//Routes
const adminRoutes = require("./routes/adminRoutes");
const studentRoutes = require("./routes/studentRoutes");
const teacherRoutes = require("./routes/teacherRoutes");

const app = express();
dotenv.config({path:"./services/.env"});
app.use(express.json())
app.use(cookieParser())
app.use(cors({
	origin:"http://localhost:5173",
	credentials:true
}));

app.get("/", (req, res) => {
	res.send("Server is running...");
});

app.use("/api/admin", adminRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/teacher", teacherRoutes);

app.use(throwError)

const PORT = process.env.PORT;

app.listen(PORT, () => {
	console.log("Server is up and listening on port " + PORT);
	connectDB()
});
