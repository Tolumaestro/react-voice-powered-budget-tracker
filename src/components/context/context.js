import React, { useReducer, createContext } from "react";
import appReducer from "./appReducer";

const initialState = {
    transactions: JSON.parse(localStorage.getItem("transactions")) || [{"amount":1000,"category":"Business","type":"Income","date":"2022-08-02","id":"f730d73d-a69b-41dc-8476-cf44d610c643"},{"amount":500,"category":"Bills","type":"Expense","date":"2022-08-02","id":"902fbcb8-f8ca-40fc-b3fa-0b1c2fdc9056"},{"amount":500,"category":"Investments","type":"Income","date":"2022-08-02","id":"55912a90-9236-4cf2-99fd-888394a312df"}]
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

    return (
        <GlobalContext.Provider value={{ transactions,addTransaction, deleteTransaction}}>
            {children}
        </GlobalContext.Provider>
    )
}