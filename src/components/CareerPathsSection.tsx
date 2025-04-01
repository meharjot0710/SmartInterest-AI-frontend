import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";
import "./Styling.css";

const jobRolesLines = [
  "Software Developer | Data Scientist | Machine Learning Engineer | AI Researcher | Cybersecurity Analyst | Cloud Engineer",
  "Frontend Developer | Backend Developer | Full Stack Developer | Mobile App Developer | Web Developer | Game Developer",
  "UI/UX Designer | Systems Architect | Network Engineer | Database Administrator | IT Support Specialist | Technical Writer",
  "Product Manager | Project Manager | Business Analyst | QA Engineer | Data Analyst | Computer Vision Engineer",
  "NLP Engineer | Robotics Engineer | Blockchain Developer | AR/VR Developer | Ethical Hacker | SRE | IT Consultant",
  "Cloud Architect | Big Data Engineer | Data Engineer | Software Tester | CRM Developer | ERP Consultant",
  "Bioinformatics Specialist | Research Scientist | IT Auditor | Hardware Engineer | Computer Programmer | EdTech Specialist",
  "Tech Entrepreneur | CTO | CIO | IT Manager | Game Designer | Animation Developer | Simulation Engineer",
  "Firmware Engineer | Chatbot Developer | Voice Assistant Dev | Open Source Contributor | Tech Blogger | Tech Evangelist",
  "Quantum Computing | Deep Learning | GPU Programmer | Kubernetes Expert | Linux Admin | CI/CD Engineer",
];

const CareerPathsSection: React.FC = () => {
  useEffect(() => {
    AOS.init({ once: true, duration: 800 });
  }, []);

  return (
    <section
      className="relative text-center overflow-hidden min-h-[600px] flex items-center justify-center"
      style={{
        maskImage:
          "linear-gradient(to bottom, transparent 20%, black 40%, black 60%, transparent 80%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent 20%, black 40%, black 60%, transparent 100%)",
      }}
    >
      {/* Animated Roles */}
      <div className="absolute inset-0 flex flex-col gap-2 opacity-50 justify-center z-0">
        {jobRolesLines.map((line, index) => (
          <div
            key={index}
            className={`w-full whitespace-nowrap text-white text-lg md:text-xl opacity-20 font-light
              ${index % 2 === 0 ? "animate-marquee-left" : "animate-marquee-right"}
              marquee-speed-${(index % 4) + 1}`}
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            {line} | {line}
          </div>
        ))}
      </div>

      {/* Center Highlighted Text with Framer Motion */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
        className="z-10 px-6 py-3 text-base sm:text-xl md:text-2xl font-semibold text-white border border-white backdrop-blur-lg bg-[rgba(0,0,0,0.8)] rounded-full shadow-[0_0_25px_rgba(255,255,255,0.4)] animate-glow"
      >
        "Confused About Your CS Career Path?"
      </motion.div>
    </section>
  );
};

export default CareerPathsSection;
