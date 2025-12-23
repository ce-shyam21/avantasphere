"use client";

import { useEffect, useState } from "react";
import ProductCard from "../ProductCard/ProductCard";
import "./featured-products.css";

interface Product {
  id: string;
  name: string;
  shortDescription: string;
  thumbnailImage: string;
  pricing: {
    cost: number;
    currency: string;
  };
}

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetch("/api/products");
        const data = await response.json();
        const featured = data.products.filter((p: Product) => p.featured);
        setProducts(featured.slice(0, 4));
      } catch (error) {
        console.error("Failed to load products:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  return (
    <div className="featured-products">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} productId={product.id} />
      ))}
    </div>
  );
}