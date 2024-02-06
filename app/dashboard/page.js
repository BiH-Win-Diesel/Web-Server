"use client";

import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  AppBar,
  Toolbar,
  Typography,
  Box,
  InputBase,
  Link,
} from "@material-ui/core";
import { alpha, makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import FindReplaceIcon from "@material-ui/icons/FindReplace";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import ReceiptIcon from "@material-ui/icons/Receipt";
import ImageLayout from "./components/ImageLayout";
import ImageContainer from "./components/ImageContainer";
import VoiceUploader from "./components/VoiceUploader";

const useStyles = makeStyles((theme) => ({
  form: {
    maxWidth: "100vw",
    minHeight: "100vh",
    margin: 0,
    padding: 0,
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  footer: {
    padding: theme.spacing(3.5),
    marginTop: "auto",
    backgroundColor: "#2c4152",
  },
  footerColumn: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  footerTitle: {
    fontWeight: "bold",
    marginBottom: theme.spacing(2),
    color: "#b8c4c9",
  },
  footerLink: {
    marginBottom: theme.spacing(1),
    fontSize: "10px",
    textDecoration: "none",
    color: "#b8c4c9",
  },
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "50%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/items")
      .then((res) => {
        if (!res.ok) {
          throw new Error("HTTP status " + res.status);
        }
        return res.json();
      })
      .then((data) => {
        setProducts(data.data);
      })
      .catch((err) => {
        console.log(err)
      });
  }, []);

  return (
    <div style={{ fontFamily: "sans-serif" }}>
      <AppBar
        position="fixed"
        style={{
          backgroundColor: "white",
          borderTop: "3px solid #2c4152",
          color: "#2c4152",
          padding: "0.3%",
        }}
      >
        <VoiceUploader/>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h4" noWrap>
            <b>ONDC</b>
          </Typography>
          <div
            className={classes.search}
            style={{
              borderRadius: "20px",
              border: "1px solid #2c4152",
              position: "absolute",
              right: "0.3%",
              backgroundColor: "#fffded",
            }}
          >
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
        </Toolbar>
      </AppBar>
      <Container style={{ marginTop: "10%" }}>
        <center>
          <h2 style={{ color: "#2c4152" }}>Want to Update Your Warehouse?</h2>
          <ImageContainer />
        </center>
      </Container>

      <Container
        className={classes.container}
        style={{ marginTop: "5%", marginBottom: "5%" }}
      >
        {products.length > 0 &&
          products.map((p) => <ImageLayout product={p} />)}
      </Container>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          backgroundColor: "white",
          padding: "5%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <AssignmentTurnedInIcon />
          <b>1 Year</b> Warranty
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <FindReplaceIcon />
          <b>7-Day</b> Replacement
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <LocalShippingIcon />
          <b>Free</b> Shipping
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <ReceiptIcon />
          <b>GST</b> Billing
        </div>
      </div>

      <Box className={classes.footer}>
        <Container>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={4} className={classes.footerColumn}>
              <Typography className={classes.footerTitle}>About</Typography>
              <Link href="#" className={classes.footerLink}>
                Who We Are
              </Link>
              <Link href="#" className={classes.footerLink}>
                Join Our Team
              </Link>
              <Link href="#" className={classes.footerLink}>
                Terms & Conditions
              </Link>
              <Link href="#" className={classes.footerLink}>
                We Respect Your Privacy
              </Link>
              <Link href="#" className={classes.footerLink}>
                Fees & Payments
              </Link>
              <Link href="#" className={classes.footerLink}>
                Returns & Refunds Policy
              </Link>
              <Link href="#" className={classes.footerLink}>
                Promotions Terms & Conditions
              </Link>
            </Grid>

            <Grid item xs={12} sm={4} className={classes.footerColumn}>
              <Typography className={classes.footerTitle}>Help</Typography>
              <Link href="#" className={classes.footerLink}>
                Track Your Order
              </Link>
              <Link href="#" className={classes.footerLink}>
                Frequently Asked Questions
              </Link>
              <Link href="#" className={classes.footerLink}>
                Returns
              </Link>
              <Link href="#" className={classes.footerLink}>
                Cancellations
              </Link>
              <Link href="#" className={classes.footerLink}>
                Payments
              </Link>
              <Link href="#" className={classes.footerLink}>
                Customer Care
              </Link>
              <Link href="#" className={classes.footerLink}>
                How Do I Redeem My Coupon
              </Link>
            </Grid>

            <Grid item xs={12} sm={4} className={classes.footerColumn}>
              <Typography className={classes.footerTitle}>Follow Us</Typography>
              <div style={{ display: "flex" }}>
                <Link href="#" className={classes.footerLink}>
                  <FacebookIcon />
                </Link>
                <Link
                  href="#"
                  className={classes.footerLink}
                  style={{ marginLeft: "5px" }}
                >
                  <InstagramIcon />
                </Link>
                <Link
                  href="#"
                  className={classes.footerLink}
                  style={{ marginLeft: "5px" }}
                >
                  <TwitterIcon />
                </Link>
              </div>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  );
}
