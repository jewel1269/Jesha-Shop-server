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


    // _id ফিল্টারের জন্য ObjectId কনভার্ট করা
    const filter = { _id: new ObjectId(id) };

    const result = await foodsCollection.findOne(filter);
 

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
 
    // _id ফিল্টারের জন্য ObjectId কনভার্ট করা
    const filter = { _id: new ObjectId(id) };

    const result = await electronicsCollection.findOne(filter);


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


    // _id ফিল্টারের জন্য ObjectId কনভার্ট করা
    const filter = { _id: new ObjectId(id) };

    const result = await beautyCollection.findOne(filter);
  

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


    // _id ফিল্টারের জন্য ObjectId কনভার্ট করা
    const filter = { _id: new ObjectId(id) };

    const result = await healthCollection.findOne(filter);
   

    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ error: 'Food not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch food', details: error.message });
  }
});




//get data from Telivision collection
publicRouter.get('/telivision', async (req, res) => {
  try {
    const telivisionCollection = req.app.locals.db.collection("Telivision");
    const result = await telivisionCollection.find().toArray();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Electronics', details: error.message });
  }
});


//get data from Telivision collection with id
publicRouter.get('/telivision/:id', async (req, res) => {
  try {
    const telivisionCollection = req.app.locals.db.collection("Telivision");

    const id = req.params.id;


    // _id ফিল্টারের জন্য ObjectId কনভার্ট করা
    const filter = { _id: new ObjectId(id) };

    const result = await telivisionCollection.findOne(filter);


    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ error: 'Food not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch food', details: error.message });
  }
});



//get data from Telivision collection
publicRouter.get('/babycare', async (req, res) => {
  try {
    const babyCareCollection = req.app.locals.db.collection("babyCare");
    const result = await babyCareCollection.find().toArray();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Electronics', details: error.message });
  }
});


//get data from Telivision collection with id
publicRouter.get('/babycare/:id', async (req, res) => {
  try {
    const babyCareCollection = req.app.locals.db.collection("babyCare");

    const id = req.params.id;
 

    // _id ফিল্টারের জন্য ObjectId কনভার্ট করা
    const filter = { _id: new ObjectId(id) };

    const result = await babyCareCollection.findOne(filter);


    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ error: 'Food not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch food', details: error.message });
  }
});


//get data from regular collection
publicRouter.get('/regular', async (req, res) => {
  try {
    const regularCollection = req.app.locals.db.collection("Regular");
    const result = await regularCollection.find().toArray();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Electronics', details: error.message });
  }
});


//get data from Telivision collection with id
publicRouter.get('/regular/:id', async (req, res) => {
  try {
    const regularCollection = req.app.locals.db.collection("Regular");

    const id = req.params.id;

    // চেক করুন যে id একটি বৈধ ObjectId কিনা
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }

    const filter = { _id: new ObjectId(id) };

    const result = await regularCollection.findOne(filter);

    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ error: 'Food not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch food', details: error.message });
  }
});





// POST request to add customer data
publicRouter.post('/', async (req, res) => {
  try {
    const customersCollection = req.app.locals.db.collection("customer");
    const customerData = req.body;

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
