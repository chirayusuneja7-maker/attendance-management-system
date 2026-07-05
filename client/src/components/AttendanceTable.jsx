function AttendanceTable({
  attendance,
  deleteAttendance,
  editAttendance,
}) {
  return (
    <div className="card shadow p-3 mt-4">
      <h3 className="text-center mb-4">Attendance Records</h3>

      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Student</th>
            <th>Email</th>
            <th>Subject</th>
            <th>Status</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {attendance.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center">
                No Attendance Found
              </td>
            </tr>
          ) : (
            attendance.map((item) => (
              <tr key={item._id}>
                <td>{item.student?.name}</td>

                <td>{item.student?.email}</td>

                <td>{item.subject}</td>

                <td>
                  <span
                    className={`badge ${
                      item.status === "Present"
                        ? "bg-success"
                        : "bg-danger"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>

                <td>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => editAttendance(item)}
                  >
                    Edit
                  </button>
                </td>

                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteAttendance(item._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AttendanceTable;