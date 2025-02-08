import asyncHandler from "../utils/asyncHandler.js";
import apiError from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import uploadOncloudanary from "../utils/cloudinary.js";
import apiResponce from "../utils/apiSucessResponce.js";

const registerUser = asyncHandler(async(req,res)=>{

//get user  details from fornte end
//validaton
//check if user already exists : email or username
//check for images , check for avatar
// upload images on cloudinary,avatar
//create user object - create user in db
// remove password and refresh token from response
//check for user creation
//send response


const {fullName,userName,email,password}= req.body
console.log(fullName,userName,email,password);

if(fullName || userName || email || password === ""){
throw new apiError(400,"Full name is required")
}

const existedUser =  User.findOne({$or:[{email},{userName}]})

if(existedUser){
    throw new apiError(409,"User already exists")
}

 const avatarLocalPath =   req.files?.avatar[0].path;
 const coverImageLocalPath = req.files?.coverImage[0].path;

 if(!avatarLocalPath){
     throw new apiError(400,"Avatar is required")
 }

 const avatar =  await uploadOncloudanary(avatarLocalPath)
 const coverImage = await uploadOncloudanary(coverImageLocalPath)

 if(!avatar){
     throw new apiError(500,"Image upload failed")
 }

const user =  await User.create({
    fullName,
    avatar:avatar.url,
    coverImage:coverImage?.url || "",
    userName : userName.toLowerCase(),
    email,
    password
 })

 const createdUser = await User.findById(user._id).select("-password -refreshToken")
 
 if(!createdUser){
     throw new apiError(500,"User creation failed")
 }

return res.staus(201).json(new apiResponce(201,createdUser,"User created successfully"))


}

);

export default registerUser;