"use client";

import Link from "next/link";
import "./product-card.css";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    shortDescription: string;
    pricing: {
      cost: number;
      currency: string;
    };
  };
  productId: string;
}

export default function ProductCard({ product, productId }: ProductCardProps) {
  return (
    <Link href={`/products/${productId}`} className="product-card-link">
      <div className="product-card">
        <div className="product-image-wrapper">
          <div className="product-image-placeholder">
            <span className="image-icon">🛍️</span>
          </div>
        </div>
        <div className="product-content">
          <h3 className="product-name">{product.name}</h3>
          <p className="product-description">{product.shortDescription}</p>
          <div className="product-footer">
            <span className="product-price">
              ${product.pricing.cost.toFixed(2)} {product.pricing.currency}
            </span>
            <button className="view-btn">View</button>
          </div>
        </div>
      </div>
    </Link>
  );
}