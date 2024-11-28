import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const StudentDetails = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    fetchStudent();
  }, []);

  const fetchStudent = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/students/getStudentById/${id}`);
      setStudent(res.data);
      console.log(res.data);
    } catch (error) {
      console.error("Error fetching student details:", error.message);
    }
  };

  if (!student) return <div>Loading...</div>;

  return (
    <div>
      <h3>Student Details</h3>
      <p><strong>Name:</strong> {student.student_name}</p>
      <p><strong>Email:</strong> {student.email}</p>
      <p><strong>Gender:</strong> {student.gender}</p>
      <p><strong>Age:</strong> {student.age}</p>
      <h4>Marks:</h4>
      {student.marks_obtained ? (
        <ul>
         
            <li>
              {student.subject_name}: {student.marks_obtained}
            </li>
         
        </ul>
      ) : (
        <p>No marks available.</p>
      )}
    </div>
  );
};

export default StudentDetails;
