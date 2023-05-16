require('dotenv').config()

const express = require('express')
const path = require('path')
const cors = require('cors') 
const mongoose = require('mongoose')
const transactionRoutes = require('./routes/transactions')
const userRoutes = require('./routes/user')

// express app
const app = express()
// middleware
app.use(express.json())

// Enable CORS
app.use(cors())


app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/api/transactions', transactionRoutes)
app.use('/api/user', userRoutes)

if (process.env.NODE_ENV ==="production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname,"frontend","build","index.html"));
  });
}

// connect to db and listen for requests
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT || 4000, () => {
      console.log('connected to db & listening on port', process.env.PORT || 4000)
    })
  })
  .catch((error) => {
    console.log(error)
  })