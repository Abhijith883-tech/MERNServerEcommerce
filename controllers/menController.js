const men = require('../models/products'); // Importing the men model

// Add a new men's product
// exports. addMenProduct = async (req, res) => {
//     try {
//         const { name, gender, brand, price, mainImage, Image1, Image2, Image3, Image4 } = req.body;

//         // Check if all required fields are provided
//         if (!name || !gender || !brand || !price || !mainImage || !Image1 || !Image2 || !Image3 || !Image4) {
//             return res.status(400).json({ message: "All fields are required!" });
//         }

//         // Create a new product
//         const newProduct = new men({
//             name,
//             gender,
//             brand,
//             price,
//             mainImage,
//             Image1,
//             Image2,
//             Image3,
//             Image4
//         });

//         // Save to the database
//         await newProduct.save();

//         res.status(201).json({ message: "Product added successfully!", product: newProduct });
//     } catch (error) {
//         res.status(500).json({ message: "Server error", error: error.message });
//     }
// };
exports.addMenProduct = async (req, res) => {
    try {
        const { name, gender, brand, price, mainImage, Image1, Image2, Image3, Image4, stock } = req.body;

        // Check if all required fields are provided
        if (!name || !gender || !brand || !price || !mainImage || !Image1 || !Image2 || !Image3 || !Image4 || stock === undefined) {
            return res.status(400).json({ message: "All fields are required, including stock count!" });
        }

        // Validate stock count (ensure it's a non-negative integer)
        if (!Number.isInteger(stock) || stock < 0) {
            return res.status(400).json({ message: "Stock must be a non-negative integer!" });
        }

        // Create a new product
        const newProduct = new men({
            name,
            gender,
            brand,
            price,
            mainImage,
            Image1,
            Image2,
            Image3,
            Image4,
            stock
        });

        // Save to the database
        await newProduct.save();

        res.status(201).json({ message: "Product added successfully!", product: newProduct });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


// exports.showMen = async (req, res) => {
//     console.log("Inside show"); // This will print in the console
//     res.status(200).send("Show Men API is working!"); // Always send a response
//     try {
//         console.log("Inside show"); // This will print in the console

//         // Fetch all men's products
//         const products = await men.find({ gender: "Men" });

//         if (products.length === 0) {
//             return res.status(404).json({ message: "No products found" });
//         }

//         res.status(200).json({ message: "Men's products fetched successfully!", products });
//     } catch (error) {
//         res.status(500).json({ message: "Server error", error: error.message });
//     }
// };





// module.exports = { addMenProduct };



exports.showMen = async (req, res) => {
    try {
        console.log("Inside show"); // Log to check if API is hit

        const products = await men.find({ gender: "Men" }); // Fetch all men's products

        if (!products || products.length === 0) {
            return res.status(404).json({ message: "No products found" });
        }

        res.status(200).json(products); // Send products as response
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


// exports.deleteMenProduct = async (req, res) => {
//     try {
//         const { id } = req.params; // Get product ID from URL

//         const deletedProduct = await men.findByIdAndDelete(id);

//         if (!deletedProduct) {
//             return res.status(404).json({ message: "Product not found!" });
//         }

//         res.status(200).json({ message: "Product deleted successfully!", product: deletedProduct });
//     } catch (error) {
//         res.status(500).json({ message: "Server error", error: error.message });
//     }
// };


// exports.deleteMenProduct = async (req, res) => {
//     try {
//         const { id } = req.params; // Get the id from URL

//         // Check if product exists
//         const product = await men.findById(id);
//         if (!product) {
//             return res.status(404).json({ message: "Product not found!" });
//         }

//         // Delete the product
//         await men.findByIdAndDelete(id);

//         res.status(200).json({ message: "Product deleted successfully!" });
//     } catch (error) {
//         res.status(500).json({ message: "Server error", error: error.message });
//     }
// };

// exports.deleteMenProduct=(req,res)=>{
//     // const product=await men.findById()
//     res.status(404).json({ message: "Product not found!" });

// }

exports.deleteMenProduct = async (req, res) => {
    try {
        const id = req.params.id.trim(); // Trim any unwanted spaces or newlines

        const deletedProduct = await men.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found!" });
        }

        res.status(200).json({ message: "Product deleted successfully!", product: deletedProduct });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

exports.editMenProduct = async (req, res) => {
    try {
        const id = req.params.id.trim(); // Get product ID from params

        // Find product by ID
        const product = await men.findById(id);

        if (!product) {
            return res.status(404).json({ message: "Product not found!" });
        }

        // Update product details
        const updatedProduct = await men.findByIdAndUpdate(
            id,
            { $set: req.body }, // Update fields dynamically based on request body
            { new: true, runValidators: true } // Return updated document & validate
        );

        res.status(200).json({ message: "Product updated successfully!", product: updatedProduct });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

