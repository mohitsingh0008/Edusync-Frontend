// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { useAuth } from "../context/AuthContext";

// function QuizAttempt() {
//   const { CourseId } = useParams();
//   const navigate = useNavigate();
//   const { auth } = useAuth();

//   const [assessment, setAssessment] = useState(null);
//   const [questions, setQuestions] = useState([]);
//   const [answers, setAnswers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);
//   const [error, setError] = useState(null);

//   // Fetch assessment data
//   useEffect(() => {
//     async function fetchAssessment() {
//       try {
//         setLoading(true);
//         const response = await axios.get(`/api/Assessments/course/${CourseId}`);
//         console.log("API response data:", response.data);

//         if (Array.isArray(response.data) && response.data.length > 0) {
//           const firstAssessment = response.data[0];
//           console.log("First assessment:", firstAssessment);

//           let parsedQuestions = [];
//           if (
//             firstAssessment.questions &&
//             Array.isArray(firstAssessment.questions)
//           ) {
//             parsedQuestions = firstAssessment.questions;
//           }

//           setAssessment(firstAssessment);
//           setQuestions(parsedQuestions);

//           // ✅ Include questionId in each answer
//           const initialAnswers = parsedQuestions.map((q) => ({
//             questionId: q.questionId,
//             selectedOption: "",
//           }));
//           setAnswers(initialAnswers);
//         } else {
//           setAssessment(null);
//           setQuestions([]);
//         }
//         setLoading(false);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to load assessment.");
//         setLoading(false);
//       }
//     }

//     fetchAssessment();
//   }, [CourseId]);

//   // ✅ Update selected option while preserving questionId
//   const handleOptionChange = (index, option) => {
//     setAnswers((prev) => {
//       const newAnswers = [...prev];
//       newAnswers[index] = {
//         ...newAnswers[index],
//         selectedOption: option,
//       };
//       return newAnswers;
//     });
//   };

//   // Submit quiz
//   const handleSubmit = async () => {
//     const unanswered = answers.some((a) => !a.selectedOption);
//     if (unanswered) {
//       alert("Please answer all questions before submitting.");
//       return;
//     }

//     setSubmitting(true);
//     setError(null);

//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         alert("You must be logged in to submit the quiz.");
//         setSubmitting(false);
//         return;
//       }

//       // ✅ Calculate score
//       let correctCount = 0;
//       for (let i = 0; i < questions.length; i++) {
//         if (answers[i].selectedOption === questions[i].correctOption) {
//           correctCount++;
//         }
//       }
//       console.log(assessment.maxScore);
//       // const score = (correctCount / questions.length) * assessment.maxScore;

//       const percentage = (correctCount * 100) / questions.length;
//       const score = (percentage * assessment.maxScore) / 100;

//       const payload = {
//         assessmentId: assessment.assessmentId,
//         userId: auth.userId,
//         submittedAnswers: answers, // ✅ includes questionId and selectedOption
//         score: score,
//       };

//       await axios.post("/api/Results/submit", payload, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       alert(
//         `Quiz submitted successfully! Your score: ${score.toFixed(2)} / ${
//           assessment.maxScore
//         }`
//       );
//       navigate("/results");
//     } catch (err) {
//       console.error(err);
//       setError("Failed to submit result. Please try again.");
//       setSubmitting(false);
//     }
//   };

//   if (loading) return <div>Loading quiz...</div>;
//   if (error) return <div style={{ color: "red" }}>{error}</div>;
//   if (!assessment) return <div>No assessment found for this course.</div>;

//   return (
//     <div>
//       <h2>Quiz for Course: {CourseId}</h2>
//       {questions.length > 0 ? (
//         <form
//           onSubmit={(e) => {
//             e.preventDefault();
//             handleSubmit();
//           }}
//         >
//           {questions.map((q, index) => (
//             <div key={index} style={{ marginBottom: "20px" }}>
//               <p>
//                 <strong>
//                   {index + 1}. {q.questionText}
//                 </strong>
//               </p>

//               {[q.optionA, q.optionB, q.optionC, q.optionD].map(
//                 (option, i) =>
//                   option && (
//                     <label
//                       key={i}
//                       style={{ display: "block", cursor: "pointer" }}
//                     >
//                       <input
//                         type="radio"
//                         name={`question-${index}`}
//                         value={option}
//                         checked={answers[index]?.selectedOption === option}
//                         onChange={() => handleOptionChange(index, option)}
//                         disabled={submitting}
//                         required
//                       />
//                       {option}
//                     </label>
//                   )
//               )}
//             </div>
//           ))}
//           <button type="submit" disabled={submitting}>
//             {submitting ? "Submitting..." : "Submit Quiz"}
//           </button>
//         </form>
//       ) : (
//         <p>No questions found for this assessment.</p>
//       )}
//     </div>
//   );
// }

// export default QuizAttempt;

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import "./QuizAttempt.css"; // Add this line for styles

function QuizAttempt() {
  const { CourseId } = useParams();
  const navigate = useNavigate();
  const { auth } = useAuth();

  const [assessment, setAssessment] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAssessment() {
      try {
        setLoading(true);
        const response = await axios.get(`/api/Assessments/course/${CourseId}`);
        if (Array.isArray(response.data) && response.data.length > 0) {
          const firstAssessment = response.data[0];
          const parsedQuestions = Array.isArray(firstAssessment.questions)
            ? firstAssessment.questions
            : [];

          setAssessment(firstAssessment);
          setQuestions(parsedQuestions);

          const initialAnswers = parsedQuestions.map((q) => ({
            questionId: q.questionId,
            selectedOption: "",
          }));
          setAnswers(initialAnswers);
        } else {
          setAssessment(null);
          setQuestions([]);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load assessment.");
      } finally {
        setLoading(false);
      }
    }

    fetchAssessment();
  }, [CourseId]);

  const handleOptionChange = (index, option) => {
    setAnswers((prev) => {
      const newAnswers = [...prev];
      newAnswers[index] = {
        ...newAnswers[index],
        selectedOption: option,
      };
      return newAnswers;
    });
  };

  const handleSubmit = async () => {
    const unanswered = answers.some((a) => !a.selectedOption);
    if (unanswered) {
      alert("Please answer all questions before submitting.");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must be logged in to submit the quiz.");
        return;
      }

      let correctCount = 0;
      for (let i = 0; i < questions.length; i++) {
        if (answers[i].selectedOption === questions[i].correctOption) {
          correctCount++;
        }
      }

      const percentage = (correctCount * 100) / questions.length;
      const score = (percentage * assessment.maxScore) / 100;

      const payload = {
        assessmentId: assessment.assessmentId,
        userId: auth.userId,
        submittedAnswers: answers,
        score: score,
      };

      await axios.post("/api/Results/submit", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert(
        `✅ Quiz submitted successfully!\nYour score: ${score.toFixed(2)} / ${
          assessment.maxScore
        }`
      );
      navigate("/results");
    } catch (err) {
      console.error(err);
      setError("Failed to submit result. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="status-message">Loading quiz...</div>;
  if (error) return <div className="status-message error">{error}</div>;
  if (!assessment)
    return (
      <div className="status-message">No assessment found for this course.</div>
    );

  return (
    <div className="quiz-container">
      <h2 className="quiz-title">
        Quiz: {assessment.title || "Course " + CourseId}
      </h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="quiz-form"
      >
        {questions.map((q, index) => (
          <div key={index} className="question-card">
            <p className="question-text">
              {index + 1}. {q.questionText}
            </p>
            <div className="options-group">
              {[q.optionA, q.optionB, q.optionC, q.optionD].map(
                (option, i) =>
                  option && (
                    <label key={i} className="option-label">
                      <input
                        type="radio"
                        name={`question-${index}`}
                        value={option}
                        checked={answers[index]?.selectedOption === option}
                        onChange={() => handleOptionChange(index, option)}
                        disabled={submitting}
                        required
                      />
                      {option}
                    </label>
                  )
              )}
            </div>
          </div>
        ))}

        <div className="submit-wrapper">
          <button type="submit" className="submit-btn" disabled={submitting}>
            {submitting ? "Submitting..." : "Submit Quiz"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default QuizAttempt;
