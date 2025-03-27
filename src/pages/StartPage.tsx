import React from "react";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const StartPage = () => {
  const navigate = useNavigate();

  return (
    <Box
      mt={3}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Button
        onClick={() => {
          navigate("/settings");
        }}
        variant="contained"
        sx={{
          fontSize: "18px",
          fontWeight: "bold",
          fontFamily: "'Press Start 2P', sans-serif",
          backgroundColor: "black",
          color: "yellow",
          border: "2px solid red",
          padding: "12px 24px",
          textShadow: "2px 2px 5px red",
          "&:hover": {
            backgroundColor: "red",
            color: "black",
          },
        }}
      >
        Войти в игру
      </Button>
    </Box>
  );
};

export default StartPage;
