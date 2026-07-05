function AttendanceForm({
  subject,
  setSubject,
  status,
  setStatus,
  addAttendance,
}) {
  return (
    <div className="card p-4 mb-4">
      <h4 className="mb-3">Mark Attendance</h4>

      <form onSubmit={addAttendance}>
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Enter Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />

        <select
          className="form-select mb-3"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
        </select>

        <button className="btn btn-success w-100">
          Mark Attendance
        </button>
      </form>
    </div>
  );
}

export default AttendanceForm;