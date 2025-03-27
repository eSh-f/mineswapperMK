import React, { FC } from "react";
import { Cell as CellType } from "../types/game";
import { Box } from "@mui/material";
interface ICellProps {
  cell: CellType;
  row: number;
  col: number;
  onClick: (row: number, col: number) => void;
  onRightClick: (row: number, col: number, e: React.MouseEvent) => void;
}

const Cell: FC<ICellProps> = ({ cell, row, col, onClick, onRightClick }) => {
  let cellCountent: React.ReactNode = (
    <img
      src="/icons/cellIcon.png"
      alt="Закрытая клетка"
      width="24"
      height="24"
    />
  );

  const colorMap: Record<number, string> = {
    1: "blue",
    2: "green",
    3: "red",
    4: "darkblue",
    5: "brown",
    6: "turquoise",
    7: "black",
    8: "white",
  };

  if (cell.isOpen) {
    if (cell.isMine) {
      cellCountent = "💣"; // мина
    } else if (cell.adjacentMines > 0) {
      cellCountent = (
        <span style={{ color: colorMap[cell.adjacentMines] }}>
          {cell.adjacentMines.toString()}
        </span>
      );
    } else {
      cellCountent = ""; // пустая клетка
    }
  } else {
    if (cell.mark === "flag") {
      cellCountent = "🚩";
    } else if (cell.mark === "question") {
      cellCountent = "❓";
    }
  }

  return (
    <Box
      className="cell"
      onClick={() => onClick(row, col)}
      onContextMenu={(e) => {
        e.preventDefault();
        onRightClick(row, col, e);
      }}
      sx={{
        width: "30px",
        height: "30px",
        border: "1px solid black",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "20px",
        cursor: "pointer",
        backgroundColor: cell.isOpen ? "#ddd" : "#aaa",
      }}
    >
      {cellCountent}
    </Box>
  );
};

export default Cell;
