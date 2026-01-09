import { sendEmail, getQuoteEmailTemplate, getAdminEmailTemplate } from "@/lib/email";
import { readFileSync, writeFileSync } from "fs";
import path from "path";

export const runtime = "nodejs"; // 🔥 REQUIRED - This was missing!

export async function POST(request: Request) {
  console.log("=== QUOTE REQUEST STARTED ===");
  
  try {
    const body = await request.json();
    console.log("Request body received:", body);

    const {
      customerName,
      customerEmail,
      companyName,
      phone,
      productName,
      quantity,
      message,
      type,
      productId,
      sku,
    } = body;

    // Validate required fields
    if (!customerName || !customerEmail || !message) {
      console.error("Validation failed - missing required fields");
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    console.log("Validation passed");
    console.log("SMTP Config Check:");
    console.log("- SMTP_HOST:", process.env.SMTP_HOST);
    console.log("- SMTP_PORT:", process.env.SMTP_PORT);
    console.log("- SMTP_USER:", process.env.SMTP_USER);
    console.log("- ADMIN_EMAIL:", process.env.ADMIN_EMAIL);
    console.log("- BUSINESS_EMAIL:", process.env.BUSINESS_EMAIL);

    // Save to database (JSON file)
    const inquiriesPath = path.join(process.cwd(), "data", "inquiries.json");
    let inquiriesData: { inquiries: Array<{
      id: string;
      customerName: string;
      customerEmail: string;
      companyName: string;
      phone: string;
      productName: string;
      productId?: string;
      sku?: string;
      quantity: string;
      message: string;
      type: string;
      status: string;
      createdAt: string;
    }> } = { inquiries: [] };

    // Check if running on Vercel
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
      id: `inq_${Date.now()}`,
      customerName,
      customerEmail,
      companyName: companyName || "N/A",
      phone: phone || "N/A",
      productName: productName || "General Inquiry",
      productId: productId || "",
      sku: sku || "",
      quantity: quantity || "1",
      message,
      type: type || "quote",
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    inquiriesData.inquiries.push(newInquiry);

    if (!isVercel) {
      writeFileSync(inquiriesPath, JSON.stringify(inquiriesData, null, 2));
      console.log("✅ Inquiry saved to JSON:", newInquiry.id);
    } else {
      console.log("⚠️ Skipped JSON write on Vercel");
    }

    // Send email to customer
    console.log("\n📧 Attempting to send customer email...");
    const customerEmailContent = getQuoteEmailTemplate({
      customerName,
      customerEmail,
      productName: productName || "General Inquiry",
      quantity: quantity || "1",
      message,
      companyName: companyName || "N/A",
      phone: phone || "N/A",
    });

    const customerEmailResult = await sendEmail({
      to: customerEmail,
      subject: `Quote Request Confirmation - ${productName || "Your Inquiry"}`,
      html: customerEmailContent,
    });

    if (customerEmailResult.success) {
      console.log("✅ Customer email sent successfully");
    } else {
      console.error("❌ Customer email failed:", customerEmailResult.error);
    }

    // Send email to admin
    console.log("\n📧 Attempting to send admin email...");
    const adminEmailContent = getAdminEmailTemplate({
      customerName,
      customerEmail,
      customerCompany: companyName || "N/A",
      customerPhone: phone || "N/A",
      productName: productName || "General Inquiry",
      quantity: quantity || "1",
      message,
    });

    const adminEmailResult = await sendEmail({
      to: process.env.ADMIN_EMAIL || process.env.BUSINESS_EMAIL || "",
      cc: process.env.BUSINESS_EMAIL,
      subject: `New Quote Request - ${productName || "General Inquiry"}`,
      html: adminEmailContent,
    });

    if (adminEmailResult.success) {
      console.log("✅ Admin email sent successfully");
    } else {
      console.error("❌ Admin email failed:", adminEmailResult.error);
    }

    console.log("=== QUOTE REQUEST COMPLETED ===\n");

    return Response.json(
      {
        message: "Quote request submitted successfully",
        inquiryId: newInquiry.id,
        customerEmailSent: customerEmailResult.success,
        adminEmailSent: adminEmailResult.success,
        debug: {
          customerEmailError: customerEmailResult.error,
          adminEmailError: adminEmailResult.error,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ FATAL ERROR:", error);
    return Response.json(
      {
        error: "Failed to process quote request",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}