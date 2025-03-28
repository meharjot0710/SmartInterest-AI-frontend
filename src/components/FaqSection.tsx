import React from "react";
import FaqItem from "./FaqItem";

const FaqSection: React.FC = () => {
  return (
    <section className="px-6 sm:px-10 md:px-20 py-10 text-white">
      <h2 className="mb-10 text-3xl sm:text-4xl md:text-5xl font-bold underline">
        Frequently Asked Questions:~
      </h2>
      <div className="flex flex-col gap-4">
        <FaqItem
          question="Q: How does this even work?"
          answer={
            <>
              <span>
                Imagine Iron Man's J.A.R.V.I.S. got a degree in career counseling. You answer a few smart questions, upload your project(s), and our AI digs deep into your skills like Sherlock with a neural network. Then, bam! — it shows you the career path you never knew you were born for (with
              </span>
              <span className="text-white"> 96% accuracy</span>
              <span>, no horoscopes involved).</span>
            </>
          }
        />
        <FaqItem
          question="Q: Can it really understand my college project? It was… kinda Uneven."
          answer={
            <>
              <span className="text-white">Don't worry</span>
              <span>
                — our AI has seen things… GitHub repos with commit messages like "final_final_FIX2_done_thisone." It thrives in chaos and still finds potential like a recruiter with X-ray vision.
              </span>
            </>
          }
        />
        <FaqItem
          question="Q: Will this guarantee me a job at Google?"
          answer={
            <>
              <span>
                That's like asking if buying a gym membership gives you abs. We'll
              </span>
              <span className="text-white"> guide </span>
              <span>
                you to your best-fit path — what you do with that map is up to you.
              </span>
            </>
          }
        />
        <FaqItem
          question="Q: What if I don't like the career path it suggests?"
          answer={
            <>
              <span>
                The AI suggests. You decide. It's like a GPS — you can take a
              </span>
              <span className="text-white"> detour </span>
              <span>
                . But let's be honest… it's usually right. (Even your confused inner self agrees.)
              </span>
            </>
          }
        />
      </div>
    </section>
  );
};

export default FaqSection;
