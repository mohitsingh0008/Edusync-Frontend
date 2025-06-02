// // components/Register.js

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const Register = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("Student");
//   const navigate = useNavigate();

//   const handleRegister = async () => {
//     if (!name || !email || !password) {
//       alert("Please fill in all fields.");
//       return;
//     }

//     try {
//       await axios.post("http://localhost:5000/api/auth/register", {
//         name,
//         email,
//         password,
//         role,
//       });
//       navigate("/login");
//     } catch (error) {
//       alert("Registration failed");
//     }
//   };

//   return (
//     <div
//       className="d-flex align-items-center justify-content-center"
//       style={{ minHeight: "100vh" }}
//       //, backgroundColor: "#f8f9fa"
//     >
//       <div
//         className="card shadow p-4"
//         style={{ width: "100%", maxWidth: "400px" }}
//       >
//         <h3 className="text-center mb-4">Register for EduSync</h3>
//         <input
//           type="text"
//           className="form-control mb-3"
//           placeholder="Full Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />
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
//         <select
//           className="form-control mb-3"
//           value={role}
//           onChange={(e) => setRole(e.target.value)}
//         >
//           <option value="Student">Student</option>
//           <option value="Instructor">Instructor</option>
//         </select>
//         <button className="btn btn-success w-100" onClick={handleRegister}>
//           Register
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Register;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Student");
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!name || !email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      // Sending 'passwordHash' to match backend model
      await api.post("/auth/register", {
        name,
        email,
        password, // ✅ Fix: backend expects this
        role,
      });
      alert("Registration successful!");
      navigate("/login");
    } catch (error) {
      alert("Registration failed. Check console for details.");
      console.error(error.response?.data || error.message);
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
        <h3 className="text-center mb-4">Register for EduSync</h3>
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <select
          className="form-control mb-3"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="Student">Student</option>
          <option value="Instructor">Instructor</option>
        </select>
        <button className="btn btn-success w-100" onClick={handleRegister}>
          Register
        </button>
      </div>
    </div>
  );
};

export default Register;
