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
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch("http://localhost:3000/api/items", requestOptions)
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  return (
    <Container>
      Please update your warehouse using either{" "}
      <b
        style={{ color: "#2c4152", cursor: "pointer" }}
        onClick={() => setOpen(true)}
      >
        Text
      </b>
      , <b style={{ color: "#2c4152", cursor: "pointer" }}>Voice</b> or{" "}
      <b style={{ color: "#2c4152", cursor: "pointer" }}>Image</b> input.
      <br />
      Check <b style={{ color: "#2c4152", cursor: "pointer" }}>
        Documentation
      </b>{" "}
      for help
      <ProductModal
        open={open}
        handleClose={handleClose}
        handleSave={handleSave}
      />
    </Container>
  );
}
