"use client";
import React from "react";
import Landing from "./pages/Landing.tsx";
import SignUpLogIn from "./components/SignUpLogIn.tsx";
import Questionnaire from "./pages/Questionnaire.tsx";
import {auth} from "./pages/firebaseConfig.ts";
import Dashboard from "./pages/Dashboard.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import FinalizingQuestionnaire from "./pages/Finalising-questionnaire.tsx";
import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { HashRouter } from 'react-router-dom';
import Profile from "./pages/Profile.tsx";
// import Profile from "./pages/Profile.tsx";
// import Prediction from "./pages/Prediction.tsx";

const queryClient = new QueryClient();

const SmartInterestAI: React.FC = () => {
  const [user, setUser] = useState<{
    uid: string;
    email: string | null;
  } | null>(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(
        currentUser ? { uid: currentUser.uid, email: currentUser.email } : null
      );
      setLoading(false); // Set loading to false once Firebase has initialized
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div className="relative min-h-screen bg-gradient-to-tr from-black to-[#1a0e2b] overflow-x-hidden"></div>;
  }


  return (
    <main className="relative min-h-screen bg-gradient-to-tr from-black to-[#1a0e2b] overflow-x-hidden">
    {/* Background image */}
    <img
        src="/SmartInterest-AI-frontend/abstract-bg.png"
        alt="Abstract background"
        className=" inset-0 w-full h-full object-cover -z-10 pointer-events-none fixed"
      />

      <QueryClientProvider client={queryClient}>
        <HashRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<SignUpLogIn />} />
            <Route path="/signup" element={<SignUpLogIn />} />
            <Route path="/dashboard" element={user ? <Dashboard us={user} /> : <Navigate to="/login" />} />
            <Route path="/tests" element={user ? <Questionnaire us={user} /> : <Navigate to="/login" />} />
            <Route path="/predict" element={user ? <FinalizingQuestionnaire us={user} /> : <Navigate to="/login" />} />
            <Route path="/profile" element={user ? <Profile us={user} /> : <Navigate to="/login" />} />
          </Routes>
        </HashRouter>
      </QueryClientProvider>
      {/* <NavbarIfAlreadyLogin/> */}
      {/* <Dashboard/> */}
      {/* <Profile/> */}
      {/* <Questionnaire/> */}
      {/* <Prediction/> */}
    </main>
  );
};

export default SmartInterestAI;
