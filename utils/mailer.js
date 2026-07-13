const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

// Create Nodemailer Transporter
let transporter;

try {
  const isDefaultConfig = !process.env.EMAIL_USER || process.env.EMAIL_USER.includes('your_email') || process.env.EMAIL_USER === '';
  
  if (!isDefaultConfig) {
    transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.EMAIL_PORT) || 587,
      secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Verify nodemailer transporter connection
    transporter.verify((err, success) => {
      if (err) {
        console.warn('⚠️ Nodemailer client verification failed. Emails will be logged to system server console.');
        transporter = null;
      } else {
        console.log('📧 NodeMailer Service Configured. Mail transporter ready to deliver.');
      }
    });
  } else {
    console.log('ℹ️ Nodemailer: Using mock email sender (credentials not set). Inbound emails will list in terminal.');
  }
} catch (error) {
  console.warn('⚠️ Nodemailer setup error:', error.message, '- falling back to mock logger.');
  transporter = null;
}

/**
 * Send an email to the site owner
 * @param {Object} data - { name, email, subject, message }
 */
async function sendContactEmail(data) {
  const mailOptions = {
    from: `"${data.name}" <${data.email}>`,
    to: process.env.CONTACT_RECEIVER || 'rohan.garje.it@gmail.com',
    subject: `💼 Portfolio Contact: ${data.subject || 'New Message'}`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 8px; max-width: 600px; background-color: #fcfcfc;">
        <h2 style="color: #4F46E5; margin-top: 0;">Portfolio Inquiry Received</h2>
        <p>You have received a new contact submission from your portfolio website.</p>
        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 6px 0; font-weight: bold; width: 120px;">Name:</td>
            <td style="padding: 6px 0;">${data.name}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-weight: bold;">Email:</td>
            <td style="padding: 6px 0;"><a href="mailto:${data.email}">${data.email}</a></td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-weight: bold;">Subject:</td>
            <td style="padding: 6px 0;">${data.subject || 'No Subject'}</td>
          </tr>
        </table>
        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
        <div style="background-color: #f3f4f6; padding: 15px; border-radius: 6px; white-space: pre-wrap; font-style: italic;">
          ${data.message}
        </div>
        <p style="font-size: 11px; color: #888; margin-top: 25px; text-align: center;">Processed automatically by Node-Express Portfolio Engine.</p>
      </div>
    `
  };

  if (transporter) {
    try {
      await transporter.sendMail(mailOptions);
      console.log(`✉️ Email successfully delivered to recipient count for sender: ${data.email}`);
      return true;
    } catch (err) {
      console.error('Error sending email through SMTP:', err.message);
      // fallback progress logging
      logMailMock(data);
      return false;
    }
  } else {
    logMailMock(data);
    return true;
  }
}

function logMailMock(data) {
  console.log('\n=================== 📨 MOCK EMAIL DELIVERED ===================');
  console.log(`FROM:     ${data.name} <${data.email}>`);
  console.log(`TO:       ${process.env.CONTACT_RECEIVER || 'rohan.garje.it@gmail.com'}`);
  console.log(`SUBJECT:  ${data.subject || 'New Message'}`);
  console.log('CONTENT:');
  console.log(data.message);
  console.log('================================================================\n');
}

module.exports = {
  sendContactEmail
};
