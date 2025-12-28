import Link from "next/link";
import Navbar from "@/components/shared/Navbar/Navbar";
import Footer from "@/components/shared/Footer/Footer";
import "./error-page.css";

export default function NotFound() {
  return (
    <main className="error-page">
      <Navbar />
      <section className="error-section">
        <div className="error-content">
          <h1 className="error-code">404</h1>
          <h2 className="error-title">Page Not Found</h2>
          <p className="error-description">
            Sorry, the page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <div className="error-actions">
            <Link href="/" className="error-btn primary">
              Go Home
            </Link>
            <Link href="/products" className="error-btn secondary">
              Browse Products
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}