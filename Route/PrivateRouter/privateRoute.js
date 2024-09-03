const express = require('express');
const privateRoute = express.Router();

privateRoute.route('/')
  .all((req, res, next) => {
    console.log("Hit private Route");
    next();
  })
  .get(async (req, res) => {
    res.send("GET");
  })
  .patch(async (req, res) => {
    res.send("PATCH");
  })
  .put(async (req, res) => {
    res.send("PUT");
  })
  .post(async (req, res) => {
    res.send("POST");
  })
  .delete(async (req, res) => {
    res.send("Hello Delete");
  });

module.exports = privateRoute;
