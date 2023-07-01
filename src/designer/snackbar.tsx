import { useContext } from "react";
import { Snackbar, Alert } from "@mui/material";
import { FormBoxContext } from "./formbuilder";

export default function FormBoxSnackbar() {
  const { snackbar, setSnackbar } = useContext(FormBoxContext);
  function handleClose(event: React.SyntheticEvent | Event, reason?: string) {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  }

  return (
    <Snackbar
      open={snackbar.open}
      autoHideDuration={2500}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={snackbar.type}
        sx={{ width: "100%" }}
      >
        {snackbar.message}
      </Alert>
    </Snackbar>
  );
}
