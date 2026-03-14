const router = require("express").Router();
const { addLecture, getMyLectures } = require("../controllers/lectureController");

router.post("/", addLecture);
router.get("/:id", getMyLectures);

module.exports = router;