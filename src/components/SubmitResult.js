import React, { useState } from "react";

const SubmitResult = () => {
  const [userId, setUserId] = useState("");
  const [assessmentId, setAssessmentId] = useState("");
  const [score, setScore] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    // Prepare the payload to match your Result model
    const resultData = {
      userId: userId.trim(),
      assessmentId: assessmentId.trim(),
      score: parseInt(score, 10),
      // add other properties if required by your backend
    };

    try {
      // const response = await fetch("https://localhost:7133/api/Results"
        const response = await fetch("https://study-edusync-cga0cgbtane5cefm.centralindia-01.azurewebsites.net/api/Results", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // add Authorization header if your API needs JWT token
          // "Authorization": "Bearer <token>",
        },
        body: JSON.stringify(resultData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit result");
      }

      const data = await response.json();
      setMessage(`Result submitted successfully! Result ID: ${data.resultId}`);
      setUserId("");
      setAssessmentId("");
      setScore("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto" }}>
      <h2>Submit Quiz Result</h2>
      <form onSubmit={handleSubmit}>
        <label>User ID:</label>
        <br />
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
        />
        <br />
        <br />

        <label>Assessment ID:</label>
        <br />
        <input
          type="text"
          value={assessmentId}
          onChange={(e) => setAssessmentId(e.target.value)}
          required
        />
        <br />
        <br />

        <label>Score:</label>
        <br />
        <input
          type="number"
          value={score}
          onChange={(e) => setScore(e.target.value)}
          required
          min="0"
        />
        <br />
        <br />

        <button type="submit">Submit Result</button>
      </form>

      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
    </div>
  );
};

export default SubmitResult;
