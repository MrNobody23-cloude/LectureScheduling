const db = require("../config/db");

exports.addCourse = (req, res) => {
    const { name, level, description, image } = req.body;

    if (!name || !level || !description) {
        return res.status(400).json({ msg: "name, level and description are required" });
    }

    db.query(
        "INSERT INTO courses (name, level, description, image) VALUES (?, ?, ?, ?)",
        [name, level, description, image || ""],
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ msg: "DB error", error: err.message });
            }
            res.status(201).json({ msg: "Course added", id: result.insertId });
        }
    );
};

exports.getCourses = (req, res) => {
    db.query("SELECT * FROM courses ORDER BY id DESC", (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ msg: "DB error", error: err.message });
        }
        res.json(result);
    });
};