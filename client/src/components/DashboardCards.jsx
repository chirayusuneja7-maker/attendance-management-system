function DashboardCards({ attendance }) {
  const total = attendance.length;
  const present = attendance.filter(a => a.status === "Present").length;
  const absent = attendance.filter(a => a.status === "Absent").length;

  return (
    <div className="row mb-4">
      <div className="col-md-4">
        <div className="card text-center p-3">
          <h5>Total Records</h5>
          <h2>{total}</h2>
        </div>
      </div>

      <div className="col-md-4">
        <div className="card text-center p-3">
          <h5>Present</h5>
          <h2 className="text-success">{present}</h2>
        </div>
      </div>

      <div className="col-md-4">
        <div className="card text-center p-3">
          <h5>Absent</h5>
          <h2 className="text-danger">{absent}</h2>
        </div>
      </div>
    </div>
  );
}

export default DashboardCards;