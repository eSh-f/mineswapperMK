import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const animations = {
  idle: "/gif/stand.gif",
  sAttack: "/gif/sAtack.gif",
  kWin: "/gif/kWin.gif",
  victory: "/gif/sWin.gif",
};

const FighterAnimation = () => {
  const victory = useSelector((state: RootState) => state.game.victory);
  const gameOver = useSelector((state: RootState) => state.game.gameOver);
  const firstClick = useSelector((state: RootState) => state.game.firstClick);
  const board = useSelector((state: RootState) => state.game.board);

  const [animationSrc, setAnimationSrc] = useState(animations.idle);
  const [lastOpenedCount, setLastOpenedCount] = useState(0);

  useEffect(() => {
    if (!gameOver && !victory) {
      setAnimationSrc(animations.idle);
      setLastOpenedCount(0);
    }
  }, [gameOver, victory]);

  useEffect(() => {
    if (gameOver) {
      setAnimationSrc(victory ? animations.victory : animations.kWin);
      return;
    }

    const opened = board
      .flat()
      .filter((cell) => cell.isOpen && !cell.isMine).length;
    if (opened > lastOpenedCount) {
      setAnimationSrc(animations.sAttack);
      setLastOpenedCount(opened);

      const timeout = setTimeout(() => {
        setAnimationSrc(animations.idle);
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [board, gameOver, victory]);

  return (
    <div style={{ marginTop: 20 }}>
      <img
        src={animationSrc}
        alt="Fighter animation"
        style={{ width: 500, height: 250 }}
      />
    </div>
  );
};

export default FighterAnimation;
