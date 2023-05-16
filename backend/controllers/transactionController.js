const Transaction = require('../models/transactionModel')
const User = require('../models/userModel')
const mongoose = require('mongoose')

// get all transactions
const getTransactions = async (req, res) => {
  const user_id = req.user._id

  const transactions = await Transaction.find({user_id}).sort({createdAt: -1})

  res.status(200).json(transactions)
}

// get a single transactions
const getTransaction = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such transaction'})
  }

  const transaction = await Transaction.findById(id)

  if (!transaction) {
    return res.status(404).json({error: 'No such transaction'})
  }
  
  res.status(200).json(transaction)
}

// create a transaction
const createTransaction = async (req, res) => {
  const { title, amount, type } = req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push('title');
  }
  if (!amount) {
    emptyFields.push('amount');
  }
  if (!type) {
    emptyFields.push('type');
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields });
  }

  try {
    const user_id = req.user._id;
    const transaction = await Transaction.create({ title, amount, type, user_id });

    // Update user's balance based on transaction
    const transactionAmount = parseInt(amount);
    const transactionType = type === 'deposit' ? 'deposit' : 'withdraw';

    const user = await User.findById(user_id);
    await user.updateBalance(transactionAmount, transactionType);

    res.status(200).json(transaction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a transaction
const deleteTransaction = async (req, res) => {
    const { id } = req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({error: 'No such transaction'})
    }
  
    const transaction = await Transaction.findOneAndDelete({_id: id})
  
    if (!transaction) {
      return res.status(400).json({error: 'No such transaction'})
    }
  
    res.status(200).json(transaction)
  }

module.exports = {
  getTransactions,
  getTransaction,
  createTransaction,
  deleteTransaction
}