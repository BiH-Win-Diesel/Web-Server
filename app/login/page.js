"use client";

import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { signIn } from "next-auth/react";

const useStyles = makeStyles((theme) => ({
  form: {
    maxWidth: "400px",
    margin: "auto",
    padding: theme.spacing(2),
    position: "absolute",
    top: "50vh",
    left: "50vw",
    transform: "translate(-50%,-50%)",
  },
  textField: {
    marginBottom: theme.spacing(2),
  },
}));

const LoginForm = () => {
  const classes = useStyles();
  const [phonenumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signIn("credentials", {
      phonenumber: phonenumber,
      password: password,
      redirect: true,
      callbackUrl: "/",
    });
  };

  return (
    <form
      className={classes.form}
      onSubmit={handleSubmit}
      style={{ fontFamily: "sans-serif" }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Phone Number"
            variant="outlined"
            type="text"
            fullWidth
            className={classes.textField}
            value={phonenumber}
            onChange={handlePhoneNumberChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            className={classes.textField}
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            style={{ backgroundColor: "#2c4152", color: "#fffded" }}
          >
            Login
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default LoginForm;
