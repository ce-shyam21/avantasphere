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
        <div className="hero-content">
          <h1 className="hero-title">Exporting Excellencess</h1>
          <p className="hero-subtitle">
            Premium Electronics, Textiles & Machinery from India
          </p>
          <Link href="/products" className="hero-button">
            Explore Products
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="section-header">
          <h2>Our Categories</h2>
          <p>Browse through our premium product categories</p>
        </div>
        <CategoryGrid />
      </section>

      {/* Featured Products Section */}
      <section className="featured-section">
        <div className="section-header">
          <h2>Featured Products</h2>
          <p>Discover our best-selling products</p>
        </div>
        <FeaturedProducts />
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Order?</h2>
          <p>Get our complete product catalogue and request a quote</p>
          <div className="cta-buttons">
            <Link href="/catalogue" className="cta-button primary">
              Download Catalogue
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