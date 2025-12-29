import nodemailer from "nodemailer";

console.log("🔧 Email Service Initializing...");
console.log("SMTP_HOST:", process.env.SMTP_HOST);
console.log("SMTP_USER:", process.env.SMTP_USER);

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_PORT === "465", // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

// Test connection
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ SMTP Connection Error:", error);
  } else {
    console.log("✅ SMTP Server Connection Verified");
  }
});

export interface EmailData {
  to: string;
  subject: string;
  html: string;
  cc?: string;
}

export async function sendEmail(emailData: EmailData) {
  try {
    console.log(`📤 Sending email to: ${emailData.to}`);
    console.log(`Subject: ${emailData.subject}`);

    const info = await transporter.sendMail({
      from: `${process.env.BUSINESS_NAME} <${process.env.SMTP_USER}>`,
      to: emailData.to,
      cc: emailData.cc,
      subject: emailData.subject,
      html: emailData.html,
    });

    console.log("✅ Email sent successfully!");
    console.log("Message ID:", info.messageId);
    console.log("Response:", info.response);

    return {
      success: true,
      messageId: info.messageId,
    };
  } catch (error) {
    console.error("❌ Email sending error:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Error details:", errorMessage);
    
    return {
      success: false,
      error: errorMessage,
    };
  }
}

// Rest of the email templates remain the same...
export function getQuoteEmailTemplate(data: {
  customerName: string;
  customerEmail: string;
  productName: string;
  quantity: number;
  message: string;
  companyName: string;
  phone: string;
}) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #0066cc 0%, #0099d8 100%); color: white; padding: 20px; border-radius: 8px; }
        .header h1 { margin: 0; }
        .content { padding: 20px; background: #f5f9ff; border-radius: 8px; }
        .details { background: white; padding: 15px; margin: 15px 0; border-left: 4px solid #0099d8; border-radius: 4px; }
        .label { font-weight: bold; color: #0066cc; }
        .value { color: #333; margin-top: 5px; }
        .button { display: inline-block; background: #0066cc; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; margin-top: 20px; }
        .footer { text-align: center; color: #999; font-size: 12px; margin-top: 20px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>📧 Quote Request Received</h1>
        </div>
        
        <div class="content">
          <p>Hello <strong>${data.customerName}</strong>,</p>
          
          <p>Thank you for requesting a quote! We have received your inquiry and our team will review it shortly.</p>
          
          <div class="details">
            <div class="label">Product:</div>
            <div class="value">${data.productName}</div>
          </div>
          
          <div class="details">
            <div class="label">Quantity:</div>
            <div class="value">${data.quantity} units</div>
          </div>
          
          <div class="details">
            <div class="label">Your Message:</div>
            <div class="value">${data.message.replace(/\n/g, "<br>")}</div>
          </div>
          
          <div class="details">
            <div class="label">Contact Information:</div>
            <div class="value">
              <strong>Company:</strong> ${data.companyName}<br>
              <strong>Email:</strong> ${data.customerEmail}<br>
              <strong>Phone:</strong> ${data.phone}
            </div>
          </div>
          
          <p>We will get back to you within 24 hours with a customized quote.</p>
          
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/products" class="button">Browse More Products</a>
          
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} ${process.env.BUSINESS_NAME}. All rights reserved.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}

export function getAdminEmailTemplate(data: {
  customerName: string;
  customerEmail: string;
  customerCompany: string;
  customerPhone: string;
  productName: string;
  quantity: number;
  message: string;
}) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #0066cc 0%, #0099d8 100%); color: white; padding: 20px; border-radius: 8px; }
        .header h1 { margin: 0; }
        .alert { background: #fff3cd; border: 1px solid #ffc107; padding: 15px; border-radius: 4px; margin: 15px 0; }
        .content { padding: 20px; background: #f5f9ff; border-radius: 8px; }
        .details { background: white; padding: 15px; margin: 15px 0; border-left: 4px solid #0099d8; border-radius: 4px; }
        .label { font-weight: bold; color: #0066cc; }
        .value { color: #333; margin-top: 5px; }
        .button { display: inline-block; background: #0066cc; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; margin-top: 20px; }
        .footer { text-align: center; color: #999; font-size: 12px; margin-top: 20px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🚨 New Quote Request</h1>
        </div>
        
        <div class="alert">
          <strong>⏰ New Inquiry from:</strong> ${data.customerName}
        </div>
        
        <div class="content">
          <p>A new quote request has been submitted on your website.</p>
          
          <div class="details">
            <div class="label">Customer Information:</div>
            <div class="value">
              <strong>Name:</strong> ${data.customerName}<br>
              <strong>Company:</strong> ${data.customerCompany}<br>
              <strong>Email:</strong> <a href="mailto:${data.customerEmail}">${data.customerEmail}</a><br>
              <strong>Phone:</strong> <a href="tel:${data.customerPhone}">${data.customerPhone}</a>
            </div>
          </div>
          
          <div class="details">
            <div class="label">Quote Details:</div>
            <div class="value">
              <strong>Product:</strong> ${data.productName}<br>
              <strong>Quantity:</strong> ${data.quantity} units
            </div>
          </div>
          
          <div class="details">
            <div class="label">Message:</div>
            <div class="value">${data.message.replace(/\n/g, "<br>")}</div>
          </div>
          
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} ${process.env.BUSINESS_NAME}.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}

// Email Template for Contact Form - Customer
export function getContactEmailTemplate(data: {
  name: string;
  email: string;
  message: string;
  company: string;
  phone: string;
}) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #0066cc 0%, #0099d8 100%); color: white; padding: 20px; border-radius: 8px; }
        .header h1 { margin: 0; }
        .content { padding: 20px; background: #f5f9ff; border-radius: 8px; }
        .details { background: white; padding: 15px; margin: 15px 0; border-left: 4px solid #0099d8; border-radius: 4px; }
        .label { font-weight: bold; color: #0066cc; }
        .value { color: #333; margin-top: 5px; }
        .button { display: inline-block; background: #0066cc; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; margin-top: 20px; }
        .footer { text-align: center; color: #999; font-size: 12px; margin-top: 20px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>✅ We Received Your Message</h1>
        </div>
        
        <div class="content">
          <p>Hello <strong>${data.name}</strong>,</p>
          
          <p>Thank you for contacting AventaSphere! We have received your message and will get back to you as soon as possible.</p>
          
          <div class="details">
            <div class="label">Your Message:</div>
            <div class="value">${data.message.replace(/\n/g, "<br>")}</div>
          </div>
          
          <div class="details">
            <div class="label">Contact Information:</div>
            <div class="value">
              <strong>Email:</strong> ${data.email}<br>
              <strong>Phone:</strong> ${data.phone}<br>
              <strong>Company:</strong> ${data.company}
            </div>
          </div>
          
          <p>Our team typically responds within 24 hours. If your inquiry is urgent, please feel free to call us directly at the phone number provided on our website.</p>
          
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/products" class="button">Browse Our Products</a>
          
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} ${process.env.BUSINESS_NAME}. All rights reserved.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}

// Email Template for Contact Form - Admin
export function getAdminContactTemplate(data: {
  name: string;
  email: string;
  company: string;
  phone: string;
  message: string;
}) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #0066cc 0%, #0099d8 100%); color: white; padding: 20px; border-radius: 8px; }
        .header h1 { margin: 0; }
        .alert { background: #fff3cd; border: 1px solid #ffc107; padding: 15px; border-radius: 4px; margin: 15px 0; }
        .content { padding: 20px; background: #f5f9ff; border-radius: 8px; }
        .details { background: white; padding: 15px; margin: 15px 0; border-left: 4px solid #0099d8; border-radius: 4px; }
        .label { font-weight: bold; color: #0066cc; }
        .value { color: #333; margin-top: 5px; }
        .button { display: inline-block; background: #0066cc; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; margin-top: 20px; }
        .footer { text-align: center; color: #999; font-size: 12px; margin-top: 20px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>📩 New Contact Form Submission</h1>
        </div>
        
        <div class="alert">
          <strong>⏰ New message from:</strong> ${data.name}
        </div>
        
        <div class="content">
          <p>A new contact form submission has been received on your website.</p>
          
          <div class="details">
            <div class="label">Customer Information:</div>
            <div class="value">
              <strong>Name:</strong> ${data.name}<br>
              <strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a><br>
              <strong>Phone:</strong> <a href="tel:${data.phone}">${data.phone}</a><br>
              <strong>Company:</strong> ${data.company}
            </div>
          </div>
          
          <div class="details">
            <div class="label">Message:</div>
            <div class="value">${data.message.replace(/\n/g, "<br>")}</div>
          </div>
          
          <p><strong>Action Required:</strong> Please respond to this inquiry as soon as possible to maintain good customer relations.</p>
          
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} ${process.env.BUSINESS_NAME}.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}
