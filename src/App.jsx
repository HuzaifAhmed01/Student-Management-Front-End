import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StudentList from "./components/studentList/StudentList";
import StudentDetails from "./components/studentDetails/StudentDetails";
import AddStudentForm from "./components/addStudentForm/AddStudentForm";
import 'bootstrap/dist/css/bootstrap.min.css';
import UpdateStudent from "./components/updateStudent/UpdateStudent";


const App = () => {
  return (
    <Router>
      <div className="container mt-4">
        <h1 className="text-center">Student Management System</h1>
        <Routes>
          <Route path="/" element={<StudentList />} />
          <Route path="/student/:id" element={<StudentDetails />} />
          <Route path="/add-student" element={<AddStudentForm />} />
          <Route path="/update-student/:id" element={<UpdateStudent/>}/>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
