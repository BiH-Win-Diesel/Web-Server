import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  LinearProgress,
  TextField,
} from "@material-ui/core";
import { useFileUpload } from "@/app/hooks/lib/uploadImage";
import translateMapping from "@/translate";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { styled } from "@mui/material/styles";

const ImageModal = ({ open, handleClose, handleSave, t }) => {
  // const currentLang = localStorage.getItem("Lang") || "en";
  // const t = translateMapping[currentLang];
  const path = "images/ProductImages/";
  const uploadFile = useFileUpload();
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [imageSourceLink, setImageSourceLink] = useState("");
  const [productName, setProductName] = useState("");
  const [disableSave, setDisableSave] = useState(true);
  const [loader, setLoader] = useState(false);

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
      await fetchProductName(file.name);
      setLoader(false);
      setDisableSave(false);
    } else {
      setLoader(false);
      alert("Upload Failed!");
    }
  };

  const fetchProductName = async (imageSourceLink) => {
    const requestData = {
      imageUrl: `https://storage.googleapis.com/hackathon-bucket-123/images/ProductImages/${imageSourceLink}`,
    };

    try {
      const response = await fetch("/api/detect-text", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      alert("Image Scrapped Successfully!");
      const result = await response.json();
      setProductName(result.productName);
    } catch (error) {
      console.error("Error fetching product name:", error);
    }
  };

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

  const textFieldsDisabled = !imageSourceLink;

  return (
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
      <DialogContent>
        <TextField
          margin="dense"
          id="product"
          label={`${t.product} *`}
          type="text"
          fullWidth
          value={productName}
          disabled={textFieldsDisabled}
          onChange={(e) => setProductName(e.target.value)}
        />
        <TextField
          margin="dense"
          id="price"
          label={`${t.price} *`}
          type="number"
          fullWidth
          value={price}
          disabled={textFieldsDisabled}
          onChange={(e) => setPrice(e.target.value)}
        />
        <TextField
          margin="dense"
          id="imageSourceLink"
          label={`${t.image_source} *`}
          type="text"
          fullWidth
          value={imageSourceLink}
          disabled={textFieldsDisabled}
          onChange={(e) => setImageSourceLink(e.target.value)}
        />
        <TextField
          margin="dense"
          id="quantity"
          label={t.stock}
          type="number"
          fullWidth
          value={quantity}
          disabled={textFieldsDisabled}
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
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={handleSaveClick}
          disabled={disableSave}
          color="primary"
        >
          Save
        </Button>
      </DialogActions>
      {loader && <LinearProgress />}
    </Dialog>
  );
};

export default ImageModal;
