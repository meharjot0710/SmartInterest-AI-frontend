import React, { useEffect, useState } from "react";

const NavBar: React.FC = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (showDrawer) {
      setVisible(true);
      setIsClosing(false);
    } else if (visible) {
      setIsClosing(true);
      const timeout = setTimeout(() => {
        setVisible(false);
        setIsClosing(false);
      }, 300); // must match exit animation duration
      return () => clearTimeout(timeout);
    }
  }, [showDrawer]);

  return (
    <div>
      {/* Nav Header */}
      <header className="fixed top-0 left-0 right-0 z-40 flex justify-between items-center px-6 py-1 bg-black/10 backdrop-blur-md border border-y-black/40 shadow-md max-sm:flex-col max-sm:gap-5">
        <div className="flex items-center justify-between w-full max-sm:flex-row">
          <a href="/">
          <div className="flex h-10 m-2 items-center gap-2 bg-black bg-opacity-50 border border-fuchsia-300 rounded-full px-3 py-1 backdrop-blur-md">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/a4ec8492fc45875ab579d95838b405435e3a070e"
              alt="SmartInterest AI Logo"
              className="h-10 w-10 rounded-full object-cover"
              loading="lazy"
              decoding="async"
            />
            <span className="text-white text-lg font-semibold tracking-tight leading-none">
              SmartInterest <span className="text-fuchsia-300">AI</span>
            </span>
          </div>
          </a>
          <button
            className="sm:hidden text-white text-2xl ml-auto"
            onClick={() => setShowDrawer(true)}
          >
            ☰
          </button>
        </div>

        <nav className="hidden sm:flex gap-4">
          <a href="/login">
          <button className="whitespace-nowrap mr-3 px-3 py-1.5 text-base font-medium text-white border-b border-white rounded-[1vw] bg-transparent hover:bg-white hover:text-black transition-all duration-200">
            Log In
          </button>
          </a>
          <a href="/signup">
          <button className="whitespace-nowrap px-3 py-1.5 text-base border-b border-pink-400 font-medium text-white rounded-[1vw] hover:bg-pink-400 transition-all duration-200">
            Sign Up
          </button>
          </a>
        </nav>
      </header>

      {/* Mobile Sidebar Drawer */}
      {visible && (
        <div className="fixed inset-0 z-50 flex sm:hidden">
          {/* Overlay */}
          <div
            className="flex-1 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowDrawer(false)}
          />

          {/* Sidebar */}
          <div
            className={`w-[80%] max-w-xs bg-{rgba(255,255,255,0.1)} backdrop-blur-xl text-white shadow-xl px-5 py-6 border border-white/20 rounded-r-2xl ${
              isClosing ? "slide-out" : "slide-in"
            }`}
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-xl font-semibold">Welcome,</h2>
                <p className="text-sm text-gray-100 mt-1">
                  Log in or create an account to get started.
                </p>
              </div>
              <button
                className="text-xl text-white/70 hover:text-white"
                onClick={() => setShowDrawer(false)}
              >
                ✕
              </button>
            </div>

            <div className="flex flex-col gap-4">
              <button className="px-4 py-2 text-base font-medium text-white bg-violet-600 rounded-lg hover:bg-black transition duration-200">
                Log In
              </button>
              <button className="px-4 py-2 text-base font-medium text-white border border-white rounded-lg hover:bg-white hover:text-black transition duration-200">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
