"use client";

import Link from "next/link";
import { useState } from "react";
import "./navbar.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link href="/" className="navbar-logo">
          <img
            src="/images/logos/AvantaSphere_Logo_2.png"
            alt="AventaSphere Logo"
            className="navbar-logo-image"
          />
        </Link>

        <button
          className="hamburger"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`navbar-menu ${isOpen ? "active" : ""}`}>
          <Link href="/" className="nav-link">
            Home
          </Link>
          <Link href="/categories" className="nav-link">
            Categories
          </Link>
          <Link href="/products" className="nav-link">
            Products
          </Link>
          <Link href="/about" className="nav-link">
            About
          </Link>
          <Link href="/quote-request" className="nav-link">
            Quote Request
          </Link>
          <Link href="/contact" className="nav-link cta-link">
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}