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
          <div className="error-code">
            <span className="digit-4-left">4</span>
            <span className="digit-0-container">
              <span className="digit-0-whole">0</span>
              <span className="digit-0-shard digit-0-shard-tl">0</span>
              <span className="digit-0-shard digit-0-shard-tr">0</span>
              <span className="digit-0-shard digit-0-shard-bl">0</span>
              <span className="digit-0-shard digit-0-shard-br">0</span>
              <svg className="crack-lines" width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                <line x1="50" y1="0" x2="50" y2="100" stroke="rgba(255,255,255,0.9)" strokeWidth="2.5" />
                <line x1="0" y1="50" x2="100" y2="50" stroke="rgba(255,255,255,0.9)" strokeWidth="2.5" />
                <line x1="30" y1="0" x2="70" y2="100" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" />
                <line x1="70" y1="0" x2="30" y2="100" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" />
                <line x1="0" y1="30" x2="100" y2="70" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
                <line x1="0" y1="70" x2="100" y2="30" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
              </svg>
            </span>
            <span className="digit-4-right">4</span>
          </div>
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