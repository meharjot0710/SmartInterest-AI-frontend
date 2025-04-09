import React, { useEffect, useState } from "react";

interface NavbarProp {
  name: string;
  profilePhoto: string;
}

const NavbarIfAlreadyLogin: React.FC<NavbarProp> = ({name,profilePhoto}) => {
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
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [showDrawer]);

  return (
    <div>
      {/* Nav Header */}
      <header className="fixed top-0 left-0 right-0 z-40 flex justify-between items-center px-6 py-1 bg-transparent backdrop-blur-md border border-y-black/40 shadow-md max-sm:flex-col max-sm:gap-5">
        <div className="flex items-center justify-between w-full max-sm:flex-row">
          <a href="/SmartInterest-AI-frontend/#/dashboard">
            <div className="flex h-10 m-2 items-center gap-2 bg-black bg-opacity-50 border border-fuchsia-300 rounded-full px-3 py-1 backdrop-blur-md">
              <img
                src={"https://cdn.builder.io/api/v1/image/assets/TEMP/a4ec8492fc45875ab579d95838b405435e3a070e"}
                alt="SmartInterest AI Logo"
                className="h-10 w-10 rounded-full object-cover"
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

        {/* Logged-in navbar right side */}

        <nav className="hidden sm:flex gap-4 items-center">
          <span className="text-white whitespace-nowrap text-sm hidden md:inline">
            Hi, {name}
          </span>{" "}
          {/*Name of The User */}
          <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-white shrink-0">
            <a href="/SmartInterest-AI-frontend/#/profile">
            <img
              src={profilePhoto}
              alt="User Avatar"
              className="w-full h-full object-cover"
              loading="lazy"
            />{" "}
            </a>
            {/*change "Vishal" to Name of The User */}
          </div>
          <a href="/SmartInterest-AI-frontend/#/dashboard" className="hidden sm:flex">
          <button className="whitespace-nowrap mr-3 px-3 py-1.5 text-base font-medium text-white border-b border-white rounded-[1vw] bg-transparent hover:bg-white hover:text-black transition-all duration-200">
            Dashboard
          </button>
        </a>
        <a href="/SmartInterest-AI-frontend/#/tests" className="hidden sm:flex">
          <button className="whitespace-nowrap mr-3 px-3 py-1.5 text-base font-medium text-white border-b border-white rounded-[1vw] bg-transparent hover:bg-white hover:text-black transition-all duration-200">
            Predict
          </button>
        </a>
        <a href="/SmartInterest-AI-frontend/#/" className="hidden sm:flex">
          <button className="whitespace-nowrap mr-3 px-3 py-1.5 text-base font-medium text-white border-b border-white rounded-[1vw] bg-transparent hover:bg-white hover:text-black transition-all duration-200">
            Logout
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
            className={`w-[80%] max-w-xs bg-white/10 backdrop-blur-xl text-white shadow-xl px-5 py-6 border border-white/20 rounded-r-2xl transform transition-transform duration-300 ${
              isClosing ? "translate-x-full" : "translate-x-0"
            }`}
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-xl font-semibold">Hi, {name}</h2>
                <p className="text-sm text-gray-100 mt-1">
                  Explore your dashboard & profile.
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
              <a href="/SmartInterest-AI-frontend/#/dashboard">
                <button className="whitespace-nowrap mr-3 px-3 py-1.5 text-base font-medium text-white border-b border-white rounded-[1vw] bg-transparent hover:bg-white hover:text-black transition-all duration-200">
                  Dashboard
                </button>
              </a>
              <a href="/SmartInterest-AI-frontend/#/tests">
                <button className="whitespace-nowrap mr-3 px-3 py-1.5 text-base font-medium text-white border-b border-white rounded-[1vw] bg-transparent hover:bg-white hover:text-black transition-all duration-200">
                  Predict
                </button>
              </a>
              <a href="/SmartInterest-AI-frontend/#/">
                <button className="whitespace-nowrap mr-3 px-3 py-1.5 text-base font-medium text-white border-b border-white rounded-[1vw] bg-transparent hover:bg-white hover:text-black transition-all duration-200">
                  Logout
                </button>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavbarIfAlreadyLogin;
