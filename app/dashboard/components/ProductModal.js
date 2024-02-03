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

const ProductModal = ({ open, handleClose, handleSave }) => {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [imageSourceLink, setImageSourceLink] = useState("");
  const [disableSave, setDisableSave] = useState(true);

  const handleSaveClick = () => {
    handleSave({
      data: description,
      description,
      quantity: parseInt(quantity),
      price: parseFloat(price),
      imageSourceLink,
    });
    handleClose();
  };

  const uploadFile = useFileUpload()

  const handleFileSelect = async (file) => {
    const uploadOk = await uploadFile(file.name, file);
    if(uploadOk){
      alert("Image Upload Successfully....");
      setImageSourceLink(file.name)
      setDisableSave(true)
    }
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
        <input
          type="file"
          onChange={(e) => handleFileSelect(e.target.files[0])}
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

export default ProductModal;
