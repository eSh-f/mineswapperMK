import { Box, Button, Modal, Typography } from "@mui/material";
import React, { FC, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { resetGame } from "../store/gameSlice";

interface IGameOverModalProps {
  open: boolean;
  victory: boolean;
  time: number;
}

const GameOverModal: FC<IGameOverModalProps> = ({ open, victory, time }) => {
  const soundRef = useRef<HTMLAudioElement | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!open) return;

    const backgroundMusic = document.querySelector("audio");
    if (backgroundMusic) {
      backgroundMusic.pause();
    }

    const sound = new Audio(
      victory
        ? "/mineswapperMK/audio/victory.mp3"
        : "/mineswapperMK/audio/lose.mp3",
    );
    sound.volume = 0.3;
    sound.play().catch((e) => console.error(e));
    soundRef.current = sound;

    return () => {
      soundRef.current?.pause();
    };
  }, [open, victory]);

  const handleRestart = () => {
    dispatch(resetGame());

    const backgroundMusic = document.querySelector("audio") as HTMLAudioElement;
    if (backgroundMusic) {
      backgroundMusic.currentTime = 0;
      backgroundMusic.volume = 0.3;
      backgroundMusic.play().catch((e) => {
        console.warn("Autoplay prevented:", e);
      });
    }
  };

  return (
    <Modal open={open} onClose={handleRestart}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 300,
          bgcolor: "#111",
          border: "2px solid red",
          boxShadow: 24,
          p: 4,
          textAlign: "center",
          color: "yellow",
          fontFamily: "'Press Start 2P', sans-serif'",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            textShadow: "2px 2px 5px red, mb: 2",
          }}
        >
          {victory ? "Победа!" : "Игра окончена!"}
        </Typography>
        <Typography variant="h6">Время: {time} сек.</Typography>
        <Button
          variant="contained"
          onClick={handleRestart}
          sx={{
            mt: 2,
            fontWeight: "bold",
            backgroundColor: "black",
            color: "yellow",
            border: "2px solid red",
            textShadow: "1px 1px 3px red",
            "&:hover": { backgroundColor: "red", color: "black" },
          }}
        >
          Начать заново
        </Button>
      </Box>
    </Modal>
  );
};

export default GameOverModal;
