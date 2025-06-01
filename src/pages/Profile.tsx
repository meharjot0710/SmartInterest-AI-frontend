import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const storedAvatar = localStorage.getItem("userProfileAvatar") || `https://api.dicebear.com/7.x/thumbs/svg?seed=avatar${Math.floor(Math.random() * 10000)}`;

interface ProfileProps {
  us: { uid: any; email: any };
}

const Profile:React.FC<ProfileProps> = ({us}) => {
  const [avatarOptions, setAvatarOptions] = useState<string[]>([]);
  const [selectedAvatar, setSelectedAvatar] = useState<string>(storedAvatar);
  const [name, setName] = useState("John Doe");
  const [email,setEmail] = useState("johndoe@example.com");
  const [details, setDetails] = useState("");
  const [editing, setEditing] = useState(false);

  useEffect(() => {
      fetch(`http://127.0.0.1:5000/get_user_data?uid=${us.uid}`)
        .then((res) => res.json())
        .then((data) => {
          setAvatarOptions([...avatarOptions, String(data.profilePhoto)]);
          setSelectedAvatar(data.profilePhoto);
          setName(data.name);
          setEmail(data.email);
        })
        .catch((err) => {
          console.error("Error fetching user data:", err);
        });
    }, [us.uid]);

  const handleAvatarChange = (avatar: string) => {
    setSelectedAvatar(avatar);
    localStorage.setItem("userProfileAvatar", avatar);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-3xl mx-auto p-4 sm:p-6 space-y-6 text-white"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-2xl sm:text-3xl font-bold">My Profile</h2>
        <button
          className="text-sm bg-gradient-to-r from-zinc-800 to-zinc-700 px-3 py-1 rounded-full hover:from-zinc-700 hover:to-zinc-600 transition"
          onClick={() => setEditing(!editing)}
        >
          {editing ? "Cancel" : "Edit"}
        </button>
      </div>

      <div className="rounded-2xl border border-white/20 shadow-xl bg-gradient-to-br from-black/30 to-zinc-800/30 backdrop-blur-lg p-5 sm:p-6">
        <div className="grid gap-6">
          {avatarOptions.length > 0 && (
            <div className="space-y-4">
              <div className="flex justify-center">
                <img
                  src={selectedAvatar}
                  alt="Selected avatar"
                  className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-blue-500 shadow-xl"
                />
              </div>
              {editing && (
                <div className="flex justify-center gap-3 sm:gap-4 flex-wrap">
                  {avatarOptions.slice(1).map((avatar) => (
                    <img
                      src={avatar}
                      alt="avatar option"
                      onClick={() => handleAvatarChange(avatar)}
                      className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 cursor-pointer transition-transform duration-300 hover:scale-110 ${
                        selectedAvatar === avatar ? "border-blue-500" : "border-white/10"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="space-y-1">
            <label htmlFor="name" className="block font-medium">
              Full Name
            </label>
            <input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={!editing}
              className={`w-full p-3 rounded-xl ${
                editing ? "bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-400" : "bg-gray-100 text-gray-600 cursor-not-allowed"
              }`}
              placeholder="Enter your full name"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="email" className="block font-medium">
              Email Address
            </label>
            <input
              id="email"
              value={email}
              readOnly
              className="w-full p-3 bg-gray-100 text-gray-500 border border-gray-300 rounded-xl cursor-not-allowed"
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <label className="font-medium">Password</label>
            <button
              disabled={!editing}
              className={`px-4 py-2 border rounded-xl ${
                editing ? "hover:bg-white hover:text-black" : "opacity-50 cursor-not-allowed"
              } transition w-full sm:w-auto`}
            >
              Change Password
            </button>
          </div>

          <div className="space-y-1">
            <label htmlFor="details" className="block font-medium">
              About You
            </label>
            <textarea
              id="details"
              placeholder="Tell us something about yourself..."
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              disabled={!editing}
              className={`w-full min-h-[120px] p-3 rounded-xl ${
                editing ? "bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-400" : "bg-gray-100 text-gray-600 cursor-not-allowed"
              }`}
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-4">
          <Link to="/">
            <button
              className="px-6 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition w-full sm:w-auto"
            >
              Log-Out
            </button>
            </Link>
            {editing && (
              <button
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition w-full sm:w-auto"
              >
                Save Changes
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
export default Profile;