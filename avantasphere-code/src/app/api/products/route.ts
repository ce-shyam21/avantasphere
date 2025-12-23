import { readFileSync } from "fs";
import path from "path";

export async function GET() {
  try {
    const dataPath = path.join(process.cwd(), "data", "products.json");
    const fileContent = readFileSync(dataPath, "utf-8");
    const data = JSON.parse(fileContent);
    return Response.json(data);
  } catch (error) {
    return Response.json(
      { error: "Failed to load products" },
      { status: 500 }
    );
  }
}