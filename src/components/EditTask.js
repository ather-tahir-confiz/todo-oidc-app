import React, { useState } from "react";
import {
  TextField,
  Button,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  IconButton,
} from "@mui/material";
import { useKeycloak } from "keycloak-react-web";
import CloseIcon from "@mui/icons-material/Close";
import axiosInstance from "../api";

export default function EditTask({
  taskId,
  taskNameDefault,
  taskStatusDefault,
  setEdit,
  setSnackbarMessage,
  setSnackbarSeverity,
  setOpenSnackbar,
  isFetchTask,
  setFetchTask,
}) {
  const { keycloak } = useKeycloak();
  const token = JSON.parse(localStorage.getItem("keycloak_token"));
  const [taskName, setTaskName] = useState(taskNameDefault);
  const [status, setStatus] = useState(taskStatusDefault);

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleNameChange = (event) => {
    setTaskName(event.target.value);
  };

  const handleUpdate = async () => {
    const payload = {
      taskName,
      status,
    };
    try {
      await axiosInstance.patch(`/todo/${taskId}`, payload, {
        headers: {
          Authorization: `Bearer ${
            keycloak.authenticated ? keycloak?.token : token?.access_token
          }`,
        },
      });
      setTaskName("");
      setStatus("");
      setSnackbarMessage("Task updated successfully");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
      setFetchTask(!isFetchTask);
      setEdit("");
    } catch (error) {
      setSnackbarMessage("Error creating task");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "820px",
        gap: "20px",
      }}
    >
      <TextField
        value={taskName}
        onChange={handleNameChange}
        label="Name"
        variant="standard"
      />
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="status">Status</InputLabel>
        <Select
          labelId="status"
          value={status}
          onChange={handleStatusChange}
          label="Status"
        >
          <MenuItem value="Pending">Pending</MenuItem>
          <MenuItem value="In Progress">In Progress</MenuItem>
          <MenuItem value="Done">Done</MenuItem>
        </Select>
      </FormControl>
      <Button onClick={handleUpdate} variant="contained">
        Update Task
      </Button>
      <IconButton onClick={() => setEdit("")} edge="end" aria-label="edit">
        <CloseIcon />
      </IconButton>
    </div>
  );
}
