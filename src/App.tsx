import React from "react";
import { Route, Routes } from "react-router-dom";
import Game from "./pages/Game";
import Leaderboard from "./pages/Leaderboard";
import Settings from "./pages/Settings";
import StartPage from "./pages/StartPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<StartPage />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/game" element={<Game />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
    </Routes>
  );
}

export default App;
