import React, { useEffect, useRef } from "react";
import Board from "../components/Board";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { openCell, toggleFlag } from "../store/gameSlice";
import Controls from "../components/Controls";
import GameOverModal from "../components/GameOverModal";
import Music from "../components/Music";
import FighterAnimation from "../components/FighterAnimation";

const Game = () => {
  const dispatch = useDispatch();
  const board = useSelector((state: RootState) => state.game.board);
  const gameOver = useSelector((state: RootState) => state.game.gameOver);
  const victory = useSelector((state: RootState) => state.game.victory);
  const timer = useSelector((state: RootState) => state.game.timer);

  const handleCellClick = (row: number, col: number) => {
    dispatch(openCell({ row, col }));
  };

  const handleCellRightClick = (
    row: number,
    col: number,
    e: React.MouseEvent,
  ) => {
    e.preventDefault();
    dispatch(toggleFlag({ row, col }));
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        height: "100vh",
        overflow: "hidden", 
      }}
    >
      <Music />
      <div
        style={{
          backgroundImage: "url('images/img.png')",
          backgroundSize: "cover",
          border: "15px solid #a8a8a8",
          boxShadow: "inset 5px 5px 10px #333, inset -5px -5px 10px #555",
          borderRadius: "10px",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
          maxWidth: "95vw", 
        }}
      >
        <Controls />
        <Board
          board={board}
          onCellClick={handleCellClick}
          onCellRightClick={handleCellRightClick}
        />
        <GameOverModal open={gameOver} victory={victory} time={timer} />
      </div>
      <FighterAnimation />
    </div>
  );
};

export default Game;
