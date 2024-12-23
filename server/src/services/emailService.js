import nodemailer from "nodemailer";
import { envConfig } from "../config/config.js";
import { errorLogger, emailLogger } from "../config/logger.js";
import { CustomError } from "../utils/errorHandlers/customError.js";
// define email settings
const emailSettings = {
  host: envConfig.email.host,
  port: envConfig.email.port,
  secure: envConfig.email.secure,
  auth: {
    user: envConfig.email.user,
    pass: envConfig.email.password,
  },
};
// create a transporter
const transporter = nodemailer.createTransport(emailSettings);
// define function to send email
const sendEmail = async (recipient, subject, html) => {
  const mailOptions = {
    from: `"${envConfig.email.appName}" <${envConfig.email.from}>`,
    to: recipient,
    subject: subject,
    text: "",
    html: html,
  };
  try {
    const sentEmail = await transporter.sendMail(mailOptions);
    emailLogger.info("sent email detail", { sentEmail });
  } catch (error) {
    errorLogger.error("email error", {
      errorName: error.name,
      message: error.message,
      stack: error.stack,
      subject: subject,
      recipient: recipient,
    });
    throw new CustomError(500, "Email not sent", false);
  }
};

export default { sendEmail };
