// import React, { useState } from "react";
// import api from "../services/api";
// import { useNavigate } from "react-router-dom";

// const UploadCourse = () => {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [courseId, setCourseId] = useState(null);
//   const [maxScore, setMaxScore] = useState(""); // new
//   const [questions, setQuestions] = useState([
//     {
//       questionText: "",
//       optionA: "",
//       optionB: "",
//       optionC: "",
//       optionD: "",
//       correctOption: "",
//     },
//   ]);

//   const navigate = useNavigate();

//   const handleUploadCourse = async () => {
//     const instructorId = localStorage.getItem("userId");

//     if (!instructorId) {
//       alert("User not logged in. Please log in again.");
//       return;
//     }

//     const courseData = {
//       title,
//       description,
//       mediaUrl: "https://example.com/dummy-video.mp4",
//       instructorId,
//       assessments: [],
//     };

//     try {
//       const response = await api.post("/courses", courseData);
//       alert("✅ Course uploaded successfully!");
//       setCourseId(response.data.courseId);
//     } catch (error) {
//       console.error("Upload failed:", error.response?.data || error.message);
//       alert("❌ Course upload failed.");
//     }
//   };

//   const handleDeleteCourse = async () => {
//     if (!courseId) return;

//     if (!window.confirm("Are you sure you want to delete this course?")) return;

//     try {
//       await api.delete(`/courses/${courseId}`);
//       alert("🗑️ Course deleted successfully!");
//       setCourseId(null);
//       setTitle("");
//       setDescription("");
//       setMaxScore("");
//       setQuestions([
//         {
//           questionText: "",
//           optionA: "",
//           optionB: "",
//           optionC: "",
//           optionD: "",
//           correctOption: "",
//         },
//       ]);
//     } catch (error) {
//       console.error("Delete failed:", error.response?.data || error.message);
//       alert("❌ Course delete failed.");
//     }
//   };

//   const handleQuestionChange = (index, e) => {
//     const updated = [...questions];
//     updated[index][e.target.name] = e.target.value;
//     setQuestions(updated);
//   };

//   const addQuestion = () => {
//     setQuestions([
//       ...questions,
//       {
//         questionText: "",
//         optionA: "",
//         optionB: "",
//         optionC: "",
//         optionD: "",
//         correctOption: "",
//       },
//     ]);
//   };

//   const handleSubmitQuiz = async () => {
//     if (!maxScore || isNaN(maxScore)) {
//       alert("Please enter a valid maximum score.");
//       return;
//     }

//     try {
//       const quizData = {
//         courseId,
//         title: `${title} Quiz`,
//         maxScore: parseInt(maxScore),
//         questions,
//       };

//       await api.post("/Assessments", quizData);
//       alert("✅ Quiz uploaded successfully!");
//       navigate("/dashboard");
//     } catch (error) {
//       console.error(
//         "Quiz upload failed:",
//         error.response?.data || error.message
//       );
//       alert("❌ Quiz upload failed.");
//     }
//   };

//   return (
//     <div className="container mt-4">
//       <h2>Upload a New Course</h2>
//       <input
//         type="text"
//         className="form-control mb-2"
//         placeholder="Course Title"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         disabled={!!courseId}
//       />
//       <textarea
//         className="form-control mb-2"
//         placeholder="Course Description"
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//         disabled={!!courseId}
//       />
//       {!courseId && (
//         <button className="btn btn-primary" onClick={handleUploadCourse}>
//           Submit Course
//         </button>
//       )}

//       {courseId && (
//         <>
//           <button
//             className="btn btn-danger mb-3"
//             onClick={handleDeleteCourse}
//             style={{ float: "right" }}
//           >
//             Delete Course
//           </button>
//           <hr />
//           <h3 className="mt-4">Add Quiz Questions</h3>
//           <input
//             type="number"
//             className="form-control mb-2"
//             placeholder="Maximum Marks"
//             value={maxScore}
//             onChange={(e) => setMaxScore(e.target.value)}
//           />
//           {questions.map((q, index) => (
//             <div key={index} className="border p-3 mb-2 rounded bg-light">
//               <input
//                 type="text"
//                 name="questionText"
//                 className="form-control mb-1"
//                 placeholder="Question Text"
//                 value={q.questionText}
//                 onChange={(e) => handleQuestionChange(index, e)}
//               />
//               <input
//                 type="text"
//                 name="optionA"
//                 className="form-control mb-1"
//                 placeholder="Option A"
//                 value={q.optionA}
//                 onChange={(e) => handleQuestionChange(index, e)}
//               />
//               <input
//                 type="text"
//                 name="optionB"
//                 className="form-control mb-1"
//                 placeholder="Option B"
//                 value={q.optionB}
//                 onChange={(e) => handleQuestionChange(index, e)}
//               />
//               <input
//                 type="text"
//                 name="optionC"
//                 className="form-control mb-1"
//                 placeholder="Option C"
//                 value={q.optionC}
//                 onChange={(e) => handleQuestionChange(index, e)}
//               />
//               <input
//                 type="text"
//                 name="optionD"
//                 className="form-control mb-1"
//                 placeholder="Option D"
//                 value={q.optionD}
//                 onChange={(e) => handleQuestionChange(index, e)}
//               />
//               <input
//                 type="text"
//                 name="correctOption"
//                 className="form-control mb-1"
//                 placeholder="Correct Option (A/B/C/D)"
//                 value={q.correctOption}
//                 onChange={(e) => handleQuestionChange(index, e)}
//               />
//             </div>
//           ))}
//           <button className="btn btn-secondary mb-3" onClick={addQuestion}>
//             + Add Question
//           </button>
//           <br />
//           <button className="btn btn-success" onClick={handleSubmitQuiz}>
//             Submit Quiz
//           </button>
//         </>
//       )}
//     </div>
//   );
// };

// export default UploadCourse;

import React, { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const UploadCourse = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [courseId, setCourseId] = useState(null);
  const [file, setFile] = useState(null); // 📄 file upload
  const [maxScore, setMaxScore] = useState("");
  const [questions, setQuestions] = useState([
    {
      questionText: "",
      optionA: "",
      optionB: "",
      optionC: "",
      optionD: "",
      correctOption: "",
    },
  ]);

  const navigate = useNavigate();

  const handleUploadCourse = async () => {
    const instructorId = localStorage.getItem("userId");

    if (!instructorId) {
      alert("User not logged in. Please log in again.");
      return;
    }

    const courseData = {
      title,
      description,
      mediaUrl: "https://example.com/dummy-video.mp4",
      instructorId,
      assessments: [],
    };

    try {
      const response = await api.post("/courses", courseData);
      const id = response.data.courseId;
      setCourseId(id);
      alert("✅ Course uploaded successfully!");

      // Upload file after course is created
      if (file) {
        const formData = new FormData();
        formData.append("File", file);
        formData.append("CourseId", id);

        await api.post("/Materials/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        alert("📄 Study material uploaded successfully!");
      }
    } catch (error) {
      console.error("Upload failed:", error.response?.data || error.message);
      alert("❌ Course upload or file upload failed.");
    }
  };

  const handleDeleteCourse = async () => {
    if (!courseId) return;

    if (!window.confirm("Are you sure you want to delete this course?")) return;

    try {
      await api.delete(`/courses/${courseId}`);
      alert("🗑️ Course deleted successfully!");
      setCourseId(null);
      setTitle("");
      setDescription("");
      setFile(null);
      setMaxScore("");
      setQuestions([
        {
          questionText: "",
          optionA: "",
          optionB: "",
          optionC: "",
          optionD: "",
          correctOption: "",
        },
      ]);
    } catch (error) {
      console.error("Delete failed:", error.response?.data || error.message);
      alert("❌ Course delete failed.");
    }
  };

  const handleQuestionChange = (index, e) => {
    const updated = [...questions];
    updated[index][e.target.name] = e.target.value;
    setQuestions(updated);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        questionText: "",
        optionA: "",
        optionB: "",
        optionC: "",
        optionD: "",
        correctOption: "",
      },
    ]);
  };

  const handleSubmitQuiz = async () => {
    if (!maxScore || isNaN(maxScore)) {
      alert("Please enter a valid maximum score.");
      return;
    }

    try {
      const quizData = {
        courseId,
        title: `${title} Quiz`,
        maxScore: parseInt(maxScore),
        questions,
      };

      await api.post("/Assessments", quizData);
      alert("✅ Quiz uploaded successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error(
        "Quiz upload failed:",
        error.response?.data || error.message
      );
      alert("❌ Quiz upload failed.");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Upload a New Course</h2>

      <input
        type="text"
        className="form-control mb-2"
        placeholder="Course Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={!!courseId}
      />

      <textarea
        className="form-control mb-2"
        placeholder="Course Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        disabled={!!courseId}
      />

      <input
        type="file"
        className="form-control mb-3"
        onChange={(e) => setFile(e.target.files[0])}
        accept=".pdf,.docx,.pptx"
        disabled={!!courseId}
      />

      {!courseId && (
        <button className="btn btn-primary" onClick={handleUploadCourse}>
          Submit Course & Upload File
        </button>
      )}

      {courseId && (
        <>
          <button
            className="btn btn-danger mb-3"
            onClick={handleDeleteCourse}
            style={{ float: "right" }}
          >
            Delete Course
          </button>

          <hr />
          <h3 className="mt-4">Add Quiz Questions</h3>

          <input
            type="number"
            className="form-control mb-2"
            placeholder="Maximum Marks"
            value={maxScore}
            onChange={(e) => setMaxScore(e.target.value)}
          />

          {questions.map((q, index) => (
            <div key={index} className="border p-3 mb-2 rounded bg-light">
              <input
                type="text"
                name="questionText"
                className="form-control mb-1"
                placeholder="Question Text"
                value={q.questionText}
                onChange={(e) => handleQuestionChange(index, e)}
              />
              <input
                type="text"
                name="optionA"
                className="form-control mb-1"
                placeholder="Option A"
                value={q.optionA}
                onChange={(e) => handleQuestionChange(index, e)}
              />
              <input
                type="text"
                name="optionB"
                className="form-control mb-1"
                placeholder="Option B"
                value={q.optionB}
                onChange={(e) => handleQuestionChange(index, e)}
              />
              <input
                type="text"
                name="optionC"
                className="form-control mb-1"
                placeholder="Option C"
                value={q.optionC}
                onChange={(e) => handleQuestionChange(index, e)}
              />
              <input
                type="text"
                name="optionD"
                className="form-control mb-1"
                placeholder="Option D"
                value={q.optionD}
                onChange={(e) => handleQuestionChange(index, e)}
              />
              <input
                type="text"
                name="correctOption"
                className="form-control mb-1"
                placeholder="Correct Option (A/B/C/D)"
                value={q.correctOption}
                onChange={(e) => handleQuestionChange(index, e)}
              />
            </div>
          ))}

          <button className="btn btn-secondary mb-3" onClick={addQuestion}>
            + Add Question
          </button>

          <br />

          <button className="btn btn-success" onClick={handleSubmitQuiz}>
            Submit Quiz
          </button>
        </>
      )}
    </div>
  );
};

export default UploadCourse;
