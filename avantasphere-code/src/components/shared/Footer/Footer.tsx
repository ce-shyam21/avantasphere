"use client";

import Link from "next/link";
import "./footer.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Company Info */}
        <div className="footer-section footer-company">
          <div className="footer-logo">
            <span className="footer-logo-icon">🌐</span>
            <h3>AventaSphere</h3>
          </div>
          <p className="footer-description">
            Leading export-import company specializing in premium products across 
            electronics, textiles, and machinery sectors.
          </p>
          <div className="footer-contact">
            <a href="mailto:info@avantasphere.com" className="contact-item">
              <span className="contact-icon">📧</span>
              <span>info@avantasphere.com</span>
            </a>
            <a href="tel:+919876543210" className="contact-item">
              <span className="contact-icon">📱</span>
              <span>+91-98765-43210</span>
            </a>
            <div className="contact-item">
              <span className="contact-icon">📍</span>
              <span>Mumbai, India</span>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/categories">Categories</Link></li>
            <li><Link href="/products">Products</Link></li>
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Categories */}
        <div className="footer-section">
          <h4>Categories</h4>
          <ul>
            <li><Link href="/categories/electronics">Electronics</Link></li>
            <li><Link href="/categories/textiles">Textiles</Link></li>
            <li><Link href="/categories/machinery">Machinery</Link></li>
            <li><Link href="/categories">View All</Link></li>
          </ul>
        </div>

        {/* Services */}
        <div className="footer-section">
          <h4>Services</h4>
          <ul>
            <li><Link href="/quote-request">Request Quote</Link></li>
            <li><Link href="/catalogue">Product Catalogue</Link></li>
            <li><Link href="/contact">Customer Support</Link></li>
            <li><Link href="/about">About Us</Link></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p>&copy; {currentYear} AventaSphere. All rights reserved.</p>
          <div className="footer-links">
            <Link href="/">Privacy Policy</Link>
            <span className="separator">•</span>
            <Link href="/">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
