"use client";

import { useState } from "react";
import WishlistButton from "@/components/user/WishlistButton/WishlistButton";
import { useCart } from "@/hooks/useCart";
import { Product } from "@/models";
import "./product-detail.css";

interface ProductDetailClientProps {
  product: Product;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const [quantity, setQuantity] = useState(1);
  const [cartAdded, setCartAdded] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.pricing.cost,
      quantity,
      image: product.thumbnailImage,
    });
    setCartAdded(true);
    setTimeout(() => setCartAdded(false), 3000);
  };

  return (
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
                <div key={index} className="thumbnail">
                  <span>Image {index + 1}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Details Section */}
        <div className="product-details">
          <div className="product-header">
            <div>
              <h1 className="product-title">{product.name}</h1>
              <p className="product-sku">SKU: {product.sku}</p>
            </div>
            <WishlistButton productId={product.id} />
          </div>

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

          {/* Cart Section */}
          <div className="cart-section">
            <div className="quantity-control">
              <label htmlFor="quantity">Quantity:</label>
              <div className="quantity-input-group">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="qty-btn"
                >
                  −
                </button>
                <input
                  type="number"
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                  min="1"
                  className="qty-input"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="qty-btn"
                >
                  +
                </button>
              </div>
            </div>

            <div className="action-buttons">
              <button onClick={handleAddToCart} className="btn-cart">
                {cartAdded ? "✓ Added to Cart" : "Add to Cart"}
              </button>
              <button className="btn-inquiry">Request Information</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}