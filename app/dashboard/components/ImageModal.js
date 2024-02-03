import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import { useFileUpload } from "@/app/hooks/lib/uploadImage";

const ImageModal = ({ open, handleClose, handleSave }) => {
  const uploadFile = useFileUpload();
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [imageSourceLink, setImageSourceLink] = useState("");
  const [productName, setProductName] = useState("");
  const [disableSave, setDisableSave] = useState(true);

  const handleFileSelect = async (file) => {
    const uploadOk = await uploadFile(file.name, file);
    if (uploadOk) {
      alert("Image Upload Successfully....");
      setImageSourceLink(file.name);
      await fetchProductName(file.name)
    }
  };

  const fetchProductName = async (imageSourceLink) => {
    const requestData = {
      imageUrl: `https://storage.googleapis.com/hackathon-bucket-123/images/ProductImages/${imageSourceLink}`
    };

    try {
      const response = await fetch("http://localhost:3001/detect-text", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      alert("Image Scrapped Successfully....")
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
      productName,
      quantity: parseInt(quantity),
      price: parseFloat(price),
      imageSourceLink,
    });

    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Add Product</DialogTitle>
      <DialogContent>
        <input
          type="file"
          onChange={(e) => handleFileSelect(e.target.files[0])}
        />
        <TextField
          margin="dense"
          id="imageSourceLink"
          label="Image Source Link *"
          type="text"
          fullWidth
          value={imageSourceLink}
          onChange={(e) => setImageSourceLink(e.target.value)}
        />
        <TextField
          margin="dense"
          id="product"
          label="Product Name"
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
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSaveClick} disabled={disableSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ImageModal;
