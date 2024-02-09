import { Box, Button, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Image from "next/image";
import translateMapping from "@/translate";

const useStyles = makeStyles((theme) => ({
  itemContainer: {
    background: "white",
    border: "1px solid #d5dde1",
    margin: "2%",
    padding: "3%",
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
    justifyContent: "center",
    width: "100%",
    height: "400px",
  },
  boxContainerForBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
}));

export default function ImageLayout(product) {
  const t = product.t
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

    fetch("/api/items", requestOptions)
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
            alt=""
            layout="responsive"
            width={100}
            height={100}
          />
        </Box>
        <br />
        <Box className={classes.dataContainer}>
          <span className={classes.marginSpan} style={{ fontSize: "18px" }}>
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
            <Grid item xs={12} style={{ textAlign: "left" }}>
              <b>
                <span className={classes.marginSpan}>₹ {Price}.00</span>
              </b>
              <br />
              <span
                className={classes.marginSpan}
                style={{ fontSize: "12px", color: "#cfc9c6" }}
              >
                {t.stock}: {quantity}
              </span>
            </Grid>
            {/* <Grid item xs={6} style={{ textAlign: "right" }}>
              <Button
                style={{
                  background: "grey",
                  color: "white",
                  fontSize: "10px",
                }}
                variant="contained"
                disabled
              >
                Add to Cart
              </Button>
            </Grid> */}
          </Grid>
        </Box>
      </Box>
    </Grid>
  );
}
