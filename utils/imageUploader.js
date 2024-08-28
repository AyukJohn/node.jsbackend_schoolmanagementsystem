const cloudinary = require('cloudinary').v2;

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadImage = async (filePath) => {
  try {
    console.log('Starting image upload...');
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: 'image',
      folder: 'staff'
    });
    console.log('Upload result:', result);
    return result;
  } catch (error) {
    console.error('Error during image upload:', error);
    throw new Error(`Failed to upload image: ${error.message}`);
  }
};

module.exports = uploadImage;
