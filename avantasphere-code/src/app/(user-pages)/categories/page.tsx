import Navbar from "@/components/shared/Navbar/Navbar";
import Footer from "@/components/shared/Footer/Footer";
import CategoryGrid from "@/components/user/CategoryGrid/CategoryGrid";
import Breadcrumb from "@/components/shared/Breadcrumb/Breadcrumb";
import "./categories.css";

export const metadata = {
  title: "Product Categories - AventaSphere",
  description: "Browse all product categories including electronics, textiles, machinery, and more. Find the perfect products for your business needs.",
  keywords: "categories, electronics, textiles, machinery, products",
};

export default function CategoriesPage() {
  return (
    <main className="categories-page">
      <Navbar />

      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Categories" },
        ]}
      />

      <section className="categories-hero">
        <div className="categories-hero-content">
          <h1 className="categories-title">Product Categories</h1>
          <p className="categories-description">
            Explore our comprehensive range of product categories. 
            Each category offers premium quality products from verified suppliers worldwide.
          </p>
        </div>
      </section>

      <section className="categories-section">
        <div className="categories-container">
          <CategoryGrid />
        </div>
      </section>

      <Footer />
    </main>
  );
}

