"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "@/components/shared/Navbar/Navbar";
import Footer from "@/components/shared/Footer/Footer";
import Breadcrumb from "@/components/shared/Breadcrumb/Breadcrumb";
import { useCart } from "@/hooks/useCart";
import "./cart.css";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, getTotalPrice, isLoaded } =
    useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !isLoaded) {
    return (
      <main>
        <Navbar />
        <div className="loading">Loading cart...</div>
        <Footer />
      </main>
    );
  }

  const totalPrice = getTotalPrice();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <main className="cart-page">
      <Navbar />

      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Shopping Cart" },
        ]}
      />

      <section className="cart-section">
        <div className="cart-container">
          <h1>Shopping Cart</h1>

          {cart.length > 0 ? (
            <div className="cart-content">
              <div className="cart-items">
                <div className="cart-header">
                  <span className="col-product">Product</span>
                  <span className="col-price">Price</span>
                  <span className="col-quantity">Quantity</span>
                  <span className="col-total">Total</span>
                  <span className="col-action">Action</span>
                </div>

                {cart.map((item) => (
                  <div key={item.productId} className="cart-item">
                    <div className="col-product">
                      <Link href={`/products/${item.productId}`}>
                        <span className="item-name">{item.name}</span>
                      </Link>
                    </div>
                    <div className="col-price">${item.price.toFixed(2)}</div>
                    <div className="col-quantity">
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(
                            item.productId,
                            Number(e.target.value)
                          )
                        }
                        className="qty-input"
                      />
                    </div>
                    <div className="col-total">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                    <div className="col-action">
                      <button
                        onClick={() => removeFromCart(item.productId)}
                        className="remove-btn"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart-summary">
                <h2>Order Summary</h2>
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="summary-row">
                  <span>Tax</span>
                  <span>${(totalPrice * 0.1).toFixed(2)}</span>
                </div>
                <div className="summary-divider"></div>
                <div className="summary-row total">
                  <span>Total</span>
                  <span>${(totalPrice * 1.1).toFixed(2)}</span>
                </div>

                <button className="checkout-btn">Proceed to Checkout</button>
                <Link href="/products" className="continue-shopping">
                  Continue Shopping
                </Link>
              </div>
            </div>
          ) : (
            <div className="empty-cart">
              <span className="empty-icon">🛒</span>
              <h2>Your Cart is Empty</h2>
              <p>Start shopping to add items to your cart</p>
              <Link href="/products" className="shop-btn">
                Start Shopping
              </Link>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
