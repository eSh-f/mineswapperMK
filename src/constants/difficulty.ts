export type Difficulty = "easy" | "medium" | "hard";

export const difficultySettings: Record<
  Difficulty,
  { rows: number; cols: number; mines: number }
> = {
  easy: { rows: 8, cols: 8, mines: 10 },
  medium: { rows: 16, cols: 16, mines: 40 },
  hard: { rows: 16, cols: 32, mines: 100 },
};
