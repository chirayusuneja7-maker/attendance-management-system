import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Swal from "sweetalert2";
import { Spinner } from "react-bootstrap";
import { exportAttendance } from "../utils/exportExcel";
import Navbar from "../components/Navbar";
import DashboardCards from "../components/DashboardCards";
import AttendanceForm from "../components/AttendanceForm";
import AttendanceTable from "../components/AttendanceTable";
import SearchFilter from "../components/SearchFilter";
import { toast } from "react-toastify";
import AttendanceChart from "../components/AttendanceChart";

function Dashboard() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const [attendance, setAttendance] = useState([]);
  const [filteredAttendance, setFilteredAttendance] = useState([]);
  const [loading, setLoading] = useState(false);

  const [subject, setSubject] = useState("");
  const [status, setStatus] = useState("Present");

  const [showModal, setShowModal] = useState(false);
  const [selectedAttendance, setSelectedAttendance] = useState(null);
  const [newStatus, setNewStatus] = useState("");

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }

    fetchAttendance();
  }, []);

  useEffect(() => {
    let data = [...attendance];

    if (search.trim() !== "") {
      data = data.filter((item) =>
        item.subject.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (filter !== "All") {
      data = data.filter((item) => item.status === filter);
    }

    setFilteredAttendance(data);
  }, [attendance, search, filter]);

  const fetchAttendance = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    try {
      const res = await api.get("/attendance/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAttendance(res.data.attendance || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const addAttendance = async (e) => {
    e.preventDefault();

    try {
      await api.post(
        "/attendance/mark",
        {
          subject,
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setSubject("");
      setStatus("Present");

      fetchAttendance();
      toast.success("Attendance marked successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Unable to mark attendance");
    }
  };

  // Old prompt edit (not used anymore)

  const deleteAttendance = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This attendance record will be deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      await api.delete(`/attendance/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchAttendance();

      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Attendance deleted successfully.",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Delete Failed",
        text: err.response?.data?.message || "Something went wrong.",
      });
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const openEditModal = (attendance) => {
    setSelectedAttendance(attendance);
    setNewStatus(attendance.status);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedAttendance(null);
  };

  const saveAttendance = async () => {
    try {
      await api.put(
        `/attendance/update/${selectedAttendance._id}`,
        {
          status: newStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      fetchAttendance();
      toast.success("Attendance updated successfully!");
      closeModal();
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="container mt-4">
      {loading ? (
        <div className="text-center mt-5">
          <Spinner animation="border" variant="primary" />
          <h5 className="mt-3">Loading Attendance...</h5>
        </div>
      ) : (
        <>
          <Navbar logout={logout} />

          <DashboardCards attendance={attendance} />

          <AttendanceForm
            subject={subject}
            setSubject={setSubject}
            status={status}
            setStatus={setStatus}
            addAttendance={addAttendance}
          />

          <SearchFilter
            search={search}
            setSearch={setSearch}
            filter={filter}
            setFilter={setFilter}
          />
          <div className="text-end mb-3">
            <button
              className="btn btn-success"
              onClick={() => exportAttendance(filteredAttendance)}
            >
              Export to Excel
            </button>
          </div>
          <AttendanceChart attendance={attendance} />

          <AttendanceTable
            attendance={filteredAttendance}
            editAttendance={openEditModal}
            deleteAttendance={deleteAttendance}
          />

          {showModal && (
            <div
              className="modal fade show"
              style={{
                display: "block",
                backgroundColor: "rgba(0,0,0,0.5)",
              }}
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Edit Attendance</h5>

                    <button
                      type="button"
                      className="btn-close"
                      onClick={closeModal}
                    ></button>
                  </div>

                  <div className="modal-body">
                    <label className="form-label">Attendance Status</label>

                    <select
                      className="form-select"
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value)}
                    >
                      <option value="Present">Present</option>
                      <option value="Absent">Absent</option>
                    </select>
                  </div>

                  <div className="modal-footer">
                    <button className="btn btn-secondary" onClick={closeModal}>
                      Cancel
                    </button>

                    <button
                      className="btn btn-success"
                      onClick={saveAttendance}
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
export default Dashboard;
