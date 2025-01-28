// import mongoose from "mongoose";
// import { DB_NAME } from "./constants";

// import express from "express";
// const app = express();


// ;(async()=>{
//     try{
//         mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)

//         app.listen(process.env.PORT, () => {
//             console.log('Server is running on port 3000')
//         })
        
        

//     }
//     catch(error){
//         console.error('Error connecting to MongoDB: ', error)
//     }
// })()
// require('dotenv').config({path:'./env'});

import 'dotenv/config';
import connectDB from "./db/index.js";





connectDB();

