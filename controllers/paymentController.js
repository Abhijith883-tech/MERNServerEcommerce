// const express = require("express");
// const Stripe = require("stripe");
// require("dotenv").config();

// const router = express.Router();
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// console.log("Stripe Secret Key:", process.env.STRIPE_SECRET_KEY);

// router.post("/create-checkout-session", async (req, res) => {
//   try {
//     const { productName, price, quantity } = req.body;

//     if (!productName || !price || !quantity) {
//       return res.status(400).json({ error: "Missing required fields" });
//     }

//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       line_items: [
//         {
//           price_data: {
//             currency: "usd",
//             product_data: {
//               name: productName,
//             },
//             unit_amount: price * 100, // Convert dollars to cents
//           },
//           quantity: quantity,
//         },
//       ],
//       mode: "payment",
//       success_url: "http://localhost:3000/success",
//       cancel_url: "http://localhost:3000/cancel",
//     });

//     res.json({ url: session.url });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });


// module.exports = router;

const express = require("express");
const Stripe = require("stripe");
require("dotenv").config();

const men = require("../models/products"); // Importing the men model
const Special = require("../models/special"); // Importing the special model

const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

console.log("Stripe Secret Key:", process.env.STRIPE_SECRET_KEY);

// Create a checkout session for a product
// exports.createCheckoutSession = async (req, res) => {
//   try {
//     const { productName, price, quantity } = req.body;
//     console.log("Received Request Body:", req.body);

//     if (!productName || !price || !quantity) {
//       return res.status(400).json({ error: "Missing required fields" });
//     }

//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       line_items: [
//         {
//           price_data: {
//             currency: "usd",
//             product_data: { name: productName },
//             unit_amount: price * 100, // Convert dollars to cents
//           },
//           quantity: quantity,
//         },
//       ],
//       mode: "payment",
//       success_url: "http://localhost:3000/success",
//       cancel_url: "http://localhost:3000/cancel",
//     });

//     res.json({ url: session.url });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };



// exports.createCheckoutSession = async (req, res) => {
//   try {
//     console.log("Received Request Body:", req.body);

//     // Validate request body
//     if (!req.body.products || !Array.isArray(req.body.products)) {
//       return res.status(400).json({ error: "Missing required fields" });
//     }

//     // Map products to Stripe line_items format
//     const line_items = req.body.products.map((product) => {
//       if (!product.name || !product.price || !product.quantity) {
//         return res.status(400).json({ error: "Missing required fields" });
//       }

//       return {
//         price_data: {
//           currency: "usd",
//           product_data: { name: product.name },
//           unit_amount: product.price * 100, // Convert to cents
//         },
//         quantity: product.quantity,
//       };
//     });

//     // Create Stripe Checkout session
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       line_items,
//       mode: "payment",
//       success_url: "http://localhost:5173/success",
//       cancel_url: "http://localhost:5173/cancel",
//     });

//     res.json({ url: session.url });
//   } catch (error) {
//     console.error("Stripe Error:", error.message);
//     res.status(500).json({ error: error.message });
//   }
// };


// exports.createCheckoutSession = async (req, res) => {
//   try {
//     const { products } = req.body; // Extract products array from request body
//     console.log("Received Request Body:", req.body);

//     if (!products || products.length === 0) {
//       return res.status(400).json({ error: "Missing required fields" });
//     }

//     // Transform products into Stripe's required format
//     const line_items = products.map((product) => ({
//       price_data: {
//         currency: "usd",
//         product_data: { name: product.name }, // Make sure 'name' exists in product
//         unit_amount: Math.round(product.price * 100), // Convert dollars to cents
//       },
//       quantity: product.quantity,
//     }));

//     // Create Stripe checkout session
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       line_items,
//       mode: "payment",
//       success_url: "http://localhost:5173/cart",
//       cancel_url: "http://localhost:3000/cancel",
//     });

//     res.json({ url: session.url }); // Send the checkout URL to frontend
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

exports.createCheckoutSession = async (req, res) => {
  try {
    const { products } = req.body; // Extract products array from request body
    console.log("Received Request Body:", req.body);

    if (!products || products.length === 0) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Transform products into Stripe's required format
    const line_items = products.map((product) => ({
      price_data: {
        currency: "usd",
        product_data: { name: product.name }, // Ensure 'name' exists in product
        unit_amount: Math.round(product.price * 100), // Convert dollars to cents
      },
      quantity: product.quantity,
    }));

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: "http://localhost:5173/cart?payment=success", // Redirect with success flag
      cancel_url: "http://localhost:5173/cart",
    });

    res.json({ url: session.url }); // Send the checkout URL to frontend
  } catch (error) {
    console.error("Stripe Checkout Error:", error);
    res.status(500).json({ error: error.message });
  }
};

