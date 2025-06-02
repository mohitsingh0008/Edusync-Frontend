// import React from "react";
// import { useNavigate } from "react-router-dom";

// const InstructorDashboard = () => {
//   const navigate = useNavigate();
//   const name = localStorage.getItem("name") || "Instructor";

//   return (
//     <div className="container mt-4">
//       <h2>Welcome, {name} 👩‍🏫</h2>
//       <p>This is your instructor dashboard. What would you like to manage?</p>

//       <button
//         className="btn btn-primary m-2"
//         onClick={() => navigate("/upload")}
//       >
//         Upload New Course
//       </button>

//       <button className="btn btn-info m-2" onClick={() => navigate("/results")}>
//         View Student Results
//       </button>
//     </div>
//   );
// };

// export default InstructorDashboard;

import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUpload, FaUserGraduate } from "react-icons/fa";

const InstructorDashboard = () => {
  const navigate = useNavigate();
  const name = localStorage.getItem("name") || "Instructor";

  const actions = [
    {
      label: "Upload New Course",
      icon: <FaUpload size={24} />,
      className: "btn-primary",
      onClick: () => navigate("/upload"),
    },
    {
      label: "View Student Results",
      icon: <FaUserGraduate size={24} />,
      className: "btn-info",
      onClick: () => navigate("/results"),
    },
  ];

  return (
    <div className="container mt-5">
      <div className="text-center mb-5">
        <h2 className="fw-bold">Welcome, {name} 👩‍🏫</h2>
        <p className="text-muted">
          Manage your courses and monitor student progress
        </p>
      </div>

      <div className="row justify-content-center g-4">
        {actions.map((action, index) => (
          <div className="col-md-4" key={index}>
            <div className="card shadow-sm h-100 text-center border-0">
              <div className="card-body">
                <div className="mb-3 text-primary">{action.icon}</div>
                <h5 className="card-title mb-3">{action.label}</h5>
                <button
                  className={`btn ${action.className} w-100`}
                  onClick={action.onClick}
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

export default InstructorDashboard;
