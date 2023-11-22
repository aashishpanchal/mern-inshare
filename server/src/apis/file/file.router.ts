import { Router } from "express";
import { sendFile, findOne, uploadFile, downloadFile } from "./file.controller";
import { upload } from "@/middlewares/multer.middleware";

const fileRouter: Router = Router();

fileRouter.route("/upload").post(upload.single("file"), uploadFile);
fileRouter.route("/:uuid").get(findOne);
fileRouter.route("/send").post(sendFile);
fileRouter.route("/download/:id").get(downloadFile);

export default fileRouter;
