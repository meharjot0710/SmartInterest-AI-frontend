import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const HeroSection: React.FC = () => {
  useEffect(() => {
    AOS.init({ once: true, duration: 800 });
  }, []);

  return (
    <section className="relative top-20 px-4 py-10 text-center text-white overflow-hidden">
      {/* Glowing Left Circuit */}
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/f72ab31381c33f4b9a20b6e711cbb5023ef436a2"
        alt=""
        className="absolute top-0 left-0 w-36 h-auto max-sm:hidden"
        data-aos="fade-right"
      />

      {/* Glowing Right Circuit */}
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/667efa7936ba6cb2314ee463a749898c7e5084c0"
        alt=""
        className="absolute top-28 right-0 w-40 h-auto max-sm:hidden"
        data-aos="fade-left"
        data-aos-delay="100"
      />

      {/* Center Graphic & Text Block */}
      <div className="relative flex justify-center items-center my-20 max-sm:my-10">
        {/* Left & Right Blurred Boxes */}
        <div className="flex gap-5 max-sm:flex-col max-sm:items-center" >
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/49312e7001ba146bfa4c1c545c8ceda641416756"
            alt=""
            className="h-[233px] w-[233px] blur-[5px] border border-white rounded-3xl max-sm:h-[180px] max-sm:w-[180px]" data-aos="fade-left"
          />
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/49312e7001ba146bfa4c1c545c8ceda641416756"
            alt=""
            className="h-[233px] w-[233px] blur-[5px] border border-white rounded-3xl max-sm:h-[180px] max-sm:w-[180px]" data-aos="fade-right"
          />
        </div>

        {/* Center Image */}
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/12e6850846379bbe1be94582eb56c7d1e98748a2"
          alt=""
          className="absolute h-[317px] w-[317px] opacity-80 rounded-3xl z-0 max-sm:h-[200px] max-sm:w-[200px]"
          data-aos="zoom-out"
        />

        {/* Centered Text */}
        <div className="absolute text-center z-10 px-4" data-aos="fade-up" data-aos-delay="200">
          <h2 className="font-bold text-3xl underline sm:text-4xl md:text-5xl lg:text-6xl mb-1 leading-tight">
            “Predicting Student’s Interest Smartly”
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-zinc-300">
            <span className="text-xs sm:text-sm md:text-base">
              Let AI guide you to the future you’re meant for —
            </span>{" "}
            <span className="text-lg sm:text-xl md:text-2xl font-semibold text-white">
              93% accuracy
            </span>
            , no guesswork.
          </p>
        </div>
      </div>

      {/* Scroll Down Arrow */}
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/9376bd5100c9175eae7ed63ca56c387328f9a72c"
        alt="Scroll down"
        className="mx-auto mt-10 h-10 w-10 animate-bounce"
        data-aos="fade-up"
        data-aos-delay="300"
      />
    </section>
  );
};

export default HeroSection;
