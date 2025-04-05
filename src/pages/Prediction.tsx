import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const StatCard = ({ title, value }: { title: string; value: string }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-white/5 border border-white/10 rounded-xl shadow-sm p-5 text-center"
    >
      <h3 className="text-sm font-medium text-gray-300 mb-1">{title}</h3>
      <p className="text-xl font-semibold text-white">{value}</p>
    </motion.div>
  );
};

const Prediction = () => {
  const [showAnimation, setShowAnimation] = useState(false);
  const [showPrediction, setShowPrediction] = useState(false);
  const [showStats, setShowStats] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setShowAnimation(true), 500);
    const timer2 = setTimeout(() => setShowPrediction(true), 1800);
    const timer3 = setTimeout(() => setShowStats(true), 3300);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-Transparent text-white px-4 overflow-hidden">
      <AnimatePresence>
        {showAnimation && (
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
            className="flex flex-col items-center justify-center mb-6"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1.2 }}
              transition={{ type: "spring", stiffness: 200, damping: 12 }}
              className="mb-3"
            >
              <CheckCircle2 className="w-16 h-16 text-green-400" />
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-base text-green-300 tracking-wide"
            >
              Prediction Successful
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showPrediction && (
          <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-2xl md:text-4xl font-semibold mb-8 text-center"
        >
          Your Ideal Career Path:{" "}
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1.5 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            className="text-indigo-600 font-mono"
          >
            &lt;/Web Development&gt;
          </motion.span>
        </motion.h1>
        )}
      </AnimatePresence>

      {/* {showStats && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl"
        >
          <StatCard title="Average Salary" value="₹8,00,000 / year" />
          <StatCard title="Job Demand" value="High 🚀" />
          <StatCard title="Growth Rate" value="22% YoY" />
        </motion.div>
      )} */}
    </div>
  );
};

export default Prediction;
