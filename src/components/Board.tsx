import React, { FC } from "react";
import Cell from "./Cell";
import { Cell as CellType } from "../types/game";
import { Box } from "@mui/material";

type TBoardProps = {
  board: CellType[][];
  onCellClick: (row: number, col: number) => void;
  onCellRightClick: (row: number, col: number, e: React.MouseEvent) => void;
};

const Board: FC<TBoardProps> = ({ board, onCellClick, onCellRightClick }) => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: `repeat(${board[0]?.length || 1}, 30px)`, // Меняем местами rows и cols
        gridTemplateRows: `repeat(${board.length || 1}, 30px)`, // Указываем строки правильно
      }}
    >
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <Cell
            key={`${rowIndex}-${colIndex}`}
            cell={cell}
            row={rowIndex}
            col={colIndex}
            onClick={() => onCellClick(rowIndex, colIndex)}
            onRightClick={(row, col, e) => {
              e.preventDefault();
              onCellRightClick(rowIndex, colIndex, e);
            }}
          />
        )),
      )}
    </Box>
  );
};

export default Board;
