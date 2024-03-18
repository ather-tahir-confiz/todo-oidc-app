import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

export default function CustomSnackbar({ open, onClose, message, severity }) {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
    >
      <MuiAlert onClose={onClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </MuiAlert>
    </Snackbar>
  );
}
