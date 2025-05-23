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
      `https://smartinterest-ai-backend-production.up.railway.app/get_user_data?uid=${us.uid}`
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
        `https://smartinterest-ai-backend-production.up.railway.app/get_questions?subject=${subject}`
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
      "https://smartinterest-ai-backend-production.up.railway.app/submit_answers",
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
      navigate("/predict", { state: { scores: updatedScores } });
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-20 p-6 bg-transparent rounded-[25px] min-h-screen">
      <NavbarIfAlreadyLogin name={user.name} profilePhoto={user.profilePhoto} />
      <h1 className="text-4xl text-white font-bold text-center mb-5">
        {subjects[currentSubjectIndex]} Test
      </h1>

      {questions.map((q, index) => (
        <div
          key={index}
          className="max-w-3xl mx-auto mt-10 mb-10 p-6 hover:-translate-y-1 transition-all duration-300  bg-[rgba(0,0,0,0.5)] rounded-xl backdrop-blur-md border border-white/20 text-white"
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
                <span className="text-white">{opt}</span>
              </label>
            ))}
          </div>
        </div>
      ))}

      <div className="bg-white/5 backdrop-blur-xl hover:border hover:border-l-white hover:border-r-white p-4 flex justify-between items-center rounded-xl shadow-md transition-all duration-300 ">
        {currentSubjectIndex > 0 && (
          <button
            onClick={() => setCurrentSubjectIndex(currentSubjectIndex - 1)}
            className="whitespace-nowrap mr-3 px-3 py-1.5 text-base font-medium bg-white text-black border-b border-black rounded-[1vw] hover:bg-black hover:text-white transition-all duration-300 cursor-pointer"
          >
            ← Previous
          </button>
        )}
        {currentSubjectIndex < subjects.length - 1 ? (
          <button
            onClick={handleSubmit}
            className="whitespace-nowrap mr-3 px-3 py-1.5 text-base font-medium bg-white text-black border-b border-black rounded-[1vw] hover:bg-black hover:text-white transition-all duration-300 cursor-pointer"
          >
            Next →
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="whitespace-nowrap mr-3 px-3 py-1.5 text-base font-medium bg-green-400 text-black border-b border-black rounded-[1vw] hover:bg-black hover:text-white transition-all duration-300 cursor-pointer"
          >
            ✅ Finish Test
          </button>
        )}
      </div>
    </div>
  );
};

export default Questionnaire;
