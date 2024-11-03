import { ApiResponse } from '@/types/ApiResponse';
import nodemailer from 'nodemailer';

export async function sendVerificationEmail(
  email: string, 
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
    const htmlContent = `
      <html lang="en" dir="ltr">
        <head>
          <title>Verification Code</title>
          <style>
            body { font-family: 'Roboto', sans-serif; }
            h2 { color: #333; }
            p { font-size: 16px; }
          </style>
        </head>
        <body>
          <h2>Hello ${username},</h2>
          <p>Thank you for registering. Please use the following verification code to complete your registration:</p>
          <p><strong>${verifyCode}</strong></p>
          <p>If you did not request this code, please ignore this email.</p>
        </body>
      </html>
    `;

  // Configure the SMTP transporter
  const transporter = nodemailer.createTransport({
    host: 'smtp.mailersend.net', // MailerSend's SMTP server
    port: 587,                   // Typically, 587 for TLS or 465 for SSL
    secure: false,               // Use 'true' for port 465, 'false' for other ports
    auth: {
      user: process.env.SMTP_USERNAME, // Your MailerSend SMTP username
      pass: process.env.SMTP_PASSWORD  // Your MailerSend SMTP password
    }
  });

  // Email options
  const mailOptions = {
    from: 'stealthspeak@trial-vywj2lpmozml7oqz.mlsender.net', // Sender address
    to: email,                                            // Recipient address
    subject: 'Your Verification Code',                    // Subject line
    html: htmlContent,                                    // HTML body content
    text: `Your verification code is: ${verifyCode}`      // Plain text version
  };

  try {
    // Send the email
    await transporter.sendMail(mailOptions);
    return { success: true, message: 'Verification email sent successfully.' };
  } catch (error) {
    console.error('Error sending verification email:', error);
    return { success: false, message: 'Failed to send verification email.' };
  }
}
