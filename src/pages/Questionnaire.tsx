import React, { useState } from "react";

interface Question {
  id: number;
  question: string;
  options: string[];
}

const questions: Question[] = [
  {
    id: 1,
    question: "Which one is a JavaScript library for building UIs?",
    options: ["Angular", "Vue", "React", "Svelte"],
  },
  {
    id: 2,
    question: "Which language runs in a browser?",
    options: ["Python", "C++", "Java", "JavaScript"],
  },
  {
    id: 3,
    question: "Which is a utility-first CSS framework?",
    options: ["Bootstrap", "Tailwind CSS", "Bulma", "Foundation"],
  },
  {
    id: 4,
    question: "What is used to manage state in React?",
    options: ["Redux", "Axios", "Lodash", "Webpack"],
  },
  {
    id: 5,
    question: "Which hook runs after component mounts?",
    options: ["useState", "useEffect", "useMemo", "useRef"],
  },
  {
    id: 6,
    question: "Which is a NoSQL database?",
    options: ["MySQL", "MongoDB", "Oracle", "PostgreSQL"],
  },
  {
    id: 7,
    question: "Which tool bundles JS files?",
    options: ["Webpack", "Sass", "Nodemon", "Gulp"],
  },
  {
    id: 8,
    question: "Which keyword creates a constant in JavaScript?",
    options: ["let", "const", "var", "static"],
  },
  {
    id: 9,
    question: "Which is used to make HTTP requests in React?",
    options: ["Axios", "React Router", "Redux", "Next.js"],
  },
  {
    id: 10,
    question: "Which of the following is a React framework?",
    options: ["Next.js", "NestJS", "Express", "VuePress"],
  },
];

const Questionnaire: React.FC = () => {
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (questionId: number, option: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
    console.log("User Answers:", answers);
    alert("Thank you for submitting!");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-transparent rounded-[25px] min-h-screen">
      <h1 className="text-4xl text-white font-bold text-center mb-10">
        Questionnaire :~
      </h1>

      {questions.map((q) => (
        <div
        key={q.id}
        className="bg-white rounded-lg shadow-md p-6 mb-6 transition-transform duration-200 hover:scale-[1.01] hover:drop-shadow-[0_0_20px_rgba(0,0,0,1)]"
        >      
          <p className="text-lg font-semibold mb-4">
            {q.id}. {q.question}
          </p>
          <div className="flex flex-col gap-3">
            {q.options.map((opt) => (
              <label
                key={opt}
                className="flex items-center gap-3 cursor-pointer"
              >
                <input
                  type="radio"
                  name={`question-${q.id}`}
                  value={opt}
                  checked={answers[q.id] === opt}
                  onChange={() => handleChange(q.id, opt)}
                  className="w-4 h-4 accent-blue-600"
                />
                <span className="text-gray-800">{opt}</span>
              </label>
            ))}
          </div>
        </div>
      ))}

      <button
        className={`w-full py-3 text-lg font-medium rounded-lg transition-colors ${
          submitted
            ? "bg-gray-400 text-white cursor-not-allowed"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
        onClick={handleSubmit}
        disabled={submitted}
      >
        {submitted ? "Submitted" : "Submit"}
      </button>
    </div>
  );
};

export default Questionnaire;
