import axios from 'axios';
export const uploadImage = async (image) => {
  const staticImageName = image.title;

  const imageData = image.file;
  const nexusUrl = 'http://89.116.20.12:8081/repository/nabeegh/';
  const nexusUsername = 'nabeegh';   // Nexus username
  const nexusPassword = 'Nabeegh@123';

  const imageUrl = `${nexusUrl}${staticImageName}`;
  try {
    const headers = {
      'Content-Security-Policy': 'default-src https:; script-src https: http:',
      'Content-Type': 'application/octet-stream',  // Binary file type
    };
    const response = await axios.put(
      imageUrl,  // Complete URL for the file upload
      imageData,
      {
        headers: headers,
        auth: {
          username: nexusUsername,
          password: nexusPassword
        }
      }
    );

    if (response.status === 201) {  // HTTP 201 Created
      console.log('Image uploaded successfully.', imageUrl);
      return imageUrl;
    } else {
      console.error("Failed to upload image.Status code:", response.status);
    }
  } catch (error) {
    console.error('Error uploading image:', error.message);
  }
}