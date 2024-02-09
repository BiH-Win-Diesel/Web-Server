"use client";
import React, { useEffect, useState } from "react";
import { useFileUpload } from "@/app/hooks/lib/uploadImage";
import { MicNoneRounded, MicNoneSharp, MicSharp } from "@material-ui/icons";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  LinearProgress,
  TextField,
} from "@material-ui/core";
import translateMapping from "@/translate";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { styled } from "@mui/material/styles";

function randomString(length, chars) {
  var result = "";
  for (var i = length; i > 0; --i)
    result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}

function extractInformation(text) {
  const descriptionPattern = /([a-zA-Z]+)\s*/;
  const quantityPattern = /(\d+)\s*(?:unit|units|packet|pack)\s*/;
  const pricePattern = /(\d+(\.\d{1,2})?)/g;
  const descriptionMatch = text.match(descriptionPattern);
  const quantityMatch = text.match(quantityPattern);
  const priceMatches = text.match(pricePattern);
  const description = descriptionMatch ? descriptionMatch[1] : null;
  const quantity = quantityMatch ? quantityMatch[1] : null;
  const price = priceMatches ? priceMatches[priceMatches.length - 1] : null;
  return { description, quantity, price };
}

const VoiceUploader = ({ open, handleClose, handleSave }) => {
  const t = translateMapping[process.env.lang];
  const path = "images/ProductImages/";
  const uploadFile = useFileUpload();

  var SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  var recognition = new SpeechRecognition();

  const [flag, setFlag] = useState(true);
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [imageSourceLink, setImageSourceLink] = useState("");
  const [productName, setProductName] = useState("");
  const [disableSave, setDisableSave] = useState(true);
  const [loader, setLoader] = useState(false);
  const [processing, setProcessing] = useState(false);

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    whiteSpace: "nowrap",
    width: 1,
  });

  const handleFileSelect = async (file) => {
    setLoader(true);
    const uploadOk = await uploadFile(file.name, file, path);
    if (uploadOk) {
      setImageSourceLink(file.name);
      setLoader(false);
      setDisableSave(false);
    } else {
      setLoader(false);
      alert("Upload Failed!");
    }
  };

  useEffect(() => {
    recognition.onresult = function (event) {
      var transcript = event.results[0][0].transcript;
      console.log(transcript);
      const { description, quantity, price } = extractInformation(transcript);
      setProcessing(false);
      setProductName(description);
      setQuantity(quantity);
      setPrice(price);
    };

    recognition.onspeechend = () => {
      recognition.stop();
    };
  }, [recognition]);

  const handleSaveClick = async () => {
    handleSave({
      data: productName,
      description: productName,
      quantity: parseInt(quantity),
      price: parseFloat(price),
      imageSourceLink: imageSourceLink,
    });

    handleClose();
  };

  function voiceStartHandler() {
    recognition.start();
  }

  function voiceStopHandler() {
    recognition.stop();
  }

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle
          id="form-dialog-title"
          style={{ textAlign: "center", color: "#d97744", margin: "1.5%" }}
        >
          {t.add_product}
        </DialogTitle>
        {
          <center>
            {!flag && <p style={{ fontWeight: "bold" }}>Start Speaking....</p>}
            {processing && (
              <p style={{ fontWeight: "bold" }}>Processing your voice....</p>
            )}
          </center>
        }
        <DialogContent>
          <center>
            <div
              onClick={() => {
                if (flag) voiceStartHandler();
                else voiceStopHandler();

                setFlag(!flag);
              }}
            >
              {flag ? <MicSharp /> : <MicNoneSharp />}
            </div>
          </center>
          <TextField
            margin="dense"
            id="product"
            label={`${t.product} *`}
            type="text"
            fullWidth
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
          <TextField
            margin="dense"
            id="price"
            label={`${t.price} *`}
            type="number"
            fullWidth
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <TextField
            margin="dense"
            id="imageSourceLink"
            label="Image Source *"
            type="text"
            fullWidth
            value={imageSourceLink}
            onChange={(e) => setImageSourceLink(e.target.value)}
          />
          <TextField
            margin="dense"
            id="quantity"
            label={t.stock}
            type="number"
            fullWidth
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <center>
            <br />
            <br />
            <Button
              component="label"
              variant="outlined"
              startIcon={<CloudUploadIcon />}
              style={{
                color: "#d97744",
                border: "1px solid #d97744",
                borderRadius: "20px",
                width: "100%",
              }}
            >
              Upload File
              <VisuallyHiddenInput
                type="file"
                onChange={(e) => handleFileSelect(e.target.files[0])}
              />
            </Button>
          </center>
        </DialogContent>
        <DialogActions style={{ marginTop: "2%" }}>
          <Button onClick={handleClose} color="#d97744">
            Cancel
          </Button>
          <Button
            onClick={handleSaveClick}
            disabled={disableSave}
            color="#d97744"
          >
            Save
          </Button>
        </DialogActions>
        {loader && <LinearProgress />}
      </Dialog>
    </>
  );
};

export default VoiceUploader;