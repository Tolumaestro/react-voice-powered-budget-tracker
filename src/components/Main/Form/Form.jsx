import React, { useState, useContext } from "react";
import { TextField, Typography, Grid, Button, FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import { GlobalContext } from "../../context/context";
import { v4 as uuid4 } from "uuid"

import useStyles from "./styles"
import { incomeCategories, expenseCategories } from "../../../constants/categories";
import formatDate from "../../../utils/formatDate";

const initialFormData ={
    amount: "",
    category: "",
    type: "Income",
    date: formatDate(new Date())
}

const Form = () => {
    const { addTransaction } = useContext(GlobalContext)
    const { button } = useStyles();

    const [formData, setFormData] = useState(initialFormData)

    const createTransaction = () => {
        const transaction = {
            ...formData,
            amount: Number(formData.amount),
            id: uuid4()
        }
        addTransaction(transaction)
        setFormData(initialFormData)
    }

    const selectedCategories = formData.type === "Income" ? incomeCategories : expenseCategories

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography align="center" variant="subtitle2" gutterBottom>
                    ...
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel>Type</InputLabel>
                    <Select value={formData.type} onChange={e => setFormData({...formData, type:e.target.value})}>
                        <MenuItem value="Income">Income</MenuItem>
                        <MenuItem value="Expense">Expense</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select value={formData.category} onChange={e => setFormData({...formData, category:e.target.value})}>
                        {selectedCategories.map(selected => <MenuItem key={selected.type} value={selected.type}>{selected.type}</MenuItem> )}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <TextField type="number" label="Amount" fullWidth value={formData.amount} onChange={e => setFormData({...formData, amount:e.target.value})} />
            </Grid>
            <Grid item xs={6}>
                <TextField type="date" label="Date" fullWidth  value={formData.date} onChange={e => setFormData({...formData, date: formatDate(e.target.value)})} />
            </Grid>
            <Button className={button} variant="outlined" color="primary" fullWidth onClick={createTransaction}>Create</Button>
        </Grid>
    )
};

export default Form;
