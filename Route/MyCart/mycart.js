const express = require('express');
const mycart = express.Router();
const { ObjectId } = require('mongodb');

// Middleware to log requests
mycart.use((req, res, next) => {
  console.log("Hit MyCart Route");
  next();
});

// POST request to add an item to the cart
mycart.post('/', async (req, res) => {
  try {
    const cartsCollection = req.app.locals.db.collection("mycart");
    const item = req.body;
    console.log(item, "item");
    const result = await cartsCollection.insertOne(item);
    res.status(201).json({
      message: 'Item successfully added to cart',
      insertedId: result.insertedId
    });
  } catch (error) {
    console.error('Error adding to cart:', error);

    // Error response
    res.status(500).json({
      error: 'Failed to add item to cart',
      details: error.message
    });
  }
});


// DELETE request to remove an item from the cart
mycart.get('/:email', async (req, res) => {
  try {
    const cartsCollection = req.app.locals.db.collection("mycart");
    const email = req.params.email;
    
    const filter = { email: email };

    // Find items for the given email in the cart
    const result = await cartsCollection.find(filter).toArray();

    // Successful response with the cart items
    res.status(200).json(result);
    
  } catch (error) {
    console.error('Error fetching cart items:', error);

    // Error response
    res.status(500).json({
      error: 'Failed to fetch cart items',
      details: error.message
    });
  }
});

module.exports = mycart;
