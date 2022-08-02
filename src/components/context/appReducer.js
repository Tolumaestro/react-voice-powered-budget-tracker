const appReducer =(state, action) => {
    switch(action.type){
        case "DELETE_TRANSACTION":
            state = {
                ...state,
                transactions: state.transactions.filter(transaction => transaction.id !== action.payload)
            }

            localStorage.setItem("transactions", JSON.stringify(state.transactions))

            return state

        case "ADD_TRANSACTION":
            state = {
                ...state,
                transactions: [action.payload, ...state.transactions]  
            }

            localStorage.setItem("transactions", JSON.stringify(state.transactions))

            return state
        default:
            return state
    }
}

export default appReducer;
