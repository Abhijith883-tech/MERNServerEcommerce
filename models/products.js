
// const mongoose=require('mongoose')
// const menSchema=new mongoose.Schema({
//     name:{
//         type:String,
//         require:true
//     },
//     gender:{
//         type:String,
//         require:true
//     },
//     brand:{
//         type:String,
//         require:true
//     },
//     price:{
//         type:Number,
//         require:true
//     },
//     mainImage:{
//         type:String,
//         require:true,
//     },
//     Image1:{
//         type:String,
//         require:true
//     },
//     Image2:{
//         type:String,
//         require:true
//     },
//     Image3:{
//         type:String,
//         require:true
//     },
//     Image4:{
//         type:String,
//         require:true
//     }
// })

// const men=mongoose.model("men",menSchema)
// module.exports=men

const mongoose = require("mongoose");

const menSchema = new mongoose.Schema({
    name: { type: String, required: true },
    gender: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    mainImage: { type: String, required: true },
    Image1: { type: String, required: true },
    Image2: { type: String, required: true },
    Image3: { type: String, required: true },
    Image4: { type: String, required: true },
    stock: { type: Number, required: true, min: 0 } // Stock count field
});

const men = mongoose.model("Men", menSchema);
module.exports = men;
