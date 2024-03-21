/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { useKeycloak } from "keycloak-react-web";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axiosInstance from "../api";
import EditTask from "./EditTask";

const TaskList = ({
  setSnackbarMessage,
  setSnackbarSeverity,
  setOpenSnackbar,
  setFetchTask,
  isFetchTask,
}) => {
  const { keycloak, initialized } = useKeycloak();
  const token = JSON.parse(localStorage.getItem("keycloak_token"));
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEdit, setEdit] = useState("");

  useEffect(() => {
    const fetchTaskList = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/todo", {
          headers: {
            Authorization: `Bearer ${
              keycloak.authenticated ? keycloak?.token : token?.access_token
            }`,
          },
        });
        if (response?.status === 200) {
          setTasks(response?.data);
        }
      } catch (error) {
        setSnackbarMessage("Error fetching tasks");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      } finally {
        setLoading(false);
      }
    };
    if (initialized) fetchTaskList();
  }, [initialized, isFetchTask]);

  const handleDelete = async (taskId) => {
    try {
      setLoading(true);
      const response = await axiosInstance.delete(`/todo/${taskId}`, {
        headers: {
          Authorization: `Bearer ${
            keycloak.authenticated ? keycloak?.token : token?.access_token
          }`,
        },
      });
      setSnackbarMessage(response?.data?.message);
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
      setFetchTask(!isFetchTask);
    } catch (error) {
      setSnackbarMessage("Error deleting tasks");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "30px 0px",
      }}
    >
      {loading ? (
        <CircularProgress />
      ) : (
        <List
          style={{
            width: "820px",
            backgroundColor: "#f9f9f9",
            borderRadius: "8px",
            padding: "16px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          {tasks.map((task) => (
            <ListItem key={task?.id}>
              {isEdit === task?.id ? (
                <EditTask
                  taskId={task?.id}
                  taskNameDefault={task?.taskName}
                  taskStatusDefault={task?.status}
                  setEdit={setEdit}
                  setSnackbarMessage={setSnackbarMessage}
                  setSnackbarSeverity={setSnackbarSeverity}
                  setOpenSnackbar={setOpenSnackbar}
                  isFetchTask={isFetchTask}
                  setFetchTask={setFetchTask}
                />
              ) : (
                <>
                  <ListItemText
                    primary={task?.taskName}
                    secondary={`Status: ${task?.status}`}
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      onClick={() => handleDelete(task?.id)}
                      edge="end"
                      aria-label="delete"
                    >
                      <DeleteIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => setEdit(task?.id)}
                      edge="end"
                      aria-label="edit"
                    >
                      <EditIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </>
              )}
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};

export default TaskList;
