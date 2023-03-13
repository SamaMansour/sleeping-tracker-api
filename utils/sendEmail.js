const nodemailer = require("nodemailer");

const sendEmail = async(email, subject, text) =>{
  try {
    // This should be added to .env
    const transporter = nodemailer.createTransporter({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, 
      auth: {
        user: testAccount.user, 
        pass: testAccount.pass, 
      }
    
    });

   await transporter.sendMail({
      from: process.env.USER,
      to: email,
      subject: subject,
      text: text,
    });

    console.log("email sent sucessfully");
  } catch (error) {
      console.log(error, "email not sent");
  }};

module.exports = sendEmail;



