import React, { useContext } from 'react';
import ExpenseItems from './ExpenseItems.js';
import { AppContext } from './context/AppContext.js';

function Expenses(){
    const { expenses } = useContext(AppContext);

    return (
        <ul className='list-group'>
            {expenses.map((expense) => (
			    <ExpenseItems id={expense.id} name={expense.name} cost={expense.cost} />
			))}
        </ul>
    )
}

export default Expenses;