import React, { useState, useEffect } from "react";
import NavbarIfAlreadyLogin from "../components/NavbarIfAlreadyLogin";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const domainMapping = {
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

interface PredictionProp {
  user: { uid: string };
}
const FinalizingQuestionnaire: React.FC<PredictionProp> = ({us}) => {
    const [user, setUser] = useState<User>({
      name: "us.name",
      profilePhoto: "https://i.pravatar.cc/150?img=64",
    });
    
  const [selectedLevels, setSelectedLevels] = useState<string[]>(["", "", ""]);
  const location = useLocation();
  const navigate = useNavigate();
  const scores = location.state?.scores || {};

  const [formData, setFormData] = useState({
    "Operating System": scores["Operating System"],
    "DSA": scores["DSA"],
    "Frontend": scores["Frontend"],
    "Backend": scores["Backend"],
    "Machine Learning": scores["Machine Learning"],
    "Data Analytics": scores["Data Analytics"],
    "Project 1": "",
    "Level1": "",
    "Project 2": "",
    "Level2": "",
    "Project 3": "",
    "Level3": "",
    "Project 4": "",
    "Level4": "",
  });

  const [prediction, setPrediction] = useState(null);
  const [domains, setDomains] = useState([]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLevelChange = (index, level) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [`Level${index}`]: level,
    }));
  };
  
  const levelOrder = ["Beginner", "Intermediate", "Advanced"];

  const storeUserInDB = async (user) => {
    await fetch("https://smartinterest-ai-backend.onrender.com/update_user_data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        uid: user.uid,
        email: user.email,
        scores:scores,
        predicted_interest:prediction,
        formdata:formData,
        roadmap:prediction.roadmap
      }),
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    const transformedData = {
      user_id: location.state?.uid,
      ...formData,
      "Project 1": domainMapping[formData["Project 1"]] || 0,
      "Project 2": domainMapping[formData["Project 2"]] || 0,
      "Project 3": domainMapping[formData["Project 3"]] || 0,
      "Project 4": domainMapping[formData["Project 4"]] || 0, 
    };

    try {
      const response = await axios.post("https://smartinterest-ai-backend.onrender.com/predict", transformedData);
      setPrediction(response.data);
      console.log(response.data);
      fetch("https://smartinterest-ai-backend.onrender.com/update_user_data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uid: user.uid,
          email: user.email,
          predicted_interest: response.data.predicted_interest,
          formdata: formData,
          roadmap: response.data.roadmap,
        }),
      });
    
    } catch (error) {
      console.error("Error:", error);
    }
  }

  useEffect(() => {
    fetch(`https://smartinterest-ai-backend.onrender.com?uid=${us.uid}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUser(data);
      })
      .catch((err) => {
        console.error("Error fetching user data:", err);
      });
      console.log(scores)
    axios.get("https://smartinterest-ai-backend.onrender.com/roadmaps")
      .then((response) => {
        setDomains(Object.keys(response.data));
      })
      .catch((error) => console.error("Error fetching roadmaps:", error));
  }, [us.uid]);

  return (
    <>
      <NavbarIfAlreadyLogin name={user.name} profilePhoto={user.profilePhoto} />
    <div className="max-w-3xl mx-auto mt-20 mb-10 p-6 min-h-screen bg-[rgba(0,0,0,0.5)] rounded-xl backdrop-blur-md border border-white/20 text-white">
      <h1 className="text-3xl font-bold text-center mb-8">🎯 Finalize Your Questionnaire</h1>

      {/* Marks Section */}
      <div className="bg-[rgba(255,255,255,0.1)] rounded-lg p-4 mb-6 shadow-md border border-white/10">
        <h2 className="text-xl font-semibold mb-4">📋 Your Marks</h2>
        <ul className="space-y-1 mb-3">
          {["Operating System", "DSA", "Frontend", "Backend", "Machine Learning", "Data Analytics"].map((subject) => (
            <li key={subject} className="text-sm">
              <span className="font-medium">{subject.toUpperCase()}:</span> {formData[subject]*10}/100
            </li>
          ))}
        </ul>
      </div>

      {/* Topics + Modern Difficulty Meter */}
      <div className="bg-[rgba(255,255,255,0.1)] rounded-lg p-4 mb-6 shadow-md border border-white/10">
        <h2 className="text-xl font-semibold mb-4">🧠 Select Your Project Topics & Difficulty</h2>
        <div className="space-y-6">
          {["Project 1", "Project 2", "Project 3", "Project 4"].map((project, index) => (
            <div key={index} className="space-y-3">
              {/* Topic Dropdown */}
              <div className="relative">
                <select
                  name={project}
                  value={formData[project]}
                  onChange={handleChange}
                  className="w-full p-2 pr-10 bg-black bg-opacity-30 border border-white/20 rounded-md text-white appearance-none"
                >
                  <option value="">Project's Topic {index + 1}</option>
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
                    onClick={()=>handleLevelChange(index+1, level)}
                    className={`px-4 py-1.5 rounded-full border text-sm font-medium transition ${
                      formData[`Level${index+1}`] === level
                        ? "bg-pink-400 border-fuchsia-400 text-white"
                        : "bg-transparent border-white text-white hover:bg-white hover:text-black"
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>

              {/* Preview */}
              {/* {selectedTopics[i] && selectedLevels[i] && (
                <div className="text-sm text-white/80">
                  ✅ You chose <span className="font-semibold">{selectedTopics[i]}</span> (
                  <span className="italic">{selectedLevels[i]}</span>)
                </div>
              )} */}
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
    </>
  );
};

export default FinalizingQuestionnaire;
