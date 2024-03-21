import React, { useState } from "react";
import {
  Container,
  TextField,
  Typography,
  Divider,
  Box,
  Button,
  CssBaseline,
  CircularProgress,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useKeycloak } from "keycloak-react-web";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CustomSnackbar from "../components/snackbar";
import logo from "../imgs/logo.png";
import keycloakLogo from "../imgs/keycloak.png";
import "./login.css";

const defaultTheme = createTheme();

export default function LoginPage() {
  const { keycloak } = useKeycloak();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleSSOLogin = () => {
    keycloak.login({ redirectUri: `${process.env.REACT_APP_URL}` });
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    const data = new FormData(event.currentTarget);

    try {
      const response = await axios.post(
        "https://keycloak-oauth.azurewebsites.net/auth/realms/confiz-keycloak/protocol/openid-connect/token",
        {
          grant_type: "password",
          client_id: "todo-app-password-client",
          username: data.get("email"),
          password: data.get("password"),
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      localStorage.setItem("keycloak_token", JSON.stringify(response.data));

      navigate("/");
    } catch (error) {
      setSnackbarMessage(error?.response?.data?.error_description);
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CustomSnackbar
        open={openSnackbar}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        severity={snackbarSeverity}
      />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box className="login-container">
          <div className="round-image-container">
            <img src={logo} alt="Logo" className="round-image" />
          </div>
          <Typography className="title" component="h1" variant="h5">
            TaskPlanner
          </Typography>

          <Box
            component="form"
            onSubmit={handleLogin}
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
            {loading && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CircularProgress />
              </Box>
            )}
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
            onClick={handleSSOLogin}
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
