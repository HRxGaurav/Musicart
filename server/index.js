import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import connectDB from './config/connectDB.js';
import authRoutes from './routes/authRoutes.js';
import inventoryRoutes from './routes/inventoryRoutes.js';


const app = express()

dotenv.config();
const PORT = process.env.PORT;

//Cors policy
app.use(cors()); 

//Connect Database
connectDB();

//Load Routes
app.use(authRoutes)
app.use(inventoryRoutes)

//JSON
app.use(express.json()) 

app.listen(PORT, ()=>{
    console.log(`Server Running on port ${PORT}`);
})

