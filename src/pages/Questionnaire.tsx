import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavbarIfAlreadyLogin from "../components/NavbarIfAlreadyLogin";

interface DashboardProps {
  us: { uid: string; email: string | null };
}

interface User {
  name: string;
  profilePhoto: string;
}

interface Question {
  question: string;
  options: string[];
}

const Questionnaire: React.FC<DashboardProps> = ({ us }) => {
  const [user, setUser] = useState<User>({
    name: "us.name",
    profilePhoto: "https://i.pravatar.cc/150?img=64",
  });

  const subjects = [
    "Operating System",
    "DSA",
    "Frontend",
    "Backend",
    "Machine Learning",
    "Data Analytics",
  ];

  const [currentSubjectIndex, setCurrentSubjectIndex] = useState<number>(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [scores, setScores] = useState<{ [key: string]: number }>({});
  const navigate = useNavigate();

  useEffect(() => {
    fetch(
      `https://smartinterest-ai-backend.onrender.com/get_user_data?uid=${us.uid}`
    )
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        fetchQuestions();
      })
      .catch((err) => {
        console.error("Error fetching user data:", err);
      });
  }, [currentSubjectIndex]);

  const fetchQuestions = async () => {
    try {
      const subject = subjects[currentSubjectIndex];
      const res = await fetch(
        `https://smartinterest-ai-backend.onrender.com/get_questions?subject=${subject}`
      );
      if (!res.ok) throw new Error("Failed to fetch questions");
      const data = await res.json();
      setQuestions(data.questions);
      setAnswers({});
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const handleAnswerChange = (qIndex: number, answer: string) => {
    setAnswers((prev) => ({ ...prev, [qIndex]: answer }));
  };

  const handleSubmit = async () => {
    const subject = subjects[currentSubjectIndex];

    const orderedAnswers = questions.map((_, index) => answers[index] || null);

    const res = await fetch(
      "https://smartinterest-ai-backend.onrender.com/submit_answers",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, answers: orderedAnswers }),
      }
    );

    const data = await res.json();

    const updatedScores = { ...scores, [subject]: data.score };
    setScores(updatedScores);

    if (currentSubjectIndex < subjects.length - 1) {
      setCurrentSubjectIndex(currentSubjectIndex + 1);
    } else {
      navigate("/SmartInterest-AI-frontend/#/predict", { state: { scores: updatedScores } });
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-transparent rounded-[25px] min-h-screen">
      <NavbarIfAlreadyLogin name={user.name} profilePhoto={user.profilePhoto} />
      <h1 className="text-4xl text-white font-bold text-center mb-10">
        {subjects[currentSubjectIndex]} Test
      </h1>

      {questions.map((q, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-md p-6 mb-6 transition-transform duration-200 hover:scale-[1.01] hover:drop-shadow-[0_0_20px_rgba(0,0,0,1)]"
        >
          <p className="text-lg font-semibold mb-4">
            {index + 1}. {q.question}
          </p>
          <div className="flex flex-col gap-3">
            {q.options.map((opt: string, optindex: number) => (
              <label
                key={optindex}
                className="flex items-center gap-3 cursor-pointer"
              >
                <input
                  type="radio"
                  name={`q${index}`}
                  value={opt}
                  checked={answers[index] === opt}
                  onChange={() => handleAnswerChange(index, opt)}
                  className="w-4 h-4 accent-blue-600"
                />
                <span className="text-gray-800">{opt}</span>
              </label>
            ))}
          </div>
        </div>
      ))}

      <div className="bg-white p-4 flex justify-between items-center rounded-xl shadow-md">
        {currentSubjectIndex > 0 && (
          <button
            onClick={() => setCurrentSubjectIndex(currentSubjectIndex - 1)}
            className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors"
          >
            ← Previous
          </button>
        )}
        {currentSubjectIndex < subjects.length - 1 ? (
          <button
            onClick={handleSubmit}
            className="ml-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
          >
            Next →
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="ml-auto px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all"
          >
            ✅ Finish Test
          </button>
        )}
      </div>
    </div>
  );
};

export default Questionnaire;
