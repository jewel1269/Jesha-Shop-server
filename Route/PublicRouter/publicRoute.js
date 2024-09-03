const express = require('express');
const publicRouter = express.Router();

// Middleware to log requests
publicRouter.use((req, res, next) => {
  console.log("Hit Public Route");
  next();
});

// GET request to fetch all foods
publicRouter.get('/', async (req, res) => {
  try {
    const foodsCollection = req.app.locals.db.collection("Foods");
    const result = await foodsCollection.find().toArray();
    console.log(result);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch foods', details: error.message });
  }
});



// PATCH request
publicRouter.patch('/', async (req, res) => {
  res.send("PATCH");
});

// PUT request
publicRouter.put('/', async (req, res) => {
  res.send("PUT");
});

// POST request to add customer data
publicRouter.post('/', async (req, res) => {
  try {
    const customersCollection = req.app.locals.db.collection("customer");
    const customerData = req.body;
    console.log(customerData, "hello cus");

    const result = await customersCollection.insertOne(customerData);
    res.status(201).json({ message: 'Customer added successfully', result });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add customer', details: error.message });
  }
});

// DELETE request
publicRouter.delete('/', async (req, res) => {
  res.send("DELETE");
});

module.exports = publicRouter;
