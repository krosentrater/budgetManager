const express = require('express');
const expenseRouter = express.Router();
const Expense = require('../models/expenses.js');

// const attachUserId = (req, res, next) => {
//   req.body.userId = req.user._id;
//   console.log(req.user._id)
//   next()
// };

// put in after '/', attachUserId async etc

expenseRouter.get('/', async (req, res, next) => {
    try {
        const expenses = await Expense.find();
        res.status(200).json(expenses);
    } catch (err) {
        res.status(500).json({error: 'Error fetching expenses.'});
        return next(err);
    };
});

expenseRouter.post('/', async (req, res, next) => {
  try {
    const newExpense = new Expense(req.body);
    console.log(req.body.userId)
    await newExpense.save();
    res.status(201).json(newExpense);
  } catch (err) {
    res.status(500).json({ error: 'Error creating expense' });
    return next(err);
  };
});

expenseRouter.get('/:id', async (req, res, next) => {
    try {
      const expense = await Expense.findById(req.params.id);
      if (!expense) {
        return res.status(404).json({ error: 'Expense not found' });
      }
      res.status(200).json(expense);
    } catch (err) {
      res.status(500).json({ error: 'Error fetching expense' });
      return next(err);
    };
});

expenseRouter.put('/:id', async (req, res, next) => {
    try {
      const updatedExpense = await Expense.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedExpense) {
        return res.status(404).json({ error: 'Expense not found' });
      }
      res.status(200).json(updatedExpense);
    } catch (err) {
      res.status(500).json({ error: 'Error updating expense' });
      return next(err);
    };
});

expenseRouter.delete('/:id', async (req, res, next) => {
    try {
      const deletedExpense = await Expense.findByIdAndDelete(req.params.id);
      if (!deletedExpense) {
        return res.status(404).json({ error: 'Expense not found' });
      }
      res.status(200).json({ message: 'Expense deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: 'Error deleting expense' });
      return next(err);
    };
});

module.exports = expenseRouter;