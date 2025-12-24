"use client";

import { useState } from "react";
import Navbar from "@/components/shared/Navbar/Navbar";
import Footer from "@/components/shared/Footer/Footer";
import "./catalogue.css";

export default function CataloguePage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/catalogues/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setSubmitted(true);
        setEmail("");
        setTimeout(() => setSubmitted(false), 5000);
      }
    } catch (error) {
      console.error("Error submitting email:", error);
    }
  };

  return (
    <main className="catalogue-page">
      <Navbar />

      <section className="catalogue-section">
        <div className="catalogue-container">
          <div className="catalogue-header">
            <h1>Download Our Catalogue</h1>
            <p>
              Get our comprehensive product catalogue with detailed specifications,
              pricing, and shipping information
            </p>
          </div>

          <div className="catalogue-content">
            <div className="catalogue-card">
              <div className="catalogue-icon">📄</div>
              <h2>Complete Product Catalogue</h2>
              <p>
                Our detailed catalogue includes all products with specifications,
                images, and pricing. Perfect for bulk buyers and distributors.
              </p>

              <div className="catalogue-features">
                <div className="feature">
                  <span className="feature-icon">✓</span>
                  <span>All products with detailed specs</span>
                </div>
                <div className="feature">
                  <span className="feature-icon">✓</span>
                  <span>High-quality product images</span>
                </div>
                <div className="feature">
                  <span className="feature-icon">✓</span>
                  <span>Competitive pricing</span>
                </div>
                <div className="feature">
                  <span className="feature-icon">✓</span>
                  <span>Shipping & customs info</span>
                </div>
                <div className="feature">
                  <span className="feature-icon">✓</span>
                  <span>Volume discounts details</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="catalogue-form">
                {submitted && (
                  <div className="success-message">
                    ✓ Catalogue will be sent to your email shortly!
                  </div>
                )}
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <button type="submit" className="download-btn">
                  Send Catalogue
                </button>
              </form>
            </div>

            <div className="catalogue-benefits">
              <h2>Why Choose AventaSphere?</h2>
              <div className="benefit-list">
                <div className="benefit-item">
                  <span className="benefit-number">1</span>
                  <div>
                    <h3>Quality Assured</h3>
                    <p>All products are ISO certified and quality tested</p>
                  </div>
                </div>
                <div className="benefit-item">
                  <span className="benefit-number">2</span>
                  <div>
                    <h3>Competitive Pricing</h3>
                    <p>Best prices in the market with volume discounts</p>
                  </div>
                </div>
                <div className="benefit-item">
                  <span className="benefit-number">3</span>
                  <div>
                    <h3>Fast Shipping</h3>
                    <p>Multiple shipping options with tracking</p>
                  </div>
                </div>
                <div className="benefit-item">
                  <span className="benefit-number">4</span>
                  <div>
                    <h3>Expert Support</h3>
                    <p>Dedicated customer service 24/7</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}