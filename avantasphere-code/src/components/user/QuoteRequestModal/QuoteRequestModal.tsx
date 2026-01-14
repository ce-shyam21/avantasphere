"use client";

import { useState, useEffect } from "react";
import "./quote-request-modal.css";

interface QuoteRequestModalProps {
  productName: string;
  onClose: () => void;
  type: "quote" | "contact";
}

export default function QuoteRequestModal({
  productName,
  onClose,
  type,
}: QuoteRequestModalProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    const originalPosition = document.body.style.position;
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.width = "100%";
    
    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.position = originalPosition;
      document.body.style.width = "";
    };
  }, []);

  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    companyName: "",
    phone: "",
    quantity: 1,
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/inquiries/send-quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          productName,
          type,
          quantity: formData.quantity.toString(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit request");
      }

      setSuccess(true);
      setFormData({
        customerName: "",
        customerEmail: "",
        companyName: "",
        phone: "",
        quantity: 1,
        message: "",
      });

      setTimeout(() => {
        onClose();
      }, 3000);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const title =
    type === "quote" ? "Request a Quote" : "Contact Us";
  const description =
    type === "quote"
      ? "Fill out the form below to request a custom quote for this product."
      : "Get in touch with our team. We'll respond within 24 hours.";

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ×
        </button>

        <div className="modal-header">
          <h2>{title}</h2>
          <p>{description}</p>
        </div>

        {success ? (
          <div className="success-message">
            <span className="success-icon">✅</span>
            <h3>Request Submitted Successfully!</h3>
            <p>
              Thank you! We&apos;ve sent a confirmation email to {formData.customerEmail}.
              Our team will get back to you within 24 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="quote-form">
            {error && <div className="error-message">{error}</div>}

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="customerName">Full Name *</label>
                <input
                  type="text"
                  id="customerName"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                />
              </div>

              <div className="form-group">
                <label htmlFor="customerEmail">Email Address *</label>
                <input
                  type="email"
                  id="customerEmail"
                  name="customerEmail"
                  value={formData.customerEmail}
                  onChange={handleChange}
                  required
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="companyName">Company Name</label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="Your Company"
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1-234-567-8900"
                />
              </div>
            </div>

            {type === "quote" && (
              <div className="form-group">
                <label htmlFor="quantity">Quantity Required *</label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                  min="1"
                  placeholder="100"
                />
              </div>
            )}

            <div className="form-group full-width">
              <label htmlFor="message">Message *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                placeholder="Please provide additional details about your requirements..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="submit-btn"
              disabled={loading}
            >
              {loading ? "Sending..." : `Submit ${type === "quote" ? "Quote Request" : "Message"}`}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}