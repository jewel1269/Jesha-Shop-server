const express = require('express');
const admin = express.Router();

admin.route('/')
  .all((req, res, next) => {
    console.log("Hit admin Route");
    next();
  })
  .get(async (req, res) => {
    res.send("GET");
  })
  .post(async (req, res) => {
    res.send("POST");
  })
  .delete(async (req, res) => {
    res.send("Hello Delete");
  });

module.exports = admin;
