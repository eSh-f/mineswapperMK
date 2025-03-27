import { Cell } from "../types/game";
import { Difficulty, difficultySettings } from "../constants/difficulty";

export const createBoard = (
  difficulty: Difficulty,
  firstClick?: { row: number; col: number },
): Cell[][] => {
  const { rows, cols, mines } = difficultySettings[difficulty];

  let board: Cell[][] = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({
      isMine: false,
      isOpen: false,
      mark: "none",
      adjacentMines: 0,
    })),
  );

  let minesPlaced = 0;
  while (minesPlaced < mines) {
    let row = Math.floor(Math.random() * rows);
    let col = Math.floor(Math.random() * cols);

    if (firstClick && row === firstClick.row && col === firstClick.col)
      continue;

    if (!board[row][col].isMine) {
      board[row][col].isMine = true;
      minesPlaced++;
    }
  }

  const directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (board[row][col].isMine) continue;

      let count = 0;
      directions.forEach(([dx, dy]) => {
        let newRow = row + dx;
        let newCol = col + dy;

        if (
          newRow >= 0 &&
          newRow < rows &&
          newCol >= 0 &&
          newCol < cols &&
          board[newRow][newCol].isMine
        ) {
          count++;
        }
      });

      board[row][col].adjacentMines = count;
    }
  }

  return board;
};
