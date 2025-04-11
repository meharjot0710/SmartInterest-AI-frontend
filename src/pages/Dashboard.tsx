import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import NavbarIfAlreadyLogin from "../components/NavbarIfAlreadyLogin";
import { useNavigate } from "react-router-dom";

interface User {
  name: string;
  email: string;
  profilePhoto: string;
  predicted_interest: string;
  scores: {
    "AI": number[],
    "Frontend": number[],
    "DSA": number[],
    "Cybersecurity": number[],
    "Machine Learning": number[],
    "Backend": number[]
  },
  roadmap: {
    description: string;
    levels: {
      Beginner: string[];
      Intermediate: string[];
      Advanced: string[];
    };
  };
}
interface DashboardProps {
  us: { uid: any; email: any };
}

const Dashboard: React.FC<DashboardProps> = ({ us }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>({
    name: "us.name",
    email: us.email,
    profilePhoto: "https://i.pravatar.cc/150?img=64",
    predicted_interest: "Artificial Intelligence",
    scores: {
      "AI": [80, 98, 63],
      "Frontend": [65, 75, 89],
      "DSA": [70, 85, 92],
      "Cybersecurity": [60, 68, 72],
      "Machine Learning": [88, 91, 84],
      "Backend": [77, 83, 79],
    },
    roadmap: {
      description: "A default roadmap description.",
      levels: {
        Beginner: [],
        Intermediate: [],
        Advanced: [],
      },
    },
  });

  useEffect(() => {
    fetch(`https://smartinterest-ai-backend.onrender.com/get_user_data?uid=${us.uid}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUser(data as User);
      })
      .catch((err) => {
        console.error("Error fetching user data:", err);
      });
  }, [us.uid]);

  const handleFindInterest = () => {
    navigate("/tests")
  };

  const calculateStats = () => {
    // Check if user.scores is defined and not null before proceeding
    if (!user.scores) {
      return { avg: "0", highest: 0, lowest: 0 };
    }
    const allscores = Object.values(user.scores).flat();
    const total = allscores.reduce((a, b) => a + b, 0);
    const avg = allscores.length > 0 ? (total / allscores.length).toFixed(2) : "0";
    const highest = allscores.length > 0 ? Math.max(...allscores) : 0;
    const lowest = allscores.length > 0 ? Math.min(...allscores) : 0;
    return { avg, highest, lowest };
  };

  const { avg, highest, lowest } = calculateStats();

  const getAverage = (arr: number[]) =>
    arr.reduce((sum, val) => sum + val, 0) / arr.length;

  return (
    <div className="min-h-screen mt-20 bg-[rgba(0, 0, 0, 0.5)] p-4 sm:p-6 lg:p-10 mx-4 sm:mx-10 lg:mx-20">
      <NavbarIfAlreadyLogin name={user.name} profilePhoto={user.profilePhoto} />

      {/* Profile Section */}
      {/* <div className="bg-[rgba(0,0,0,0.1)] border border-[rgba(255,255,255,0.2)] hover:border-[rgba(255,255,255,0.5)] text-white rounded-xl p-6 shadow-lg flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 mb-6">
        <img
          src={user.profilePhoto}
          alt="Profile"
          className="w-20 h-20 rounded-full border-4 border-blue-500 object-cover"
        />
        <div className="text-center sm:text-left">
          <h2 className="text-xl sm:text-2xl font-bold">{user.name}</h2>
          <p className="text-white text-opacity-70 break-words">{user.email}</p>
        </div>
      </div> */}

      {/* Interest Area */}
      <div className="bg-[rgba(0,0,0,0.1)] border border-[rgba(255,255,255,0.2)] hover:border-[rgba(255,255,255,0.5)] text-white rounded-xl p-6 shadow-md mb-6">
        <h3 className="text-xl font-semibold mb-2">Interest Area</h3>
          <p className="text-green-600 font-medium">{user.predicted_interest}</p>
          <button
            className="px-4 py-2 mt-2 bg-blue-600 text-white rounded-md hover:bg-blue-900 transition"
            onClick={handleFindInterest}
          >
            Find Now
          </button>
      </div>

      {/* Subject-wise scores with Line Charts */}
      <div className="bg-[rgba(0,0,0,0.1)] border border-[rgba(255,255,255,0.2)] hover:border-[rgba(255,255,255,0.5)] text-white rounded-xl p-6 shadow-md mb-6">
        <h3 className="text-xl font-semibold mb-4">Previous Performances</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(user.scores || {}).map(([subject, scores]) => {
            const avgScore = getAverage(scores);
            const chartData = scores.map((score, index) => ({
              name: `Test ${index + 1}`,
              score,
            }));

            return (
              <div
                key={subject}
                className="bg-blue-50 p-4 rounded-lg border border-blue-100"
              >
                <h4
                  className={`font-semibold mb-2 ${ avgScore > 60 ? "text-green-600" : avgScore > 55 ? "text-blue-700" : "text-red-600" }`}
                >
                  {subject}
                </h4>
                <p className="text-gray-700 mb-2">Scores: {scores.join(", ")}</p>
                <ResponsiveContainer width="100%" height={150}>
                  <LineChart data={chartData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="score"
                      stroke={avgScore > 60 ? "#22c55e" : avgScore > 55 ? "#3b82f6" : "#ef4444"}
                      strokeWidth={3}
                      dot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            );
          })}
        </div>
      </div>

      {/* Statistics Section */}
      <div className="bg-[rgba(0,0,0,0.1)] border border-[rgba(255,255,255,0.2)] hover:border-[rgba(255,255,255,0.5)] text-white rounded-xl p-6 shadow-md">
        <h3 className="text-xl font-semibold mb-4">Statistics</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="bg-green-100 p-4 rounded-lg">
            <p className="text-lg font-bold text-green-700">📊 Avg</p>
            <p className="text-2xl text-black font-semibold">{avg}%</p>
          </div>
          <div className="bg-yellow-100 p-4 rounded-lg">
            <p className="text-lg font-bold text-yellow-700">🏆 Highest</p>
            <p className="text-2xl text-black font-semibold">{highest}%</p>
          </div>
          <div className="bg-red-100 p-4 rounded-lg">
            <p className="text-lg font-bold text-red-700">📉 Lowest</p>
            <p className="text-2xl text-black font-semibold">{lowest}%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;