import { readFileSync } from "fs";
import path from "path";
import Navbar from "@/components/shared/Navbar/Navbar";
import Footer from "@/components/shared/Footer/Footer";
import ProductCard from "@/components/user/ProductCard/ProductCard";
import { Category, Product } from "@/models";
import { notFound } from "next/navigation";
import "./category.css";

interface CategoryPageProps {
  params: Promise<{
    categoryId: string;
  }>;
}

async function getCategoryAndProducts(
  slug: string
): Promise<{
  category: Category | null;
  products: Product[];
}> {
  try {debugger;
    const categoriesPath = path.join(
      process.cwd(),
      "data",
      "categories.json"
    );
    const categoriesContent = readFileSync(categoriesPath, "utf-8");
    const categoriesData = JSON.parse(categoriesContent);

    const category = categoriesData.categories.find(
      (c: Category) => c.slug === slug
    );

    const productsPath = path.join(process.cwd(), "data", "products.json");
    const productsContent = readFileSync(productsPath, "utf-8");
    const productsData = JSON.parse(productsContent);

    const products = category
      ? productsData.products.filter(
          (p: Product) => p.categoryId === category.id
        )
      : [];

    return { category: category || null, products };
  } catch (error) {
    console.error("Error loading data:", error);
    return { category: null, products: [] };
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { categoryId } = await params;
  const { category, products } = await getCategoryAndProducts(categoryId);

  if (!category) {
    notFound();
  }

  return (
    <main className="category-page">
      <Navbar />

      <section className="category-hero">
        <div className="category-hero-content">
          <h1>{category.name}</h1>
          <p>{category.description}</p>
        </div>
      </section>

      <section className="category-products-section">
        <div className="category-container">
          <h2>Products in {category.name}</h2>
          {products.length > 0 ? (
            <div className="products-grid">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  productId={product.id}
                />
              ))}
            </div>
          ) : (
            <div className="no-products">
              No products available in this category yet.
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
