"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useCart } from "@/hooks/useCart";
import "./navbar.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { getTotalItems, isLoaded } = useCart();
  const cartItems = getTotalItems();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link href="/" className="navbar-logo">
          <span className="logo-text">AventaSphere</span>
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
          <Link href="/products" className="nav-link">
            Products
          </Link>
          <Link href="/contact" className="nav-link">
            Contact
          </Link>
          <Link href="/catalogue" className="nav-link">
            Catalogue
          </Link>
          <Link href="/cart" className="nav-link cart-link">
            <span className="cart-icon">🛒</span>
            <span>Cart</span>
            {isLoaded && cartItems > 0 && (
              <span className="cart-badge">{cartItems}</span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}