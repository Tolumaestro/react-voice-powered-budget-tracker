import { useContext } from "react";
import { GlobalContext } from "../components/context/context";

import { incomeCategories, expenseCategories, resetCategories } from "../constants/categories";

const useTransactions = (title) => {
    resetCategories();
    const { transactions } = useContext(GlobalContext);
    const transactionsPerType = transactions.filter(transaction => transaction.type === title)
    const total = transactionsPerType.reduce((acc, currentValue) => acc += currentValue.amount, 0)
    const categories = title === "Income" ? incomeCategories : expenseCategories;

    transactionsPerType.forEach(transaction => {
        const category = categories.find(c => c.type === transaction.category)

        if(category) category.amount += transaction.amount;
    })

    const filteredCategories = categories.filter(category => category.amount > 0)

    const chartData = {
        datasets: [{
            data: filteredCategories.map(category => category.amount),
            backgroundColor: filteredCategories.map(category => category.color),
            labels: filteredCategories.map(category => category.type)
        }],
        labels: filteredCategories.map(category => category.type)
    }

    return { total, chartData}
}

export default useTransactions