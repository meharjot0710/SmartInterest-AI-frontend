// "use client";
// import React, { useState } from "react";

// interface FaqItemProps {
//   question: string;
//   answer: React.ReactNode;
// }

// const FaqItem: React.FC<FaqItemProps> = ({ question, answer }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div className="px-4 py-3 rounded-xl border border-zinc-800 bg-zinc-950 bg-opacity-50 transition-all duration-300">
//       <button
//         className="flex justify-between items-center w-full text-left"
//         onClick={() => setIsOpen(!isOpen)}
//         aria-expanded={isOpen}
//         aria-controls={`answer-${question.replace(/\s+/g, "-").toLowerCase()}`}
//       >
//         <h3 className="text-lg sm:text-xl md:text-2xl font-medium text-fuchsia-100">
//           {question}
//         </h3>
//         <img
//           src="https://cdn.builder.io/api/v1/image/assets/TEMP/e591dde75a3524a78faeae868b146d9c0513061e"
//           alt={isOpen ? "Collapse" : "Expand"}
//           className={`w-6 h-6 sm:w-7 sm:h-7 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
//         />
//       </button>
//       <div
//         id={`answer-${question.replace(/\s+/g, "-").toLowerCase()}`}
//         className={`mt-3 text-base sm:text-lg text-neutral-400 transition-all duration-300 ${isOpen ? "block" : "hidden"}`}
//       >
//         {answer}
//       </div>
//     </div>
//   );
// };

// export default FaqItem;