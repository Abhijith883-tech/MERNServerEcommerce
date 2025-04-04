const users = require('../models/userModel');
const Cart = require("../models/cartModel");
const Product = require("../models/products");
const specials = require("../models/special");
const jwt = require('jsonwebtoken')
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

exports.loginController = async (req, res) => {
    console.log('Inside login controller');
    const { emailaddress, password } = req.body
    console.log(emailaddress, password);
    try {
        const existingUser = await users.findOne({ emailaddress, password })
        if (existingUser) {
            //token generation
            const token = jwt.sign({ userId: existingUser._id }, process.env.JWTPASSWORD)
            res.status(200).json({
                user: existingUser, token
            })
        } else {
            res.status(404).json('incorrect email/password')
        }
    } catch (error) {
        res.status(401).json(error)
    }

}

// ✅ Add to Cart
// exports.addToCart = async (req, res) => {
//     const { userId, productId, name, price,image} = req.body;
//     // console.log(req.body);

//     try {
//         console.log("Request Body:", req.body); // Log incoming data

//         let cart = await Cart.findOne({ userId });
//         console.log("Cart found:", cart);

//         if (!cart) {
//             cart = new Cart({ userId, products: [] });
//             console.log("New cart created:", cart);
//         }

//         const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);
//         console.log("Product index in cart:", productIndex);

//         if (productIndex > -1) {
//             cart.products[productIndex].quantity += 1;  // Increase quantity if product exists
//             console.log("Quantity updated:", cart.products[productIndex]);
//         } else {
//             cart.products.push({ productId, name, price,image, quantity: 1 });
//             console.log("New product added to cart:", cart.products);
//         }

//         await cart.save();
//         console.log("Cart saved successfully!");

//         res.json({ message: "Item added to cart", cart });
//     } catch (error) {
//         console.error("Error adding to cart:", error); // Log the actual error
//         res.status(500).json({ error: "Server error", details: error.message });
//     }
// };

exports.addToCart = async (req, res) => {
    const { userId, productId, name, price, image } = req.body;

    try {
        console.log("Request Body:", req.body);

        // Find the product
        const product = await Product.findById(productId);
        console.log("product :", product);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Check if stock is available
        if (product.stock < 1) {
            return res.status(400).json({ message: "Product out of stock" });
        }

        // Decrease the stock by 1
        product.stock -= 1;
        await product.save();
        console.log("Stock updated:", product.stock);

        // Find the cart
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId, products: [] });
        }

        // Check if product already exists in cart
        const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);

        if (productIndex > -1) {
            cart.products[productIndex].quantity += 1;  // Increase quantity
        } else {
            cart.products.push({ productId, name, price, image, quantity: 1 });
        }

        await cart.save();
        console.log("Cart saved successfully!");

        res.json({ message: "Item added to cart and stock updated", cart });
    } catch (error) {
        console.error("Error adding to cart:", error);
        res.status(500).json({ error: "Server error", details: error.message });
    }
};

exports.addToCartSpecial = async (req, res) => {
    const { userId, productId, name, price, image } = req.body;

    try {
        console.log("Request Body:", req.body);

        // Find the product
        const product = await specials.findById(productId);
        console.log("product :", product);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Check if stock is available
        if (product.stock < 1) {
            return res.status(400).json({ message: "Product out of stock" });
        }

        // Decrease the stock by 1
        product.stock -= 1;
        await product.save();
        console.log("Stock updated:", product.stock);

        // Find the cart
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId, products: [] });
        }

        // Check if product already exists in cart
        const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);

        if (productIndex > -1) {
            cart.products[productIndex].quantity += 1;  // Increase quantity
        } else {
            cart.products.push({ productId, name, price, image, quantity: 1 });
        }

        await cart.save();
        console.log("Cart saved successfully!");

        res.json({ message: "Item added to cart and stock updated", cart });
    } catch (error) {
        console.error("Error adding to cart:", error);
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
// exports.removeFromCart = async (req, res) => {
//     console.log("hhhh");  // Test log to see if the function is hit
//     // res.json({ message: "Item removed successfully" });  // Send a response
//     const { userId, productId } = req.params;
//     console.log(userId);

//     try {
//         const cart = await Cart.findOne({ userId });
//         if (!cart) return res.status(404).json({ error: "Cart not found" });

//         // Remove product from cart
//         cart.products = cart.products.filter(item => item.productId.toString() !== productId);

//         // Save the updated cart to the database
//         await cart.save();

//         // Send the updated cart as response
//         return res.json(cart);
//     } catch (error) {
//         return res.status(500).json({ error: "Server error" });
//     }
// };

exports.removeFromCart = async (req, res) => {
    console.log("Function called");
    const { userId, productId } = req.params;
    console.log("UserId:", userId, "ProductId:", productId);

    try {
        const cart = await Cart.findOne({ userId });
        if (!cart) return res.status(404).json({ error: "Cart not found" });

        console.log("Before deletion:", cart.products); // Check initial products

        // Remove product from cart
        cart.products = cart.products.filter(item => item.productId.toString() !== productId);

        console.log("After deletion:", cart.products); // Check if item is removed

        // Save the updated cart to the database
        await cart.save();

        return res.json(cart);
    } catch (error) {
        return res.status(500).json({ error: "Server error" });
    }
};

// Controller to empty the cart
exports.emptyCart = async (req, res) => {
    try {
        const userId = req.params.userId; // Get userId from request params

        // Find the cart by userId and update it to remove all products
        const updatedCart = await Cart.findOneAndUpdate(
            { userId },
            { $set: { products: [] } }, // Set products array to empty
            { new: true } // Return updated cart
        );

        if (!updatedCart) {
            return res.status(404).json({ message: "Cart not found for this user" });
        }

        res.json({ message: "Cart emptied successfully", cart: updatedCart });
    } catch (error) {
        console.error("Error emptying cart:", error);
        res.status(500).json({ message: "Internal server error" });
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

// Get count of men's dresses
exports.getUserCount = async (req, res) => {
    try {
       
        const count = await users.countDocuments();
        res.json({ count: count }); // Directly returns the count
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};


exports.clearCart = async (req, res) => {
    try {
        const result = await Cart.deleteMany({});
        res.json({ message: "Cart cleared successfully", deletedCount: result.deletedCount });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};


exports.logout = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1]; // Extract token from header

        if (!token) {
            return res.status(401).json({ message: "Unauthorized, no token provided" });
        }

        // Optionally, verify token using JWT (only needed if you want to invalidate tokens)
        // const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        return res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};




