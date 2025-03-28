import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Cell, GameState } from "../types/game";
import { createBoard } from "../utils/createBoard";
import { Difficulty, difficultySettings } from "../constants/difficulty";

const saveDifficulty = localStorage.getItem(
  "minesweeper_difficulty",
) as Difficulty | null;

const initialState: GameState = {
  name: null,
  difficulty: saveDifficulty || "easy",
  board: createBoard(saveDifficulty || "easy"),
  gameOver: false,
  victory: false,
  minesLeft: difficultySettings["easy"].mines,
  firstClick: null,
  timer: 0,
  timerRunning: false,
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setNamePlayer: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },

    setDifficulty: (state, action: PayloadAction<Difficulty>) => {
      state.difficulty = action.payload;
      localStorage.setItem("minesweeper_difficulty", action.payload);
      state.firstClick = null;
      state.board = createBoard(action.payload);
      state.gameOver = false;
      state.victory = false;
      state.minesLeft = difficultySettings[action.payload].mines;
      state.timer = 0;
      state.timerRunning = false;
    },

    startTimer: (state) => {
      state.timerRunning = true;
    },

    stopTimer: (state) => {
      state.timerRunning = false;
    },

    tick: (state) => {
      if (state.timerRunning) {
        state.timer += 1;
      }
    },

    openCell: (state, action: PayloadAction<{ row: number; col: number }>) => {
      if (state.gameOver) return; 

      const { row, col } = action.payload;
      let cell = state.board[row][col];

      if (cell.isOpen || cell.mark === "flag") return;

      if (!state.firstClick) {
        state.firstClick = { row, col };
        state.board = createBoard(state.difficulty, state.firstClick);
        cell = state.board[row][col];
        state.timerRunning = true;
      }

      cell.isOpen = true;

      if (cell.isMine) {
        state.board.forEach((row) =>
          row.forEach((c) => {
            if (c.isMine) c.isOpen = true;
          }),
        );

        state.gameOver = true;
        state.victory = false;
        state.timerRunning = false;

        return;
      }

      if (cell.adjacentMines === 0) {
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

        const openAdjacentCells = (r: number, c: number) => {
          directions.forEach(([dx, dy]) => {
            const newRow = r + dx;
            const newCol = c + dy;

            if (
              newRow >= 0 &&
              newRow < state.board.length &&
              newCol >= 0 &&
              newCol < state.board[0].length
            ) {
              const neighborCell = state.board[newRow][newCol];
              if (
                !neighborCell.isOpen &&
                !neighborCell.isMine &&
                neighborCell.mark !== "flag"
              ) {
                neighborCell.isOpen = true;
                if (neighborCell.adjacentMines === 0) {
                  openAdjacentCells(newRow, newCol);
                }
              }
            }
          });
        };

        openAdjacentCells(row, col);
      }

      //проверка победы

      const cells = state.board.flat();
      const allSafeCellOpened = cells.every((cell) =>
        !cell.isMine ? cell.isOpen : true,
      );
      const allMinesFlagged = cells.every((cell) =>
        cell.isMine ? cell.mark === "flag" : true,
      );
      if (
        (allSafeCellOpened || (allMinesFlagged && state.minesLeft === 0)) &&
        !state.victory
      ) {
        state.victory = true;
        state.gameOver = true;
        state.timerRunning = false;

        const newRecord = {
          name: state.name,
          difficulty: state.difficulty,
          time: state.timer,
        };

        const records = JSON.parse(
          localStorage.getItem("minesweeper_leaderboard") || "[]",
        );

        records.push(newRecord);

        localStorage.setItem(
          "minesweeper_leaderboard",
          JSON.stringify(records),
        );
      }
    },

    toggleFlag: (
      state,
      action: PayloadAction<{ row: number; col: number }>,
    ) => {
      if (state.gameOver) return;

      const { row, col } = action.payload;
      const cell = state.board[row][col];

      if (cell.isOpen) return;

      switch (cell.mark) {
        case "none":
          cell.mark = "flag";
          state.minesLeft -= 1;
          break;
        case "flag":
          cell.mark = "question";
          state.minesLeft += 1;
          break;
        case "question":
          cell.mark = "none";
          break;
      }
    },

    resetGame: (state) => {
      state.firstClick = null;
      state.board = createBoard(state.difficulty);
      state.gameOver = false;
      state.minesLeft = difficultySettings[state.difficulty].mines;
      state.victory = false;
      state.timerRunning = false;
      state.timer = 0;
    },
  },
});

export const {
  openCell,
  toggleFlag,
  setDifficulty,
  resetGame,
  tick,
  startTimer,
  stopTimer,
  setNamePlayer,
} = gameSlice.actions;
export default gameSlice.reducer;
