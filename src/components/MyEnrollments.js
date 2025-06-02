import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MyEnrollments = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [materialsMap, setMaterialsMap] = useState({});
  const [loadingMaterials, setLoadingMaterials] = useState({});

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const res = await axios.get(`api/enrollments/user/${userId}`,
          // `https://localhost:7133/api/enrollments/user/${userId}`
          
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setEnrollments(res.data);
      } catch (err) {
        console.error("Error fetching enrollments:", err);
        setError("Failed to fetch enrollments. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchEnrollments();
  }, [userId, token]);

  const handleUnenroll = async (courseId) => {
    if (!window.confirm("Are you sure you want to unenroll from this course?"))
      return;

    setDeletingId(courseId);
    setError(null);

    try {
      await axios.delete(
        `https://localhost:7133/api/enrollments/${userId}/${courseId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEnrollments((prev) => prev.filter((e) => e.courseId !== courseId));
    } catch (err) {
      console.error("Error unenrolling:", err);
      setError("Failed to unenroll from the course. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  const handleTakeQuiz = (courseId) => {
    navigate(`/take-quiz/${courseId}`);
  };

  const fetchMaterials = async (courseId) => {
    if (materialsMap[courseId]) return; // Already fetched

    setLoadingMaterials((prev) => ({ ...prev, [courseId]: true }));

    try {
      const res = await axios.get(`/api/Materials/course/${courseId}`,
        // `https://localhost:7133/api/Materials/course/${courseId}`
        
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMaterialsMap((prev) => ({ ...prev, [courseId]: res.data }));
    } catch (err) {
      console.error("Error fetching materials:", err);
      alert("Failed to fetch course materials.");
    } finally {
      setLoadingMaterials((prev) => ({ ...prev, [courseId]: false }));
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-primary">🎓 My Enrolled Courses</h2>

      {loading ? (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="mt-2">Loading your courses...</p>
        </div>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : enrollments.length === 0 ? (
        <div className="alert alert-info">
          You have not enrolled in any courses yet.
        </div>
      ) : (
        <div className="row">
          {enrollments.map((course) => (
            <div className="col-md-6 col-lg-4 mb-4" key={course.courseId}>
              <div className="card h-100 shadow-sm">
                <div className="card-body d-flex flex-column justify-content-between">
                  <div>
                    <h5 className="card-title text-dark">{course.title}</h5>
                    <p className="card-text text-muted">{course.description}</p>
                  </div>
                  <div className="mt-3 d-flex justify-content-between">
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => handleTakeQuiz(course.courseId)}
                    >
                      Take Quiz
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleUnenroll(course.courseId)}
                      disabled={deletingId === course.courseId}
                    >
                      {deletingId === course.courseId
                        ? "Unenrolling..."
                        : "Unenroll"}
                    </button>
                  </div>

                  {/* Study Material Section */}
                  <div className="mt-3">
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => fetchMaterials(course.courseId)}
                    >
                      {loadingMaterials[course.courseId]
                        ? "Loading Materials..."
                        : "View Materials"}
                    </button>

                    {materialsMap[course.courseId] && (
                      <ul className="mt-2 list-unstyled">
                        // {materialsMap[course.courseId].map((mat, idx) => (
                        {Array.isArray(materialsMap[course.courseId]) &&
                          materialsMap[course.courseId].map((mat, idx) => (

                          <li key={idx}>
                            <a
                              href={`/api/Materials/download?blobPath=${encodeURIComponent(
                                mat.blobPath
                              )}`}
                              // href={`https://localhost:7133/api/Materials/download?blobPath=${encodeURIComponent(
                              //   mat.blobPath
                              // )}`
                                 
                              className="btn btn-sm btn-outline-success"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              📥 {mat.fileName}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyEnrollments;


