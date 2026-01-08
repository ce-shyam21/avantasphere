import Navbar from "@/components/shared/Navbar/Navbar";
import Footer from "@/components/shared/Footer/Footer";
import CategoryGrid from "@/components/user/CategoryGrid/CategoryGrid";
import FeaturedProducts from "@/components/user/FeaturedProducts/FeaturedProducts";
import Link from "next/link";
import "./page.css";

export const metadata = {
  title: "AventaSphere - Premium Export-Import Solutions",
  description: "Discover premium products across electronics, textiles, and machinery. Leading export-import company connecting global buyers and suppliers.",
  keywords: "export, import, electronics, textiles, machinery, international trade",
};

export default function HomePage() {
  return (
    <main className="home-page">
      <Navbar />

      {/* Hero Section */}
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-main">
            <div className="hero-text">
              <div className="hero-badge glass-card">
                <span>🌍 Global Export-Import Solutions</span>
              </div>
              <h1 className="hero-title">
                Exporting Excellence
                <span className="gradient-text"> Worldwide</span>
              </h1>
              <p className="hero-description">
                Your trusted partner for premium export-import solutions.
                Discover quality products across electronics, textiles, and machinery
                from verified suppliers worldwide.
              </p>
              <div className="hero-cta">
                <Link href="/products" className="btn-primary glass-btn-dark">
                  Explore Products
                </Link>
                <Link href="/quote-request" className="btn-secondary glass-btn-dark">
                  Get Quote
                </Link>
              </div>
            </div>

            <div className="hero-visual">
              <div className="hero-image-wrapper">
                <img
                  src="/images/ui/backgrounds/Home_Background_4.png"
                  alt="Export Import Solutions"
                  className="hero-image"
                />

                {/* Glass Card 1 - Top Left */}
                <div className="glass-overlay-card card-top-left">
                  <div className="card-icon">
                    <span>🏆</span>
                  </div>
                  <div className="card-content">
                    <h3 className="card-title">ISO Certified</h3>
                    <p className="card-subtitle">International Standards</p>
                  </div>
                </div>

                {/* Glass Card 2 - Bottom Right */}
                <div className="glass-overlay-card card-bottom-right">
                  <div className="card-icon">
                    <span>📈</span>
                  </div>
                  <div className="card-content">
                    <h3 className="card-title">50+</h3>
                    <p className="card-subtitle">Countries</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="hero-stats">
            <div className="stat-item glass-card">
              <span className="stat-icon">📦</span>
              <span className="stat-number">500+</span>
              <span className="stat-label">Products</span>
            </div>
            <div className="stat-item glass-card">
              <span className="stat-icon">🌍</span>
              <span className="stat-number">50+</span>
              <span className="stat-label">Countries</span>
            </div>
            <div className="stat-item glass-card">
              <span className="stat-icon">👥</span>
              <span className="stat-number">10K+</span>
              <span className="stat-label">Customers</span>
            </div>
            <div className="stat-item glass-card">
              <span className="stat-icon">⭐</span>
              <span className="stat-number">15+</span>
              <span className="stat-label">Years Experience</span>
            </div>
          </div>
        </div>
      </section>


      {/* Categories Section */}
      <section className="categories-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">Shop by Category</h2>
            <p className="section-description">
              Explore our wide range of product categories
            </p>
          </div>
          <CategoryGrid />
          <div className="section-footer">
            <Link href="/categories" className="btn-link glass-btn-dark">
              View All Categories →
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="featured-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">Featured Products</h2>
            <p className="section-description">
              Handpicked premium products from our collection
            </p>
          </div>
          <FeaturedProducts />
          <div className="section-footer">
            <Link href="/products" className="btn-link glass-btn-dark">
              View All Products →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content glass-section">
          <h2 className="cta-title">Ready to Get Started?</h2>
          <p className="cta-description">
            Request a quote or contact our sales team for personalized assistance
          </p>
          <div className="cta-buttons">
            <Link href="/quote-request" className="btn-primary glass-btn-dark">
              Request a Quote
            </Link>
            <Link href="/contact" className="btn-secondary glass-btn-dark">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

