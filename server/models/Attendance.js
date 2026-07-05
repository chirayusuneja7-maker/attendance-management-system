const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    subject: {
        type: String,
        required: true,
    },

    status: {
        type: String,
        enum: ["Present", "Absent"],
        required: true,
    },

    date: {
        type: Date,
        default: Date.now,
    },
});

const Attendance = mongoose.model("Attendance", attendanceSchema);

module.exports = Attendance;