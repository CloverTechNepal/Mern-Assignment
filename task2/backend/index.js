import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";


dotenv.config();


const app = express();

app.use(express.json());


app.use('/auth', authRoutes);

// connect to DB
(async() => {
    try {
        mongoose.connect(`${process.env.MONGODB_URL}/loginapi`);
        console.log("DB connected");
        
    } catch (error) {
        console.log("Login error", error);
        
    }
})();




export default app;