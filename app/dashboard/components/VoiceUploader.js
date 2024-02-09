"use client"
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

function randomString(length, chars) {
  var result = "";
  for (var i = length; i > 0; --i)
    result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}

function extractInformation(text) {
  // Regular expressions
  const descriptionPattern = /([a-zA-Z]+)\s*/;
  const quantityPattern = /(\d+)\s*(?:unit|units|packet|pack)\s*/;
  const pricePattern = /(\d+(\.\d{1,2})?)/g; // Added 'g' flag to find all matches
  // Match patterns
  const descriptionMatch = text.match(descriptionPattern);
  const quantityMatch = text.match(quantityPattern);
  const priceMatches = text.match(pricePattern);
  // Extract information
  const description = descriptionMatch ? descriptionMatch[1] : null;
  const quantity = quantityMatch ? quantityMatch[1] : null;
  const price = priceMatches ? priceMatches[priceMatches.length - 1] : null;
  return { description, quantity, price };
}

const VoiceUploader = ({ open, handleClose, handleSave }) => {


  var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
  var recognition = new SpeechRecognition();

  const [flag, setFlag] = useState(true);
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [imageSourceLink, setImageSourceLink] = useState("");
  const [productName, setProductName] = useState("");
  const [disableSave, setDisableSave] = useState(true);
  const [loader, setLoader] = useState(false);
  const [processing, setProcessing] = useState(false)

  useEffect(() => {
    recognition.onresult = function (event) {
      var transcript = event.results[0][0].transcript;
      console.log(transcript)
      const { description, quantity, price } = extractInformation(transcript);
      setProcessing(false)
      setProductName(description);
      setQuantity(quantity);
      setPrice(price);
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
    setProcessing(true);
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
          Add Product
        </DialogTitle>
        {
          <center>
            {!flag && <p style={{fontWeight:"bold"}}>Start Speaking....</p>}
            {processing && <p style={{fontWeight:"bold"}}>Processing your voice....</p> }
          </center>
        }
        <DialogContent>
          {/* <TextField
          margin="dense"
          id="imageSourceLink"
          label="Image Source *"
          type="text"
          fullWidth
          value={imageSourceLink}
          onChange={(e) => setImageSourceLink(e.target.value)}
        /> */}
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
            label="Product *"
            type="text"
            fullWidth
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
          <TextField
            margin="dense"
            id="price"
            label="Price *"
            type="number"
            fullWidth
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <TextField
            margin="dense"
            id="quantity"
            label="Stock"
            type="number"
            fullWidth
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
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
