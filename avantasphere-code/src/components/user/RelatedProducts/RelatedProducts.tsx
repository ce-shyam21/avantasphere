"use client";

import { useEffect, useState } from "react";
import ProductCard from "../ProductCard/ProductCard";
import { Product } from "@/models";
import "./related-products.css";

interface RelatedProductsProps {
  categoryId: string;
  currentProductId: string;
}

export default function RelatedProducts({
  categoryId,
  currentProductId,
}: RelatedProductsProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetch("/api/products");
        const data = await response.json();
        const related = data.products.filter(
          (p: Product) =>
            p.categoryId === categoryId && p.id !== currentProductId
        );
        setProducts(related.slice(0, 4));
      } catch (error) {
        console.error("Failed to load related products:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [categoryId, currentProductId]);

  if (loading) return <div className="loading">Loading related products...</div>;
  if (products.length === 0) return null;

  return (
    <section className="related-products">
      <h2>Related Products</h2>
      <div className="related-products-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            productId={product.id}
          />
        ))}
      </div>
    </section>
  );
}