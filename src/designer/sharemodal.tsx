import { useEffect, useState, useContext } from "react";
import {
  Box,
  Typography,
  Modal,
  FormControl,
  InputLabel,
  OutlinedInput,
  IconButton,
} from "@mui/material";

import ShareIcon from "@mui/icons-material/Share";
import copy from "clipboard-copy";
import { FormBoxContext } from "./formbuilder";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadius: "4px",
  boxShadow: 24,
  p: 4,
  gap: 4,
  display: "grid",
  gridTemplateRows: "min-content auto min-content",
  width: "400px",
};

const ShareModal = ({ formName }) => {
  const { setSnackbar } = useContext(FormBoxContext);
  const [open, setOpen] = useState<boolean>(false);
  const [link, setLink] = useState<URL>();

  useEffect(() => {
    //generate share url
    let baseURL = window.location.origin;
    let shareURL = new URL("/form/" + formName, baseURL);
    setLink(shareURL);
  }, [formName]);

  const handleFocus = (e) => {
    if (link !== undefined) {
      e.target.select();
      copy(link.toString());
      setSnackbar({
        open: true,
        message: "Link copied to clickboard",
        type: "success",
      });
    }
  };

  const shareForm = (
    <Box component="form" sx={style}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Share Form
      </Typography>
      <Box sx={{ display: "grid", gridTemplateColumns: "1fr" }}>
        <FormControl sx={{ m: 1 }} variant="outlined">
          <InputLabel htmlFor="link">Link</InputLabel>
          <OutlinedInput
            id="link"
            type={"text"}
            value={link}
            label="link"
            onFocus={handleFocus}
          />
        </FormControl>
      </Box>
    </Box>
  );

  return (
    <>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="share"
        title="Share Form"
        disabled={formName === undefined}
        onClick={() => setOpen(true)}
      >
        <ShareIcon />
      </IconButton>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {shareForm}
      </Modal>
    </>
  );
};

export default ShareModal;
