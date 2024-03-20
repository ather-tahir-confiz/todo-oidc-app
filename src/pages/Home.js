import React, { useState } from "react";
import Navbar from "../components/navbar";
import CustomSnackbar from "../components/snackbar";
import Profile from "./Profile";
import NewTask from "../components/NewTask";
import TaskList from "../components/TaskList";

function HomePage() {
  const [isFetchTask, setFetchTask] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const [isHome, setIsHome] = useState(true);

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

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
      )}
    </div>
  );
}

export default HomePage;
