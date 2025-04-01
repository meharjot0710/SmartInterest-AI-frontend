import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, googleProvider } from "../pages/firebaseConfig";

const InputField = ({
  label,
  type = "text",
  required = true,
  name,
  value,
  onChange,
}: {
  label: string;
  type?: string;
  required?: boolean;
  name: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <label className="flex flex-col text-sm">
    <span className="mb-1">{label}:</span>
    <input
      type={type}
      name={name}
      required={required}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2 rounded-md bg-black bg-opacity-40 border border-white focus:outline-none"
    />
  </label>
);

const SignUpLogIn: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginWithEmail = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault(); // Prevents form reload
  
  if (!email || !password) {
    alert("Please enter both email and password.");
    return;
  }
  
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    await storeUserInDB(userCredential.user);
    alert("Login Successful! Redirecting to dashboard...");
    setTimeout(() => navigate("/dashboard"), 1500);
  } catch (error) {
    console.error("Email Login Error:", error);
    alert("Login Failed. Check your credentials.");
  }
};

  const storeUserInDB = async (user) => {
    await fetch("http://localhost:5000/store_user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        uid: user.uid,
        email: user.email,
        name: user.displayName || "Anonymous",
      }),
    });
  };
  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log(result)
      await storeUserInDB(result.user);
      alert("Google Login Successful! Redirecting to dashboard...");
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      alert("Google Sign-In Failed.");
    }
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  return (
    <div className="flex flex-col w-full h-screen items-center justify-center mb-10 text-white px-4 overflow-hidden relative">
      {/* Branding (Mobile) */}
      <div className="sm:hidden text-center mt-28 text-2xl font-bold font-mono max-w-xs px-4 overflow-hidden truncate">
        {isSignUp ? "Hey, Welcome!!" : "Welcome Back!!"}
      </div>

      <div className="relative flex flex-col sm:flex-row max-w-5xl w-full h-[600px] mt-8 sm:mt-24 overflow-hidden rounded-2xl border border-zinc-800 shadow-xl bg-zinc-950">
        {/* Left Panel */}
        <div className="hidden sm:flex w-1/2 bg-black bg-opacity-40 items-center justify-center text-3xl font-bold font-mono">
          Hey, Welcome!!
        </div>

        {/* Form Panel */}
        <div
          className={`relative sm:absolute top-0 h-full w-full sm:w-1/2 bg-zinc-950 transition-transform duration-700 ease-in-out transform ${
            isSignUp ? "sm:translate-x-full" : "sm:translate-x-0"
          } p-6 sm:p-10 flex flex-col justify-center`}
        >
          {/* Cancel Button */}
          <a href="/">
          <button
            className="absolute top-4 right-4 text-sm bg-zinc-800 px-3 py-1 rounded-full hover:bg-zinc-700 transition"
            onClick={() => {
            }}
          >
            ✕
          </button>
          </a>
          {/* SIGN UP FORM */}
          {isSignUp && (
            <form onSubmit={loginWithEmail} className="flex flex-col gap-4">
              <h1 className="p-2 bg-opacity-40 items-center justify-center text-3xl font-bold font-mono justify-inline">
                SignUp
              </h1>
              <InputField label="Full Name" name="fullName" />
              <InputField label="Email" type="email" name="email" />
              <InputField label="Password" type="password" name="password" />

              <div className="flex items-center gap-2 text-xs">
                <input type="checkbox" name="subscribe" />
                <span>Subscribe me to notifications for updates</span>
              </div>

              <button
                type="submit"
                className="bg-white text-black px-6 py-2 rounded-full mt-2 hover:bg-zinc-200 transition-all"
              >
                Sign Up
              </button>

              <p className="text-xs mt-4 text-right">
                Already have an account?{" "}
                <span
                  className="text-pink-400 cursor-pointer"
                  onClick={() => setIsSignUp(false)}
                >
                  Log In
                </span>
              </p>
            </form>
          )}

          {/* LOGIN FORM */}
          {!isSignUp && (
            <form onSubmit={loginWithEmail} className="flex flex-col gap-4 ">
              <h1 className="p-2 bg-opacity-40 items-center justify-center text-3xl font-bold font-mono justify-inline">
                Login
              </h1>

              <InputField
                label="Email"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <InputField
                label="Password"
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="flex items-center gap-2 text-xs">
                <input type="checkbox" name="remember" />
                <span>Remember me</span>
              </div>

              <button
                type="submit"
                className="bg-white text-black px-6 py-2 rounded-full mt-2 hover:bg-zinc-200 transition-all"
              >
                Log In
              </button>

              <p className="text-xs mt-4 text-right">
                Forgot Password? New here?{" "}
                <span
                  className="text-pink-400 cursor-pointer"
                  onClick={() => setIsSignUp(true)}
                >
                  Sign Up
                </span>
              </p>
            </form>
          )}
        </div>

        {/* Right Panel for Login */}
        {!isSignUp && (
          <div className="hidden sm:flex absolute top-0 right-0 w-1/2 h-full items-center justify-center text-3xl font-bold font-mono">
            Welcome Back!!
          </div>
        )}
      </div>
    </div>
  );
};

export default SignUpLogIn;
