"use client";

import { useWishlist } from "@/hooks/useWishlist";
import "./wishlist-button.css";

interface WishlistButtonProps {
  productId: string;
}

export default function WishlistButton({ productId }: WishlistButtonProps) {
  const { isInWishlist, toggleWishlist } = useWishlist();

  const inWishlist = isInWishlist(productId);

  return (
    <button
      onClick={() => toggleWishlist(productId)}
      className={`wishlist-btn ${inWishlist ? "active" : ""}`}
      title={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
    >
      <span className="wishlist-icon">♥</span>
    </button>
  );
}