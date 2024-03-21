import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { KeycloakProvider, useKeycloak } from "keycloak-react-web";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import keycloak from "./keycloak";
import LoginPage from "./pages/Login";
import HomePage from "./pages/Home";

function App() {
  return (
    <KeycloakProvider client={keycloak}>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/" element={<ProtectedRoute />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </KeycloakProvider>
  );
}

function ProtectedRoute() {
  const { keycloak, initialized } = useKeycloak();
  const token = JSON.parse(localStorage.getItem("keycloak_token"));
  // console.log("keycloak?.authenticated", keycloak?.authenticated);
  // console.log("keycloak?.authenticated", token?.access_token);

  if (!initialized) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (keycloak.authenticated || token?.access_token) {
    return <Navigate to="/home" replace />;
  }

  return <Navigate to="/login" replace />;
}

export default App;
