import { Button, Container, makeStyles, Grid } from "@material-ui/core";
import ProductModal from "./ProductModal";
import ImageModal from "./ImageModal";
import VoiceUploader from "./VoiceUploader";
import { useState } from "react";
import translateMapping from "@/translate";

export default function ImageContainer() {

  const t = translateMapping["hn"]

  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };

  const handleClose2 = () => {
    setOpen2(false);
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
            {t.text}
          </p>
          <p style={{ fontSize: "13px" }}>
            {t.gen_ai}
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
          <p style={{ fontWeight: "bold", cursor: "pointer" }} onClick={() => setOpen2(true)}>
            {t.voice}
          </p>
          <p style={{ fontSize: "13px" }}>
            {t.voice_description}
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
            {t.image}
          </p>
          <p style={{ fontSize: "13px" }}>
            {t.image_recog}
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
      <VoiceUploader
        open={open2}
        handleClose={handleClose2}
        handleSave={handleSave}
      />
    </Container>
  );
}
