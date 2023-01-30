import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";

const url = "mongodb://localhost:27017/FileTest";
const storage = new GridFsStorage({
  url,
  file: (req, file) => {
    return file.originalname + "-" + Date.now();
  },
});
const upload = multer({ storage });
export default upload;
