import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function AttendanceChart({ attendance }) {
  const present = attendance.filter(
    (item) => item.status === "Present"
  ).length;

  const absent = attendance.filter(
    (item) => item.status === "Absent"
  ).length;

  const data = {
    labels: ["Present", "Absent"],
    datasets: [
      {
        data: [present, absent],
        backgroundColor: [
          "#198754",
          "#dc3545",
        ],
      },
    ],
  };

  return (
    <div className="card mt-4 p-4">
      <h3 className="text-center mb-4">
        Attendance Analytics
      </h3>

      <div
        style={{
          width: "350px",
          margin: "auto",
        }}
      >
        <Pie data={data} />
      </div>
    </div>
  );
}

export default AttendanceChart;