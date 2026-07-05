const express = require("express");
const router = express.Router();

const {
    markAttendance,
    getMyAttendance,
    getAllAttendance,
    getAttendanceBySubject,
    updateAttendance,
    deleteAttendance,
} = require("../controllers/attendanceController");

const protect = require("../middleware/authMiddleware");

router.post("/mark", protect, markAttendance);
router.get("/my", protect, getMyAttendance);
router.get("/all", protect, getAllAttendance);
router.get("/subject/:subject", protect, getAttendanceBySubject);
router.put("/update/:id", protect, updateAttendance);
router.delete("/delete/:id", protect, deleteAttendance);

module.exports = router;