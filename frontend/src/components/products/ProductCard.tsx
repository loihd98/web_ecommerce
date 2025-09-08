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
        const favoriteStatus = await apiService.isFavorite(product._id);
        setIsFavorite(favoriteStatus);
      } catch (error) {
        console.error("Error checking favorite status:", error);
      }
    };

    checkFavoriteStatus();
  }, [product._id]);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
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
        const success = await apiService.removeFromFavorites(product._id);
        if (success) {
          setIsFavorite(false);
        }
      } else {
        const success = await apiService.addToFavorites(product._id);
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

  const discountPercentage = product.salePrice
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : 0;

  const getCategoryName = () => {
    if (typeof product.categoryId === "object" && product.categoryId !== null) {
      return product.categoryId.name;
    }
    return "";
  };

  const getCategoryId = () => {
    if (typeof product.categoryId === "object" && product.categoryId !== null) {
      return product.categoryId._id;
    }
    return product.categoryId;
  };

  return (
    <Link href={`/products/${product._id}`} className="group block">
      <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg dark:hover:shadow-2xl transition-all duration-300 overflow-hidden lego-card">
        {/* Product Image */}
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

        {/* Product Info */}
        <div className="p-4">
          {/* Category */}
          <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">
            {getCategoryName()}
          </p>

          {/* Product Name */}
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-red-600 transition-colors lego-text">
            {product.name}
          </h3>

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
          {/* Price */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-2">
              {product.salePrice ? (
                <>
                  <span className="text-lg font-bold text-red-600 dark:text-red-400">
                    {formatPrice(product.salePrice)}
                  </span>
                  <span className="text-sm text-gray-400 line-through">
                    {formatPrice(product.price)}
                  </span>
                </>
              ) : (
                <span className="text-lg font-bold text-gray-900 dark:text-white">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>
            {discountPercentage > 0 && (
              <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                -{discountPercentage}%
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
    </Link>
  );
};

export default ProductCard;
