import { useState, useEffect, useRef, useContext } from "react";
import style from "@/styles/Home.module.scss";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import Backdrop from "@mui/material/Backdrop";
import AlertTitle from '@mui/material/AlertTitle';


import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";

import Stack from "@mui/material/Stack";

import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Alert from "@mui/material/Alert";

import { PdfContext } from "@/ContextProvider/pdfContext";
import { ChatContext } from "@/ContextProvider/chatContext";

import { Configuration, OpenAIApi } from "openai";

const CHAT_HISTORY_KEY = "chat_history";

function Chat() {
  const [inputValue, setInputValue] = useState("");
  const [thinking, setThinking] = useState(false);

  const [apiError, setApiError] = useState(false);

  const [openAiApiKey, setOpenAiApiKey] = useState(() => {
    if (typeof window !== "undefined") {
      const savedApiKey = localStorage.getItem("api_key");
      return savedApiKey ? savedApiKey : "";
    }
  });

  const { pdfContext } = useContext(PdfContext);
  const { chat, setChat } = useContext(ChatContext);

  const [errorOpen, setErrorOpen] = useState(true);

  const ref = useRef(null);

  const [chatHistory, setChatHistory] = useState(() => {
    if (typeof window !== "undefined") {
      const savedChatHistory = localStorage.getItem(CHAT_HISTORY_KEY);
      return savedChatHistory ? JSON.parse(savedChatHistory) : [];
    }
    return [];
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(chatHistory));
    }
    setChat(chatHistory);
  }, [chatHistory]);

  const handleInputSubmit = async (e) => {
    e.preventDefault();

    if (inputValue.trim() === "") return;
    if (openAiApiKey.trim() === "" || openAiApiKey === "null") {
      setThinking(false);
      setErrorOpen(true);
      setApiError(
        "OpenAI API key not set. Grab it from https://platform.openai.com/account/api-keys and set it on top right corner."
      );
      return;
    }

    const userInput = { role: "user", content: inputValue };
    const updatedChatHistory = [...chatHistory, userInput];
    setChatHistory(updatedChatHistory);
    setInputValue("");

    const configuration = new Configuration({
      apiKey: openAiApiKey,
    });
    const openai = new OpenAIApi(configuration);

    try {
      setThinking(true);
      let arrayTop = [
        {
          role: "system",
          content:
            "You will act as a pdf file, \nyou will take text input of each page of the pdf one by one from user and you will ask if there are more pages. Each time you ask for more pages, and the user will provide each new page, then finally when user writes this exact word 'END OF PDF FILE', you will being taking queries from there. Then you will talk back to the user as if you were that pdf. You will talk only from the pdf and answer only the stuff available on pdf, you wont forget that you are a pdf ever. You must understand user might ask you in any different ways about the pdf and you will answer the question as accurately as possible.",
        },
      ];

      for (let i = 0; i < pdfContext.chunks.length; i++) {
        arrayTop.push({
          role: "user",
          content: pdfContext.chunks[i],
        });
        arrayTop.push({
          role: "assistant",
          content: "Is there more pages?",
        });
        // if the pdfContext chunks is the last index then push somethign to array
        if (i === pdfContext.chunks.length - 1) {
          arrayTop.push({
            role: "user",
            content: "END OF PDF FILE",
          });
          arrayTop.push({
            role: "assistant",
            content: "Thank you for the pdf, now you can ask me questions",
          });
        }
      }

      let remaining_part = chatHistory.concat(userInput);
      console.log(arrayTop.concat(remaining_part));
      const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: arrayTop.concat(remaining_part),
      });

      setThinking(false);

      console.log(response);

      const aiResponse = response.data.choices[0].message;
      setChatHistory([...updatedChatHistory, aiResponse]);
    } catch (error) {
      updatedChatHistory.pop()
      setChatHistory([...updatedChatHistory, error.message]);
      setThinking(false);
      setErrorOpen(true);
      setApiError(error.message + ".");
      console.log(error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (!thinking && inputValue.trim() !== "") {
        handleInputSubmit(e);
      }
      event.preventDefault(); // 👈️ prevent page refresh
    }
  };

  return (
    <Container fixed>
      {apiError ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={errorOpen}
          onClick={() => {
            setErrorOpen(false);
          }}
        >
          <Collapse in={open}>
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
              {apiError}
              {apiError.includes("400")
                ? "\nProbably because, Wrong API key or file is too large "
                : null}
              {apiError.includes("50")
                ? "\nProbably becuase, OpenAI's internal server's error."
                : null}
            </Alert>
          </Collapse>
        </Backdrop>
      ) : null}
      <Box ref={ref}>
        <List>
          {chatHistory.map((msg, i) => (
            <ListItem key={i}>
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary={msg.role === "user" ? `You` : `PDF`}
                secondary={msg.content}
              />
            </ListItem>
          ))}
          {thinking ? (
            <ListItem key={"typing"}>
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              </ListItemAvatar>
              <ListItemText primary={`PDF`} secondary={"Pdf is typeing..."} />
            </ListItem>
          ) : null}
        </List>
        <Stack spacing={2} direction="row">
          <Box
            component="form"
            sx={{
              "& > :not(style)": { width: "75ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="standard-basic"
              label="Enter your queries here..."
              variant="standard"
              fullWidth
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </Box>
          <Button
            sx={{
              "& > :not(style)": { width: "25ch" },
            }}
            variant="contained"
            endIcon={<SendIcon />}
            onClick={handleInputSubmit}
            disabled={thinking || inputValue.trim() === ""}
          >
            Send
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}

export default Chat;
