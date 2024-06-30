import nodemailer from "nodemailer";

export const sendEmail = async ({ email, emailType, message }: any) => {
  try {
    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      // Todo: move to env file
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: "nayan@dev.io",
      to: email,
      subject: emailType,
      html: `<h1>${message}</h1>`,
    };

    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
