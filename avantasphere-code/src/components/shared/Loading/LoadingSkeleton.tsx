"use client";

import "./loading-skeleton.css";

interface LoadingSkeletonProps {
  type?: "product-card" | "product-detail" | "table";
  count?: number;
}

export default function LoadingSkeleton({
  type = "product-card",
  count = 4,
}: LoadingSkeletonProps) {
  if (type === "product-card") {
    return (
      <div className="skeleton-grid">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="skeleton-card">
            <div className="skeleton-image"></div>
            <div className="skeleton-content">
              <div className="skeleton-line skeleton-title"></div>
              <div className="skeleton-line skeleton-text"></div>
              <div className="skeleton-line skeleton-text short"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === "product-detail") {
    return (
      <div className="skeleton-detail">
        <div className="skeleton-image-large"></div>
        <div className="skeleton-content-large">
          <div className="skeleton-line skeleton-title-large"></div>
          <div className="skeleton-line"></div>
          <div className="skeleton-line"></div>
          <div className="skeleton-line short"></div>
        </div>
      </div>
    );
  }

  return null;
}