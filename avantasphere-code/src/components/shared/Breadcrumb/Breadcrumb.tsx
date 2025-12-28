"use client";

import Link from "next/link";
import "./breadcrumb.css";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <div className="breadcrumb-container">
        {items.map((item, index) => (
          <div key={index} className="breadcrumb-item">
            {item.href ? (
              <Link href={item.href}>{item.label}</Link>
            ) : (
              <span className="current">{item.label}</span>
            )}
            {index < items.length - 1 && <span className="separator">/</span>}
          </div>
        ))}
      </div>
    </nav>
  );
}