

// const mongoose = require("mongoose");

// const specialSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     category: { type: String, enum: ["Male", "Female", "Kids"], required: true }, // Ensures category is valid
//     brand: { type: String, required: true },
//     price: { type: Number, required: true },
//     specialPrice: { type: Number, required: true },
//     mainImage: { type: String, required: true },
//     Image1: { type: String, required: true },
//     Image2: { type: String, required: true },
//     Image3: { type: String, required: true },
//     Image4: { type: String, required: true },
//     stock: { type: Number, required: true, min: 0 }, // Stock count field
//     descount: { type: Number, required: true },
// });

// const Special = mongoose.model("special", specialSchema);
// module.exports = Special;

const mongoose = require("mongoose");

const specialSchema = new mongoose.Schema({
    name: { type: String, required: true },
    gender: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    specialPrice: { type: Number, required: true },
    mainImage: { type: String, required: true },
    image1: { type: String, required: true }, 
    image2: { type: String, required: true },
    image3: { type: String, required: true },
    image4: { type: String, required: true },
    stock: { type: Number, required: true },
    discount: { type: Number, required: true }  // Make sure it's not `descount`
    // category: { type: String, required: true }
});

const Special = mongoose.model("special", specialSchema);
module.exports = Special;
