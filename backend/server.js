
const express = require('express')
const path = require('path')
const cors = require('cors') 
const mongoose = require('mongoose')
const transactionRoutes = require('./routes/transactions')
const userRoutes = require('./routes/user')
require('dotenv').config({ path: path.join(__dirname, '.env') });

// express app
const app = express()

// enable CORS
app.use(cors())

// middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/api/transactions', transactionRoutes)
app.use('/api/user', userRoutes)

if (process.env.NODE_ENV ==="production") {
  app.use(express.static("frontend/build"));
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

  