import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { tick } from "../store/gameSlice";
import { Box, Typography } from "@mui/material";

const Timer = () => {
  const dispatch = useDispatch();
  const time = useSelector((state: RootState) => state.game.timer);
  const timerRunning = useSelector(
    (state: RootState) => state.game.timerRunning,
  );

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (timerRunning) {
      interval = setInterval(() => {
        dispatch(tick());
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerRunning, dispatch]);

  return (
    <Typography
      variant="h6"
      sx={{
        color: "white",
        fontFamily: "'Press Start 2P', sans-serif",
        textShadow: "2px 2px 5px black",
        display: "flex",
        alignItems: "center",
        gap: "1px",
        marginRight: "30px",
      }}
    >
      Время:
      <Box
        component="span"
        sx={{
          display: "inline-block",
          width: "20px", // фиксируем ширину только для числа
          textAlign: "right",
        }}
      >
        {time}
      </Box>
    </Typography>
  );
};

export default Timer;
