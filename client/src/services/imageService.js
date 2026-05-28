/**
 * Generates an object URL from file nodes for immediate DOM rendering previews.
 */
export const createImagePreviewUrl = (file) => {
  if (!file) return '';
  return URL.createObjectURL(file);
};

/**
 * Revokes active preview URLs to prevent memory leakage.
 */
export const revokeImagePreviewUrl = (url) => {
  if (url && url.startsWith('blob:')) {
    URL.revokeObjectURL(url);
  }
};

/**
 * Validates uploaded photo parameters before server uploads.
 */
export const validateImageFile = (file) => {
  const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
  const maxSize = 10 * 1024 * 1024; // 10MB

  if (!file) return { valid: false, error: 'No image uploaded.' };
  if (!validTypes.includes(file.type)) return { valid: false, error: 'Invalid photo format. Please select JPEG, PNG, or WEBP.' };
  if (file.size > maxSize) return { valid: false, error: 'Photo is too heavy. Maximum file size is 10MB.' };

  return { valid: true };
};
