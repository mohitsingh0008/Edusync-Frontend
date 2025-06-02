// import React, { useEffect, useState } from "react";
// import api from "../services/api";

// const Results = () => {
//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const userId = localStorage.getItem("userId");
//   const role = localStorage.getItem("role");

//   useEffect(() => {
//     const fetchResults = async () => {
//       try {
//         const endpoint =
//           role === "Instructor" ? "/results/all" : `/results/user/${userId}`;
//         const res = await api.get(endpoint);
//         setResults(res.data);
//       } catch (error) {
//         alert("Failed to load results");
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchResults();
//   }, [userId, role]);

//   if (loading) return <div className="container mt-4">Loading results...</div>;

//   return (
//     <div className="container mt-4">
//       <h2>Assessment Results</h2>
//       {results.length === 0 ? (
//         <p>
//           {role === "Instructor"
//             ? "No results submitted yet."
//             : "You have not attempted any assessments yet."}
//         </p>
//       ) : (
//         <table className="table table-striped table-bordered">
//           <thead className="thead-dark">
//             <tr>
//               {role === "Instructor" && <th>Student Name</th>}
//               <th>Course</th>
//               <th>Assessment</th>
//               <th>Score</th>
//               <th>Date</th>
//             </tr>
//           </thead>
//           <tbody>
//             {results.map((result) => (
//               <tr key={result.resultId}>
//                 {role === "Instructor" && <td>{result.studentName}</td>}
//                 <td>{result.courseTitle}</td>
//                 <td>{result.assessmentTitle}</td>
//                 <td>
//                   {result.score} / {result.maxScore}
//                 </td>
//                 <td>{new Date(result.attemptDate).toLocaleString()}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default Results;

import React, { useEffect, useState } from "react";
import api from "../services/api";

const Results = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem("userId");
  const role = localStorage.getItem("role");

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const endpoint =
          role === "Instructor" ? "/results/all" : `/results/user/${userId}`;
        const res = await api.get(endpoint);
        setResults(res.data);
      } catch (error) {
        alert("Failed to load results");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [userId, role]);

  if (loading) return <div className="container mt-4">Loading results...</div>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Assessment Results</h2>
      {results.length === 0 ? (
        <p>
          {role === "Instructor"
            ? "No results submitted yet."
            : "You have not attempted any assessments yet."}
        </p>
      ) : (
        <table className="table table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              {role === "Instructor" && <th>Student Name</th>}
              <th>Course</th>
              <th>Score</th>
              {role === "Student" && <th>Total Marks</th>}
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result) => (
              <tr key={result.resultId}>
                {role === "Instructor" && <td>{result.studentName}</td>}
                <td>{result.courseTitle}</td>
                <td>{result.score}</td>
                {role === "Student" && <td>{result.maxScore}</td>}
                <td>{new Date(result.attemptDate).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Results;
