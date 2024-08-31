const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');
const port = process.env.PORT || 5000;
const handleroute = require("./routes/handleroute")

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.DATABASE_URl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.log('Failed to connect to MongoDB', err));


//route

app.use('/data', handleroute)

//error handler
function errorHandler(err, req, res, next) {  
  if (res.headersSent) {  
    return next(err);  
  } else {
    res.status(500).json({ error: err.message || 'An unexpected error occurred' });
  }
};



// Routes
app.get('/', (req, res) => {
  res.send('Hello Jesha Shop!');
});

// Start the server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
