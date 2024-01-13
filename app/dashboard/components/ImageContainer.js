"use client";

import { Button, Container, makeStyles } from "@material-ui/core";


const useStyles = makeStyles(({theme})=>({
    btn:{
        marginRight : '10px'
    }
}))

export default function ImageContainer(){
    const classes = useStyles();
    return(
        <Container>
            <Button className={classes.btn} variant="contained" color="primary">Type</Button>
            <Button className={classes.btn} variant="contained" color="secondary">Image</Button>
            <Button className={classes.btn} variant="contained">Speak</Button>
        </Container>
    )
}