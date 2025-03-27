import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import React, { useEffect } from "react";
import { LeaderboardEntry } from "../types/game";
import { useNavigate } from "react-router-dom";

const Leaderboard = () => {
  const [records, setRecords] = React.useState<LeaderboardEntry[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem("minesweeper_leaderboard");
    if (saved) {
      setRecords(JSON.parse(saved));
    }
  }, []);

  return (
    <Container
      maxWidth="sm"
      sx={{
        mt: 20,
        fontFamily: "'Press Start 2P', sans-serif",
        backgroundColor: "#111",
        border: "4px solid red",
        borderRadius: "10px",
        boxShadow: "0 0 20px rgba(255, 0, 0, 0.7)",
        padding: "20px",
        color: "yellow",
      }}
    >
      <Button
        onClick={() => navigate("/game")}
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

      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{
          color: "yellow",
          textShadow: "3px 3px 5px red",
          fontFamily: "'Press Start 2P', sans-serif",
        }}
      >
        🏆 Таблица лидеров
      </Typography>

      <TableContainer
        component={Paper}
        sx={{
          backgroundColor: "#222",
          border: "2px solid red",
          boxShadow: "inset 0 0 10px black",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "red", fontWeight: "bold" }}>
                Имя
              </TableCell>
              <TableCell sx={{ color: "red", fontWeight: "bold" }}>
                Сложность
              </TableCell>
              <TableCell sx={{ color: "red", fontWeight: "bold" }}>
                Время (сек)
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {records.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} align="center" sx={{ color: "gray" }}>
                  Нет рекордов
                </TableCell>
              </TableRow>
            ) : (
              records
                .sort((a, b) => a.time - b.time)
                .map((entry, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      "&:nth-of-type(odd)": { backgroundColor: "#1a1a1a" },
                      "&:hover": { backgroundColor: "#333" },
                    }}
                  >
                    <TableCell sx={{ color: "yellow" }}>{entry.name}</TableCell>
                    <TableCell sx={{ color: "orange" }}>
                      {entry.difficulty}
                    </TableCell>
                    <TableCell sx={{ color: "lightgreen" }}>
                      {entry.time}
                    </TableCell>
                  </TableRow>
                ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Leaderboard;
