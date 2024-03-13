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
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<ProtectedRoute />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </KeycloakProvider>
  );
}

function ProtectedRoute() {
  const { keycloak, initialized } = useKeycloak();

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

  if (!keycloak.authenticated) {
    return <Navigate to="/" replace />;
  }

  return <HomePage />;
}

export default App;
