import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true }, 
    phone: { type: String, required: true, trim: true }, 
    email: { type: String, required: true, trim: true }, 
    password: { type: String, required: true, trim: true },
    cart: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Inventory', required: true },
        quantity: { type: Number, default: 0 },
      }
    ]
});


const User = mongoose.model("User", userSchema);

export default User;
