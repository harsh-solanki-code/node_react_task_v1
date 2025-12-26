const nodemailer = require('nodemailer');

let transporter;

const createTransporter = async () => {
  if (transporter) return transporter;

  const testAccount = await nodemailer.createTestAccount();

  transporter = nodemailer.createTransport({
    host: testAccount.smtp.host,
    port: testAccount.smtp.port,
    secure: testAccount.smtp.secure,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  return transporter;
};

const sendEmail = async ({ to, subject, html }) => {
  const transport = await createTransporter();

  const info = await transport.sendMail({
    from: '"Booking App" <no-reply@booking.com>',
    to,
    subject,
    html,
  });

  console.log('📧 Email Preview:', nodemailer.getTestMessageUrl(info));
};

module.exports = { sendEmail };
