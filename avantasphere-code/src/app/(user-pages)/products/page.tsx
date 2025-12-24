"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/shared/Navbar/Navbar";
import Footer from "@/components/shared/Footer/Footer";
import ProductCard from "@/components/user/ProductCard/ProductCard";
import "./products.css";

interface Product {
  id: string;
  name: string;
  shortDescription: string;
  pricing: {
    cost: number;
    currency: string;
  };
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      try {debugger;
        const response = await fetch("/api/products");
        const data = await response.json();
        setProducts(data.products);
        setFilteredProducts(data.products);
      } catch (error) {
        console.error("Failed to load products:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  useEffect(() => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  return (
    <main className="products-page">
      <Navbar />

      <section className="products-section">
        <div className="section-header">
          <h1>Our Products</h1>
          <p>Browse our complete range of premium products</p>
        </div>

        <div className="products-container">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          {loading ? (
            <div className="loading">Loading products...</div>
          ) : filteredProducts.length > 0 ? (
            <div className="products-grid">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  productId={product.id}
                />
              ))}
            </div>
          ) : (
            <div className="no-products">No products found</div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
