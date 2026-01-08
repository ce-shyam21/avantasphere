"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Product } from "@/models";
import "./product-detail.css";

interface ProductDetailClientProps {
  product: Product;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const [quantity, setQuantity] = useState(product.pricing.moq || 1);
  const router = useRouter();

  const handleRequestQuote = () => {
    // Encode product data to pass via URL
    const queryParams = new URLSearchParams({
      productName: product.name,
      productId: product.id,
      quantity: quantity.toString(),
      sku: product.sku,
    });
    
    router.push(`/quote-request?${queryParams.toString()}`);
  };

  const handleContactUs = () => {
    // Pass product context to contact page
    const queryParams = new URLSearchParams({
      productName: product.name,
      productId: product.id,
      subject: `Inquiry about ${product.name}`,
    });
    
    router.push(`/contact?${queryParams.toString()}`);
  };

  return (
    <>
      <section className="product-detail-section">
        <div className="product-detail-container">
          
          {/* Left: Product Images */}
          <div className="product-images-column">
            <div className="main-image-wrapper">
              <div className="main-image-placeholder">
                <span className="image-icon">📦</span>
              </div>
              <span className="image-badge">High Resolution Images</span>
            </div>

            {product.images && product.images.length > 1 && (
              <div className="thumbnail-images">
                {product.images.map((image, index) => (
                  <div key={index} className="thumbnail" title={`Image ${index + 1}`}>
                    <span>{index + 1}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Details */}
          <div className="product-info-column">
            
            {/* Header */}
            <div className="product-header">
              <div className="product-title-section">
                <h1 className="product-title">{product.name}</h1>
                <p className="product-sku">SKU: {product.sku}</p>
              </div>
            </div>

            {/* Description */}
            <div className="product-description-box">
              <p className="product-full-description">
                {product.fullDescription}
              </p>
            </div>

            {/* Price & MOQ */}
            {product.pricing.showPrice && (
              <div className="pricing-highlight">
                <div className="price-section">
                  <div className="price-item">
                    <span className="price-label">Unit Price</span>
                    <span className="price-value">
                      ${product.pricing.cost.toFixed(2)}
                    </span>
                  </div>
                  <div className="moq-item">
                    <span className="moq-label">Min. Order</span>
                    <span className="moq-value">{product.pricing.moq} units</span>
                  </div>
                </div>
              </div>
            )}

            {/* Specifications */}
            <div className="specifications-box">
              <h3 className="section-title">📋 Key Specifications</h3>
              <div className="specs-grid">
                {Object.entries(product.specifications).slice(0, 4).map(([key, value]) => (
                  <div key={key} className="spec-item">
                    <span className="spec-label">{key}</span>
                    <span className="spec-value">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Info */}
            <div className="shipping-box">
              <h3 className="section-title">✈️ Shipping Details</h3>
              <div className="shipping-grid">
                <div className="shipping-item">
                  <span className="shipping-icon">📍</span>
                  <div>
                    <span className="shipping-label">Port of Origin</span>
                    <span className="shipping-value">{product.shipping.port}</span>
                  </div>
                </div>
                <div className="shipping-item">
                  <span className="shipping-icon">⏱️</span>
                  <div>
                    <span className="shipping-label">Delivery Time</span>
                    <span className="shipping-value">{product.shipping.shippingTime}</span>
                  </div>
                </div>
                <div className="shipping-item">
                  <span className="shipping-icon">📦</span>
                  <div>
                    <span className="shipping-label">Incoterms</span>
                    <span className="shipping-value">{product.shipping.incoterms}</span>
                  </div>
                </div>
                <div className="shipping-item">
                  <span className="shipping-icon">⚖️</span>
                  <div>
                    <span className="shipping-label">Weight</span>
                    <span className="shipping-value">{product.shipping.weight} kg</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Customs Info */}
            <div className="customs-box">
              <h3 className="section-title">🔖 Customs Information</h3>
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

            {/* Action Section */}
            <div className="action-section">
              <div className="action-buttons">
                <button
                  onClick={handleRequestQuote}
                  className="btn-request-quote"
                >
                  📧 Request a Quote
                </button>
                <button
                  onClick={handleContactUs}
                  className="btn-contact"
                >
                  💬 Contact Us
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>
    </>
  );
}