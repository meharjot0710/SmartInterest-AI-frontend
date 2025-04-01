"use client";
import React from "react";
import Landing from "./pages/Landing.tsx";
import SignUpLogIn from "./components/SignUpLogIn.tsx";
import Questionnaire from "./pages/Questionnaire.tsx";
import { auth } from "./pages/firebaseConfig.js";
import Dashboard from "./pages/Dashboard.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import FinalizingQuestionnaire from "./pages/Finalising-questionnaire.tsx";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import NavbarIfAlreadyLogin from "./components/NavbarIfAlreadyLogin.tsx";

const queryClient = new QueryClient();

const SmartInterestAI: React.FC = () => {
  const [user, setUser] = useState<{
    uid: string;
    email: string | null;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(
        currentUser ? { uid: currentUser.uid, email: currentUser.email } : null
      );
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <main>
      {/* className="relative min-h-screen bg-gradient-to-tr from-black to-[#1a0e2b] overflow-x-hidden" */}
    {/* Background image */}
      <img
        src="./public/abstract-bg.png"
        alt="Abstract background"
        className="absolute inset-0 w-full h-full object-cover -z-10 pointer-events-none fixed"
      />

      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<SignUpLogIn />} />
            <Route path="/signup" element={<SignUpLogIn />} />
            <Route
              path="/dashboard"
              element={user ? <Dashboard /> : <Navigate to="/login" />}
            />
            <Route
              path="/tests"
              element={user ? <Questionnaire /> : <Navigate to="/login" />}
            />
            <Route
              path="/predict"
              element={
                user ? <FinalizingQuestionnaire /> : <Navigate to="/login" />
              }
            />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
      {/* <NavbarIfAlreadyLogin/> */}
    </main>
  );
};

export default SmartInterestAI;
