import Link from "next/link";
import Navbar from "@/components/shared/Navbar/Navbar";
import Footer from "@/components/shared/Footer/Footer";
import FeaturedProducts from "@/components/user/FeaturedProducts/FeaturedProducts";
import CategoryGrid from "@/components/user/CategoryGrid/CategoryGrid";
import "./page.css";

export default function Home() {
  return (
    <main className="home-page">
      <Navbar />
      
      {/* Hero Banner */}
      <section className="hero-section">
        <div className="hero-background">
          <div className="hero-blur-1"></div>
          <div className="hero-blur-2"></div>
        </div>
        <div className="hero-content">
          <span className="hero-badge">✨ Welcome to AventaSphere</span>
          <h1 className="hero-title">Find the Perfect Product<br />for Your Business</h1>
          <p className="hero-subtitle">
            Discover premium electronics, textiles, and machinery from trusted suppliers worldwide
          </p>
          <Link href="/products" className="hero-button">
            Explore Now →
          </Link>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="featured-section">
        <div className="section-container">
          <div className="section-header">
            <h2>🌟 Featured Products</h2>
            <p>Premium selections handpicked for excellence</p>
          </div>
          <FeaturedProducts />
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="section-container">
          <div className="section-header">
            <h2>📂 Shop by Category</h2>
            <p>Browse our diverse range of premium products</p>
          </div>
          <CategoryGrid />
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="section-container">
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number">500+</span>
              <span className="stat-label">Premium Products</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">50+</span>
              <span className="stat-label">Countries Served</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">10K+</span>
              <span className="stat-label">Happy Customers</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">24/7</span>
              <span className="stat-label">Expert Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section">
        <div className="section-container">
          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon-wrapper">
                <span className="benefit-icon">✓</span>
              </div>
              <h3>Verified Quality</h3>
              <p>All products meet international standards and certifications</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon-wrapper">
                <span className="benefit-icon">✈️</span>
              </div>
              <h3>Fast Shipping</h3>
              <p>Quick global delivery with real-time tracking</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon-wrapper">
                <span className="benefit-icon">💬</span>
              </div>
              <h3>Expert Support</h3>
              <p>Dedicated customer service 24/7 in multiple languages</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon-wrapper">
                <span className="benefit-icon">💰</span>
              </div>
              <h3>Best Prices</h3>
              <p>Competitive pricing with exclusive volume discounts</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-blur-1"></div>
        <div className="cta-blur-2"></div>
        <div className="cta-content">
          <h2>Ready to Find Your Perfect Product?</h2>
          <p>Browse our complete catalogue or contact our team for personalized assistance</p>
          <div className="cta-buttons">
            <Link href="/products" className="cta-button primary">
              View All Products
            </Link>
            <Link href="/contact" className="cta-button secondary">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
