import React, { useState, useContext } from 'react';
import { AppContext } from './context/AppContext.js';

function BudgetForm(){

    const { dispatch } = useContext(AppContext);
    const [budget, setBudget] = useState('');

    const onSubmit =(e) => {
        e.preventDefault();
        const parsedBudget = {
            budget: parseInt(budget),
        };

        dispatch({
            type: "EDIT_BUDGET",
            payload: parsedBudget,
        });
    };

    return (
        <div>
            <form onSubmit = {onSubmit}>
                <div className = 'row'>
                    <div className='col-sm'>
                        <label htmlFor='budget'>Set Budget </label>
                        <input
                            required='required'
                            type='number'
                            id='budget'
                            value={budget}
                            onChange={(e) => setBudget(e.target.value)}>
                        </input>
                        <button type='submit' className='btn btn-primary'>Set</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default BudgetForm;