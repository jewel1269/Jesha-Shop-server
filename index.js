const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const publicRoute = require("./Route/PublicRouter/publicRoute");
const privateRoute = require("./Route/PrivateRouter/privateRoute");
const customer = require("./Route/Customer/customer");
const mycart = require("./Route/MyCart/mycart");
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser');



// Middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



// Connect to MongoDB
const uri = "mongodb+srv://juyelhabib272732:yUPRnMO97cTRJKoU@cluster0.sct3w.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri);

app.use("/public", publicRoute);
app.use("/private", privateRoute);
app.use("/customer", customer);
app.use("/cart", mycart);

async function run() {
  try {
    app.locals.db = client.db("Jesha");
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );

    // Start the server
    app.get("/favicon.png", (req, res) => {
      res.status(204);
    });

    app.get("/favicon.ico", (req, res) => {
      res.status(204);
    });
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
}

// Run the MongoDB connection function
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello Jesha Shop!");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
