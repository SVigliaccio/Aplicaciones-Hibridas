import mongoose from 'mongoose';
import AutoIncrementFactory from 'mongoose-sequence';
import dotenv from "dotenv";
dotenv.config();

const dburi = process.env.MONGODB_URI;

const connection = mongoose.createConnection(dburi);

const AutoIncrement = AutoIncrementFactory(connection);

const Schema = mongoose.Schema;
const mySchema = new Schema({
  _id: Number,
  name: String,
  description: String
}, 
{ 
    _id: false // IMPORTANTE: paradesactivar _id automático
}); 

mySchema.plugin(AutoIncrement, { id: 'category_seq', inc_field: '_id' }); // category_seq es el nombre interno del contador que va a guardar el número actual.

const Category = connection.model('categories', mySchema);

export default Category;



