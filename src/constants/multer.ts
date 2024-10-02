import multer from 'multer'

const storage = multer.diskStorage({
    destination: function (_req, _file, cb) {
      cb(null, '/src/images/upload');
    },
    filename: function (_req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    }
  });

export const upload = multer({ storage })