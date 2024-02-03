import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@material-ui/core";

const ImageModal = ({ open, handleClose, handleSave }) => {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [imageSourceLink, setImageSourceLink] = useState("");
  const [productName, setProductName] = useState("");

  const fetchProductName = async () => {
    const requestData = {
      imageSourceLink: imageSourceLink,
    };

    try {
      const response = await fetch('http://localhost:3001/detect-text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log(result);
      setProductName(result.productName);
    } catch (error) {
      console.error('Error fetching product name:', error);
    }
  };
  const handleSaveClick = async () => {
    await fetchProductName();

    handleSave({
      productName,
      description,
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
        <Button onClick={handleSaveClick} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ImageModal;