"use client";

import "./category-card.css";

interface CategoryCardProps {
  category: {
    id: string;
    name: string;
    description: string;
    image: string;
  };
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <div className="category-card">
      <div className="category-image-wrapper">
        <div className="category-image-placeholder">
          <span className="image-icon">📦</span>
        </div>
      </div>
      <div className="category-content">
        <h3 className="category-name">{category.name}</h3>
        <p className="category-description">{category.description}</p>
        <div className="category-footer">
          <span className="explore-link">Browse →</span>
        </div>
      </div>
    </div>
  );
}
