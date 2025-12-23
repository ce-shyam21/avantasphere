"use client";

import Link from "next/link";
import "./footer.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>AventaSphere</h3>
          <p>Leading export-import company specializing in premium products.</p>
          <p className="contact-info">📧 info@avantasphere.com</p>
          <p className="contact-info">📱 +91-98765-43210</p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/products">Products</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/catalogue">Catalogue</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Categories</h4>
          <ul>
            <li><Link href="/categories/electronics">Electronics</Link></li>
            <li><Link href="/categories/textiles">Textiles</Link></li>
            <li><Link href="/categories/machinery">Machinery</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Information</h4>
          <ul>
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/contact">Contact Us</Link></li>
            <li><Link href="/">Privacy Policy</Link></li>
            <li><Link href="/">Terms & Conditions</Link></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} AventaSphere. All rights reserved.</p>
      </div>
    </footer>
  );
}