import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    student_name: "",
    email: "",
    gender: "",
    age: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    fetchStudentDetails();
  }, []);

  const fetchStudentDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/students/getStudentById/${id}`);
      setFormData(response.data);
    } catch (err) {
      setError("Error fetching student details");
      console.error(err.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
console.log(formData);
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/students/updateStudent/${id}`, formData);
      alert("Student updated successfully!");
      navigate("/students");
    } catch (err) {
      setError("Failed to update student");
      console.error(err.message);
    }
  };

  return (
    <div className="container">
      <h2>Update Student</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleFormSubmit}>
        <div className="mb-3">
          <label htmlFor="student_name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="student_name"
            name="student_name"
            value={formData.student_name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="gender" className="form-label">
            Gender
          </label>
          <select
            className="form-select"
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="age" className="form-label">
            Age
          </label>
          <input
            type="number"
            className="form-control"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateStudent;
