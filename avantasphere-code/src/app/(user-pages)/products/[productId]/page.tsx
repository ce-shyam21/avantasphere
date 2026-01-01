import { notFound } from "next/navigation";
import Navbar from "@/components/shared/Navbar/Navbar";
import Footer from "@/components/shared/Footer/Footer";
import Breadcrumb from "@/components/shared/Breadcrumb/Breadcrumb";
import RelatedProducts from "@/components/user/RelatedProducts/RelatedProducts";
import ProductDetailClient from "./ProductDetailClient";
import { Product } from "@/models";
import { readFileSync } from "fs";
import path from "path";
import type { Metadata } from "next";
import "./page.css";

interface ProductDetailPageProps {
  params: Promise<{
    productId: string;
  }>;
}

async function getProduct(productId: string): Promise<Product | null> {
  try {
    const dataPath = path.join(process.cwd(), "data", "products.json");
    const fileContent = readFileSync(dataPath, "utf-8");
    const data = JSON.parse(fileContent);
    const product = data.products.find((p: Product) => p.id === productId);
    return product || null;
  } catch (error) {
    console.error("Error loading product:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const { productId } = await params;
  const product = await getProduct(productId);

  if (!product) {
    return {
      title: "Product Not Found - AventaSphere",
    };
  }

  return {
    title: `${product.name} - AventaSphere`,
    description: product.shortDescription || product.fullDescription,
    keywords: `${product.name}, ${product.categoryId}, export, import, product`,
  };
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { productId } = await params;
  const product = await getProduct(productId);

  if (!product) {
    notFound();
  }

  return (
    <main className="product-detail-page">
      <Navbar />

      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
          { label: product.name },
        ]}
      />

      <section className="product-detail-wrapper">
        <ProductDetailClient product={product} />
      </section>

      <section className="related-products-wrapper">
        <RelatedProducts categoryId={product.categoryId} currentProductId={productId} />
      </section>

      <Footer />
    </main>
  );
}