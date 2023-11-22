import path from "node:path";
import multer from "multer";
import { MAX_FILE_SIZE } from "@/constants/file.constant";

const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, "uploads/");
  },
  filename: function (_req, file, cb) {
    const uniqueName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

export const upload = multer({
  storage: storage,
  limits: { fileSize: MAX_FILE_SIZE },
});
