import { Button, Container, makeStyles, Grid } from "@material-ui/core";
import ProductModal from "./ProductModal";
import ImageModal from "./ImageModal";
import { useState } from "react";

const useStyles = makeStyles(({ theme }) => ({}));

export default function ImageContainer() {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };

  const handleSave = (data) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch("/api/items", requestOptions)
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <img
            src={"/static-image/Text.png"}
            alt="Text"
            style={{
              width: "40%",
              border: "2px solid #d97744",
              borderRadius: "50%",
              padding: "7%",
            }}
          />
          <p
            style={{ fontWeight: "bold", cursor: "pointer" }}
            onClick={() => setOpen(true)}
          >
            Catalouge Update through Text
          </p>
          <p style={{ fontSize: "13px" }}>
            Use Generative AI to Digitize Your Catalouge. Update Your Product
            without an Image
          </p>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <img
            src={"/static-image/Voice.png"}
            alt="Voice"
            style={{
              width: "40%",
              border: "2px solid #d97744",
              borderRadius: "50%",
              padding: "7%",
            }}
          />
          <p style={{ fontWeight: "bold", cursor: "pointer" }}>
            Catalouge Update through Voice
          </p>
          <p style={{ fontSize: "13px" }}>
            Use Speech Recognition and NLP to Digitize Your Catalouge. Update
            Your Product with Your Voice
          </p>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <img
            src={"/static-image/Photo.png"}
            alt="Photo"
            style={{
              width: "40%",
              border: "2px solid #d97744",
              borderRadius: "50%",
              padding: "7%",
            }}
          />
          <p
            style={{ fontWeight: "bold", cursor: "pointer" }}
            onClick={() => setOpen1(true)}
          >
            Catalouge Update through Image
          </p>
          <p style={{ fontSize: "13px" }}>
            Use Image Recognition Tools to Digitize Your Catalouge. Update Your
            Product with a Text Detectable Photo
          </p>
        </Grid>
      </Grid>
      <ProductModal
        open={open}
        handleClose={handleClose}
        handleSave={handleSave}
      />
      <ImageModal
        open={open1}
        handleClose={handleClose1}
        handleSave={handleSave}
      />
    </Container>
  );
}
