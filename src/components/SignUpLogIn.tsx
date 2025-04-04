import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth, googleProvider } from "../pages/firebaseConfig.ts";

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
  const [fullName, setFullName] = useState("");
  const navigate = useNavigate();

  const loginWithEmail = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

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
      alert((error as Error).message); // TS-safe
    }
  };

  const storeUserInDB = async (user: { uid: string; email: string | null; displayName?: string | null
   }) => {
    await fetch("https://smartinterest-ai-backend.onrender.com/store_user", {
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
      await storeUserInDB(result.user);
      alert("Google Login Successful! Redirecting to dashboard...");
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      alert((error as Error).message);
    }
  };

  const register = async () => {
    if (!fullName || !email || !password) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      if (auth.currentUser) {
        await storeUserInDB({
          uid: auth.currentUser.uid,
          email,
          displayName: fullName,
        });
        alert("Account Created!");
        setIsSignUp(false);
      } else {
        throw new Error("User not available after registration.");
      }
    } catch (error) {
      console.error("Registration Error:", error);
      alert((error as Error).message);
    }
  };

  return (
    <div className="flex flex-col w-full h-screen items-center justify-center mb-10 text-white px-4 overflow-hidden relative">
      <div className="sm:hidden text-center mt-28 text-2xl font-bold font-mono max-w-xs px-4 overflow-hidden truncate">
        {isSignUp ? "Hey, Welcome!!" : "Welcome Back!!"}
      </div>

      <div className="relative flex flex-col sm:flex-row max-w-5xl w-full h-[600px] mt-8 sm:mt-24 overflow-hidden rounded-2xl border border-zinc-800 shadow-xl bg-zinc-950">
        <div className="hidden sm:flex w-1/2 bg-black bg-opacity-40 items-center justify-center text-3xl font-bold font-mono">
          Hey, Welcome!!
        </div>

        <div
          className={`relative sm:absolute top-0 h-full w-full sm:w-1/2 bg-zinc-950 transition-transform duration-700 ease-in-out transform ${
            isSignUp ? "sm:translate-x-full" : "sm:translate-x-0"
          } p-6 sm:p-10 flex flex-col justify-center`}
        >
          <a href="/">
            <button className="absolute top-4 right-4 text-sm bg-zinc-800 px-3 py-1 rounded-full hover:bg-zinc-700 transition">
              ✕
            </button>
          </a>

          {isSignUp && (
            <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
              <h1 className="p-2 text-3xl font-bold font-mono">SignUp</h1>
              <InputField label="Full Name" name="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} />
              <InputField label="Email" type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <InputField label="Password" type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />

              <div className="flex items-center gap-2 text-xs">
                <input type="checkbox" name="subscribe" />
                <span>Subscribe me to notifications for updates</span>
              </div>

              <button
                type="button"
                onClick={register}
                className="bg-white text-black px-6 py-2 rounded-full mt-2 hover:bg-zinc-200 transition-all"
              >
                Sign Up
              </button>

              <p className="text-xs mt-4 text-right">
                Already have an account?{" "}
                <span className="text-pink-400 cursor-pointer" onClick={() => setIsSignUp(false)}>
                  Log In
                </span>
              </p>
            </form>
          )}

          {!isSignUp && (
            <form className="flex flex-col gap-4" onSubmit={loginWithEmail}>
              <h1 className="p-2 text-3xl font-bold font-mono">Login</h1>
              <InputField label="Email" type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <InputField label="Password" type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />

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
              <button
                type="button"
                onClick={loginWithGoogle}
                className="bg-white text-black px-6 py-2 rounded-full mt-2 hover:bg-zinc-200 transition-all"
              >
                Log In With Google
              </button>

              <p className="text-xs mt-4 text-right">
                Forgot Password? New here?{" "}
                <span className="text-pink-400 cursor-pointer" onClick={() => setIsSignUp(true)}>
                  Sign Up
                </span>
              </p>
            </form>
          )}
        </div>

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
