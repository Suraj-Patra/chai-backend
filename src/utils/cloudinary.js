import fs from 'fs';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;

        // Upload the file on cloudinary :
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'auto',
        });

        // File has been uploaded successfully :
        console.log(
            'File is uploaded successfully on Cloudinary!',
            response.url
        );
        return response;
    } catch (error) {
        // Remove the locally saved file since the uploading got failed :
        fs.unlinkSync(localFilePath);
        return null;
    }
};

export { uploadOnCloudinary };
