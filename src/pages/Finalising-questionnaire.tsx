import React, { useState } from "react";

const topics = [
  "Artificial Intelligence",
  "Web Development",
  "Cybersecurity",
  "Machine Learning",
  "Data Science",
  "Cloud Computing",
];

const questionnaireMarks = {
  q1: 10,
  q2: 8,
  q3: 9,
  q4: 7,
  q5: 10,
  q6: 9,
  q7: 8,
  q8: 10,
  q9: 7,
  q10: 9,
};

const difficultyLevels = ["Beginner", "Intermediate", "Expert"];

const FinalizingQuestionnaire: React.FC = () => {
  const [selectedTopics, setSelectedTopics] = useState<string[]>(["", "", ""]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>(["", "", ""]);

  const handleTopicChange = (index: number, value: string) => {
    const updated = [...selectedTopics];
    updated[index] = value;
    setSelectedTopics(updated);
  };

  const handleLevelChange = (index: number, level: string) => {
    const updated = [...selectedLevels];
    updated[index] = level;
    setSelectedLevels(updated);
  };

  const handleSubmit = () => {
    const hasEmptyFields =
      selectedTopics.includes("") || selectedLevels.includes("");

    const hasDuplicates = new Set(selectedTopics).size !== selectedTopics.length;

    if (hasEmptyFields) {
      alert("Please fill in all topics and difficulty levels.");
      return;
    }

    if (hasDuplicates) {
      alert("Duplicate topics selected. Please select unique topics.");
      return;
    }

    console.log("Selected Topics:", selectedTopics);
    console.log("Selected Difficulty Levels:", selectedLevels);
    console.log("Marks:", questionnaireMarks);
    alert("Submitted! Data ready to be sent to backend.");
  };

  const totalScore = Object.values(questionnaireMarks).reduce((a, b) => a + b, 0);

  return (
    <div className="max-w-3xl mx-auto mt-20 mb-10 p-6 min-h-screen bg-[rgba(0,0,0,0.5)] rounded-xl backdrop-blur-md border border-white/20 text-white">
      <h1 className="text-3xl font-bold text-center mb-8">🎯 Finalize Your Questionnaire</h1>

      {/* Marks Section */}
      <div className="bg-[rgba(255,255,255,0.1)] rounded-lg p-4 mb-6 shadow-md border border-white/10">
        <h2 className="text-xl font-semibold mb-4">📋 Your Marks</h2>
        <ul className="space-y-1 mb-3">
          {Object.entries(questionnaireMarks).map(([question, mark]) => (
            <li key={question} className="text-sm">
              <span className="font-medium">{question.toUpperCase()}:</span> {mark}/10
            </li>
          ))}
        </ul>
        <div className="text-lg font-bold mt-3">Total: {totalScore}/100</div>
      </div>

      {/* Topics + Modern Difficulty Meter */}
      <div className="bg-[rgba(255,255,255,0.1)] rounded-lg p-4 mb-6 shadow-md border border-white/10">
        <h2 className="text-xl font-semibold mb-4">🧠 Select Your Project Topics & Difficulty</h2>
        <div className="space-y-6">
          {[0, 1, 2].map((i) => (
            <div key={i} className="space-y-3">
              {/* Topic Dropdown */}
              <div className="relative">
                <select
                  value={selectedTopics[i]}
                  onChange={(e) => handleTopicChange(i, e.target.value)}
                  className="w-full p-2 pr-10 bg-black bg-opacity-30 border border-white/20 rounded-md text-white appearance-none"
                >
                  <option value="">Project's Topic {i + 1}</option>
                  {topics.map((topic) => (
                    <option key={topic} value={topic}>
                      {topic}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute top-1/2 right-3 transform -translate-y-1/2 text-white">
                  ▼
                </div>
              </div>

              {/* Difficulty Meter */}
              <div className="flex justify-center sm:justify-start gap-2">
                {difficultyLevels.map((level) => (
                  <button
                    key={level}
                    onClick={() => handleLevelChange(i, level)}
                    className={`px-4 py-1.5 rounded-full border text-sm font-medium transition ${
                      selectedLevels[i] === level
                        ? "bg-pink-400 border-fuchsia-400 text-white"
                        : "bg-transparent border-white text-white hover:bg-white hover:text-black"
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>

              {/* Preview */}
              {selectedTopics[i] && selectedLevels[i] && (
                <div className="text-sm text-white/80">
                  ✅ You chose <span className="font-semibold">{selectedTopics[i]}</span> (
                  <span className="italic">{selectedLevels[i]}</span>)
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <div className="text-center mt-6">
        <button
          onClick={handleSubmit}
          className="px-6 py-2 text-lg font-semibold bg-pink-500 hover:bg-fuchsia-700 rounded-lg transition"
        >
          🚀 Submit
        </button>
      </div>
    </div>
  );
};

export default FinalizingQuestionnaire;
