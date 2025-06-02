// import React from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom";

// const Navbar = () => {
//   const token = localStorage.getItem("token");
//   const navigate = useNavigate();
//   const location = useLocation();

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("role");
//     navigate("/login");
//   };

//   const isLoginPage = location.pathname === "/login";
//   const isRegisterPage = location.pathname === "/register";

//   return (
//     <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow">
//       <div className="container-fluid">
//         <Link className="navbar-brand" to="/">
//           EduSync
//         </Link>

//         <button
//           className="navbar-toggler"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#navbarNav"
//           aria-controls="navbarNav"
//           aria-expanded="false"
//           aria-label="Toggle navigation"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>

//         <div className="collapse navbar-collapse" id="navbarNav">
//           <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//             {token ? (
//               <>
//                 <li className="nav-item">
//                   <Link className="nav-link" to="/dashboard">
//                     Dashboard
//                   </Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link className="nav-link" to="/courses">
//                     Courses
//                   </Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link className="nav-link" to="/results">
//                     Results
//                   </Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link className="nav-link" to="/analytics">
//                     Analytics
//                   </Link>
//                 </li>
//               </>
//             ) : (
//               <>
//                 {!isLoginPage && (
//                   <li className="nav-item">
//                     <Link className="nav-link" to="/login">
//                       Login
//                     </Link>
//                   </li>
//                 )}
//                 {!isRegisterPage && (
//                   <li className="nav-item">
//                     <Link className="nav-link" to="/register">
//                       Register
//                     </Link>
//                   </li>
//                 )}
//               </>
//             )}
//           </ul>

//           {token && (
//             <button
//               className="btn btn-outline-light btn-sm"
//               onClick={handleLogout}
//             >
//               Logout
//             </button>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const isLoginPage = location.pathname === "/login";
  const isRegisterPage = location.pathname === "/register";

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow">
      <div className="container-fluid">
        <Link className="navbar-brand fs-2 fw-bold" to="/">
          EduSync
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {token && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard">
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/courses">
                    Courses
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/results">
                    Results
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/analytics">
                    Analytics
                  </Link>
                </li>
              </>
            )}
          </ul>

          {/* Right-aligned items */}
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {!token && !isLoginPage && (
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
            )}
            {!token && !isRegisterPage && (
              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  Register
                </Link>
              </li>
            )}
            {token && (
              <li className="nav-item">
                <button
                  className="btn btn-outline-light btn-sm ms-2"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
