const express = require('express')
const {
  createTransaction,
  getTransactions,
  getTransaction,
  deleteTransaction
} = require('../controllers/transactionController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all transaction routes
router.use(requireAuth)

// GET all transactions
router.get('/', getTransactions)

//GET a single transactions
router.get('/:id', getTransaction)

// POST a new transactions
router.post('/', createTransaction)

// DELETE a transactions
router.delete('/:id', deleteTransaction)

module.exports = router