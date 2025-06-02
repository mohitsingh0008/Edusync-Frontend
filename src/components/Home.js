// // components/Home.js

// import React from "react";

// const Home = () => {
//   return (
//     <div
//       style={{
//         //backgroundColor: "#f9f9f9",
//         minHeight: "100vh",
//         padding: "40px 20px",
//       }}
//     >
//       <div className="container text-center">
//         <h1 className="mb-4">
//           Welcome to <span style={{ color: "#007bff" }}>EduSync</span>
//         </h1>
//         <p className="lead mb-5">
//           A Smart Learning Management & Assessment Platform for Students and
//           Instructors.
//         </p>

//         <div className="row">
//           <div className="col-md-4 mb-4">
//             <div className="card h-100 shadow-sm">
//               <div className="card-body">
//                 <h5 className="card-title">📚 Course Management</h5>
//                 <p className="card-text">
//                   Instructors can upload and organize course content. Students
//                   can browse and enroll in available courses.
//                 </p>
//               </div>
//             </div>
//           </div>

//           <div className="col-md-4 mb-4">
//             <div className="card h-100 shadow-sm">
//               <div className="card-body">
//                 <h5 className="card-title">📝 Online Assessments</h5>
//                 <p className="card-text">
//                   Take quizzes online with real-time feedback and automatic
//                   scoring. Track your progress anytime.
//                 </p>
//               </div>
//             </div>
//           </div>

//           <div className="col-md-4 mb-4">
//             <div className="card h-100 shadow-sm">
//               <div className="card-body">
//                 <h5 className="card-title">📊 Analytics & Reports</h5>
//                 <p className="card-text">
//                   Visual dashboards and performance analytics for both students
//                   and instructors using Power BI integration.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="mt-5">
//           <h4>🔐 Please login or register to access EduSync features.</h4>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;

import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userName = localStorage.getItem("userName"); // optional personalization

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px 20px",
        backgroundColor: "#f8f9fa",
      }}
    >
      <div className="container text-center">
        {/* Welcome Header */}
        <div className="mb-5">
          <h1 className="display-4 fw-bold">
            Welcome to <span style={{ color: "#28a745" }}>EduSync</span>
          </h1>
          <p className="lead mt-3">
            {token
              ? `Hello ${
                  userName || "Learner"
                }! Let’s continue your learning journey.`
              : "A Smart Learning Management & Assessment Platform for Students and Instructors."}
          </p>

          {/* Show buttons only if not logged in */}
          {!token ? (
            <>
              <button
                className="btn btn-success btn-lg mt-4 mx-2"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
              <button
                className="btn btn-outline-success btn-lg mt-4 mx-2"
                onClick={() => navigate("/register")}
              >
                Register
              </button>
            </>
          ) : (
            <button
              className="btn btn-success btn-lg mt-4"
              onClick={() => navigate("/dashboard")}
            >
              Go to Dashboard
            </button>
          )}
        </div>

        {/* Features Section */}
        <div className="row">
          <div className="col-md-4 mb-4">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">📚 Course Management</h5>
                <p className="card-text">
                  Instructors can upload, organize, and publish courses.
                  Students can easily browse and enroll.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">📝 Smart Assessments</h5>
                <p className="card-text">
                  Attempt quizzes online with instant feedback. Instructors can
                  build structured tests with auto-grading.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">📊 Performance Insights</h5>
                <p className="card-text">
                  Get personalized reports and analytics to measure progress,
                  skill gaps, and learning trends.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Why EduSync Section */}
        <div className="mt-5">
          <h3 className="mb-3">🚀 Why Choose EduSync?</h3>
          <p>
            Whether you're an instructor managing courses or a student seeking
            knowledge, EduSync gives you the tools to succeed—anytime, anywhere.
          </p>
          <ul className="list-unstyled">
            <li>✅ Responsive design, works on all devices</li>
            <li>✅ Easy-to-use interface with secure access</li>
            <li>✅ Real-time analytics and progress tracking</li>
            <li>✅ Fast and seamless quiz-taking experience</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
