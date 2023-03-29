import { useState, useEffect } from "react";
import * as pdfjs from "pdfjs-dist";
import { useContext } from "react";
import { PdfContext } from "@/ContextProvider/pdfContext";
import { ChatContext } from "@/ContextProvider/chatContext";

import Error from "@/components/Error";

// import styles from "@/styles/Home.module.scss";

import { Button, Box } from "@mui/material";
// import { UploadFile } from "@mui/icons-material";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PdfUploader = () => {
  // get pdf data from localstorage on each reload

  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const { pdfContext, setPdfContext } = useContext(PdfContext);

  const [pdfData, setPdfData] = useState(() => {
    if (typeof window !== "undefined") {
      const savedPdfData = localStorage.getItem("pdfData");
      return savedPdfData ? JSON.parse(savedPdfData) : {};
    }
    return {};
  });

  const { chat, setChat } = useContext(ChatContext);
  //   use effect to update context
  useEffect(() => {
    setPdfContext(pdfData);
  }, [pdfData]);

  const deletePdfData = () => {
    localStorage.removeItem("pdfData");
    setPdfContext({});
    localStorage.removeItem("chat_history");
    setChat([]);
  };

  const handlePdfUpload = (event) => {
    try {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          setUploading(true);
          const pdfData = new Uint8Array(reader.result);
          const pdf = await pdfjs.getDocument({ data: pdfData }).promise;
          const numberOfPages = pdf.numPages;
          let chunks = [];
          for (let i = 1; i <= numberOfPages; i++) {
            const pdfPage = await pdf.getPage(i);
            const pdfText = await pdfPage.getTextContent();
            const extractedText = pdfText.items
              .map((item) => item.str)
              .join("");
            chunks.push(`Page ${i} ${extractedText}`);
          }

          let obj = {
            name: file.name,
            chunks: chunks,
          };

          // store the chunks in local storage
          localStorage.setItem("pdfData", JSON.stringify(obj));
          setPdfContext(obj);
          setUploading(false);
        } catch (err) {
          setUploading(false);
          setError(err.message);
          console.log(err);
        }
      };
      reader.readAsArrayBuffer(file);
    } catch (error) {
      console.log("000000000000000000000000000000000000000");
      setUploading(false);
      setError(error.message);
      console.log(error);
    }
  };
  return (
    <>
      {error ? <Error anyError={error} /> : null}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 5,
        }}
      >
        {pdfContext?.name ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <>
              <p>{pdfContext.name}</p>
              <Button onClick={deletePdfData}>X</Button>
            </>
          </Box>
        ) : (
          <Button variant="contained" component="label">
            {uploading ? "Uploading..." : "Upload PDF"}
            <input hidden accept="pdf" type="file" onChange={handlePdfUpload} />
          </Button>
        )}
      </Box>
    </>
  );
};

export default PdfUploader;
