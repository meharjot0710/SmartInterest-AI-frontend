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
  const [domains, setDomains] = useState<string[]>([]);

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
      setPrediction(response.data);
      console.log(response.data);

      await fetch("https://smartinterest-ai-backend.onrender.com/update_user_data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uid: us.uid,
          email: us.email,
          predicted_interest: response.data.predicted_interest,
          formdata: formData,
          roadmap: response.data.roadmap,
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
    axios.get("https://smartinterest-ai-backend.onrender.com/roadmap-domains")
      .then((response) => {
        setDomains(Object.keys(response.data));
      })
      .catch((err) => {
        console.error("Error fetching domains:", err);
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
    <div className="p-6">
      <NavbarIfAlreadyLogin  name={user.name} profilePhoto={user.profilePhoto} />
      <h2 className="text-2xl font-bold mb-4">Finalising Your Questionnaire</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Subject Scores */}
        <div>
          <h3 className="text-lg font-semibold">Your Scores:</h3>
          {subjectKeys.map((subject) => (
            <div key={subject} className="flex gap-2 items-center">
              <span className="font-medium">{subject.toUpperCase()}:</span> {formData[subject as keyof typeof formData] * 10}/100
            </div>
          ))}
        </div>

        {/* Projects */}
        <div>
          <h3 className="text-lg font-semibold">Your Projects:</h3>
          {[1, 2, 3, 4].map((index) => {
            const projectKey = `Project ${index}`;
            const levelKey = `Level${index}`;
            return (
              <div key={index} className="mb-4">
                <label className="block mb-1 font-medium">{projectKey}</label>
                <select
                  name={projectKey}
                  value={formData[projectKey as keyof typeof formData]}
                  onChange={handleChange}
                  className="border rounded p-2 w-full"
                >
                  <option value="">Select Domain</option>
                  {domains.map((domain) => (
                    <option key={domain} value={domain}>
                      {domain}
                    </option>
                  ))}
                </select>

                <label className="block mt-2 mb-1 font-medium">Level</label>
                <div className="flex gap-4">
                  {difficultyLevels.map((level) => (
                    <label key={level} className="flex items-center gap-1">
                      <input
                        type="radio"
                        name={levelKey}
                        value={level}
                        checked={formData[levelKey as keyof typeof formData] === level}
                        onChange={() => handleLevelChange(index, level)}
                      />
                      {level}
                    </label>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Submit
        </button>
      </form>

      {prediction && (
        <div className="mt-6 p-4 bg-gray-100 rounded shadow">
          <h3 className="text-lg font-bold mb-2">Prediction Result</h3>
          <p><strong>Predicted Interest:</strong> {prediction.predicted_interest}</p>
          <p><strong>Roadmap:</strong> {prediction.roadmap}</p>
        </div>
      )}
    </div>
  );
};

export default FinalizingQuestionnaire;
