// import React from "react";
// import { useNavigate } from "react-router-dom";

// const StudentDashboard = () => {
//   const navigate = useNavigate();
//   const name = localStorage.getItem("name") || "Student";

//   return (
//     <div className="container mt-4">
//       <h2>Welcome, {name} 👨‍🎓</h2>
//       <p>This is your student dashboard. What would you like to do?</p>

//       <div className="d-flex flex-wrap gap-3">
//         <button
//           className="btn btn-success"
//           onClick={() => navigate("/courses")}
//         >
//           Browse Courses
//         </button>

//         <button className="btn btn-info" onClick={() => navigate("/results")}>
//           My Results
//         </button>

//         <button
//           className="btn btn-primary"
//           onClick={() => navigate("/enrollments")}
//         >
//           My Enrollments
//         </button>
//       </div>
//     </div>
//   );
// };

// export default StudentDashboard;

import React from "react";
import { useNavigate } from "react-router-dom";
import { FaBook, FaChartBar, FaClipboardList } from "react-icons/fa";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const name = localStorage.getItem("name") || "Student";

  const dashboardOptions = [
    {
      label: "Browse Courses",
      icon: <FaBook size={24} />,
      action: () => navigate("/courses"),
      className: "btn-success",
    },
    {
      label: "My Results",
      icon: <FaChartBar size={24} />,
      action: () => navigate("/results"),
      className: "btn-info",
    },
    {
      label: "My Enrollments",
      icon: <FaClipboardList size={24} />,
      action: () => navigate("/enrollments"),
      className: "btn-primary",
    },
  ];

  return (
    <div className="container mt-5">
      <div className="text-center mb-5">
        <h2 className="fw-bold">Welcome, {name} 👨‍🎓</h2>
        <p className="text-muted">Explore your learning tools and progress</p>
      </div>

      <div className="row justify-content-center g-4">
        {dashboardOptions.map((option, idx) => (
          <div className="col-md-4" key={idx}>
            <div className="card shadow-sm h-100 text-center border-0">
              <div className="card-body">
                <div className="mb-3 text-primary">{option.icon}</div>
                <h5 className="card-title mb-3">{option.label}</h5>
                <button
                  className={`btn ${option.className} w-100`}
                  onClick={option.action}
                >
                  Go
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentDashboard;
