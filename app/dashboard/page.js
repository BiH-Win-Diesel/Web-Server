"use client";

import { Container, makeStyles } from "@material-ui/core";
import ImageLayout from "./components/ImageLayout";
import ImageContainer from "./components/ImageContainer";

const useStyles = makeStyles((theme) => ({
  form: {
    maxWidth: "100vw",
    minHeight: "100vh",
    margin: 0,
    padding: 0,
  },
  container:{
    display: 'flex',
    flexWrap: 'wrap'
  }
}));

export default function Dashboard() {
  const classes = useStyles();
    return (
    <Container className={classes.form}>
      <h1 style={{textAlign:"center", fontSize:"50px"}}>WINDIESEL</h1>
      <Container>
        <h1>UPDATE YOUR WAREHOUSE</h1>
        <ImageContainer/>
      </Container>
      <Container className={classes.container}>
        <ImageLayout />
        <ImageLayout />
        <ImageLayout />
        <ImageLayout />
        <ImageLayout />
        <ImageLayout />
        <ImageLayout />
        <ImageLayout />
        <ImageLayout />
        <ImageLayout />
        <ImageLayout />
        <ImageLayout />
        <ImageLayout />
        <ImageLayout />
        <ImageLayout />
        <ImageLayout />
        <ImageLayout />
        <ImageLayout />
        <ImageLayout />
        <ImageLayout />
      </Container>
    </Container>
  );
}
