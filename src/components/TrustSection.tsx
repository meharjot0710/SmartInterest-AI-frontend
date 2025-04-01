import React from "react";
import { motion } from "framer-motion";
import { FaBrain, FaCheckCircle, FaCompass } from "react-icons/fa";
import "./Styling.css";

const TrustSection: React.FC = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
    }),
  };

  const cards = [
    {
      title: "AI Trained",
      description: "Powered by AI trained on 300,000+ career journeys",
      icon: <FaBrain className="text-3xl text-purple-400 mb-4" />,
    },
    {
      title: "93.25% Accuracy",
      description: "Backed by real-world results and verified case studies",
      icon: <FaCheckCircle className="text-3xl text-green-400 mb-4" />,
    },
    {
      title: "Only Clarity",
      description: "No more confusion — your path made crystal clear",
      icon: <FaCompass className="text-3xl text-pink-400 mb-4" />,
    },
  ];

  return (
    <section className="px-6 py-20 mb-20 text-white relative overflow-hidden bg-[radial-gradient(ellipse_at_center,_#1a112a_20%,_transparent_50%)]">
      {/* Header */}
      <div className="flex flex-col items-center mb-16 text-center">
        <div className="flex items-center gap-3">
          <h2 className="text-4xl sm:text-5xl font-bold">Why Trust Us?</h2>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/bb44f7680e8b0d59f16bae5ff0df12f6303bf596"
            alt="Trust icon"
            className="h-8 w-8"
          />
        </div>
        <div className="w-12 h-1 bg-purple-500 rounded-full mt-3" />
      </div>

      {/* Cards Section */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-lg hover:shadow-purple-500/20 hover:scale-102 transition-all cursor-pointer duration-300"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={index}
            variants={cardVariants}
          >
            <div className="flex flex-col items-start">
              {card.icon}
              <h3 className="text-xl font-semibold mb-2 text-white">
                {card.title}
              </h3>
              <p className="text-white/70 text-base">{card.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TrustSection;
