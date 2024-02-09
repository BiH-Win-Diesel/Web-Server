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

const ImageModal = ({ open, handleClose, handleSave }) => {
  const t = translateMapping['hn']
  const path = "images/ProductImages/";
  const uploadFile = useFileUpload();
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [imageSourceLink, setImageSourceLink] = useState("");
  const [productName, setProductName] = useState("");
  const [disableSave, setDisableSave] = useState(true);
  const [loader, setLoader] = useState(false);

  const handleFileSelect = async (file) => {
    setLoader(true);
    const uploadOk = await uploadFile(file.name, file, path);
    if (uploadOk) {
      setImageSourceLink(file.name);
      await fetchProductName(file.name);
      setLoader(false);
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
      setDisableSave(false);
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
        <center>
          <input
            type="file"
            onChange={(e) => handleFileSelect(e.target.files[0])}
          />
        </center>
        <TextField
          margin="dense"
          id="imageSourceLink"
          label={`${t.image_source} *`}
          type="text"
          fullWidth
          value={imageSourceLink}
          onChange={(e) => setImageSourceLink(e.target.value)}
        />
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
          id="quantity"
          label={t.stock}
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
  );
};

export default ImageModal;
