import { readFileSync, writeFileSync } from "fs";
import path from "path";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    const usersPath = path.join(process.cwd(), "data", "users.json");
    let usersData = { users: [] };

    try {
      const content = readFileSync(usersPath, "utf-8");
      usersData = JSON.parse(content);
    } catch {
      // File doesn't exist yet
    }

    const newUser = {
      id: `user_${Date.now()}`,
      email,
      requestedAt: new Date().toISOString(),
      catalogueSentAt: new Date().toISOString(),
      catalogueVersion: "v1.0",
    };

    usersData.users.push(newUser);
    writeFileSync(usersPath, JSON.stringify(usersData, null, 2));

    return Response.json(
      { message: "Catalogue request received. Check your email shortly." },
      { status: 201 }
    );
  } catch (error) {
    return Response.json(
      { error: "Failed to process catalogue request" },
      { status: 500 }
    );
  }
}
