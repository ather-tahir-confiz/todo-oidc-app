import React, { useState } from "react";
import { useKeycloak } from "keycloak-react-web";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";
import Navbar from "../components/navbar";
import CustomSnackbar from "../components/snackbar";
import Profile from "./Profile";
import NewTask from "../components/NewTask";
import TaskList from "../components/TaskList";
import "./home.css";

function HomePage() {
  const [isFetchTask, setFetchTask] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const { initialized } = useKeycloak();
  const [isHome, setIsHome] = useState(true);

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

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
      {isHome ? (
        <>
          <h2 className="headerTitle">My Todos</h2>
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
      )}
    </div>
  );
}

export default HomePage;
