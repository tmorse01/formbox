import { Snackbar, Alert } from "@mui/material";

export default function FormBoxSnackbar({ snackbar, setSnackbar }) {
  function handleClose(event: React.SyntheticEvent | Event, reason?: string) {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  }

  return (
    <Snackbar
      open={snackbar.open}
      autoHideDuration={2000}
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
