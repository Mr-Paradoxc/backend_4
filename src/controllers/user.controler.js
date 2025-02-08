import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js"; // Ensure correct import
import {User} from "../models/user.model.js";
import uploadOncloudanary from "../utils/cloudinary.js";
import apiResponce from "../utils/apiSucessResponce.js";

const registerUser = asyncHandler(async (req, res) => {
    const { fullName, userName, email, password } = req.body;

    if (!fullName || !userName || !email || !password) {
        throw new ApiError(400, "Full name, username, email, and password are required");
    }

    const existedUser = await User.findOne({ $or: [{ email }, { userName }] });

    if (existedUser) {
        throw new ApiError(409, "User already exists");
    }

    const avatarLocalPath = req.files?.avatar[0].path;
    const coverImageLocalPath = req.files?.coverImage[0].path;

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar is required");
    }

    const avatar = await uploadOncloudanary(avatarLocalPath);
    const coverImage = await uploadOncloudanary(coverImageLocalPath);

    if (!avatar) {
        throw new ApiError(500, "Image upload failed");
    }

    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        userName: userName.toLowerCase(),
        email,
        password
    });

    const createdUser = await User.findById(user._id).select("-password -refreshToken");

    if (!createdUser) {
        throw new ApiError(500, "User creation failed");
    }

    return res.status(201).json(new apiResponce(201, createdUser, "User created successfully"));
});

export default registerUser;