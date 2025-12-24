import { readFileSync, writeFileSync } from "fs";
import path from "path";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const inquiriesPath = path.join(
      process.cwd(),
      "data",
      "inquiries.json"
    );
    let inquiriesData = { inquiries: [] };

    try {
      const content = readFileSync(inquiriesPath, "utf-8");
      inquiriesData = JSON.parse(content);
    } catch {
      // File doesn't exist yet
    }

    const newInquiry = {
      id: `inq_${Date.now()}`,
      ...body,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    inquiriesData.inquiries.push(newInquiry);
    writeFileSync(inquiriesPath, JSON.stringify(inquiriesData, null, 2));

    return Response.json(
      { message: "Inquiry submitted successfully" },
      { status: 201 }
    );
  } catch (error) {
    return Response.json(
      { error: "Failed to submit inquiry" },
      { status: 500 }
    );
  }
}
