import React from "react";
import "./Styling.css";

const TrustSection: React.FC = () => {
  
  return (
    <section className="px-6 py-16 mt-20 mb-20 text-white bg-transparent relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-4 mb-10">
        <h2 className="text-5xl font-bold underline decoration-white max-sm:text-3xl">
          Why Trust Us?
        </h2>
        <div className="flex items-center gap-2 mt-2">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/bb44f7680e8b0d59f16bae5ff0df12f6303bf596"
            alt="chat icon"
            className="h-[32px] w-[32px] max-sm:h-6 max-sm:w-6"
          />
          {/* <p className="text-lg font-medium text-white/90 max-sm:text-base">
            Ohh..You Really wanna Know
          </p> */}
        </div>
      </div>

      {/* Text & Image Content */}
      <div className="flex flex-col-reverse lg:flex-row justify-between items-center gap-10 relative z-10">
        {/* Trust Text Points */}
        <ul className="text-left text-xl sm:text-2xl space-y-4 sm:space-y-5 max-sm:text-base max-sm:space-y-3">
          <li className="list-disc ml-5">
            "Powered by AI trained on 300,000+ career journeys"
          </li>
          <li className="list-disc ml-5">
            "96% accuracy backed by real case studies"
          </li>
          <li className="list-disc ml-5">
            "No more confusion —{" "}
            <span className="text-2xl sm:text-4xl font-semibold text-white max-sm:text-lg">
              Only Clarity
            </span>
            "
          </li>
        </ul>

        {/* Trust Illustration Images */}
        {/* Trust Illustration Images */}
        <div className="relative hidden sm:block">
          {/* Small back circle */}
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/349002a2b154e99bc636544c6d0755a08afe96b5"
            alt="Circle 3"
            className="absolute bottom-[50px] right-[220px] h-[180px] w-[180px] rounded-full z-10 opacity-80 "
          />

          {/* Mid circle */}
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/75c90c126d90ff785d5c139d2d1ed7310839f48e"
            alt="Circle 2"
            className="absolute bottom-[30px] right-[80px] h-[280px] w-[280px] rounded-full z-20 opacity-90"
          />

          {/* Foreground main circle */}
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/fa644e398ad2ec87fe4bf49e793760a7d3d3eeed"
            alt="Main circle"
            className=" relative bottom-[80px] right-[200px] h-[360px] w-[360px] rounded-full z-30"
          />
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
