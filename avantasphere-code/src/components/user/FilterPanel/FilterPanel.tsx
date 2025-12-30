"use client";

import { useState } from "react";
import "./filter-panel.css";

interface FilterPanelProps {
  onCategoryChange: (category: string) => void;
  onPriceChange: (min: number, max: number) => void;
  onSortChange: (sort: string) => void;
  selectedCategory: string;
  sortBy: string;
  tempPriceRange: { min: number; max: number };
  onApplyPriceFilter: () => void;
}

export default function FilterPanel({
  onCategoryChange,
  onPriceChange,
  onSortChange,
  selectedCategory,
  sortBy,
  tempPriceRange,
  onApplyPriceFilter,
}: FilterPanelProps) {
  const [minValue, setMinValue] = useState(tempPriceRange.min.toString());
  const [maxValue, setMaxValue] = useState(tempPriceRange.max.toString());

  const handleMinChange = (value: string) => {
    setMinValue(value);
    const numValue = value === "" ? 0 : Number(value);
    onPriceChange(numValue, Number(maxValue) || 10000);
  };

  const handleMaxChange = (value: string) => {
    setMaxValue(value);
    const numValue = value === "" ? 10000 : Number(value);
    onPriceChange(Number(minValue) || 0, numValue);
  };

  return (
    <div className="filter-panel">
      <div className="filter-section">
        <h3>Sort By</h3>
        <select
          value={sortBy}
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

      {/* <div className="filter-section">
        <h3>Price Range</h3>
        <div className="price-inputs">
          <input
            type="number"
            placeholder="Min (0)"
            value={minValue}
            onChange={(e) => handleMinChange(e.target.value)}
            className="price-input"
            min="0"
          />
          <span className="price-separator">to</span>
          <input
            type="number"
            placeholder="Max (10000)"
            value={maxValue}
            onChange={(e) => handleMaxChange(e.target.value)}
            className="price-input"
            min="0"
          />
        </div>
        <button 
          className="apply-price-btn"
          onClick={onApplyPriceFilter}
        >
          🔍 Apply Price Filter
        </button>
      </div> */}
    </div>
  );
}