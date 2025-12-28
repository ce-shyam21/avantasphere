"use client";

import "./filter-panel.css";

interface FilterPanelProps {
  onCategoryChange: (category: string) => void;
  onPriceChange: (min: number, max: number) => void;
  onSortChange: (sort: string) => void;
  selectedCategory: string;
}

export default function FilterPanel({
  onCategoryChange,
  onPriceChange,
  onSortChange,
  selectedCategory,
}: FilterPanelProps) {
  return (
    <div className="filter-panel">
      <div className="filter-section">
        <h3>Sort By</h3>
        <select
          onChange={(e) => onSortChange(e.target.value)}
          className="filter-select"
        >
          <option value="newest">Newest First</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="name">Name: A to Z</option>
        </select>
      </div>

      <div className="filter-section">
        <h3>Categories</h3>
        <div className="filter-options">
          <label className="filter-option">
            <input
              type="radio"
              name="category"
              value=""
              checked={selectedCategory === ""}
              onChange={(e) => onCategoryChange(e.target.value)}
            />
            <span>All Categories</span>
          </label>
          <label className="filter-option">
            <input
              type="radio"
              name="category"
              value="cat_001"
              checked={selectedCategory === "cat_001"}
              onChange={(e) => onCategoryChange(e.target.value)}
            />
            <span>Electronics</span>
          </label>
          <label className="filter-option">
            <input
              type="radio"
              name="category"
              value="cat_002"
              checked={selectedCategory === "cat_002"}
              onChange={(e) => onCategoryChange(e.target.value)}
            />
            <span>Textiles</span>
          </label>
          <label className="filter-option">
            <input
              type="radio"
              name="category"
              value="cat_003"
              checked={selectedCategory === "cat_003"}
              onChange={(e) => onCategoryChange(e.target.value)}
            />
            <span>Machinery</span>
          </label>
        </div>
      </div>

      <div className="filter-section">
        <h3>Price Range</h3>
        <div className="price-inputs">
          <input
            type="number"
            placeholder="Min"
            onChange={(e) => onPriceChange(Number(e.target.value), 10000)}
            className="price-input"
          />
          <span>-</span>
          <input
            type="number"
            placeholder="Max"
            onChange={(e) => onPriceChange(0, Number(e.target.value))}
            className="price-input"
          />
        </div>
      </div>
    </div>
  );
}
