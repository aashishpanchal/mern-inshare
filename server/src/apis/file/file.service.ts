import config from "@/config";
import { join } from "node:path";
import { v4 as uuid4 } from "uuid";
import { SendSchema } from "./schema";
import { db } from "@/database/prisma";
import { sendMail } from "@/common/mail";
import { BadRequest, InternalServerError } from "@/utils/errors";

class FileService {
  async uploadFile(file: Express.Multer.File) {
    if (!file) throw new BadRequest("File is required");
    const uuid = uuid4().replaceAll("-", "");
    const obj = await db.file.create({
      data: {
        uuid,
        filename: file.filename,
        path: file.path,
        size: file.size,
      },
    });
    // make url
    return `${config.get("APP_BASE_URL")}/${obj.uuid}`;
  }

  async findOne(uuid: string) {
    try {
      const file = await db.file.findFirst({
        where: { uuid },
      });
      if (!file) throw new BadRequest("Link has been expired.");
      // return file info
      return {
        uuid: file.uuid,
        filename: file.filename,
        fileSize: file.size,
      };
    } catch (error) {
      throw new BadRequest("Link has been expired.");
    }
  }

  async downloadFile(uuid: string) {
    try {
      const file = await db.file.findFirst({
        where: { uuid },
      });
      if (!file) throw new BadRequest("Link has been expired.");
      return join(process.cwd(), file.path);
    } catch (error) {
      throw new BadRequest("Link has been expired.");
    }
  }

  async sendFileOnEmail(data: SendSchema) {
    try {
      const file = await db.file.findFirst({
        where: { uuid: data.id },
      });
      if (!file) throw new BadRequest("Link has been expired.");
      const emailFrom = config.get("mail.from");
      // send email
      await sendMail({
        to: data.to,
        subject: "inShare file sharing",
        template: "send-email",
        text: `${emailFrom} shared a file with you.`,
        context: {
          emailFrom,
          size: parseInt((file.size / 1000) as any) + " KB",
          expires: "24 hours",
          downloadLink: `${config.get("APP_BASE_URL")}/${file.uuid}`,
          appLink: config.get("APP_BASE_URL"),
        },
      });
    } catch (error) {
      throw new InternalServerError();
    }
  }
}

export default new FileService();
