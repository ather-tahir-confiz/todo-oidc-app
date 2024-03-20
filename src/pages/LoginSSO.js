import React, { useEffect, useRef } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useKeycloak } from "keycloak-react-web";
import { useNavigate } from "react-router-dom";

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
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            OIDC Todo App
          </Typography>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={login}
          >
            Sign in with Keycloak
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
