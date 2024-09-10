const nodemailer = require("nodemailer");

exports.sendEmail = async(options) => {
  //1- create transporter (setverice that will email like 'gmail' 'miltrap' 'sendGrid')
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOSt,
    port:  process.env.EMAIL_PORt, // if secur flase port=587,if true port=465
    secure:  process.env.EMAIL_PORT === '465',
    auth: {
      user: process.env.EMAIL_USER,
      pass:  process.env.EMAIL_PASS,
    }, 
  });

  //  2- define email options (like from,to, subject,email content)
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: options.email,
    subject: options.subject,
    html : options.message,
    attachments: options.attachments,
  };
  // 3- send email
  await transporter.sendMail(mailOptions)
};
