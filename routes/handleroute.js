const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const handleSchema = require('../Schema/handleSchema');
const userModel = mongoose.model('USER', handleSchema);

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await userModel.find({});
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Create a new user
router.post("/", async (req, res) => {
   
      const user = req.body;
      console.log(user, "user");
  
    //   const newUser = new userModel(user);
    //   await newUser.save();
    //   console.log(newUser,"new");
    //   res.status(200).json({ message: "User created successfully" });
    // } catch (err) {
    //   console.error("Error saving user:", err); 
    //   res.status(500).json({ error: "Server error" });
    // }
  });

// Create multiple users
router.post('/all', async (req, res) => {
  try {
    const users = req.body;
    await userModel.insertMany(users);
    res.status(200).json({ message: 'Users created successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update a user by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedUser = await userModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (updatedUser) {
      res.status(200).json({ message: 'User updated successfully', data: updatedUser });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete a user by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedUser = await userModel.findByIdAndDelete(req.params.id);
    if (deletedUser) {
      res.status(200).json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
