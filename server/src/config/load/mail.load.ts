export const mailLoad = () => {
  return {
    mail: {
      host: process.env["MAIL_HOST"],
      port: Number(process.env["MAIL_PORT"]),
      user: process.env["MAIL_USER"],
      pass: process.env["MAIL_PASS"],
      from: process.env["MAIL_FROM"],
    },
  };
};
