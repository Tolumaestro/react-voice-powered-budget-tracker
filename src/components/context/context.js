import React, { useReducer, createContext } from "react";
import appReducer from "./appReducer";

const initialState = {
    transactions: []
};

export const GlobalContext = createContext(initialState)

export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(appReducer, initialState);

    const transactions = state.transactions

    const deleteTransaction = id => dispatch({
        type: "DELETE_TRANSACTION",
        payload: id
    })

    const addTransaction = transaction => dispatch({
        type: "ADD_TRANSACTION",
        payload: transaction
    })

    console.log(state);

    return (
        <GlobalContext.Provider value={{ transactions,addTransaction, deleteTransaction}}>
            {children}
        </GlobalContext.Provider>
    )
}