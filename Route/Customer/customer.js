const express = require('express');
const customer = express.Router();

customer.route('/')
  .all((req, res, next) => {
    console.log("Hit Customer Route");
    next();
  })
  .get(async (req, res) => {
    res.send("GET");
  })
  .post(async (req, res) => {
    try {
      const customersCollection = req.app.locals.db.collection("customer");
      const customerData = req.body;
      console.log(customerData, "hello cus");
     

      const result = await customersCollection.insertOne(customerData);
      res.status(201).json({ message: 'Customer added successfully', result });
    } catch (error) {
      res.status(500).json({ error: 'Failed to add customer', details: error.message });
    }
  })
  .delete(async (req, res) => {
    res.send("Hello Delete");
  });

module.exports = customer;
