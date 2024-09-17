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
    const { item } = req.body; // Assuming item contains product details

    if (!item || !item._id) {
      return res.status(400).json({ error: "Product with valid _id is required." });
    }

    // Check if the product is already in the cart
    const existingItem = await cartsCollection.findOne({ "item._id": item._id });

    if (existingItem) {
      
      const currentQuantity = existingItem.Quantity || 1;
      
      if (currentQuantity < 5) {
        const newQuantity = currentQuantity + 1;
        console.log(newQuantity, "Hello Quantity");

        await cartsCollection.updateOne(
          { "item._id": item._id },
          { $set: { Quantity: newQuantity } }
        );

        res.status(200).json({
          message: 'Quantity updated successfully',
          updatedQuantity: newQuantity
        });
      } else {
        // If the quantity is already 5, do not increment
        res.status(400).json({
          message: 'Maximum quantity reached. Cannot add more of this item.'
        });
      }
      
    } else {
      // If product doesn't exist, add it with quantity 1
      const result = await cartsCollection.insertOne({
        ...req.body,
        Quantity: 1  
      });
      res.status(201).json({
        message: 'Item successfully added to cart with quantity 1',
        insertedId: result.insertedId
      });
    }
  } catch (error) {
    console.error('Error adding/updating cart:', error);
    res.status(500).json({
      error: 'Failed to add or update item in cart',
      details: error.message
    });
  }
});



//get with email
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

// DELETE request to remove an item from the cart
mycart.delete("/:id", async (req, res) => {
  try {
    const cartsCollection = req.app.locals.db.collection("mycart");
    const id = req.params.id; 
    console.log("Item ID:", id);

    // Ensure ID is valid before proceeding
    if (!ObjectId.isValid(id)) {
      return res.status(400).send({ message: "Invalid ID format" });
    }

    const filter = { _id: new ObjectId(id) };
    
    // Find the item first to check its quantity
    const item = await cartsCollection.findOne(filter);
    
    if (!item) {
      return res.status(404).send({ message: "Item not found" });
    }

    if (item.Quantity > 1) {
      // If quantity is greater than 1, decrement by 1
      const updatedResult = await cartsCollection.updateOne(filter, {
        $inc: { Quantity: -1 },
      });

      if (updatedResult.modifiedCount === 1) {
        return res.status(200).send({ message: "Quantity reduced by 1" });
      } else {
        return res.status(500).send({ message: "Failed to update quantity" });
      }
    } else {
      // If quantity is 1, delete the product
      const deleteResult = await cartsCollection.deleteOne(filter);
      
      if (deleteResult.deletedCount === 1) {
        return res.status(200).send({ message: "Item deleted successfully" });
      } else {
        return res.status(500).send({ message: "Failed to delete item" });
      }
    }
  } catch (error) {
    console.error("Error handling item:", error);
    return res.status(500).send({ error: "Internal Server Error" });
  }
});


module.exports = mycart;
