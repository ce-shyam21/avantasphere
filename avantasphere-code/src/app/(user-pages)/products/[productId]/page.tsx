"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/shared/Navbar/Navbar";
import Footer from "@/components/shared/Footer/Footer";
import "./product-detail.css";

interface Product {
  id: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  images: string[];
  specifications: Record<string, string | number>;
  pricing: {
    cost: number;
    currency: string;
    moq: number;
    showPrice: boolean;
  };
  shipping: {
    weight: number;
    port: string;
    shippingCost: number;
    shippingTime: string;
    incoterms: string;
  };
  customs: {
    hsCode: string;
    country: string;
  };
}

export default function ProductDetailPage({
  params,
}: {
  params: { productId: string };
}) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState("");
  const [quantity, setQuantity] = useState(100);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const response = await fetch(`/api/products/${params.productId}`);
        const data = await response.json();
        setProduct(data);
        if (data.images && data.images.length > 0) {
          setMainImage(data.images[0]);
        }
      } catch (error) {
        console.error("Failed to load product:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [params.productId]);

  if (loading) {
    return (
      <main>
        <Navbar />
        <div className="loading-page">Loading product details...</div>
        <Footer />
      </main>
    );
  }

  if (!product) {
    return (
      <main>
        <Navbar />
        <div className="loading-page">Product not found</div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="product-detail-page">
      <Navbar />

      <section className="product-detail-section">
        <div className="product-detail-container">
          {/* Image Section */}
          <div className="product-images">
            <div className="main-image-wrapper">
              <div className="main-image-placeholder">
                <span className="image-icon">🛍️</span>
              </div>
            </div>
            {product.images && product.images.length > 1 && (
              <div className="thumbnail-images">
                {product.images.map((image, index) => (
                  <div
                    key={index}
                    className={`thumbnail ${mainImage === image ? "active" : ""}`}
                    onClick={() => setMainImage(image)}
                  >
                    <span>Image {index + 1}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Details Section */}
          <div className="product-details">
            <h1 className="product-title">{product.name}</h1>
            <p className="product-sku">SKU: {product.sku}</p>

            <div className="product-description-section">
              <p className="product-full-description">
                {product.fullDescription}
              </p>
            </div>

            {/* Specifications */}
            <div className="specifications-section">
              <h3>Specifications</h3>
              <div className="specs-grid">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="spec-item">
                    <span className="spec-label">
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </span>
                    <span className="spec-value">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing */}
            {product.pricing.showPrice && (
              <div className="pricing-section">
                <div className="price-info">
                  <span className="price-label">Price per Unit</span>
                  <span className="price-amount">
                    ${product.pricing.cost} {product.pricing.currency}
                  </span>
                </div>
                <div className="moq-info">
                  <span className="moq-label">Minimum Order Quantity</span>
                  <span className="moq-value">{product.pricing.moq} units</span>
                </div>
              </div>
            )}

            {/* Shipping Info */}
            <div className="shipping-section">
              <h3>Shipping Information</h3>
              <div className="shipping-grid">
                <div className="shipping-item">
                  <span className="shipping-label">Port</span>
                  <span className="shipping-value">{product.shipping.port}</span>
                </div>
                <div className="shipping-item">
                  <span className="shipping-label">Shipping Time</span>
                  <span className="shipping-value">
                    {product.shipping.shippingTime}
                  </span>
                </div>
                <div className="shipping-item">
                  <span className="shipping-label">Incoterms</span>
                  <span className="shipping-value">{product.shipping.incoterms}</span>
                </div>
                <div className="shipping-item">
                  <span className="shipping-label">Weight</span>
                  <span className="shipping-value">
                    {product.shipping.weight} kg
                  </span>
                </div>
              </div>
            </div>

            {/* Customs Info */}
            <div className="customs-section">
              <h3>Customs Information</h3>
              <div className="customs-grid">
                <div className="customs-item">
                  <span className="customs-label">HS Code</span>
                  <span className="customs-value">{product.customs.hsCode}</span>
                </div>
                <div className="customs-item">
                  <span className="customs-label">Country of Origin</span>
                  <span className="customs-value">{product.customs.country}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="action-buttons">
              <button className="btn-inquiry">Request Information</button>
              <button className="btn-download">Download Brochure</button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}