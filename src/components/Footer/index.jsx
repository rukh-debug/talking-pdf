import { Box, Paper } from "@mui/material";
import { GitHub } from "@mui/icons-material";
import ModeSwitcher from "@/components/ModeSwitcher";

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
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
        elevation={6}
      >
        <Box>
          <p>Talking PDF, powered by GPT3 & Next.js</p>
          <p>
            <a
              style={{
                textDecoration: "none",
                fontWeight: "bold",
                fontSize: "1.3rem",
              }}
              href="https://github.com/rukh-debug/talking-pdf"
            >
              <GitHub />
            </a>
          </p>
        </Box>

        <ModeSwitcher />
      </Paper>
    </Box>
  );
};

export default Footer;
