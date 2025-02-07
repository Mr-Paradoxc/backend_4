import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const videoSchema = new mongoose.Schema({
videofile:{
    type: String,//cluodinary 
    required: true,
},
thumbnail:{
    type: String,
    required: true,
},
owner:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",},

tittle:{
    type: String,
    required: true,
},
description:{
    type: String,
    
},

duration:{
    type: Number, //cluodinary
    required: true,
},
views:{
    type: Number,
    default: 0,
},

isPublished:{
    type: Boolean,
    default: false,
}
}, { timestamps: true});



export const Video = mongoose.model("Video", videoSchema);