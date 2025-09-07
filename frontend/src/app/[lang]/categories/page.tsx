"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Layout from "@/components/layout/Layout";
import ProductCard from "@/components/products/ProductCard";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { Search, Grid, List, ChevronRight } from "lucide-react";
import { apiService } from "@/services/api";

interface Category {
  id: number;
  name: string;
  description: string;
  image?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  stock: number;
  images: string[];
  categoryId: number;
  category?: Category;
  isActive: boolean;
  isFeatured: boolean;
  sku: string;
  tags: string[];
  weight: number;
  attributes: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch categories and products in parallel
        const [categoriesData, productsData] = await Promise.all([
          apiService.getCategories(),
          apiService.getProducts(),
        ]);

        setCategories(categoriesData);
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setCategories([]);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter categories and products based on search
  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === null || product.categoryId === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const getCategoryIcon = (categoryName: string) => {
    switch (categoryName) {
      case "Điện thoại":
        return "📱";
      case "Laptop":
        return "💻";
      case "Thời trang":
        return "👕";
      case "Gia dụng":
        return "🏠";
      case "Sách":
        return "📚";
      default:
        return "📦";
    }
  };

  const getProductCountByCategory = (categoryId: number) => {
    return products.filter((product) => product.categoryId === categoryId)
      .length;
  };

  if (loading) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 rounded w-1/4 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto mb-8"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-gray-300 rounded-lg h-64 animate-pulse"
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
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Danh Mục Sản Phẩm
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Khám phá các danh mục sản phẩm đa dạng với hàng nghìn lựa chọn phù
            hợp cho mọi nhu cầu
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Tìm kiếm danh mục hoặc sản phẩm..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex items-center gap-4">
              <div className="flex border rounded-lg">
                <Button
                  variant={viewMode === "grid" ? "primary" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none"
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "primary" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none border-l-0"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Categories Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Danh Mục</h2>
            <Button
              variant="outline"
              onClick={() => setSelectedCategory(null)}
              className={
                selectedCategory === null ? "bg-blue-50 border-blue-500" : ""
              }
            >
              Tất cả
            </Button>
          </div>

          <div
            className={`grid gap-6 ${
              viewMode === "grid"
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                : "grid-cols-1"
            }`}
          >
            {filteredCategories.map((category) => (
              <div
                key={category.id}
                className={`cursor-pointer transition-all duration-300 hover:shadow-lg border-2 rounded-lg ${
                  selectedCategory === category.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-blue-300"
                }`}
                onClick={() =>
                  setSelectedCategory(
                    selectedCategory === category.id ? null : category.id
                  )
                }
              >
                <div className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="text-4xl">
                      {getCategoryIcon(category.name)}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {category.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3">
                        {category.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-blue-600 font-medium">
                          {getProductCountByCategory(category.id)} sản phẩm
                        </span>
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Products Section */}
        {selectedCategory && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Sản phẩm trong danh mục:{" "}
                {categories.find((c) => c.id === selectedCategory)?.name}
              </h2>
              <Button
                variant="outline"
                onClick={() => setSelectedCategory(null)}
              >
                Xem tất cả danh mục
              </Button>
            </div>

            {filteredProducts.length > 0 ? (
              <div
                className={`grid gap-6 ${
                  viewMode === "grid"
                    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                    : "grid-cols-1 md:grid-cols-2"
                }`}
              >
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={{
                      ...product,
                      category: product.category ||
                        categories.find((c) => c.id === product.categoryId) || {
                          id: product.categoryId,
                          name: "Danh mục",
                          description: "",
                          isActive: true,
                          createdAt: "",
                          updatedAt: "",
                        },
                      tags: product.tags || [],
                      weight: product.weight || 0,
                      attributes: product.attributes || {},
                    }}
                    viewMode={viewMode}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📦</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Không tìm thấy sản phẩm
                </h3>
                <p className="text-gray-600 mb-6">
                  Danh mục này hiện chưa có sản phẩm nào.
                </p>
                <Button onClick={() => setSelectedCategory(null)}>
                  Xem tất cả danh mục
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Featured Categories for Homepage Link */}
        {!selectedCategory && (
          <div className="mt-16">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
              <h2 className="text-3xl font-bold mb-4">
                Khám phá thêm sản phẩm
              </h2>
              <p className="text-lg mb-6 opacity-90">
                Tìm hiểu thêm về các sản phẩm nổi bật và ưu đãi đặc biệt
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/products">
                  <Button variant="secondary" size="lg">
                    Xem tất cả sản phẩm
                  </Button>
                </Link>
                <Link href="/">
                  <Button
                    variant="outline"
                    size="lg"
                    className="text-white border-white hover:bg-white hover:text-blue-600"
                  >
                    Về trang chủ
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
