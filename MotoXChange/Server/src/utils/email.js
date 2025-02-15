import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const sendEmail = async (to, subject, text, html) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: false, // true for 465, false for 587
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: `MotoXChange`,
            to,
            subject,
            text, // Plain text version
            html, // HTML version
        };

        const info = await transporter.sendMail(mailOptions);
        console.log(`Email sent: ${info.messageId}`);
        return info;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};

export default sendEmail;
