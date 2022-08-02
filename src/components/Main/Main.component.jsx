import React from "react";
import { Card, CardHeader, CardContent, Typography, Grid, Divider } from "@material-ui/core";

import useStyles from "./Main.styles"

import Form from "../Form/Form.component";
import List from "../List/List.component";
import InfoCard from "../InfoCard";
import useBalance from "../../utils/useBalance";

const Main = () => {
    const { root, cardContent } = useStyles()
    const balance = useBalance()
  return (
    <Card className={root}>
        <CardHeader title="Budget Tracker" subheader="Built by MaestroDev &copy; 2022" />
        <CardContent>
            <Typography align="center" variant="h5">Total Balance {balance < 0 && "-"}&#8358;{balance > 0 ? balance :  Math.abs(balance)}</Typography>
            <Typography variant="subtitle1" style={{lineHeight: "1.5em", marginTop: "20px"}}>
                {/* Infocard ... */}
                <InfoCard /> 
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
