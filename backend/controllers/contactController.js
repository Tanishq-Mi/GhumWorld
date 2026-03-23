const transporter = require('../config/email');
const rateLimit = require('express-rate-limit');

// Rate limiting for contact form
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3, // 3 requests per window
  message: 'Too many contact submissions, please try again later.'
});

// @desc    Send contact email
// @route   POST /api/contact
// @access  Public
const sendContactEmail = async (req, res) => {
  try {
    const { name, email, city, placeName, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Please provide name, email, and message' });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Please provide a valid email address' });
    }

    // Prepare email content
    const mailOptions = {
      from: `"${name}" <${process.env.EMAIL_USER}>`,
      to: process.env.RECEIVER_EMAIL,
      subject: placeName 
        ? `New Place Suggestion: ${placeName} in ${city || 'Unknown City'}`
        : 'New Contact Form Submission',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #d4af37;">${placeName ? 'New Place Suggestion' : 'Contact Form Submission'}</h2>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${city ? `<p><strong>City:</strong> ${city}</p>` : ''}
            ${placeName ? `<p><strong>Suggested Place:</strong> ${placeName}</p>` : ''}
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap; background-color: white; padding: 15px; border-radius: 4px;">${message}</p>
          </div>
          <p style="color: #666; font-size: 12px;">This email was sent from the Travel Guide contact form.</p>
        </div>
      `,
      replyTo: email
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({
      message: 'Thank you for your submission! We will get back to you soon.'
    });
  } catch (error) {
    console.error('Send email error:', error);
    res.status(500).json({ 
      message: 'Failed to send email. Please try again later.' 
    });
  }
};

module.exports = {
  sendContactEmail,
  contactLimiter
};
