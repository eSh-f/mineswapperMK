import {
  Box,
  Button,
  Container,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Difficulty } from "../constants/difficulty";
import { resetGame, setDifficulty } from "../store/gameSlice";
import PlayerInput, { PlayerInputHandle } from "../components/PlayerInput";
import Music from "../components/Music";

const Settings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedDifficulty, setSelectedDifficulty] =
    useState<Difficulty>("easy");

  const playerInputRef = useRef<PlayerInputHandle>(null);
  const soundEffectRef = useRef<HTMLAudioElement | null>(null);

  const handleStart = async () => {
    const isValid = await playerInputRef.current?.submit();
    if (!isValid) return;
    dispatch(setDifficulty(selectedDifficulty));
    dispatch(resetGame());
    navigate("/game");
  };

  useEffect(() => {
    const playSound = (src: string) => {
      const audio = new Audio(src);
      audio.volume = 0.2;
      soundEffectRef.current = audio;
      audio.play();
    };

    switch (selectedDifficulty) {
      case "easy":
        playSound("mineswapperMK/audio/round1.mp3");
        break;
      case "medium":
        playSound("mineswapperMK/audio/round2.mp3");
        break;
      case "hard":
        playSound("mineswapperMK/audio/round3.mp3");
        break;
    }
  }, [selectedDifficulty]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Music />
      <Container
        maxWidth="sm"
        sx={{
          textAlign: "center",
          fontFamily: "'Press Start 2P', sans-serif",
          backgroundColor: "#111",
          color: "yellow",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0px 0px 20px rgba(255, 0, 0, 0.8)",
          border: "2px solid red",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            mb: 2,
            textShadow: "3px 3px 5px red",
            fontFamily: "'Press Start 2P', sans-serif",
          }}
        >
          Выберите уровень сложности
        </Typography>

        <RadioGroup
          value={selectedDifficulty}
          onChange={(e) => setSelectedDifficulty(e.target.value as Difficulty)}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <FormControlLabel
            value="easy"
            control={<Radio sx={{ color: "yellow" }} />}
            label="💀 Простой (8х8, 10 мин)"
          />
          <FormControlLabel
            value="medium"
            control={<Radio sx={{ color: "yellow" }} />}
            label="💀 💀 Средний (16х16, 40 мин)"
          />
          <FormControlLabel
            value="hard"
            control={<Radio sx={{ color: "yellow" }} />}
            label="💀 💀 💀 Сложный (32x16, 100 мин)"
          />
        </RadioGroup>

        <PlayerInput ref={playerInputRef} />

        <Box mt={3}>
          <Button
            onClick={handleStart}
            variant="contained"
            sx={{
              fontSize: "18px",
              fontWeight: "bold",
              fontFamily: "'Press Start 2P', sans-serif",
              backgroundColor: "black",
              color: "yellow",
              border: "2px solid red",
              padding: "12px 24px",
              textShadow: "2px 2px 5px red",
              "&:hover": {
                backgroundColor: "red",
                color: "black",
              },
            }}
          >
            Начать игру
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Settings;
