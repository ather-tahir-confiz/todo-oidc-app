import React, { useState } from "react";
import {
  TextField,
  Button,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import { useKeycloak } from "keycloak-react-web";
import SendIcon from "@mui/icons-material/Send";
import axiosInstance from "../api";

export default function NewTask({
  setSnackbarMessage,
  setSnackbarSeverity,
  setOpenSnackbar,
  isFetchTask,
  setFetchTask,
}) {
  const { keycloak } = useKeycloak();
  const token = JSON.parse(localStorage.getItem("keycloak_token"));

  const [taskName, setTaskName] = useState("");
  const [status, setStatus] = useState("");

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleNameChange = (event) => {
    setTaskName(event.target.value);
  };

  const handleSubmit = async () => {
    const payload = {
      taskName,
      status,
    };
    try {
      await axiosInstance.post("/todo", payload, {
        headers: {
          Authorization: `Bearer ${
            keycloak.authenticated ? keycloak?.token : token?.access_token
          }`,
        },
      });
      setTaskName("");
      setStatus("");
      setSnackbarMessage("New Task created successfully");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
      setFetchTask(!isFetchTask);
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
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "520px",
          gap: "20px",
          backgroundColor: "#f9f9f9",
          borderRadius: "8px",
          padding: "16px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
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
        <Button
          onClick={handleSubmit}
          variant="contained"
          endIcon={<SendIcon />}
        >
          Add Task
        </Button>
      </div>
    </div>
  );
}
