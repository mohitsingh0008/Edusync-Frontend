import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import StudentDashboard from "./components/StudentDashboard";
import InstructorDashboard from "./components/InstructorDashboard";
import CourseList from "./components/CourseList";
import UploadCourse from "./components/UploadCourse";
import QuizAttempt from "./components/QuizAttempt";
import Results from "./components/Results";
import Analytics from "./components/Analytics";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import { useAuth } from "./context/AuthContext";
import MyEnrollments from "./components/MyEnrollments";
//import SubmitResult from "./components/SubmitResult"; // ✅ New import

function App() {
  const { auth } = useAuth();

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            auth.isAuthenticated ? (
              auth.role === "instructor" ? (
                <InstructorDashboard />
              ) : (
                <StudentDashboard />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/enrollments"
          element={
            auth.isAuthenticated && auth.role === "student" ? (
              <MyEnrollments />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/student-dashboard"
          element={
            auth.isAuthenticated && auth.role === "student" ? (
              <StudentDashboard />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/instructor-dashboard"
          element={
            auth.isAuthenticated && auth.role === "instructor" ? (
              <InstructorDashboard />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route path="/courses" element={<CourseList />} />
        <Route path="/upload" element={<UploadCourse />} />

        <Route
          path="/take-quiz/:CourseId"
          element={
            auth.isAuthenticated && auth.role === "student" ? (
              <QuizAttempt />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route path="/results" element={<Results />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
    </Router>
  );
}

export default App;
