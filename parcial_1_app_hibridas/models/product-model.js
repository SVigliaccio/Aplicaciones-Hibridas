import mongoose from "mongoose";

const Schema = mongoose.Schema;
const mySchema = new Schema({
    name: String,
    description: String,
    category: Number,
    price: Number
});

const Product = mongoose.model('products', mySchema);

export default Product;