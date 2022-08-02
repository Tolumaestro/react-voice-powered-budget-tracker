import useTransactions from "./useTransactions";

const useBalance = () => {
    const income = useTransactions("Income").total
    const expense = useTransactions("Expense").total

    const balance = income - expense

    return balance
}

export default useBalance