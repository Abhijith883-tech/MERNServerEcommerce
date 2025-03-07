// const mongoose = require("mongoose");

// const cartSchema = new mongoose.Schema({
//     userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//     products: [
//         {
//             productId: { type: mongoose.Schema.Types.ObjectId, ref: "Men", required: true }, // FIXED: Changed "Product" to "Men"
//             name: String,
//             price: Number,
           
//             quantity: { type: Number, default: 1 }
//         }
//     ]
// });

// const Cart = mongoose.model("Cart", cartSchema);
// module.exports = Cart;

const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    products: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: "Men", required: true }, 
            name: String,
            price: Number,
            image: { type: String, required: true }, // ✅ Added product image field
            quantity: { type: Number, default: 1 }
        }
    ]
});

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;

