"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/shared/Navbar/Navbar";
import Footer from "@/components/shared/Footer/Footer";
import ProductCard from "@/components/user/ProductCard/ProductCard";
import FilterPanel from "@/components/user/FilterPanel/FilterPanel";
import Pagination from "@/components/user/Pagination/Pagination";
import LoadingSkeleton from "@/components/shared/Loading/LoadingSkeleton";
import Breadcrumb from "@/components/shared/Breadcrumb/Breadcrumb";
import { Product } from "@/models";
import "./products.css";

const ITEMS_PER_PAGE = 12;

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });
  const [tempPriceRange, setTempPriceRange] = useState({ min: 0, max: 10000 });
  const [currentPage, setCurrentPage] = useState(1);
  const [hasActiveFilters, setHasActiveFilters] = useState(false);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/products");
        const data = await response.json();
        setProducts(data.products);
        setFilteredProducts(data.products);
      } catch (error) {
        console.error("Failed to load products:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  useEffect(() => {
    let results = products;

    if (searchTerm) {
      results = results.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory) {
      results = results.filter((product) => product.categoryId === selectedCategory);
    }

    results = results.filter(
      (product) =>
        product.pricing.cost >= priceRange.min &&
        product.pricing.cost <= priceRange.max
    );

    if (sortBy === "price-low") {
      results.sort((a, b) => a.pricing.cost - b.pricing.cost);
    } else if (sortBy === "price-high") {
      results.sort((a, b) => b.pricing.cost - a.pricing.cost);
    } else if (sortBy === "name") {
      results.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      results.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }

    setFilteredProducts(results);
    setCurrentPage(1);

    const hasFilters = searchTerm !== "" || 
                      selectedCategory !== "" || 
                      priceRange.min !== 0 || 
                      priceRange.max !== 10000 ||
                      sortBy !== "newest";
    setHasActiveFilters(hasFilters);
  }, [products, searchTerm, selectedCategory, sortBy, priceRange]);

  const handleApplyPriceFilter = () => {
    setPriceRange(tempPriceRange);
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setSortBy("newest");
    setPriceRange({ min: 0, max: 10000 });
    setTempPriceRange({ min: 0, max: 10000 });
  };

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <main className="products-page">
      <Navbar />

      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Products" },
        ]}
      />

      <section className="products-section">
        <div className="products-container">
          <div className="section-header">
            <h1>Our Products</h1>
            <p>Browse our complete range of premium products</p>
          </div>

          <div className="products-content">
            <aside className="sidebar">
              <FilterPanel
                onCategoryChange={setSelectedCategory}
                onPriceChange={(min, max) => setTempPriceRange({ min, max })}
                onSortChange={setSortBy}
                selectedCategory={selectedCategory}
                sortBy={sortBy}
                tempPriceRange={tempPriceRange}
                onApplyPriceFilter={handleApplyPriceFilter}
              />
            </aside>

            <main className="main-content">
              <div className="search-container">
                <div className="search-wrapper">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                  />
                  <button className="search-icon-btn" aria-label="Search">
                    🔍
                  </button>
                </div>
                <div className="search-meta">
                  <span className="results-count">
                    {filteredProducts.length} products found
                  </span>
                  {hasActiveFilters && (
                    <button 
                      className="clear-filters-btn"
                      onClick={handleClearFilters}
                    >
                      ✕ Clear Filters
                    </button>
                  )}
                </div>
              </div>

              {loading ? (
                <LoadingSkeleton type="product-card" count={12} />
              ) : paginatedProducts.length > 0 ? (
                <>
                  <div className="products-grid">
                    {paginatedProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        productId={product.id}
                      />
                    ))}
                  </div>

                  {totalPages > 1 && (
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={setCurrentPage}
                    />
                  )}
                </>
              ) : (
                <div className="no-products">
                  <span className="no-products-icon">🔍</span>
                  <h3>No Products Found</h3>
                  <p>
                    Try adjusting your filters or search terms to find what you&apos;re
                    looking for.
                  </p>
                </div>
              )}
            </main>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}