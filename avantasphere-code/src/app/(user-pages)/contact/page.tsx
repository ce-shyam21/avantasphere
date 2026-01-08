"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/shared/Navbar/Navbar";
import Footer from "@/components/shared/Footer/Footer";
import Breadcrumb from "@/components/shared/Breadcrumb/Breadcrumb";
import "./contact.css";

export default function ContactPage() {
  const searchParams = useSearchParams();
  
  // Get query parameters
  const productNameParam = searchParams.get("productName") || "";
  const productIdParam = searchParams.get("productId") || "";
  const subjectParam = searchParams.get("subject") || "";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: subjectParam ? `${subjectParam}\n\n` : "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Update message when URL params change
  useEffect(() => {
    if (subjectParam) {
      setFormData(prev => ({
        ...prev,
        message: `${subjectParam}\n\n${prev.message.replace(subjectParam, "").trim()}`,
      }));
    }
  }, [subjectParam]);

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
      const response = await fetch("/api/inquiries/contact-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          productName: productNameParam,
          productId: productIdParam,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit form");
      }

      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        company: "",
        phone: "",
        message: "",
      });

      setTimeout(() => setSubmitted(false), 5000);
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
        { label: "Contact Us" },
      ]
    : [
        { label: "Home", href: "/" },
        { label: "Contact Us" },
      ];

  return (
    <main className="contact-page">
      <Navbar />

      <Breadcrumb items={breadcrumbItems} />

      <section className="contact-section">
        <div className="contact-container">
          <div className="contact-header">
            <h1>Contact Us</h1>
            <p>
              {productNameParam
                ? `Get in touch with our team about ${productNameParam}`
                : "Get in touch with our sales team for inquiries and support"
              }
            </p>
          </div>

          <div className="contact-content">
            {/* Contact Form */}
            <div className="contact-form-wrapper">
              <h2>Send us a Message</h2>
              
              {submitted && (
                <div className="success-message">
                  <span className="success-icon">✓</span>
                  <h3>Message Sent Successfully!</h3>
                  <p>Thank you for contacting us. We&apos;ll get back to you within 24 hours.</p>
                </div>
              )}

              {error && (
                <div className="error-message">
                  <span className="error-icon">✗</span>
                  <p>{error}</p>
                </div>
              )}

              {!submitted && (
                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">Full Name *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="John Doe"
                        disabled={loading}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="email">Email Address *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="john@example.com"
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="company">Company Name</label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
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

                  <div className="form-group full-width">
                    <label htmlFor="message">Message *</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      required
                      placeholder="Tell us how we can help..."
                      disabled={loading}
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    className="submit-btn glass-btn-dark"
                    disabled={loading}
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </button>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <div className="contact-info-wrapper">
              <h2>Contact Information</h2>
              <div className="info-card">
                <h3>📧 Email</h3>
                <p>
                  <a href="mailto:info@avantasphere.com">
                    info@avantasphere.com
                  </a>
                </p>
              </div>

              <div className="info-card">
                <h3>📱 Phone</h3>
                <p>
                  <a href="tel:+919876543210">+91-98765-43210</a>
                </p>
              </div>

              <div className="info-card">
                <h3>📍 Address</h3>
                <p>Mumbai, India</p>
              </div>

              <div className="info-card">
                <h3>⏰ Working Hours</h3>
                <p>Monday - Friday: 9:00 AM - 6:00 PM IST</p>
                <p>Saturday - Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}