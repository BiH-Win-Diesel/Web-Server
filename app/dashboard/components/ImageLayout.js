import { Box, Button, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Image from "next/image";

const useStyles = makeStyles((theme) => ({
  itemContainer: {
    background: "white",
    borderRadius: "10px",
    border: "1px solid #d5dde1",
    margin: "3%",
  },
  dataContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginTop: "1%",
    padding: "3%",
  },
  marginSpan: {
    margin: "0.5%",
    textAlign: "left",
  },
  boxContainerForImage: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "500px",
  },
  boxContainerForBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
}));

export default function ImageLayout(product) {
  const classes = useStyles();
  const { Data, Quantity, Price, ImageSourceLink, ProductID } = product.product;
  const [quantity, setQuantity] = useState(Quantity);

  function updateQuantity(x) {
    const payload = {
      id: ProductID,
      quantity: x,
    };

    const requestOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    };

    console.log(payload)

    fetch("http://localhost:3000/api/items", requestOptions)
      .then((res) => {
        if (!res.ok) {
          throw new Error("HTTP status " + res.status);
        }
        return res.json();
      })
      .then((data) => {})
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Box className={classes.itemContainer}>
        <Box className={classes.boxContainerForImage}>
          <Image
            src={`https://storage.googleapis.com/hackathon-bucket-123/images/ProductImages/${ImageSourceLink}`}
            alt="7up"
            layout="responsive"
            width={100}
            height={100}
            sizes="50vw"
          />
        </Box>
        <Box className={classes.dataContainer}>
          <span className={classes.marginSpan} style={{ fontSize: "20px" }}>
            <b>{Data}</b>
          </span>
          <Grid
            container
            spacing={2}
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginTop: "1%",
            }}
          >
            <Grid item xs={6} style={{ textAlign: "left" }}>
              <b>
                <span className={classes.marginSpan}>₹ {Price}.00</span>
              </b>
              <br />
              <span
                className={classes.marginSpan}
                style={{ fontSize: "12px", color: "#cfc9c6" }}
              >
                Stock: {quantity}
              </span>
            </Grid>
            <Grid item xs={6} style={{ textAlign: "right" }}>
              <Button
                style={{
                  background: "grey",
                  color: "white",
                  fontSize: "10px",
                }}
                variant="contained"
                onClick={(e) => {
                  setQuantity(quantity+1)
                  updateQuantity(quantity+1)
                }}
              >
                +
              </Button>
              <Button
                style={{
                  background: "grey",
                  color: "white",
                  fontSize: "10px",
                }}
                variant="contained"
                onClick={(e) => {
                  if (quantity > 0){
                    setQuantity(quantity - 1);
                    updateQuantity(quantity - 1)
                  }
                }}
              >
                -
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Grid>
  );
}
