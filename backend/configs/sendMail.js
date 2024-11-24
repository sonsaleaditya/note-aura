//configs/sendMail.js
const nodemailer = require('nodemailer');

async function sendMail(recipientMail, title, body) {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT || 587, // Default to port 587 if MAIL_PORT is not set
            secure: process.env.MAIL_SECURE === 'true', // true for 465, false for other ports
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        });

        let info = await transporter.sendMail({
            from: '"NoteAura" <no-reply@example.com>', // Update the sender's email address
            to: recipientMail,
            subject: title,
            html: body
        });

        return info;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error; // Re-throw the error after logging it
    }
}

module.exports = { sendMail };