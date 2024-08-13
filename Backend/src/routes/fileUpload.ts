import { Hono } from 'hono';

export const fileRouter = new Hono<{
    Bindings: {
        cloudinary_cloud_name: string;
        cloudinary_api_key: string;
        cloudinary_api_secret: string;
    };
}>();

fileRouter.use('*', async (_c, next) => {
    await next();
});

fileRouter.post('/upload-via-file', async (c) => {
  try {
    const formData = await c.req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      c.status(400);
      return c.json({
        success: 0,
        error: 'No valid file found',
      });
    }

    // Convert file to a Blob
    const fileBlob = new Blob([file], { type: file.type });

    // Prepare Cloudinary upload URL and headers
    const uploadUrl = `https://api.cloudinary.com/v1_1/${c.env.cloudinary_cloud_name}/image/upload`;

    // Create FormData for Cloudinary upload
    const cloudinaryFormData = new FormData();
    cloudinaryFormData.append('file', fileBlob, file.name);
    cloudinaryFormData.append('upload_preset', 'dastaan'); // Replace 'your_preset' with your actual preset

    // Basic Authentication header with Cloudinary API key and secret
    const authHeader = `Basic ${btoa(`${c.env.cloudinary_api_key}:${c.env.cloudinary_api_secret}`)}`;

    // Upload file to Cloudinary
    const uploadResponse = await fetch(uploadUrl, {
      method: 'POST',
      headers: {
        'Authorization': authHeader,
      },
      body: cloudinaryFormData,
    });

    const uploadResult:any= await uploadResponse.json();
    // console.log(uploadResult);
    c.status(200);
    return c.json({
      success: 1,
      message: 'File uploaded successfully',
      imageUrl: uploadResult.secure_url, // URL to access the uploaded file
    });

  } catch (e: any) {
    console.error(e);
    c.status(500);
    return c.json({
      success: 0,
      message: 'Something went wrong while uploading the file',
      error: e.message,
    });
  }
});
