"use client";
import { useEffect, useState } from "react";
import AppShell from "./components/AppShell";
import LoginPage from "./components/LoginPage";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(Boolean(localStorage.getItem("token")) || localStorage.getItem("demoMode") === "true");
  }, []);

  if (!isLoggedIn) return <LoginPage onLogin={() => setIsLoggedIn(true)} />;
  return <AppShell />;
}
