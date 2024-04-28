import React, { useState } from 'react';

const Public = () => {
  const [name, setName] = useState('');
  const [cost, setCost] = useState('');

  const onSubmit = (event) => {
    event.preventDefault();
    // Handle form submission (e.g., add expense to state)
    // You can use the 'name' and 'cost' values here
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="row">
        <div className="col-sm">
          <label htmlFor="name">Name</label>
          <input
            required
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="col-sm">
          <label htmlFor="cost">Cost</label>
          <input
            required
            type="number"
            className="form-control"
            id="cost"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
          />
        </div>
      </div>
      <button type="submit" className="btn btn-primary mt-3">
        Add Expense
      </button>
    </form>
  );
};

export default Public;
