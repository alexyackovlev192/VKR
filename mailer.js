const nodemailer = require('nodemailer');
const config = require("./config/config.js");

const transporter = nodemailer.createTransport({
    host: 'smtp.mail.ru',
    port: 465, 
    secure: true, 
    auth: {
        user: config.mail.user, 
        pass: config.mail.pass, // пароль для внешних приложений
    }
});

const sendMail = async (to, subject, text) => {
    const mailOptions = {
        from: config.mail.user,
        to,
        subject,
        text,
    };

    await transporter.sendMail(mailOptions);
};

module.exports = sendMail;