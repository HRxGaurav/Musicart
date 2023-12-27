import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true }, 
    fullname: { type: String, required: true, trim: true }, 
    price: { type: Number, required: true },  
    company: { type: String, required: true },  
    colour: { type: String, required: true, trim: true },
    type: { type: String, required: true, trim: true },
    about_item: { type: [String], required: true, trim: true },  
    images: { type: [String], required: true, trim: true },
    featured: { type: Boolean, required: true }
});
const Inventory = mongoose.model("Inventory", inventorySchema);

export default Inventory;
