// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../services/api";
// import { useAuth } from "../context/AuthContext";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();
//   const { login } = useAuth();

//   const handleLogin = async () => {
//     if (!email.trim() || !password.trim()) {
//       alert("Please enter both email and password.");
//       return;
//     }

//     try {
//       const response = await api.post("/auth/login", { email, password });
//       const { token, role, userId, name } = response.data;

//       if (!token || !role || !userId) {
//         alert("Login response is missing essential data.");
//         return;
//       }

//       login(token, role.toLowerCase());
//       localStorage.setItem("userId", userId);
//       localStorage.setItem("name", name);

//       navigate("/dashboard");
//     } catch (error) {
//       console.error("Login error:", error);
//       alert("Login failed. Please try again.");
//     }
//   };

//   return (
//     <div
//       className="d-flex align-items-center justify-content-center"
//       style={{ minHeight: "100vh" }}
//     >
//       <div
//         className="card shadow p-4"
//         style={{ width: "100%", maxWidth: "400px" }}
//       >
//         <h3 className="text-center mb-4">EduSync Login</h3>

//         <input
//           type="email"
//           className="form-control mb-3"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <input
//           type="password"
//           className="form-control mb-3"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <button className="btn btn-primary w-100" onClick={handleLogin}>
//           Login
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      alert("Please enter both email and password.");
      return;
    }

    try {
      const response = await api.post("/auth/login", { email, password });
      const { token, role, userId, name } = response.data;

      if (!token || !role || !userId) {
        alert("Login response is missing essential data.");
        return;
      }

      // Save authentication data
      login(token, role.toLowerCase());
      localStorage.setItem("userId", userId);
      localStorage.setItem("name", name);
      localStorage.setItem("role", role); // Store role for use in Results, Dashboards, etc.

      // Navigate to role-specific dashboard if you want
      if (role.toLowerCase() === "instructor") {
        navigate("/instructor-dashboard");
      } else {
        navigate("/student-dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div
        className="card shadow p-4"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <h3 className="text-center mb-4">EduSync Login</h3>

        <input
          type="email"
          className="form-control mb-3"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-primary w-100" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
