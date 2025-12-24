import Navbar from "@/components/shared/Navbar/Navbar";
import Footer from "@/components/shared/Footer/Footer";
import "./about.css";

export default function AboutPage() {
  return (
    <main className="about-page">
      <Navbar />

      <section className="about-hero">
        <div className="about-hero-content">
          <h1>About AventaSphere</h1>
          <p>Leading the way in export-import excellence</p>
        </div>
      </section>

      <section className="about-section">
        <div className="about-container">
          <div className="about-grid">
            <div className="about-content">
              <h2>Who We Are</h2>
              <p>
                AventaSphere is a leading export-import company specializing in
                premium products across electronics, textiles, and machinery
                sectors. With years of experience in international trade, we
                connect buyers and suppliers globally.
              </p>
              <p>
                Our commitment to quality, competitive pricing, and exceptional
                customer service has made us a trusted partner for businesses
                worldwide.
              </p>
            </div>

            <div className="about-stats">
              <div className="stat-card">
                <span className="stat-number">500+</span>
                <span className="stat-label">Products</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">50+</span>
                <span className="stat-label">Countries</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">10K+</span>
                <span className="stat-label">Customers</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">15+</span>
                <span className="stat-label">Years</span>
              </div>
            </div>
          </div>

          <div className="about-values">
            <h2>Our Values</h2>
            <div className="values-grid">
              <div className="value-card">
                <h3>Quality</h3>
                <p>All products meet international standards and certifications</p>
              </div>
              <div className="value-card">
                <h3>Integrity</h3>
                <p>Transparent pricing and honest business practices</p>
              </div>
              <div className="value-card">
                <h3>Reliability</h3>
                <p>On-time delivery and consistent customer support</p>
              </div>
              <div className="value-card">
                <h3>Innovation</h3>
                <p>Constantly improving products and services</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}