import { Box, Button } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Image from "next/image";

const useStyles = makeStyles((theme) => ({
  textField: {
    marginBottom: theme.spacing(2),
  },
  itemContainer: {
    width: "160px",
    aspectRatio: "0.8642533936651584",
    background: "white",
    padding: "10px",
    borderRadius: "20px",
    margin: '5px'
  },
  dataContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginTop: "10px",
  },
  marginSpan: {
    margin: "6px",
    marginLeft: "10px",
    textAlign: "left",
  },
  boxContainerForImage: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  boxContainerForBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
}));

export default function ImageLayout() {
  const classes = useStyles();
  return (
    <Box className={classes.itemContainer}>
      <Box className={classes.boxContainerForImage}>
        <Image
          src={"/LayoutImages/7up_Cool_Drink_Pet.jpg"}
          alt="7up"
          width={115}
          height={115}
          objectFit={"contain"}
        />
      </Box>
      <Box className={classes.dataContainer}>
        <span className={classes.marginSpan}>7up Cool Drink</span>
        <span className={classes.marginSpan}>Quantity: 10</span>
        <span className={classes.boxContainerForBtn}>
          <span>Price: 20</span>
          <Button style={{ background: "yellow" }} variant="contained">
            Add
          </Button>
        </span>
      </Box>
    </Box>
  );
}
