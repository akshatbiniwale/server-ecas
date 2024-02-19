const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
const adminRoutes = require("./routes/adminRoutes");
const studentRoutes = require("./routes/studentRoutes");
const teacherRoutes = require("./routes/teacherRoutes");

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
	res.send("Server is running...");
});

// app.use("/api/admin", adminRoutes);
// app.use("/api/student", studentRoutes);
// app.use("/api/teacher", teacherRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
	console.log("Server is up and listening on port " + PORT);
});
