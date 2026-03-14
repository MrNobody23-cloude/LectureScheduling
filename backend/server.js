require("dotenv").config();
const express = require("express");
const cors = require("cors");

const courseRoutes = require("./routes/courseRoutes");
const lectureRoutes = require("./routes/lectureRoutes");
const instructorRoutes = require("./routes/instructorRoutes");

const app = express();

const db = require("./config/db");

app.use(cors());
app.use(express.json());

app.get("/api/test", (req, res) => res.json({ status: "ok" }));

app.use("/api/courses", courseRoutes);
app.use("/api/lectures", lectureRoutes);
app.use("/api/instructors", instructorRoutes);

app.post("/api/login", (req, res) => {
    const { username, password } = req.body;

    if (username === "admin" && password === "admin123") {
        return res.json({ token: "admin-token", role: "admin" });
    }

    db.query("SELECT * FROM instructors WHERE name = ? AND password = ?", [username, password], (err, results) => {
        if (err) return res.status(500).json({ msg: "DB error" });
        if (results.length > 0) {
            return res.json({ 
                token: "inst-token", 
                role: "instructor", 
                userId: results[0].id 
            });
        }
        res.status(401).json({ msg: "Invalid credentials" });
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});