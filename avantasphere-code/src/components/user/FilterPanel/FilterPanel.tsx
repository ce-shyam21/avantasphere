"use client";

import { useState, useEffect } from "react";
import "./filter-panel.css";

interface Category {
  id: number;
  name: string;
  slug: string;
}

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
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [minValue, setMinValue] = useState(tempPriceRange.min.toString());
  const [maxValue, setMaxValue] = useState(tempPriceRange.max.toString());

  // Fetch categories from API
  useEffect(() => {
    const loadCategories = async () => {
      try {debugger;
        setLoading(true);
        const response = await fetch("/api/categories");
        const data = await response.json();
        console.log(data);
        setCategories(data.categories || []);
      } catch (error) {
        console.error("Failed to load categories:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

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
          
          {loading ? (
            <div className="filter-loading">Loading categories...</div>
          ) : (
            categories.map((category) => (
              <label key={category.id} className="filter-option">
                <input
                  type="radio"
                  name="category"
                  value={category.id.toString()}
                  checked={selectedCategory === category.id.toString()}
                  onChange={(e) => onCategoryChange(e.target.value)}
                />
                <span>{category.name}</span>
              </label>
            ))
          )}
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