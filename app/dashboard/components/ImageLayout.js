import { Box, Button, Grid } from "@material-ui/core";
import React from "react";
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
    height: "auto",
  },
  boxContainerForBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
}));

export default function ImageLayout(product) {
  const classes = useStyles();
  const { Data, Quantity, Price } = product.product;

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Box className={classes.itemContainer}>
        <Box className={classes.boxContainerForImage}>
          <Image
            src={"/LayoutImages/I1.jpg"}
            alt="7up"
            layout="responsive"
            width={100}
            height={100}
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
                Stock: {Quantity}
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
                disabled
              >
                Add to Cart
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Grid>
  );
}
