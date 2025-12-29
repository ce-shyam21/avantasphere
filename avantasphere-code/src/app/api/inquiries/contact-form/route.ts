import {
  sendEmail,
  getContactEmailTemplate,
  getAdminContactTemplate,
} from "@/lib/email";
import { readFileSync, writeFileSync } from "fs";
import path from "path";
export const runtime = "nodejs"; // 🔥 REQUIRED

export async function POST(request: Request) {
  console.log("=== CONTACT FORM STARTED ===");

  try {
    const body = await request.json();
    console.log("Contact form received:", body);

    const { name, email, company, phone, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      console.error("Validation failed - missing required fields");
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    console.log("Validation passed");

    // Save to database (JSON file)
    const inquiriesPath = path.join(process.cwd(), "data", "inquiries.json");
    let inquiriesData = { inquiries: [] as unknown[] };
    const isVercel = process.env.VERCEL === "1";

    if (!isVercel) {
      try {
        const content = readFileSync(inquiriesPath, "utf-8");
        inquiriesData = JSON.parse(content);
      } catch {
        console.log("Creating new inquiries.json file");
      }
    } else {
      console.log("⚠️ JSON read skipped on Vercel");
    }

    const newInquiry = {
      id: `contact_${Date.now()}`,
      name,
      email,
      company: company || "N/A",
      phone: phone || "N/A",
      message,
      type: "contact",
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    inquiriesData.inquiries.push(newInquiry);

    if (!isVercel) {
      writeFileSync(inquiriesPath, JSON.stringify(inquiriesData, null, 2));
      console.log("✅ Contact saved to JSON:", newInquiry.id);
    } else {
      console.log("⚠️ Skipped JSON write on Vercel");
    }

    // Send email to customer
    console.log("\n📧 Attempting to send customer email...");
    const customerEmailContent = getContactEmailTemplate({
      name,
      email,
      message,
      company: company || "N/A",
      phone: phone || "N/A",
    });

    const customerEmailResult = await sendEmail({
      to: email,
      subject: `Thank You For Contacting AventaSphere`,
      html: customerEmailContent,
    });

    if (customerEmailResult.success) {
      console.log("✅ Customer email sent successfully");
    } else {
      console.error("❌ Customer email failed:", customerEmailResult.error);
    }

    // Send email to admin
    console.log("\n📧 Attempting to send admin email...");
    const adminEmailContent = getAdminContactTemplate({
      name,
      email,
      company: company || "N/A",
      phone: phone || "N/A",
      message,
    });

    const adminEmailResult = await sendEmail({
      to: process.env.ADMIN_EMAIL || process.env.BUSINESS_EMAIL || "",
      cc: process.env.BUSINESS_EMAIL,
      subject: `New Contact Form Submission - ${name}`,
      html: adminEmailContent,
    });

    if (adminEmailResult.success) {
      console.log("✅ Admin email sent successfully");
    } else {
      console.error("❌ Admin email failed:", adminEmailResult.error);
    }

    console.log("=== CONTACT FORM COMPLETED ===\n");

    return Response.json(
      {
        message: "Contact form submitted successfully",
        inquiryId: newInquiry.id,
        customerEmailSent: customerEmailResult.success,
        adminEmailSent: adminEmailResult.success,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ FATAL ERROR:", error);
    return Response.json(
      {
        error: "Failed to process contact form",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
