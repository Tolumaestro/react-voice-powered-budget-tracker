import React from "react";
import { Card, CardHeader, CardContent, Typography, Grid, Divider } from "@material-ui/core";

import useStyles from "./styles"

import Form from "./Form/Form";
import List from "./List/List";

const Main = () => {
    const { root, cardContent } = useStyles()
  return (
    <Card className={root}>
        <CardHeader title="Budget Tracker" subheader="Built by MaestroDev &copy; 2022" />
        <CardContent>
            <Typography align="center" variant="h5">Total Balance $100</Typography>
            <Typography variant="subtitle1" style={{lineHeight: "1.5em", marginTop: "20px"}}>
                {/* Infocard ... */}
                Try saying: Add income for $1000 in category Salary for Monday 
            </Typography>
            <Divider />
            <Form />
            <CardContent className={cardContent}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <List />
                    </Grid>
                </Grid>
            </CardContent>
        </CardContent>
    </Card>
  )
};

export default Main;
