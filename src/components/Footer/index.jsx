import { Box, Paper } from "@mui/material";
import { GitHub } from "@mui/icons-material";

const Footer = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        "& > :not(style)": {
          m: 1,
          width: "100%",
          height: 140,
        },
      }}
    >
      <Paper
        sx={{
          padding: 2,
          textAlign: "center",
        }}
        elevation={1}
      >
        <p>Talking PDF, made with Next.js & GPT-3</p>
        <p>
          <a
            style={{
              textDecoration: "none",
              fontWeight: "bold",
              fontSize: "1.3rem",
            }}
            href="https://github.com/slithery0/talking-pdf"
          >
            <GitHub />
          </a>
        </p>
      </Paper>
    </Box>
  );
};

export default Footer;
