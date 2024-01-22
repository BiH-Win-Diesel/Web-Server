import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core';

const ProductModal = ({ open, handleClose, handleSave }) => {
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [imageSourceLink, setImageSourceLink] = useState('');

  const handleSaveClick = () => {
    // Perform any validation before saving
    handleSave({
      data : description,
      description,
      quantity: parseInt(quantity),
      price: parseFloat(price),
      imageSourceLink,
    });
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Add Product</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="description"
          label="Description"
          type="text"
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          margin="dense"
          id="quantity"
          label="Quantity"
          type="number"
          fullWidth
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <TextField
          margin="dense"
          id="price"
          label="Price"
          type="number"
          fullWidth
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <TextField
          margin="dense"
          id="imageSourceLink"
          label="Image Source Link"
          type="text"
          fullWidth
          value={imageSourceLink}
          onChange={(e) => setImageSourceLink(e.target.value)}
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

export default ProductModal;