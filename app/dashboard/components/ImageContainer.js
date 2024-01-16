"use client";

import { Button, Container, makeStyles } from "@material-ui/core";
import ProductModal from "./ProductModal";
import { useState } from "react";

const useStyles = makeStyles(({ theme }) => ({
  btn: {
    marginRight: "10px",
  },
}));

export default function ImageContainer() {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = (data) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Accept': 'application/json'
      },
      body: JSON.stringify(data),
    };

    console.log(data)

    fetch('http://localhost:3000/api/items', requestOptions)
    .then(res=>res.json())
    .then((data)=>console.log(data))

  };

  return (
    <Container>
      <ProductModal
        open={open}
        handleClose={handleClose}
        handleSave={handleSave}
      />
      <Button
        className={classes.btn}
        variant="contained"
        color="primary"
        onClick={() => setOpen(true)}
      >
        Type
      </Button>
      <Button className={classes.btn} variant="contained" color="secondary">
        Image
      </Button>
      <Button className={classes.btn} variant="contained">
        Speak
      </Button>
    </Container>
  );
}
