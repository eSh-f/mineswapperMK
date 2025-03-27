import React, { useEffect, useRef } from "react";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const difficultyToMusic: Record<string, string> = {
  easy: "/audio/easy.mp3",
  medium: "/audio/medium.mp3",
  hard: "/audio/hard.mp3",
  default: "/audio/mk3.mp3",
};

const Music = () => {
  const location = useLocation();
  const difficulty = useSelector((state: RootState) => state.game.difficulty);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const isInSettings = location.pathname === "/settings";
    const src = isInSettings
      ? difficultyToMusic.default
      : difficultyToMusic[difficulty] || difficultyToMusic.default;

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.src = src;
      audioRef.current.volume = 0.2;
      audioRef.current.play().catch((e) => console.warn("Audio error:", e));
    }
  }, [difficulty, location.pathname]);

  return (
    <audio
      ref={audioRef}
      src={difficultyToMusic.default}
      autoPlay
      loop
      preload="auto"
    />
  );
};

export default Music;
