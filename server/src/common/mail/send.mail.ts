import config from "@/config";
import logger from "@/common/logger";
import { compileTemplate } from "@/utils/compiler";
import { InternalServerError } from "@/utils/errors";
import { createTransport, SendMailOptions } from "nodemailer";

// interface and types
export interface ISendMailOptions extends SendMailOptions {
  context?: Record<string, any>;
  template?: string;
}

// create transporter instance
const transporter = createTransport({
  host: config.getOrThrow("mail.host"),
  port: config.getOrThrow("mail.port"),
  auth: {
    user: config.getOrThrow("mail.user"),
    pass: config.getOrThrow("mail.pass"),
  },
});

// compiler
transporter.use("compile", async (mail, callback) => {
  const { template, context } = mail.data as any;
  // if template is not empty, use the template to compile ejs template
  if (template) {
    try {
      mail.data.html = await compileTemplate(template, context);
    } catch (error) {
      logger.error(error);
      return callback(error);
    }
  }
  return callback();
});

export async function sendMail(sendMailOptions: ISendMailOptions) {
  const verify = await transporter.verify();
  // check connection configuration
  if (!verify)
    throw new InternalServerError("Failed to connect to mail server");
  sendMailOptions.from = sendMailOptions.from;
  // after send mail, return the result
  return await transporter.sendMail(sendMailOptions);
}
