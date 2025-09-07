"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Layout from "@/components/layout/Layout";
import ProductCard from "@/components/products/ProductCard";
import Button from "@/components/ui/Button";
import { Heart, ShoppingCart, Trash2, Search } from "lucide-react";
import { apiService } from "@/services/api";
import Link from "next/link";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  stock: number;
  images: string[];
  categoryId: number;
  category: {
    id: number;
    name: string;
    description: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
  };
  isActive: boolean;
  isFeatured: boolean;
  sku: string;
  tags: string[];
  weight: number;
  attributes: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export default function FavoritesPage() {
  const router = useRouter();
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    fetchFavorites();
  }, [router]);

  const fetchFavorites = async () => {
    try {
      setLoading(true);
      const favoritesData = await apiService.getFavorites();
      setFavorites(favoritesData);
    } catch (error) {
      console.error("Error fetching favorites:", error);
      setFavorites([]);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFromFavorites = async (productId: number) => {
    try {
      const success = await apiService.removeFromFavorites(productId);
      if (success) {
        setFavorites((prev) =>
          prev.filter((product) => product.id !== productId)
        );
      }
    } catch (error) {
      console.error("Error removing from favorites:", error);
    }
  };

  const handleClearAllFavorites = async () => {
    if (!confirm("Bạn có chắc chắn muốn xóa tất cả sản phẩm yêu thích?")) {
      return;
    }

    try {
      // Remove all favorites
      await Promise.all(
        favorites.map((product) => apiService.removeFromFavorites(product.id))
      );
      setFavorites([]);
    } catch (error) {
      console.error("Error clearing favorites:", error);
    }
  };

  // Filter favorites based on search
  const filteredFavorites = favorites.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 rounded w-1/4 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto mb-8"></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-gray-300 rounded-lg h-80 animate-pulse"
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <Heart className="w-8 h-8 text-red-500 mr-3" />
              Sản phẩm yêu thích
            </h1>
            <p className="text-gray-600 mt-2">
              {favorites.length > 0
                ? `Bạn có ${favorites.length} sản phẩm yêu thích`
                : "Chưa có sản phẩm yêu thích nào"}
            </p>
          </div>

          {favorites.length > 0 && (
            <div className="flex space-x-4">
              <Button
                variant="outline"
                onClick={handleClearAllFavorites}
                className="text-red-600 border-red-600 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Xóa tất cả
              </Button>
            </div>
          )}
        </div>

        {favorites.length > 0 ? (
          <>
            {/* Search Bar */}
            <div className="mb-8">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Tìm kiếm trong danh sách yêu thích..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Products Grid */}
            {filteredFavorites.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredFavorites.map((product) => (
                  <div key={product.id} className="relative group">
                    <ProductCard product={product} />

                    {/* Remove from favorites button */}
                    <button
                      onClick={() => handleRemoveFromFavorites(product.id)}
                      className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-50"
                      title="Xóa khỏi yêu thích"
                    >
                      <Heart className="w-5 h-5 text-red-500 fill-current" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Không tìm thấy sản phẩm
                </h3>
                <p className="text-gray-600 mb-6">
                  Không có sản phẩm yêu thích nào khớp với từ khóa &quot;
                  {searchTerm}&quot;
                </p>
                <Button onClick={() => setSearchTerm("")} variant="outline">
                  Xóa bộ lọc
                </Button>
              </div>
            )}

            {/* Actions */}
            <div className="mt-12 bg-gray-50 rounded-2xl p-8 text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Sẵn sàng mua sắm?
              </h3>
              <p className="text-gray-600 mb-6">
                Thêm các sản phẩm yêu thích vào giỏ hàng để tiến hành thanh toán
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/products">
                  <Button variant="outline" size="lg">
                    <Search className="w-5 h-5 mr-2" />
                    Khám phá thêm sản phẩm
                  </Button>
                </Link>
                <Link href="/cart">
                  <Button size="lg">
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Xem giỏ hàng
                  </Button>
                </Link>
              </div>
            </div>
          </>
        ) : (
          /* Empty State */
          <div className="text-center py-16">
            <div className="relative inline-block">
              <Heart className="w-24 h-24 text-gray-300 mx-auto mb-6" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <span className="text-gray-400 text-xl">?</span>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Chưa có sản phẩm yêu thích
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Hãy thêm những sản phẩm bạn quan tâm vào danh sách yêu thích để dễ
              dàng tìm lại sau này!
            </p>

            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/products">
                  <Button size="lg">
                    <Search className="w-5 h-5 mr-2" />
                    Khám phá sản phẩm
                  </Button>
                </Link>
                <Link href="/categories">
                  <Button variant="outline" size="lg">
                    Xem theo danh mục
                  </Button>
                </Link>
              </div>

              {/* How to add favorites */}
              <div className="mt-12 bg-blue-50 rounded-2xl p-8 max-w-2xl mx-auto">
                <h3 className="text-lg font-semibold text-blue-900 mb-4">
                  💡 Cách thêm sản phẩm yêu thích
                </h3>
                <div className="text-left space-y-3 text-blue-800">
                  <div className="flex items-start">
                    <span className="bg-blue-200 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">
                      1
                    </span>
                    <p>Tìm sản phẩm bạn thích trong trang sản phẩm</p>
                  </div>
                  <div className="flex items-start">
                    <span className="bg-blue-200 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">
                      2
                    </span>
                    <p>Nhấn vào biểu tượng trái tim ❤️ trên sản phẩm</p>
                  </div>
                  <div className="flex items-start">
                    <span className="bg-blue-200 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">
                      3
                    </span>
                    <p>Sản phẩm sẽ được lưu vào danh sách yêu thích của bạn</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
