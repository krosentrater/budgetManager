import React, { useState } from 'react';
import Budget from './public-components/Budget.js';
import TotalExp from './public-components/TotalExp.js';
import Remaining from './public-components/Remaining.js';
import Expenses from './public-components/Expenses.js';
import ExpenseForm from './public-components/ExpenseForm.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AppProvider } from './public-components/context/AppContext.js';
import BudgetForm from './public-components/BudgetForm.js';


function Public(){

  const [isEditing, setIsEditing] = useState(false);

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  return (
    <AppProvider>
      <div className='container'>
        <h1 className="mt-3">Free Budget Planner</h1>
        <div className='row mt-3'>
          <div className="col-sm">
            {isEditing ? <BudgetForm /> : <Budget />}
            <button onClick={toggleEditMode} className='btn btn-primary'>
            {isEditing ? 'Confirm' : 'Edit Budget'}
            </button>
          </div>
          <div className="col-sm">
            <Remaining />
          </div>
          <div className="col-sm">
            <TotalExp />
          </div>
        </div>
        <h3 className="mt-3">Expenses</h3>
        <div className="row mt-3">
          <div className="col-sm">
            <Expenses />
          </div>
        </div>
        <h3 className="mt-3">Add Expense</h3>
        <div className="row mt-3">
          <div className="col-sm">
            <ExpenseForm />
          </div>
        </div>
      </div>
    </AppProvider>
  )
}

export default Public;
