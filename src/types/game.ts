import { Difficulty } from "../constants/difficulty";

export interface Cell {
  isMine: boolean;
  isOpen: boolean;
  mark: "none" | "flag" | "question";
  adjacentMines: number;
}

export interface GameState {
  name: null | string;
  difficulty: Difficulty;
  board: Cell[][];
  gameOver: boolean;
  victory: boolean;
  minesLeft: number;
  firstClick: { row: number; col: number } | null;
  timer: number;
  timerRunning: boolean;
}

export interface Score {
  timer: number;
  date: string;
  difficulty: Difficulty;
}

export interface LeaderboardEntry {
  name: string;
  time: number;
  difficulty: string;
}
