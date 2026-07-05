const Attendance = require("../models/Attendance");

// Mark Attendance
const markAttendance = async (req, res) => {
    try {
        const { subject, status } = req.body;

        if (!subject || !status) {
            return res.status(400).json({
                message: "Subject and Status are required",
            });
        }

        const attendance = await Attendance.create({
            student: req.user.id,
            subject,
            status,
        });

        return res.status(201).json({
            success: true,
            message: "Attendance marked successfully",
            attendance,
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

// Get Logged-in User Attendance
const getMyAttendance = async (req, res) => {
    try {

        const attendance = await Attendance.find({
            student: req.user.id,
        });

        return res.status(200).json({
            success: true,
            attendance,
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

// Get All Attendance
const getAllAttendance = async (req, res) => {
    try {

        const attendance = await Attendance.find()
            .populate("student", "name email role");

        return res.status(200).json({
            success: true,
            attendance,
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

// Get Attendance By Subject
const getAttendanceBySubject = async (req, res) => {
    try {

        const attendance = await Attendance.find({
            student: req.user.id,
            subject: req.params.subject,
        });

        return res.status(200).json({
            success: true,
            attendance,
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

// Update Attendance
const updateAttendance = async (req, res) => {
    try {

        const attendance = await Attendance.findById(req.params.id);

        if (!attendance) {
            return res.status(404).json({
                message: "Attendance not found",
            });
        }

        if (attendance.student.toString() !== req.user.id) {
            return res.status(403).json({
                message: "Unauthorized",
            });
        }

        attendance.status = req.body.status || attendance.status;

        await attendance.save();

        return res.status(200).json({
            success: true,
            message: "Attendance updated successfully",
            attendance,
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

// Delete Attendance
const deleteAttendance = async (req, res) => {
    try {

        const attendance = await Attendance.findById(req.params.id);

        if (!attendance) {
            return res.status(404).json({
                message: "Attendance not found",
            });
        }

        if (attendance.student.toString() !== req.user.id) {
            return res.status(403).json({
                message: "Unauthorized",
            });
        }

        await attendance.deleteOne();

        return res.status(200).json({
            success: true,
            message: "Attendance deleted successfully",
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

module.exports = {
    markAttendance,
    getMyAttendance,
    getAllAttendance,
    getAttendanceBySubject,
    updateAttendance,
    deleteAttendance,
};