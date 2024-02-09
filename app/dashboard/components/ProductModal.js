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
import { useFileUpload } from "@/app/hooks/lib/uploadImage";
import translateMapping from "@/translate";

const ProductModal = ({ open, handleClose, handleSave }) => {
  const t = translateMapping['hn']
  const path = "images/ProductImages/";
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [imageSourceLink, setImageSourceLink] = useState("");
  const [disableSave, setDisableSave] = useState(true);
  const [loader, setLoader] = useState(false);
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");

  function randomString(length, chars) {
    var result = "";
    for (var i = length; i > 0; --i)
      result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  }

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
        const uploadFile = useFileUpload();
        var rString = randomString(
          32,
          "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
        );
        const filename = `${rString}.png`;
        const uploadOk = await uploadFile(filename, blob, path);
        if (uploadOk) {
          setImageSourceLink(filename);
          setImagePreviewUrl(
            `https://storage.googleapis.com/hackathon-bucket-123/images/ProductImages/${filename}`
          );
          setDisableSave(false);
        }
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

  const handleGenerateImageClick = () => {
    if (description.trim() !== "") {
      generateImage(description);
    }
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
        <div>
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label={`${t.product} *`}
            type="text"
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <center>
            <Button onClick={handleGenerateImageClick} color="primary">
              {t.generate_image}
            </Button>
          </center>
        </div>
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
          label={`${t.image_source} *`}
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

export default ProductModal;
