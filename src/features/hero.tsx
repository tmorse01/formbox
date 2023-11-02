import React from "react";
import { Button, Typography, Container, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Hero = ({ setLoginModalOpen }) => {
  const navigate = useNavigate();

  const handleExample = () => {
    navigate("/form/formBoxExample");
  };
  return (
    <Container
      maxWidth="md"
      sx={{
        padding: (theme) => theme.spacing(10, 0),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#f5f5f5",
        borderRadius: "8px",
        mt: 4,
      }}
    >
      <Typography
        variant="h2"
        sx={{
          marginBottom: (theme) => theme.spacing(2),
          fontWeight: 500,
        }}
      >
        Welcome to Formbox!
      </Typography>
      <Box display="grid" sx={{ gap: 0 }}>
        <Typography
          variant="h6"
          sx={{
            marginBottom: (theme) => theme.spacing(1),
            textAlign: "center",
            color: (theme) => theme.palette.text.secondary,
          }}
        >
          Create custom tailored forms, quizzes, surveys.
        </Typography>
        <Typography
          variant="h6"
          sx={{
            marginBottom: (theme) => theme.spacing(1),
            textAlign: "center",
            color: (theme) => theme.palette.text.secondary,
          }}
        >
          Share them to gather info.
        </Typography>
        <Typography
          variant="h6"
          sx={{
            marginBottom: (theme) => theme.spacing(1),
            textAlign: "center",
            color: (theme) => theme.palette.text.secondary,
          }}
        >
          Then review the responses.
        </Typography>
      </Box>
      <Box display="flex" sx={{ m: 4, gap: 4 }}>
        <Button variant="contained" color="primary" onClick={handleExample}>
          View an Example
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={setLoginModalOpen}
        >
          Sign Up
        </Button>
      </Box>
    </Container>
  );
};

export default Hero;
