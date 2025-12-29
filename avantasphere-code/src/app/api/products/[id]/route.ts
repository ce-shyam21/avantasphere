import { readFileSync } from "fs";
import path from "path";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }  // ← Make it Promise
) {
  try {
    const { id } = await params;  // ← Await the params
    
    console.log("Fetching product with ID:", id);
    
    const dataPath = path.join(process.cwd(), "data", "products.json");
    const fileContent = readFileSync(dataPath, "utf-8");
    const data = JSON.parse(fileContent);

    console.log("Total products in file:", data.products.length);
    
    const product = data.products.find((p: any) => p.id === id);
    
    console.log("Product found:", product ? "Yes" : "No");

    if (!product) {
      console.log("Available product IDs:", data.products.map((p: any) => p.id));
      return Response.json(
        { error: "Product not found", id },
        { status: 404 }
      );
    }

    return Response.json(product);
  } catch (error) {
    console.error("Error in GET /api/products/[id]:", error);
    return Response.json(
      { error: "Failed to load product", details: error },
      { status: 500 }
    );
  }
}