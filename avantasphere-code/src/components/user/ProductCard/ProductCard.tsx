"use client";

import Link from "next/link";
import Image from "next/image";
import "./product-card.css";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    shortDescription: string;
    images?: string[];
    thumbnailImage?: string;
    pricing: {
      cost: number;
      currency: string;
      moq?: number;
    };
  };
  productId: string;
}

export default function ProductCard({ product, productId }: ProductCardProps) {
  // Get the first image or thumbnail
  const imageUrl = product.thumbnailImage || product.images?.[0];

  return (
    <Link href={`/products/${productId}`} className="product-card-link">
      <div className="product-card">
        <div className="product-image-wrapper">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={product.name}
              fill
              className="product-image"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={false}
            />
          ) : (
            <div className="product-image-placeholder">
              <span className="image-icon">🛍️</span>
            </div>
          )}
        </div>
        <div className="product-content">
          <h3 className="product-name">{product.name}</h3>
          <p className="product-description">{product.shortDescription}</p>
          <div className="product-footer">
            <div className="product-pricing">
              <span className="product-price">
                ${product.pricing.cost.toFixed(2)} {product.pricing.currency}
              </span>
              {product.pricing.moq && (
                <span className="product-moq">MOQ: {product.pricing.moq}</span>
              )}
            </div>
            <button className="view-btn">View Details</button>
          </div>
        </div>
      </div>
    </Link>
  );
}