import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="p-5 border-t border-white border-solid bg-[#0e0b1c]">
      <div className="flex justify-between items-center mx-auto max-w-[1200px] flex-wrap gap-y-4">
        {/* Left Side */}
        <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/2a96ba1ddbb32aa6d5072bb5cda9b52d3e88a7e3"
            alt="SmartInterest AI Logo"
            className="h-[55px] w-[55px] rounded-full"
          />
          <div className="text-white">
            <p className="text-xl font-semibold">SmartInterest AI</p>
            <p className="text-sm text-red-300 mb-1">
              &quot;Predicting Student&apos;s Interest Smartly&quot;
            </p>
          </div>
        </div>

        {/* Right Side - Social Icons */}
        <div className="flex gap-4">
          <a href="#" aria-label="Twitter">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/592a64501e0ed9459a24f9146636f9ed4e444d17"
              alt="Twitter"
              className="h-[19px] w-[19px]"
            />
          </a>
          <a href="#" aria-label="GitHub">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/e79650958ac9738de0879685fc0ee875652f62ed"
              alt="GitHub"
              className="h-[19px] w-[19px]"
            />
          </a>
          <a href="#" aria-label="LinkedIn">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/5264d82a5adabf0123b49aa6bd5d67758df647bb"
              alt="LinkedIn"
              className="h-[19px] w-[19px]"
            />
          </a>
          <a href="#" aria-label="Instagram">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/5cd2bd8f2e549d7145c9efd65456d985f9ec3653"
              alt="Instagram"
              className="h-[19px] w-[19px]"
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
