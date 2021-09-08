import {useState}  from 'react';

const Budget = () => {


    const [savings, setSavings] = useState (0);
    const[totalIncome, setTotalIncome] = useState(0);
    const[totalExpense, setTotalExpense] = useState(0);
    const[incomeList, setIncomeList] = useState([]);
    const[expenseList, setExpenseList] = useState([]);






    return (
        <>

        <header className="header">
            <h2> Budget </h2>
            <h2> {savings} </h2>
            <div className="container-income">
                <span >INCOME</span>
                <span className="income">{totalIncome}</span>
            </div>
            <div  className="container-expenses">
                <span>EXPENSES</span>
                <span className="expense">{totalExpense}</span>
            </div>
        </header>
        <section className="add">
            <input type="text" 
            />

        </section>
        
        </>
    )
}

export default Budget;