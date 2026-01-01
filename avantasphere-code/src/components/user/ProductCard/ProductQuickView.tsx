"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Product } from "@/models";
import "./product-quick-view.css";

interface ProductQuickViewProps {
  productId: string;
  onClose: () => void;
}

export default function ProductQuickView({
  productId,
  onClose,
}: ProductQuickViewProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      try {debugger;
        const response = await fetch(`/api/products/${productId}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Failed to load product:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [productId]);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    const originalPosition = document.body.style.position;
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.width = "100%";
    
    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.position = originalPosition;
      document.body.style.width = "";
    };
  }, []);

  if (loading) {
    return (
      <div className="quick-view-overlay" onClick={onClose}>
        <div className="quick-view-modal" onClick={(e) => e.stopPropagation()}>
          <div className="loading">Loading product details...</div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="quick-view-overlay" onClick={onClose}>
        <div className="quick-view-modal" onClick={(e) => e.stopPropagation()}>
          <div className="error">Product not found</div>
        </div>
      </div>
    );
  }

  const specs = product?.specifications || {};

  return (
    <div className="quick-view-overlay" onClick={onClose}>
      <div className="quick-view-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          ×
        </button>

        <div className="quick-view-container">
          <div className="quick-view-image">
            <div className="image-placeholder">
              <span>📦</span>
            </div>
          </div>

          <div className="quick-view-content">
            <h2 className="quick-view-title">{product.name}</h2>
            <p className="quick-view-sku">SKU: {product.sku}</p>

            <p className="quick-view-description">
              {product.shortDescription}
            </p>

            {Object.keys(specs).length > 0 && (
              <div className="quick-view-specs">
                <h4>Key Features:</h4>
                <ul>
                  {Object.entries(specs)
                    .slice(0, 3)
                    .map(([key, value]) => (
                      <li key={key}>
                        <strong>{key}:</strong> {value}
                      </li>
                    ))}
                </ul>
              </div>
            )}

            {product.pricing.showPrice && (
              <div className="quick-view-price">
                <span className="price-label">Price:</span>
                <span className="price-value">
                  ${product.pricing.cost.toFixed(2)} {product.pricing.currency}
                </span>
              </div>
            )}

            <div className="quick-view-shipping">
              <span className="shipping-item">
                ✈️ {product.shipping.shippingTime}
              </span>
              <span className="shipping-item">
                📍 {product.shipping.port}
              </span>
              <span className="shipping-item">
                📦 {product.shipping.incoterms}
              </span>
            </div>

            <Link
              href={`/products/${productId}`}
              className="view-more-btn"
              onClick={onClose}
            >
              View More Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}