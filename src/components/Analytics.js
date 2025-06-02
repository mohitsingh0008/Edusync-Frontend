// // components/Analytics.js

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const Analytics = () => {
//   const [analyticsData, setAnalyticsData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchAnalytics = async () => {
//       try {
//         const res = await axios.get("/api/analytics", {
//           headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//         });
//         setAnalyticsData(res.data);
//       } catch (error) {
//         alert("Failed to load analytics");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchAnalytics();
//   }, []);

//   if (loading)
//     return <div className="container mt-4">Loading analytics...</div>;

//   if (!analyticsData)
//     return <div className="container mt-4">No analytics data available.</div>;

//   return (
//     <div className="container mt-4">
//       <h2>Performance Analytics</h2>
//       {/* Replace below with actual charts or Power BI embedded dashboard */}
//       <pre>{JSON.stringify(analyticsData, null, 2)}</pre>
//     </div>
//   );
// };

// export default Analytics;

import React, { useEffect, useState } from "react";
import api from "../services/api";

const Analytics = () => {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await api.get("/analytics");
        setAnalyticsData(res.data);
      } catch (error) {
        alert("Failed to load analytics");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (loading)
    return <div className="container mt-4">Loading analytics...</div>;

  if (!analyticsData)
    return <div className="container mt-4">No analytics data available.</div>;

  return (
    <div className="container mt-4">
      <h2>Performance Analytics</h2>
      {/* Replace below with actual charts or Power BI embedded dashboard */}
      <pre>{JSON.stringify(analyticsData, null, 2)}</pre>
    </div>
  );
};

export default Analytics;
