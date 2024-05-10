import React, { useContext } from 'react';
import { AppContext } from './context/AppContext.js';
import { TiDelete } from 'react-icons/ti';

function ExpenseItems(props) {

    const { dispatch } = useContext(AppContext);

    const handleDeleteExpenses = () => {
        dispatch({
            type: "DELETE_EXPENSE",
            payload: props.id,
        });
    };

    return (
        <li className='list-group-item d-flex justify-content-between align-items-center'>
            {props.name}
            <div>
                <span className="badge badge-primary badge-pill mr-3">
                    ${props.cost}
                </span>
                ${props.cost}
                <TiDelete onClick={handleDeleteExpenses} size='1.5em'></TiDelete>
            </div>
        </li>
    )
}

export default ExpenseItems;