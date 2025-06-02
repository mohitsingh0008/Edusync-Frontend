import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../services/api";
import { FaBookOpen, FaCheckCircle, FaSpinner, FaTrash } from "react-icons/fa";

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [enrollLoadingId, setEnrollLoadingId] = useState(null);
  const [deletingCourseId, setDeletingCourseId] = useState(null);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const isTokenExpired = (token) => {
      try {
        const decoded = jwtDecode(token);
        return decoded.exp * 1000 < Date.now();
      } catch {
        return true;
      }
    };

    const fetchCoursesAndEnrollments = async () => {
      try {
        const decoded = jwtDecode(token);
        setUserRole(
          decoded.role ||
            decoded[
              "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
            ]
        );

        const courseResponse = await api.get("/courses", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const formattedCourses = courseResponse.data.map((course) => ({
          id: course.courseId,
          title: course.title,
          description: course.description,
          instructorId: course.instructorId,
        }));

        setCourses(formattedCourses);

        if (decoded.role === "Student") {
          const enrolledSet = new Set();
          await Promise.all(
            formattedCourses.map(async (course) => {
              try {
                const res = await api.get(
                  `/enrollments/${userId}/${course.id}`,
                  {
                    headers: { Authorization: `Bearer ${token}` },
                  }
                );
                if (res.data === true) {
                  enrolledSet.add(course.id);
                }
              } catch (err) {
                console.warn(`Enrollment check failed for course ${course.id}`);
              }
            })
          );
          setEnrolledCourses(enrolledSet);
        }
      } catch (err) {
        console.error("Failed to fetch courses:", err);
        setError(err.message || "Failed to load courses");
      } finally {
        setLoading(false);
      }
    };

    if (!token || isTokenExpired(token)) {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      window.location.href = "/login?sessionExpired=true";
    } else {
      fetchCoursesAndEnrollments();
    }
  }, [token, userId]);

  const handleEnroll = async (courseId) => {
    setEnrollLoadingId(courseId);
    try {
      await api.post(
        "/enrollments",
        { userId, courseId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setEnrolledCourses((prev) => new Set(prev).add(courseId));
      alert("Enrollment successful!");
    } catch (err) {
      console.error("Enrollment failed:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Failed to enroll");
    } finally {
      setEnrollLoadingId(null);
    }
  };

  const handleDeleteCourse = async (courseId) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    setDeletingCourseId(courseId);
    try {
      await api.delete(`/courses/${courseId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCourses((prev) => prev.filter((c) => c.id !== courseId));
      alert("Course deleted successfully!");
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete course.");
    } finally {
      setDeletingCourseId(null);
    }
  };

  if (loading)
    return (
      <div className="container mt-4 text-center">
        <FaSpinner className="fa-spin text-primary fs-3" />
        <p>Loading courses...</p>
      </div>
    );

  if (error)
    return (
      <div className="container mt-4 alert alert-danger text-center">
        Error: {error}
      </div>
    );

  if (courses.length === 0)
    return (
      <div className="container mt-4 text-center">
        <h2>Available Courses</h2>
        <p>No courses available at the moment.</p>
      </div>
    );

  return (
    <div className="container mt-5">
      <div className="text-center mb-4">
        <h2 className="fw-bold">Available Courses</h2>
        <p className="text-muted">
          {userRole === "Instructor"
            ? "Manage your uploaded courses."
            : "Choose a course and get started with your learning!"}
        </p>
      </div>

      <div className="row g-4">
        {courses.map((course) => (
          <div className="col-md-6 col-lg-4" key={course.id}>
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title text-primary">
                  <FaBookOpen className="me-2" />
                  {course.title}
                </h5>
                <p className="card-text text-muted">{course.description}</p>

                <div className="mt-auto">
                  {userRole === "Instructor" ? (
                    <button
                      className="btn btn-danger w-100"
                      onClick={() => handleDeleteCourse(course.id)}
                      disabled={deletingCourseId === course.id}
                    >
                      {deletingCourseId === course.id ? (
                        <>
                          <FaSpinner className="fa-spin me-2" />
                          Deleting...
                        </>
                      ) : (
                        <>
                          <FaTrash className="me-2" />
                          Delete Course
                        </>
                      )}
                    </button>
                  ) : enrolledCourses.has(course.id) ? (
                    <button
                      className="btn btn-outline-primary w-100"
                      onClick={() => navigate(`/quiz/${course.id}`)}
                    >
                      <FaCheckCircle className="me-2" />
                      Attempt Quiz
                    </button>
                  ) : (
                    <button
                      className="btn btn-primary w-100"
                      disabled={enrollLoadingId === course.id}
                      onClick={() => handleEnroll(course.id)}
                    >
                      {enrollLoadingId === course.id ? (
                        <>
                          <FaSpinner className="fa-spin me-2" />
                          Enrolling...
                        </>
                      ) : (
                        "Enroll"
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseList;
