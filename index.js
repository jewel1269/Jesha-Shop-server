const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const publicRoute = require("./Route/PublicRouter/publicRoute");
const privateRoute = require("./Route/PrivateRouter/privateRoute");
const admin = require("./Route/Admin/admin");
const customer = require("./Route/Customer/customer");
const mycart = require("./Route/MyCart/mycart")

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded());

// Connect to MongoDB
const uri = process.env.DATABASE_URL; 

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server
    // await client.connect();
    
    // Attach the database to app.locals 
    app.locals.db = client.db("Jesha"); 
    
    // Routes
    app.use("/public", publicRoute);
    app.use("/private", privateRoute);
    app.use("/admin", admin);
    app.use("/customer", customer);
    app.use("/cart", mycart);

    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    // Start the server
    app.listen(port, () => {
      console.log(`App listening on port ${port}`);
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

// Error handler
function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({ error: err.message || "An unexpected error occurred" });
}

app.use(errorHandler);
