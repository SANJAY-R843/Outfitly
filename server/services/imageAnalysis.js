import sharp from 'sharp';

/**
 * Resizes and compresses photo buffers to fit safely within API payload structures.
 * Resizes to max width/height 800px, converts to jpeg, and compresses to 80% quality.
 */
export const compressImageBuffer = async (buffer) => {
  try {
    const processedBuffer = await sharp(buffer)
      .resize({
        width: 800,
        height: 800,
        fit: 'inside',
        withoutEnlargement: true
      })
      .jpeg({ quality: 80 })
      .toBuffer();

    return {
      buffer: processedBuffer,
      mimeType: 'image/jpeg'
    };
  } catch (error) {
    error.statusCode = 500;
    error.message = `Image compression failed: ${error.message}`;
    throw error;
  }
};
