const { default: axios } = require('axios');
const express = require('express');
const payment = express.Router();
const { ObjectId } = require('mongodb');

// Middleware to log requests
payment.use((req, res, next) => {
  console.log("Hit payment Route");
  next();
});

payment.post("/checkout", async (req, res) => {
  try {
    const paymentCollections = req.app.locals.db.collection("payment");
    const cartCollections = req.app.locals.db.collection("cart"); // Reference to cart collection
    const { item, user, total, address, deliveryMethod } = req.body;

    const trxId = new ObjectId().toString().toUpperCase().slice(0, 12); // Generate transaction ID

    const initiatData = {
      store_id: "jewel6682a64b2eda6", 
      store_passwd: "jewel6682a64b2eda6@ssl",
      total_amount: total, 
      currency: "BDT", 
      tran_id: trxId,
      success_url: "http://localhost:3000/paymentSuccess",  // Payment success route
      fail_url: "http://localhost:3000/paymentfail",           
      cancel_url: "http://localhost:5173/payment-cancel",    
      cus_name: user.displayName || "Customer Name", 
      cus_email: user.email || "cust@yahoo.com", 
      cus_add1: user.address || "Dhaka", 
      cus_city: user.address || "Dhaka", 
      cus_state: user.state || "Dhaka", 
      cus_postcode: user.postcode || "1000", 
      cus_country: "Bangladesh",
      cus_phone: user.phoneNumber || "Not Available", 
      cus_fax: user.fax || "Not Available", 
      shipping_method: "NO",
      product_name: item.item?.Category,
      product_category: "Fruits",
      product_profile: "general",
      multi_card_name: "mastercard,visacard,amexcard",
      value_a: "ref001_A",
      value_b: "ref002_B",
      value_c: "ref003_C",
      value_d: "ref004_D",
    };

    // Make request to SSLCommerz
    const response = await axios({
      method: 'POST',
      url: 'https://sandbox.sslcommerz.com/gwprocess/v4/api.php',
      data: new URLSearchParams(initiatData).toString(),
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      }
    });

    console.log(response, "responsive");

    // Prepare data to save in your payment collection
    const saveData = {
      Customer_info: user,
      paymentId: trxId,
      amount: total,
      details: address,
      status: 'pending',
      Date: new Date(),
      item: item,
      Invoice: {
        title: 'Jesha Shop.',
        logo: 'https://i.ibb.co/17HLxck/download-removebg-preview.png', 
        address: 'বাড়ি ৩, রোড ৯/বিনিকুঞ্জ-১, খিলক্ষেত ঢাকা ১২২৯, বাংলাদেশ',
        Status: "Pending", 
        PaymentMethod: deliveryMethod
      }
    };

    // Save the payment info to the database
    const successPayment = await paymentCollections.insertOne(saveData);
    if (successPayment) {
      // Respond with the SSLCommerz payment gateway URL
      res.send({ paymentUrl: response.data.GatewayPageURL });
    } else {
      res.status(500).send("Failed to save payment data");
    }

  } catch (error) {
    console.error("Payment initiation failed:", error);
    res.status(500).send("Payment initiation failed");
  }
});




// Success payment endpoint
payment.get("/paymentSuccess", async (req, res) => {
  try {
    const paymentCollections = req.app.locals.db.collection("payment");
    const cartCollections = req.app.locals.db.collection("cart");

    const { tran_id } = req.query; // Get transaction ID from the success query

    // Find the corresponding payment entry and update its status to 'success'
    const payment = await paymentCollections.findOneAndUpdate(
      { paymentId: tran_id }, 
      { $set: { status: 'success' } }
    );

    if (payment) {
      // Delete the cart data for the user after successful payment
      const cartDeletion = await cartCollections.deleteMany({ userId: payment.value.Customer_info.userId });

      if (cartDeletion.deletedCount > 0) {
        res.status(200).send("Payment successful and cart cleared");
      } else {
        res.status(200).send("Payment successful but cart was already empty");
      }
    } else {
      res.status(400).send("Payment record not found");
    }
  } catch (error) {
    console.error("Error in payment success:", error);
    res.status(500).send("Payment success handling failed");
  }
});



module.exports = payment;