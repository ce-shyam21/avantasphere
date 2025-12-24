import { Suspense } from "react";
import { notFound } from "next/navigation";
import Navbar from "@/components/shared/Navbar/Navbar";
import Footer from "@/components/shared/Footer/Footer";
import { Product } from "@/models";
import { readFileSync } from "fs";
import path from "path";
import "./product-detail.css";

interface ProductDetailPageProps {
  params: Promise<{
    productId: string;
  }>;
}

async function getProduct(productId: string): Promise<Product | null> {
  try {debugger;
    console.log("Fetching product with ID:", productId);
    const dataPath = path.join(process.cwd(), "data", "products.json");
    const fileContent = readFileSync(dataPath, "utf-8");
    const data = JSON.parse(fileContent);
    const product = data.products.find((p: Product) => p.id === productId);
    return product || null;
  } catch (error) {
    console.error("Error loading product:", error);
    return null;
  }
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {debugger;
  const { productId } = await params;
  const product = await getProduct(productId);

  if (!product) {
    notFound();
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
                  <div key={index} className="thumbnail">
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