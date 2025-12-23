import { readFileSync } from "fs";
import path from "path";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const dataPath = path.join(process.cwd(), "data", "products.json");
    const fileContent = readFileSync(dataPath, "utf-8");
    const data = JSON.parse(fileContent);

    const product = data.products.find((p: any) => p.id === params.id);

    if (!product) {
      return Response.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    return Response.json(product);
  } catch (error) {
    return Response.json(
      { error: "Failed to load product" },
      { status: 500 }
    );
  }
}
