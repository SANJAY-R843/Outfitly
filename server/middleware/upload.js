import multer from 'multer';

// Use memory storage for quick compression buffers
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Invalid format. Please upload an image file (PNG, JPG, JPEG, WEBP).'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 8 * 1024 * 1024 // 8 MB limit
  }
});

export default upload;
