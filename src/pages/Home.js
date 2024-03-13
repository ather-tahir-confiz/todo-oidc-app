import React, { useEffect, useState, useRef } from "react";
import { useKeycloak } from "keycloak-react-web";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Navbar from "../components/navbar";
import Profile from "./Profile";

function HomePage() {
  const navigate = useNavigate();
  const isFirstMount = useRef(false);

  const { keycloak, initialized } = useKeycloak();
  const [isHome, setIsHome] = useState(true);

  useEffect(() => {
    if (!keycloak.authenticated && !isFirstMount.current) {
      isFirstMount.current = true;
      navigate("/");
    }
  }, [keycloak.authenticated, navigate]);

  if (!initialized) {
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <CircularProgress />
    </Box>;
  }

  return (
    <div>
      <Navbar setIsHome={setIsHome} />
      {keycloak.authenticated &&
        (isHome ? <h2>Welcome to OIDC Todo</h2> : <Profile />)}
    </div>
  );
}

export default HomePage;
