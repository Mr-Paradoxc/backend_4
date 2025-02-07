import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    watchHistory: [{
        type: mongoose.Schema.Types.ObjectId,
        ref : "Video"
     }
    ],
    userName:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    fullName:{
        type: String,
        required: true,
        trim: true,
        index: true
    },
    avatar:{
        type: String,
        default: 'https://www.gravatar.com/avatar/'//cloudnary
    },
    coverimage:{
        type: String,
        default: 'https://www.gravatar.com/avatar/'//cloudnary
    },
    password:{
        type: String,
        required: [true, 'Password is required'],
    },
    refreshToken: {
        type: String,
    },


}, { timestamps: true });

userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();

    this.password = bcrypt.hash(this.password,7)
    next()
});

userSchema.methods.isPasswordcorrect = async function(password){
  return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken =async function(){
   return await Jwt.sign({
        _id:this._id,
        email:this.email,
        userName:this.userName,
        fullName:this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET,{
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
    )
};
userSchema.methods.generateRefreshToken =async function(){
    return await Jwt.sign({
        _id:this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,{
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
    )
};

export const User = mongoose.model("User", userSchema);