import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchStudents();
  }, [page]);

  const fetchStudents = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/students/getAlllStudents?page=${page}&limit=10`);
      setStudents(res.data.students);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.error("Error fetching students:", error.message);
    }
  };

  const deleteStudent = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;

    try {
      await axios.delete(`http://localhost:5000/students/deleteStudent/${id}`);
      setStudents((prev) => prev.filter((student) => student.student_id !== id));
      alert("Student deleted successfully.");
    } catch (error) {
      console.error("Error deleting student:", error.message);
      alert("Failed to delete student.");
    }
  };

  return (
    <div>
      <Link to="/add-student" className="btn btn-primary mb-3">
        Add New Student
      </Link>
      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.student_id}>
              <td>{student.student_id}</td>
              <td>{student.student_name}</td>
              <td>{student.email}</td>
              <td>
                <Link to={`/student/${student.student_id}`} className="btn btn-info btn-sm me-2">
                  View
                </Link>
                <Link to={`/update-student/${student.student_id}`} className="btn btn-warning btn-sm me-2">
                  Update
                </Link>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteStudent(student.student_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="d-flex justify-content-between">
        <button
          className="btn btn-secondary"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>Page {page} of {totalPages}</span>
        <button
          className="btn btn-secondary"
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default StudentList;
