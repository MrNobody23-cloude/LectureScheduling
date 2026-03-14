const db = require("../config/db");

exports.addLecture = (req, res) => {

    const { course_id, instructor_id, lecture_date } = req.body;


    if (!course_id || !instructor_id || !lecture_date) {
        return res.status(400).json({
            msg: "All fields required"
        });
    }

    const checkQuery =
        "SELECT id FROM lectures WHERE instructor_id = ? AND lecture_date = ?";


    db.query(
        checkQuery,
        [instructor_id, lecture_date],
        (err, result) => {

            if (err) {
                console.log(err);
                return res.status(500).json({
                    msg: "DB error",
                    error: err.message
                });
            }


            if (result.length > 0) {
                return res.status(400).json({
                    msg: "Instructor already has lecture on this date"
                });
            }


            const insertQuery =
                "INSERT INTO lectures (course_id, instructor_id, lecture_date) VALUES (?, ?, ?)";


            db.query(
                insertQuery,
                [course_id, instructor_id, lecture_date],
                (err, result) => {

                    if (err) {
                        console.log(err);
                        return res.status(500).json({
                            msg: "Insert failed",
                            error: err.message
                        });
                    }

                    return res.status(200).json({
                        msg: "Lecture added successfully",
                        id: result.insertId
                    });

                }
            );
        }
    );
};



exports.getMyLectures = (req, res) => {

    const instructorId = req.params.id;


    if (!instructorId) {
        return res.status(400).json({
            msg: "Instructor id required"
        });
    }


    const query = `
        SELECT 
            lectures.id,
            lectures.lecture_date,
            courses.name AS course_name
        FROM lectures
        JOIN courses 
        ON lectures.course_id = courses.id
        WHERE lectures.instructor_id = ?
        ORDER BY lecture_date
    `;


    db.query(query, [instructorId], (err, result) => {

        if (err) {
            console.log(err);
            return res.status(500).json({
                msg: "DB error",
                error: err.message
            });
        }

        return res.json(result);

    });
};