
import transporter from './src/config/nodeMailer.js';
import dotenv from 'dotenv';

dotenv.config();

const sendTestEmail = async () => {
    console.log('Attempting to send test email...');
    const mailOption = {
        sender: { email: process.env.EMAIL || 'test@example.com' },
        to: [{ email: 'test@example.com' }],
        subject: 'Test Email',
        htmlContent: '<p>This is a test email</p>'
    };

    try {
        await transporter.sendTransacEmail(mailOption);
        console.log('Email sent successfully');
    } catch (error) {
        console.log('Email send failed:', error.message);
        if (error.response) {
            console.log('Error response status:', error.response.status);
            console.log('Error response text:', error.response.text);
        }
    }
};

sendTestEmail();
