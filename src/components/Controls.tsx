import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { resetGame } from "../store/gameSlice";
import Timer from "./Timer";
import { Box, Button, Typography } from "@mui/material";

const Controls = () => {
  const dispatch = useDispatch();
  const minesLeft = useSelector((state: RootState) => state.game.minesLeft);
  const gameOver = useSelector((state: RootState) => state.game.gameOver);
  const victory = useSelector((state: RootState) => state.game.victory);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 2,
        backgroundImage: "url('/public/images/img.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "20px",
        borderRadius: "10px",
        border: "4px solid #3a3a3a",
        boxShadow: "inset 0px 0px 8px rgba(0, 0, 0, 0.8)",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          color: "white",
          fontFamily: "'Press Start 2P', sans-serif",
          textShadow: "2px 2px 5px black",
          display: "flex",
          alignItems: "center",
          gap: "1px",
          marginRight: 4,
        }}
      >
        Мины:
        <Box
          component="span"
          sx={{
            display: "inline-block",
            width: "20px", // фиксируем ширину только для числа
            textAlign: "right",
          }}
        >
          {minesLeft}
        </Box>
      </Typography>

      <Timer />

      <Button
        onClick={() => dispatch(resetGame())}
        sx={{
          width: "100px",
          backgroundColor: "#111",
          color: "yellow",
          fontFamily: "'Press Start 2P', sans-serif",
          fontSize: "10px",
          border: "3px solid #444",
          boxShadow:
            "inset 4px 4px 6px rgba(0, 0, 0, 0.9), inset -2px -2px 4px rgba(255, 255, 255, 0.3)",
          textShadow: "2px 2px 3px black",
          "&:hover": {
            backgroundColor: "red",
            color: "black",
          },
        }}
      >
        Рестарт
      </Button>

      <Button
        onClick={() => (window.location.href = "/settings")}
        sx={{
          width: "100px",
          backgroundColor: "#111",
          color: "yellow",
          fontFamily: "'Press Start 2P', sans-serif",
          fontSize: "10px",
          border: "3px solid #444",
          boxShadow:
            "inset 4px 4px 6px rgba(0, 0, 0, 0.9), inset -2px -2px 4px rgba(255, 255, 255, 0.3)",
          textShadow: "2px 2px 3px black",
          "&:hover": {
            backgroundColor: "red",
            color: "black",
          },
        }}
      >
        Назад
      </Button>

      <Button
        onClick={() => (window.location.href = "/leaderboard")}
        sx={{
          width: "100px",
          backgroundColor: "#111",
          color: "yellow",
          fontFamily: "'Press Start 2P', sans-serif",
          fontSize: "10px",
          border: "3px solid #444",
          boxShadow:
            "inset 4px 4px 6px rgba(0, 0, 0, 0.9), inset -2px -2px 4px rgba(255, 255, 255, 0.3)",
          textShadow: "2px 2px 3px black",
          "&:hover": {
            backgroundColor: "red",
            color: "black",
          },
        }}
      >
        Таблица лидеров
      </Button>
    </Box>
  );
};

export default Controls;
