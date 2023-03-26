import styles from "@/styles/Home.module.scss";

import { useState, useEffect, useContext } from "react";

import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";

import { Fingerprint, PictureAsPdf } from "@mui/icons-material";
import TextField from "@mui/material/TextField";

// import KeyContext from "@/ContextProvider/keyContext";

import Collapse from "@mui/material/Collapse";
import {
  Container,
  Toolbar,
  Typography,
  Tooltip,
  IconButton,
} from "@mui/material";

//  import header from ./header.style.jsx

const Header = () => {
  // const { openAiKey, setOpenAiKey } = useContext(KeyContext);
  const [apiKey, setApiKey] = useState(
    typeof window !== "undefined" ? localStorage.getItem("api_key") : ""
  );

  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (apiKey.trim() !== "") {
        setApiKey(e.target.value);
        handleChange();
      }
    }
  };
  // save api key to upon typed
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("api_key", apiKey);
      // setOpenAiKey(apiKey);
    }
  }, [apiKey]);

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            <PictureAsPdf sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 0,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".1rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Talking PDF
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            <Collapse orientation="horizontal" in={checked}>
              <TextField
                id="OpenAI_api_key"
                label="OpenAI API KEY"
                variant="standard"
                type={"password"}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </Collapse>
            <Tooltip title="Open settings">
              <IconButton onClick={handleChange} sx={{ p: 0 }}>
                <Fingerprint sx={{ color: "action.active", mr: 1, my: 0.5 }} />{" "}
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
