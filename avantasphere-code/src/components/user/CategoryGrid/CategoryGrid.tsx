"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import CategoryCard from "../CategoryCard/CategoryCard";
import "./category-grid.css";

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
}

export default function CategoryGrid() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      try {debugger;
        const response = await fetch("/api/categories");
        const data = await response.json();
        setCategories(data.categories);
      } catch (error) {
        console.error("Failed to load categories:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  if (loading) {
    return <div className="loading">Loading categories...</div>;
  }

  return (
    <div className="category-grid">
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/categories/${category.slug}`}
          className="category-link"
        >
          <CategoryCard category={category} />
        </Link>
      ))}
    </div>
  );
}
