import React from "react";
import { Card, CardHeader, CardContent, Typography } from "@material-ui/core"
import { Doughnut } from "react-chartjs-2";
import useTransactions from "../../utils/useTransactions";
import {Chart, ArcElement, Tooltip, Legend} from 'chart.js'

import useStyles from "./Details.styles"
Chart.register(ArcElement, Tooltip, Legend)


const Details = ({title}) => {

  const { income, expense } = useStyles()
  const { total, chartData } = useTransactions(title)

  return (
  <Card className={title === "Income" ? income : expense}>
        <CardHeader title={title} />
        <CardContent>
            <Typography variant="h5">&#8358;{total}</Typography>
            { chartData && <Doughnut data={chartData} />}
        </CardContent>
    </Card>
  )
};

export default Details;
