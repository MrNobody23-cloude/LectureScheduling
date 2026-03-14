const db = require("../config/db");

exports.getInstructors = (req, res) => {
    db.query("SELECT * FROM instructors ORDER BY name", (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ msg: "DB error", error: err.message });
        }
        res.json(result);
    });
};