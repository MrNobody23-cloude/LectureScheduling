const router = require("express").Router();
const { getInstructors } = require("../controllers/instructorController");

router.get("/", getInstructors);

module.exports = router;