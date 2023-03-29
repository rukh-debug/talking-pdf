import { useState } from "react";

import {
  Backdrop,
  Collapse,
  IconButton,
  Alert,
  AlertTitle,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const Error = ({ anyError }) => {
  console.log(anyError);
  const [errorOpen, setErrorOpen] = useState(true);

  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={errorOpen}
      onClick={() => {
        setErrorOpen(false);
      }}
    >
      <Collapse in={errorOpen}>
        <Alert
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setErrorOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          <AlertTitle>Error</AlertTitle>
          {anyError}
        </Alert>
      </Collapse>
    </Backdrop>
  );
};

export default Error;
