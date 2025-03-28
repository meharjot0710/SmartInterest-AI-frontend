import React, { useState } from "react";

const NavBar: React.FC = () => {
  const [showDrawer, setShowDrawer] = useState(false);

  return (
    <>
      {/* Nav Header */}
      <header className="flex justify-between items-center px-6 py-5 max-sm:flex-col max-sm:gap-5">
        {/* Logo Section with Menu Button on small screens */}
        <div className="flex items-center justify-between w-full max-sm:flex-row">
          <div className="flex items-center gap-2 bg-black bg-opacity-50 border border-fuchsia-300 rounded-full px-3 py-1 backdrop-blur-md">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/a4ec8492fc45875ab579d95838b405435e3a070e"
              alt="SmartInterest AI Logo"
              className="h-9 w-9 rounded-full shadow-md"
            />
            <span className="text-white text-xl font-semibold">
              SmartInterest AI
            </span>
          </div>

          {/* Menu Icon - only on small screens */}
          <button
            className="sm:hidden text-white text-2xl ml-auto"
            onClick={() => setShowDrawer(true)}
          >
            ☰
          </button>
        </div>

        {/* Buttons (Desktop only) */}
        <nav className="hidden sm:flex gap-4">
          <button className="whitespace-nowrap px-3 py-1.5 width 100% text-base font-medium text-white border border-white rounded-[1vw] bg-transparent hover:bg-white hover:text-black transition-all duration-200">
            Log In
          </button>
          <button className="whitespace-nowrap px-3 py-1.5 text-base font-medium text-black bg-pink-300 rounded-[1vw] hover:bg-pink-400 transition-all duration-200">
            Sign Up
          </button>
        </nav>
      </header>

      {/* Sticky Bottom Drawer (Mobile Only) */}
      {showDrawer && (
        <div className="fixed bottom-0 left-0 right-0 bg-[rgba(0,0,0,0.9)] text-white border-t border-white p-4 z-50 sm:hidden" backdrop-blur-40>
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-semibold">Welcome 👋</span>
            <button
              className="text-sm text-pink-300 hover:text-white"
              onClick={() => setShowDrawer(false)}
            >
              Later ✕
            </button>
          </div>
          <div className="flex flex-col gap-3">
            <button className="px-4 py-2 text-base font-medium text-white border border-white  bg-transparent hover:bg-white hover:text-black transition-all duration-200 w-full">
              Log In
            </button>
            <button className="px-4 py-2 text-base font-medium text-black bg-pink-300  hover:bg-pink-400 transition-all duration-200 w-full">
              Sign Up
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;
