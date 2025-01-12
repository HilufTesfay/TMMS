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
//define function to send verification email
const sendVerificationEmail = async (recipient, token) => {
  const subject = "Email Verification";
  const html = `<form action="${envConfig.serverUrl}/v1/auth/verify-email" method="POST">
    <input type="hidden" name="token" value="${token}" />
    <button type="submit">Click here to verify your account</button>
  </form>`;

  await sendEmail(recipient, subject, html);
};
//define function to send reset password email
const sendResetPasswordEmail = async (recipient, token) => {
  const subject = "Reset Password";
  const html = `<form action="${envConfig.serverUrl}/v1/auth/verify-passcode" method="POST">
    <input type="hidden" name="token" value="${token}" />
    <button type="submit">Click here to reset your password</button>
  </form>`;
  await sendEmail(recipient, subject, html);
};

export default { sendVerificationEmail, sendResetPasswordEmail };
