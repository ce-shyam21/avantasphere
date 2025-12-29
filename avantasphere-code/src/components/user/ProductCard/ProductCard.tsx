"use client";

import { useState } from "react";
import ProductQuickView from "./ProductQuickView";
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
  const [showQuickView, setShowQuickView] = useState(false);

  return (
    <>
      <div className="product-card" onClick={() => setShowQuickView(true)}>
        <div className="product-image-wrapper">
          <div className="product-image-placeholder">
            <span className="image-icon">📦</span>
          </div>
        </div>
        <div className="product-content">
          <h3 className="product-name">{product.name}</h3>
          <p className="product-description">{product.shortDescription}</p>
          <div className="product-footer">
            <span className="product-price">
              ${product.pricing.cost.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {showQuickView && (
        <ProductQuickView
          productId={productId}
          onClose={() => setShowQuickView(false)}
        />
      )}
    </>
  );
}
