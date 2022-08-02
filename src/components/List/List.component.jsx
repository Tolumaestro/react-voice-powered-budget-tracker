import React, { useContext } from "react";
import { List as MUIList, ListItem, ListItemAvatar, Avatar, ListItemSecondaryAction, IconButton, Slide, ListItemText } from "@material-ui/core";
import { Delete, MoneyOff } from "@material-ui/icons";
import { GlobalContext } from "../context/context";

import useStyles from "./List.styles"

const List = () => {
    const { list, avatarIncome, avatarExpense } = useStyles()
    const { transactions, deleteTransaction } = useContext(GlobalContext)

    return (
        <MUIList dense={false} className={list}>
            {transactions.map(transaction => (
                <Slide direction="down" in mountOnEnter unmountOnExit key={transaction.id}>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar className={transaction.type === "Income" ? avatarIncome : avatarExpense}>
                                <MoneyOff />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={transaction.category} secondary={`${transaction.amount} - ${transaction.date}`} />
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="delete" onClick={() => {deleteTransaction(transaction.id)}} >
                                <Delete />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                </Slide>
            ))}
        </MUIList>
    )
};

export default List;
