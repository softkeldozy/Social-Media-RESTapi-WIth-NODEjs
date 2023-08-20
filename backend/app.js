import express from "express";
import mongoose from "mongoose";
import router from "./routes/user-routes";
import blogRouter from "./routes/blog-routes";
import dotenv from 'dotenv';

// initialize express
const app = express();
dotenv.config();

/** **********************************************************/
// parse the request from body so the db can understand the data being sent for storage
app.use(express.json());
/** **********************************************************/
app.use('/api/user', router);
app.use('/api/blog', blogRouter);

// Connecting to mongoDB....hide mongoDB url later
const connectDB = async () =>{
    try{
      // const conn = await mongoose.connect('mongodb+srv://softkeldozy:g%23043protocol@cluster0.d4m7bye.mongodb.net/BlogAPIService');
      const conn = await mongoose.connect(process.env.MONGO_URI); 
      console.log(`MongoDB Connected: ${conn.connection.host}`)
    }
    catch (err){
        console.log(err);
        process.exit(1);
    }
}
connectDB();

// Port Listening
const PORT = process.env.PORT || 3000;
app.listen(PORT,console.log(`Server is running on port ${PORT}`));