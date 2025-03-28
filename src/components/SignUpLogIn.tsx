import React, { useState } from "react";

const InputField = ({
  label,
  type = "text",
  required = true,
  name,
}: {
  label: string;
  type?: string;
  required?: boolean;
  name: string;
}) => (
  <label className="flex flex-col text-sm">
    <span className="mb-1">{label}:</span>
    <input
      type={type}
      name={name}
      required={required}
      className="w-full px-4 py-2 rounded-md bg-black bg-opacity-40 border border-white focus:outline-none"
    />
  </label>
);

const SignUpLogIn: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget as HTMLFormElement);
    console.log("Login Data:", Object.fromEntries(data.entries()));
    // Send data to backend here
  };

  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget as HTMLFormElement);
    console.log("Sign Up Data:", Object.fromEntries(data.entries()));
    // Send data to backend here
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
          <button
            className="absolute top-4 right-4 text-sm bg-zinc-800 px-3 py-1 rounded-full hover:bg-zinc-700 transition"
            onClick={() => {
            }}
          >
            ✕
          </button>
          {/* SIGN UP FORM */}
          {isSignUp && (
            <form onSubmit={handleSignUpSubmit} className="flex flex-col gap-4">
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
            <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4 ">
              <h1 className="p-2 bg-opacity-40 items-center justify-center text-3xl font-bold font-mono justify-inline">
                Login
              </h1>

              <InputField label="Email" type="email" name="email" />
              <InputField label="Password" type="password" name="password" />

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
