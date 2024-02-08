import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  LinearProgress,
  TextField,
} from "@material-ui/core";

const ProductModal = ({ open, handleClose, handleSave }) => {
  const path = "images/ProductImages/";
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [imageSourceLink, setImageSourceLink] = useState("");
  const [disableSave, setDisableSave] = useState(true);
  const [loader, setLoader] = useState(false);
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");

  const handleSaveClick = () => {
    handleSave({
      data: description,
      description: description,
      quantity: parseInt(quantity),
      price: parseFloat(price),
      imageSourceLink: imageSourceLink,
    });
    handleClose();
  };

  const generateImage = async (description) => {
    const apiKey =
      "b2247b90c0a87b2dc2e1507e1f631a1e36a3b3b65450e0ac207503d50a6329dbb85c1b480252673848fc7be9d87905e6";
    const form = new FormData();
    form.append("prompt", description);

    setLoader(true);
    try {
      const response = await fetch("https://clipdrop-api.co/text-to-image/v1", {
        method: "POST",
        headers: {
          "x-api-key": apiKey,
        },
        body: form,
      });
      if (response.ok) {
        const blob = await response.blob();
        const imageObjectURL = URL.createObjectURL(blob);
        setImagePreviewUrl(imageObjectURL);
        setImageSourceLink(imageObjectURL);
        setDisableSave(false);
      } else {
        const errorText = await response.text();
        alert("Image generation failed: " + errorText);
      }
    } catch (error) {
      alert("An error occurred: " + error.message);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    if (description.trim() !== "") {
      generateImage(description);
    }
  }, [description]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Add Product</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="description"
          label="Product *"
          type="text"
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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
          id="imageSourceLink"
          label="Image Source Link *"
          type="text"
          fullWidth
          value={imageSourceLink}
          disabled={true}
        />
        {imagePreviewUrl && (
          <img
            src={imagePreviewUrl}
            alt="Generated"
            style={{ width: "100%", marginTop: 20 }}
          />
        )}
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

export default ProductModal;
