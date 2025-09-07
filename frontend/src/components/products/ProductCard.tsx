import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAppDispatch } from "@/store/hooks";
import { addToCart } from "@/store/cartSlice";
import { Product } from "@/types";
import { Star, ShoppingCart, Heart } from "lucide-react";
import { apiService } from "@/services/api";
import { useTranslation } from "@/hooks/useTranslation";

interface ProductCardProps {
  product: Product;
  viewMode?: "grid" | "list";
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  viewMode = "grid",
}) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isTogglingFavorite, setIsTogglingFavorite] = useState(false);

  // Check if product is in favorites on component mount
  useEffect(() => {
    const checkFavoriteStatus = async () => {
      try {
        const favoriteStatus = await apiService.isFavorite(product.id);
        setIsFavorite(favoriteStatus);
      } catch (error) {
        console.error("Error checking favorite status:", error);
      }
    };

    checkFavoriteStatus();
  }, [product.id]);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(addToCart({ product, quantity: 1 }));
  };

  const handleToggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Check if user is logged in
    const token = localStorage.getItem("token");
    if (!token) {
      alert(t("auth.loginRequired"));
      return;
    }

    setIsTogglingFavorite(true);

    try {
      if (isFavorite) {
        const success = await apiService.removeFromFavorites(product.id);
        if (success) {
          setIsFavorite(false);
        }
      } else {
        const success = await apiService.addToFavorites(product.id);
        if (success) {
          setIsFavorite(true);
        }
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    } finally {
      setIsTogglingFavorite(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const discountPercentage = product.discountPrice
    ? Math.round(
        ((product.price - product.discountPrice) / product.price) * 100
      )
    : 0;

  return (
    <div className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg dark:hover:shadow-2xl transition-all duration-300 overflow-hidden lego-card">
      {/* Product Image */}
      <Link href={`/products/${product.id}`}>
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={product.images?.[0] || "/placeholder-product.jpg"}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* Discount Badge */}
          {discountPercentage > 0 && (
            <div className="absolute top-3 left-3 lego-brick lego-red text-white text-xs font-bold px-3 py-2 rounded-lg shadow-lg">
              -{discountPercentage}%
            </div>
          )}

          {/* Featured Badge */}
          {product.isFeatured && (
            <div className="absolute top-3 right-3 lego-brick lego-yellow text-black text-xs font-bold px-3 py-2 rounded-lg shadow-lg">
              ⭐ Nổi bật
            </div>
          )}

          {/* Quick Actions */}
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={handleToggleFavorite}
              disabled={isTogglingFavorite}
              className={`p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors mb-2 block lego-float ${
                isTogglingFavorite ? "opacity-50 cursor-not-allowed" : ""
              }`}
              title={isFavorite ? "Xóa khỏi yêu thích" : "Thêm vào yêu thích"}
            >
              <Heart
                className={`h-4 w-4 transition-colors ${
                  isFavorite
                    ? "text-red-500 fill-current"
                    : "text-gray-600 hover:text-red-500"
                }`}
              />
            </button>
          </div>

          {/* Out of Stock Overlay */}
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="text-white font-semibold">Hết hàng</span>
            </div>
          )}
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-4">
        {/* Category */}
        <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">
          {product.category?.name}
        </p>

        {/* Product Name */}
        <Link href={`/products/${product.id}`}>
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-red-600 transition-colors lego-text">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center mb-3">
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className="h-4 w-4 fill-yellow-400 text-yellow-400"
              />
            ))}
          </div>
          <span className="text-sm text-gray-500 ml-2">(4.5)</span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <div>
            {product.discountPrice ? (
              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold text-red-600">
                  {formatPrice(product.discountPrice)}
                </span>
                <span className="text-sm text-gray-500 line-through">
                  {formatPrice(product.price)}
                </span>
              </div>
            ) : (
              <span className="text-lg font-bold text-gray-900">
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          {/* Stock Status */}
          {product.stock > 0 && product.stock <= 5 && (
            <span className="text-xs text-orange-600 bg-orange-100 px-2 py-1 rounded-full">
              Còn {product.stock}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className={`w-full lego-btn ${
            product.stock === 0
              ? "opacity-50 cursor-not-allowed"
              : "lego-btn-blue"
          }`}
        >
          <ShoppingCart className="h-4 w-4 mr-2 inline" />
          {product.stock === 0 ? "Hết hàng" : "Thêm vào giỏ"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
