import React, { useContext } from 'react';
import { AppContext } from './context/AppContext.js';

function Budget() {
    const { budget } = useContext(AppContext);

    const startingBudget = budget ? budget.budget : 0;

    return (
        <div className='alert alert-secondary'>
            <span>Budget ${startingBudget}</span>
        </div>
    )
};

export default Budget;