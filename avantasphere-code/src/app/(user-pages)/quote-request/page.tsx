"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/shared/Navbar/Navbar";
import Footer from "@/components/shared/Footer/Footer";
import Breadcrumb from "@/components/shared/Breadcrumb/Breadcrumb";
import "./quote-request.css";

export default function QuoteRequestPage() {
  const searchParams = useSearchParams();
  
  // Get query parameters
  const productNameParam = searchParams.get("productName") || "";
  const productIdParam = searchParams.get("productId") || "";
  const quantityParam = searchParams.get("quantity") || "";
  const skuParam = searchParams.get("sku") || "";

  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    companyName: "",
    phone: "",
    productName: productNameParam,
    quantity: quantityParam,
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // Update form when URL params change
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      productName: productNameParam,
      quantity: quantityParam,
    }));
  }, [productNameParam, quantityParam]);

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
          productId: productIdParam,
          sku: skuParam,
          type: "quote",
          quantity: formData.quantity || "1",
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
        productName: "",
        quantity: "",
        message: "",
      });

      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
      console.error("Error submitting form:", err);
    } finally {
      setLoading(false);
    }
  };

  // Dynamic breadcrumb based on whether coming from a product page
  const breadcrumbItems = productNameParam
    ? [
        { label: "Home", href: "/" },
        { label: "Products", href: "/products" },
        ...(productIdParam ? [{ label: productNameParam, href: `/products/${productIdParam}` }] : []),
        { label: "Quote Request" },
      ]
    : [
        { label: "Home", href: "/" },
        { label: "Quote Request" },
      ];

  return (
    <main className="quote-request-page">
      <Navbar />

      <Breadcrumb items={breadcrumbItems} />

      <section className="quote-request-section">
        <div className="quote-request-container">
          <div className="quote-header glass-section">
            <h1 className="quote-title">Request a Quote</h1>
            <p className="quote-description">
              {productNameParam 
                ? `Request a custom quote for ${productNameParam}. Our sales team will get back to you within 24 hours with competitive pricing.`
                : "Fill out the form below to request a custom quote for any of our products. Our sales team will get back to you within 24 hours with competitive pricing."
              }
            </p>
          </div>

          <div className="quote-form-wrapper glass-card">
            {success && (
              <div className="success-message">
                <span className="success-icon">✓</span>
                <h3>Quote Request Submitted Successfully!</h3>
                <p>
                  Thank you for your interest. We&apos;ve sent a confirmation email and 
                  our team will get back to you within 24 hours with a detailed quote.
                </p>
              </div>
            )}

            {error && (
              <div className="error-message">
                <span className="error-icon">✗</span>
                <p>{error}</p>
              </div>
            )}

            {!success && (
              <form onSubmit={handleSubmit} className="quote-form">
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
                      disabled={loading}
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
                      disabled={loading}
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
                      disabled={loading}
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
                      disabled={loading}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="productName">
                      Product Name {productNameParam ? "" : "(Optional)"}
                    </label>
                    <input
                      type="text"
                      id="productName"
                      name="productName"
                      value={formData.productName}
                      onChange={handleChange}
                      placeholder="Product you're interested in"
                      disabled={loading}
                      readOnly={!!productNameParam}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="quantity">Quantity Required</label>
                    <input
                      type="number"
                      id="quantity"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleChange}
                      min="1"
                      placeholder="100"
                      disabled={loading}
                    />
                  </div>
                </div>

                <div className="form-group full-width">
                  <label htmlFor="message">Message / Requirements *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    placeholder="Please provide additional details about your requirements, specifications, delivery timeline, or any other information that would help us prepare an accurate quote..."
                    disabled={loading}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="submit-btn glass-btn-dark"
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit Quote Request"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}