const users = require('../models/userModel');
const Cart = require("../models/cartModel");
const jwt=require('jsonwebtoken')
// Register
exports.registerController = async (req, res) => {
    console.log('Inside register controller');
    console.log(req.body);

    const { username, address, location, phonenumber, emailaddress, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await users.findOne({ emailaddress });
        if (existingUser) {
            return res.status(406).json('Already existing user...plz login');
        }

        // Create new user
        const newUser = new users({
            username,
            address,
            location,
            phonenumber,
            emailaddress,
            password,
            profilePic: ''
        });

        await newUser.save();
        res.status(200).json(newUser);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//login

exports.loginController=async(req,res)=>{
    console.log('Inside login controller');
    const{emailaddress,password}=req.body
    console.log(emailaddress,password);
    try {
        const existingUser=await users.findOne({emailaddress,password})
        if (existingUser) {
            //token generation
            const token=jwt.sign({userId:existingUser._id},process.env.JWTPASSWORD)
            res.status(200).json({
                user:existingUser,token
            })
        } else {
            res.status(404).json('incorrect email/password')
        }
    } catch (error) {
        res.status(401).json(error)
    }
    
}


// ✅ Add to Cart
exports.addToCart = async (req, res) => {
    const { userId, productId, name, price,image } = req.body;
    // console.log(req.body);
    
    try {
        console.log("Request Body:", req.body); // Log incoming data

        let cart = await Cart.findOne({ userId });
        console.log("Cart found:", cart);

        if (!cart) {
            cart = new Cart({ userId, products: [] });
            console.log("New cart created:", cart);
        }

        const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);
        console.log("Product index in cart:", productIndex);

        if (productIndex > -1) {
            cart.products[productIndex].quantity += 1;  // Increase quantity if product exists
            console.log("Quantity updated:", cart.products[productIndex]);
        } else {
            cart.products.push({ productId, name, price,image, quantity: 1 });
            console.log("New product added to cart:", cart.products);
        }

        await cart.save();
        console.log("Cart saved successfully!");

        res.json({ message: "Item added to cart", cart });
    } catch (error) {
        console.error("Error adding to cart:", error); // Log the actual error
        res.status(500).json({ error: "Server error", details: error.message });
    }
};










// ✅ Get User Cart
exports.getCart = async (req, res) => {
    const { userId } = req.params;

    try {
        const cart = await Cart.find({ userId }).populate("products.productId");
        if (!cart) return res.json({ message: "Cart is empty", products: [] });

        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};




// ✅ Remove Item from Cart
exports.removeFromCart = async (req, res) => {
    const { userId, productId } = req.params;

    try {
        const cart = await Cart.findOne({ userId });
        if (!cart) return res.status(404).json({ error: "Cart not found" });

        cart.products = cart.products.filter(item => item.productId.toString() !== productId);

        await cart.save();
        res.json({ message: "Item removed from cart", cart });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

// ✅ Update Cart Item Quantity
exports.updateCartQuantity = async (req, res) => {
    const { userId, productId, quantity } = req.body;

    try {
        const cart = await Cart.findOne({ userId });
        if (!cart) return res.status(404).json({ error: "Cart not found" });

        const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);

        if (productIndex > -1) {
            cart.products[productIndex].quantity = quantity;
        }

        await cart.save();
        res.json({ message: "Cart updated", cart });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

