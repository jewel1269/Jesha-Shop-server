const express = require('express');
const publicRouter = express.Router();
const { ObjectId } = require('mongodb');

// Middleware to log requests
publicRouter.use((req, res, next) => {
  console.log("Hit Public Route");
  next();
});

// GET request to fetch all foods
publicRouter.get('/food', async (req, res) => {
  try {
    const foodsCollection = req.app.locals.db.collection("Foods");
    const result = await foodsCollection.find().toArray();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch foods', details: error.message });
  }
});

//get data with id
publicRouter.get('/food/:id', async (req, res) => {
  try {
    const foodsCollection = req.app.locals.db.collection("Foods");

    const id = req.params.id;
    console.log(id);

    // _id ফিল্টারের জন্য ObjectId কনভার্ট করা
    const filter = { _id: new ObjectId(id) };

    const result = await foodsCollection.findOne(filter);
    console.log(result);

    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ error: 'Food not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch food', details: error.message });
  }
});



//get data from electronics collection
publicRouter.get('/electronics', async (req, res) => {
  try {
    const electronicsCollection = req.app.locals.db.collection("Electronics");
    const result = await electronicsCollection.find().toArray();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Electronics', details: error.message });
  }
});



//get data from electronics collection with id
publicRouter.get('/electronics/:id', async (req, res) => {
  try {
    const electronicsCollection = req.app.locals.db.collection("Electronics");

    const id = req.params.id;
    console.log(id);

    // _id ফিল্টারের জন্য ObjectId কনভার্ট করা
    const filter = { _id: new ObjectId(id) };

    const result = await electronicsCollection.findOne(filter);
    console.log(result);

    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ error: 'Food not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch food', details: error.message });
  }
});


//get data from health collection
publicRouter.get('/beauty', async (req, res) => {
  try {
    const beautyCollection = req.app.locals.db.collection("beauty");
    const result = await beautyCollection.find().toArray();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch beauty', details: error.message });
  }
});


//get data from health collection with id
publicRouter.get('/beauty/:id', async (req, res) => {
  try {
    const beautyCollection = req.app.locals.db.collection("beauty");

    const id = req.params.id;
    console.log(id);

    // _id ফিল্টারের জন্য ObjectId কনভার্ট করা
    const filter = { _id: new ObjectId(id) };

    const result = await beautyCollection.findOne(filter);
    console.log(result);

    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ error: 'Food not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch food', details: error.message });
  }
});



//get data from health collection
publicRouter.get('/health', async (req, res) => {
  try {
    const healthCollection = req.app.locals.db.collection("health");
    const result = await healthCollection.find().toArray();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Electronics', details: error.message });
  }
});


//get data from health collection with id
publicRouter.get('/health/:id', async (req, res) => {
  try {
    const healthCollection = req.app.locals.db.collection("health");

    const id = req.params.id;
    console.log(id);

    // _id ফিল্টারের জন্য ObjectId কনভার্ট করা
    const filter = { _id: new ObjectId(id) };

    const result = await healthCollection.findOne(filter);
    console.log(result);

    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ error: 'Food not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch food', details: error.message });
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
