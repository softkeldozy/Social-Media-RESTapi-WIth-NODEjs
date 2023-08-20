import express from "express";
import mongoose from "mongoose";
import router from "./routes/user-routes";


// initialize express
const app = express();


app.use('/api/users', router);

// Connecting to mongoDB....hide mongoDB url later
const connectDB = async () =>{
    try{
      const conn = await mongoose.connect('mongodb+srv://softkeldozy:g%23043protocol@cluster0.d4m7bye.mongodb.net/BlogAPIService');
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