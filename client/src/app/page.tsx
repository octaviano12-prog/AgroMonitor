"use client";
import { useState } from "react";
import AppShell from "./components/AppShell";
import LoginPage from "./components/LoginPage";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isLoggedIn) return <LoginPage onLogin={() => setIsLoggedIn(true)} />;
  return <AppShell />;
}
