import React, { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import { AnimatePresence, motion } from "framer-motion";

const faqs = [
  {
    question: "How does this even work?",
    answer:
      "It’s like Iron Man’s J.A.R.V.I.S. got a degree in career counseling. You answer a few smart questions, upload your project(s), and our AI dives deep into your skills like Sherlock with a neural network. Then, bam! — it shows you the career path you never knew you were born for (with 96% accuracy, no horoscopes involved).",
  },
  {
    question: "Can it really understand my college project? It was... kinda Uneven.",
    answer:
      "Don't worry — our AI has seen things... GitHub repos with commit messages like 'final_final_FIX2_done_thisone.' It thrives in chaos and still finds potential like a recruiter with X-ray vision.",
  },
  {
    question: "Will this guarantee me a job at Google?",
    answer:
      "That's like asking if buying a gym membership gives you abs. We'll guide you to your best-fit path — what you do with that map is up to you.",
  },
  {
    question: "What if I don't like the career path it suggests?",
    answer:
      "The AI suggests. You decide. It’s like a GPS — you can take a detour. But let’s be honest… it’s usually right. (Even your confused inner self agrees.)",
  },
];

const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <section
      className="px-6 py-20 mb-20 max-w-5xl mx-auto text-white bg-gradient-to-br from-transparent via-[#0e0b1d] to-transparent shadow-white rounded-xl"
      data-aos="fade-up"
    >
      <h2
        className="text-4xl sm:text-5xl font-bold text-center mb-12 underline underline-offset-8 decoration-white"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        Frequently Asked Questions
      </h2>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl transition-all duration-300"
            data-aos="fade-up"
            data-aos-delay={index * 100 + 200}
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex items-center justify-between text-left p-5 sm:p-6 focus:outline-none"
            >
              <h3 className="text-lg sm:text-xl font-semibold text-white">
                Q: {faq.question}
              </h3>
              <span className="ml-4">
                {openIndex === index ? (
                  <FaChevronUp className="text-white/80" />
                ) : (
                  <FaChevronDown className="text-white/50" />
                )}
              </span>
            </button>

            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.1 }}
                  className="px-5 sm:px-6 pb-5 sm:pb-6 text-white/80 text-sm sm:text-base leading-relaxed overflow-hidden"
                >
                  {faq.answer}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
