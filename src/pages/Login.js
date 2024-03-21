import React, { useEffect, useRef } from "react";
import {
  Container,
  TextField,
  Typography,
  Divider,
  Box,
  Button,
  CssBaseline,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useKeycloak } from "keycloak-react-web";
import { useNavigate } from "react-router-dom";
import logo from "../imgs/logo.png";
import keycloakLogo from "../imgs/keycloak.png";
import "./login.css";

const defaultTheme = createTheme();

export default function LoginPage() {
  const isFirstMount = useRef(false);
  const navigate = useNavigate();
  const { keycloak } = useKeycloak();

  useEffect(() => {
    if (keycloak.authenticated && !isFirstMount.current) {
      isFirstMount.current = true;
      navigate("/home");
    }
  }, [keycloak.authenticated, navigate]);

  const login = () => {
    keycloak.login({ redirectUri: `${process.env.REACT_APP_URL}/home` });
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div className="round-image-container">
            <img src={logo} alt="Logo" className="round-image" />
          </div>
          <Typography className="title" component="h1" variant="h5">
            TaskPlanner
          </Typography>

          <Box
            component="form"
            // onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 3, borderRadius: 28 }}
            >
              Sign In
            </Button>
          </Box>
          <Divider className="divider">or</Divider>
          <Button
            type="submit"
            fullWidth
            variant="outlined"
            sx={{
              mt: 3,
              borderRadius: 28,
            }}
            onClick={login}
          >
            <img
              src={keycloakLogo}
              alt="keycloak"
              className="round-keycloak-image"
            />
            Sign in with Keycloak
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
