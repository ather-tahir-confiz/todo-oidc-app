import React, { useEffect, useState, useRef } from "react";
import { useKeycloak } from "keycloak-react-web";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";
import Navbar from "../components/navbar";
import CustomSnackbar from "../components/snackbar";
import Profile from "./Profile";
import NewTask from "../components/NewTask";
import TaskList from "../components/TaskList";

function HomePage() {
  const navigate = useNavigate();
  const isFirstMount = useRef(false);
  const [isFetchTask, setFetchTask] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const { keycloak, initialized } = useKeycloak();
  const [isHome, setIsHome] = useState(true);

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

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
      <CustomSnackbar
        open={openSnackbar}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        severity={snackbarSeverity}
      />
      <Navbar setIsHome={setIsHome} />
      {keycloak.authenticated &&
        (isHome ? (
          <>
            <h2
              style={{
                color: "#1976d2",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              My Todos
            </h2>
            <NewTask
              setSnackbarMessage={setSnackbarMessage}
              setSnackbarSeverity={setSnackbarSeverity}
              setOpenSnackbar={setOpenSnackbar}
              isFetchTask={isFetchTask}
              setFetchTask={setFetchTask}
            />
            <TaskList
              setSnackbarMessage={setSnackbarMessage}
              setSnackbarSeverity={setSnackbarSeverity}
              setOpenSnackbar={setOpenSnackbar}
              setFetchTask={setFetchTask}
              isFetchTask={isFetchTask}
            />
          </>
        ) : (
          <Profile />
        ))}
    </div>
  );
}

export default HomePage;
