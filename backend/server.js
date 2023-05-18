require('dotenv').config();

const express = require('express')
const cors = require('cors') 
const mongoose = require('mongoose')
const transactionRoutes = require('./routes/transactions')
const userRoutes = require('./routes/user')



// express app
const app = express()

// enable CORS
app.use(cors({origin: 'https://taylorella-mern-stack-app.netlify.app'}))


// middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/api/transactions', transactionRoutes)
app.use('/api/user', userRoutes)



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

  