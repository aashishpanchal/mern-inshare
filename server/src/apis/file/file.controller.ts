import { wrapper } from "@/utils/wrapper";
import fileService from "./file.service";
import { SendSchema } from "./schema";

export const uploadFile = wrapper(async (req) => {
  const file = req.file;
  // upload file in database
  const url = await fileService.uploadFile(file);
  // and return url of upload file
  return { url };
});

export const findOne = wrapper(async (req) => {
  const uuid = req.params.uuid;
  // find file in database
  return await fileService.findOne(uuid);
});

export const downloadFile = wrapper(async (req, res) => {
  const uuid = req.params.uuid;
  // find file in database
  const path = await fileService.downloadFile(uuid);
  // and download file
  res.download(path);
});

export const sendFile = wrapper(async (req) => {
  const body = SendSchema.parse(req.body);
  await fileService.sendFileOnEmail(body);
  return { message: "Email send successfully." };
});
