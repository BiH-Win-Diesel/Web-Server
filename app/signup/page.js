"use client";

import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

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

const SignupForm = () => {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your signup logic here
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            className={classes.textField}
            value={name}
            onChange={handleNameChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            className={classes.textField}
            value={name}
            onChange={handleNameChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Email"
            variant="outlined"
            type="email"
            fullWidth
            className={classes.textField}
            value={email}
            onChange={handleEmailChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Phone Number"
            variant="outlined"
            fullWidth
            className={classes.textField}
            value={phone}
            onChange={handlePhoneChange}
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
          <TextField
            label="Confirm Password"
            variant="outlined"
            type="password"
            fullWidth
            className={classes.textField}
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Sign Up
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default SignupForm;
