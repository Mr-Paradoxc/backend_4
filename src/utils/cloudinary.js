import { v2 as cloudinary } from 'cloudinary';
import e from 'express';
import fs from 'fs';

    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
    });


    

const uploadOncloudanary = async (filepath) => {

try{

    if(!filepath){
       console.log('No file path found');
    }
   const response = await cloudinary.uploader.upload(filepath, {
        resource_type: "auto",
    })

    console.log(response.url);

    return response
    
}
catch(error){

    fs.unlinkSync(filepath);
    return error;
}


};


export default uploadOncloudanary;