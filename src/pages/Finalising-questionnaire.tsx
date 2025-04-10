import React, { useState, useEffect } from "react";
import NavbarIfAlreadyLogin from "../components/NavbarIfAlreadyLogin";
import { useLocation } from "react-router-dom";
import axios from "axios";

const domainMapping: Record<string, number> = {
  "AI": 1,
  "Web Development": 2,
  "Machine Learning": 3,
  "Cybersecurity": 4,
  "Data Science": 5,
  "Robotics": 6,
  "Game Development": 7
};

const difficultyLevels = ["Beginner", "Intermediate", "Advanced"];

interface User {
  name: string;
  profilePhoto: string;
}

interface PredictionType {
  predicted_interest: string;
  roadmap: string;
}

interface PredictionProp {
  us: {
    uid: string;
    email: string | null;
  };
}

const FinalizingQuestionnaire: React.FC<PredictionProp> = ({ us }) => {
  const [user, setUser] = useState<User>({
    name: "us.name",
    profilePhoto: "https://i.pravatar.cc/150?img=64",
  });
  const location = useLocation();
  const scores = location.state?.scores || {};

  const [formData, setFormData] = useState({
    "Operating System": scores["Operating System"] || 0,
    "DSA": scores["DSA"] || 0,
    "Frontend": scores["Frontend"] || 0,
    "Backend": scores["Backend"] || 0,
    "Machine Learning": scores["Machine Learning"] || 0,
    "Data Analytics": scores["Data Analytics"] || 0,
    "Project 1": "",
    "Level1": "",
    "Project 2": "",
    "Level2": "",
    "Project 3": "",
    "Level3": "",
    "Project 4": "",
    "Level4": "",
  });

  const [prediction, setPrediction] = useState<PredictionType | null>(null);
  const domains=["AI",
  "Web Development",
  "Machine Learning",
  "Cybersecurity",
  "Data Science",
  "Robotics",
  "Game Development"];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLevelChange = (index: number, level: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [`Level${index}`]: level,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data:", formData); // Log the form data
    const transformedData = {
      user_id: us.uid,
      ...formData,
      "Project 1": domainMapping[formData["Project 1"] as keyof typeof domainMapping] || 0,
      "Project 2": domainMapping[formData["Project 2"] as keyof typeof domainMapping] || 0,
      "Project 3": domainMapping[formData["Project 3"] as keyof typeof domainMapping] || 0,
      "Project 4": domainMapping[formData["Project 4"] as keyof typeof domainMapping] || 0,
    };

    try {
      const response = await axios.post("https://smartinterest-ai-backend.onrender.com/predict", transformedData);
      setPrediction(response.data.predicted_interest);
      console.log("Prediction Response:", response.data.predicted_interest);
      const response_roadmap = await axios.get("https://smartinterest-ai-backend.onrender.com/roadmaps");
      console.log("Roadmap Response:", response_roadmap);
      setPrediction({predicted_interest:response.data.predicted_interest,roadmap:response_roadmap.data[response.data.predicted_interest]});

      await fetch("https://smartinterest-ai-backend.onrender.com/update_user_data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uid: us.uid,
          email: us.email,
          predicted_interest: response.data.predicted_interest,
          formdata: formData,
          roadmap: response_roadmap.data[response.data.predicted_interest],
        }),
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetch(
      `https://smartinterest-ai-backend.onrender.com/get_user_data?uid=${us.uid}`
    )
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
      })
      .catch((err) => {
        console.error("Error fetching user data:", err);
      });
  }, []);

  const subjectKeys = [
    "Operating System",
    "DSA",
    "Frontend",
    "Backend",
    "Machine Learning",
    "Data Analytics",
  ];

  return (
    <>
      <NavbarIfAlreadyLogin name={user.name} profilePhoto={user.profilePhoto} />
    <div className="max-w-3xl mx-auto mt-20 mb-10 p-6 min-h-screen bg-[rgba(0,0,0,0.5)] rounded-xl backdrop-blur-md border border-white/20 text-white">
      <h1 className="text-3xl font-bold text-center mb-8">🎯 Finalize Your Questionnaire</h1>

      {/* Marks Section */}
      <div className="bg-[rgba(255,255,255,0.1)] rounded-lg p-4 mb-6 shadow-md border border-white/10">
        <h2 className="text-xl font-semibold mb-4">📋 Your Marks</h2>
        <ul className="space-y-1 mb-3">
          {subjectKeys.map((subject) => (
            <li key={subject} className="text-sm">
              <span className="font-medium">{subject.toUpperCase()}:</span> {formData[subject as keyof typeof formData] * 10}/100
            </li>
          ))}
        </ul>
      </div>

      {/* Topics + Modern Difficulty Meter */}
      <div className="bg-[rgba(255,255,255,0.1)] rounded-lg p-4 mb-6 shadow-md border border-white/10">
        <h2 className="text-xl font-semibold mb-4">🧠 Select Your Project Topics & Difficulty</h2>
        <div className="space-y-6">
          {[1, 2, 3, 4].map((index) => {
            const projectKey = `Project ${index}`;
            const levelKey = `Level${index}`;
            return (
            <div key={index} className="space-y-3">
              {/* Topic Dropdown */}
              <div className="relative">
                <select
                  name={projectKey}
                  value={formData[projectKey as keyof typeof formData]}
                  onChange={handleChange}
                  className="w-full p-2 pr-10 bg-black bg-opacity-30 border border-white/20 rounded-md text-white appearance-none"
                >
                  <option value="">Project's Topic {index}</option>
                  {domains.map((domain, idx) => (
                    <option key={idx} value={domain}>
                      {domain}  
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
                    name={levelKey}
                    onClick={()=>handleLevelChange(index, level)}
                    className={`px-4 py-1.5 rounded-full border text-sm font-medium transition ${
                      formData[`Level${index}` as keyof typeof formData] === level
                        ? "bg-pink-400 border-fuchsia-400 text-white"
                        : "bg-transparent border-white text-white hover:bg-white hover:text-black"
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
            );})}
    
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
      {prediction && (
        <div className="mt-6 p-4 bg-gray-100 rounded shadow">
          <h3 className="text-lg font-bold mb-2">Prediction Result</h3>
          <p><strong>Predicted Interest:</strong> {prediction.predicted_interest}</p>
          {/* <p><strong>Roadmap:</strong> {prediction.roadmap}</p>  */}
        </div>
      )}
    </div>
    </>
  );
};

export default FinalizingQuestionnaire;
