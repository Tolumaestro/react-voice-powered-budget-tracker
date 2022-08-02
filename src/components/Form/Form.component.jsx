import React, { useState, useEffect, useContext } from "react";
import { TextField, Grid, Button, FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import { GlobalContext } from "../context/context";
import { v4 as uuid4 } from "uuid"
import { useSpeechContext } from "@speechly/react-client/dist/hooks";

import useStyles from "./Form.styles"
import { incomeCategories, expenseCategories } from "../../constants/categories";
import formatDate from "../../utils/formatDate";
import CustomizedSnackbar from "../Snackbar.js/Snackbar.component";

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
    const { segment } = useSpeechContext()
    const [open, setOpen] = useState(false)

    const createTransaction = () => {
        if (Number.isNaN(Number(formData.amount)) || !formData.date.includes('-')) return;
        const transaction = {
            ...formData,
            amount: Number(formData.amount),
            id: uuid4()
        }

        setOpen(true)
        addTransaction(transaction)
        setFormData(initialFormData)
    }

    useEffect(() => {
        if (segment) {
          if (segment.intent.intent === 'add_expense') {
            setFormData({ ...formData, type: 'Expense' });
          } else if (segment.intent.intent === 'add_income') {
            setFormData({ ...formData, type: 'Income' });
          } else if (segment.isFinal && segment.intent.intent === 'create_transaction') {
            return createTransaction();
          } else if (segment.isFinal && segment.intent.intent === 'cancel_transaction') {
            return setFormData(initialFormData);
          }
    
          segment.entities.forEach((s) => {
            const category = `${s.value.charAt(0)}${s.value.slice(1).toLowerCase()}`;
    
            switch (s.type) {
              case 'amount':
                setFormData({ ...formData, amount: s.value });
                break;
              case 'category':
                if (incomeCategories.map((iC) => iC.type).includes(category)) {
                  setFormData({ ...formData, type: 'Income', category });
                } else if (expenseCategories.map((iC) => iC.type).includes(category)) {
                  setFormData({ ...formData, type: 'Expense', category });
                }
                break;
              case 'date':
                setFormData({ ...formData, date: s.value });
                break;
              default:
                break;
            }
          });
    
          if (segment.isFinal && formData.amount && formData.category && formData.type && formData.date) {
            createTransaction();
          }
        }
      }, [segment]);

    const selectedCategories = formData.type === "Income" ? incomeCategories : expenseCategories

    return (
        <Grid container spacing={2}>
            <CustomizedSnackbar open={open} setOpen={setOpen}/>
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
