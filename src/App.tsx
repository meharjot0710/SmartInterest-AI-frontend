"use client";
import React from "react";
import Landing from "./pages/Landing.tsx";
import SignUpLogIn from "./components/SignUpLogIn.tsx";
import Questionnaire from "./pages/Questionnaire.tsx";
import NavBar from "./components/NavBar.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import FinalizingQuestionnaire from "./pages/Finalising-questionnaire.tsx";

const SmartInterestAI: React.FC = () => {
  return (
    <main className="min-h-screen bg-gradient-to-tr from-black to-[#1a0e2b] overflow-x-hidden">
      <NavBar/>
      {/* <Landing/> */}
      {/* <SignUpLogIn/> */}
      {/* <Questionnaire/> */}
      {/* <FinalizingQuestionnaire/> */}
      <Dashboard/>

    </main>
  );
};

export default SmartInterestAI;
