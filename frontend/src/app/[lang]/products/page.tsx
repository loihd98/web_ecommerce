"use client";

import React, { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import ProductCard from "@/components/products/ProductCard";
import { Card, CardContent } from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { Search, Filter, Grid, List, ChevronDown } from "lucide-react";
import { apiService } from "@/services/api";
import { useTranslation } from "@/hooks/useTranslation";

interface Category {
  id: number;
  name: string;
  description: string;
  image: string;
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
  category: Category;
  isActive: boolean;
  isFeatured: boolean;
  tags: string[];
  sku: string;
  weight: number;
  attributes: Record<string, string | number>;
  createdAt: string;
  updatedAt: string;
}

export default function ProductsPage() {
  const { t } = useTranslation();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState("name");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100000000 });

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
        // Keep empty arrays as fallback
        setCategories([]);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  // Filter products based on search, category, and price range
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === null || product.categoryId === selectedCategory;
    const matchesPrice =
      product.price >= priceRange.min && product.price <= priceRange.max;

    return matchesSearch && matchesCategory && matchesPrice;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "name":
        return a.name.localeCompare(b.name);
      case "newest":
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      default:
        return 0;
    }
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    <Layout>
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {t("products.title")}
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              {t("products.found")} {filteredProducts.length}{" "}
              {t("products.items")}
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="lg:grid lg:grid-cols-4 lg:gap-8">
            {/* Sidebar Filters */}
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                    {t("products.search")}
                  </h3>
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder={t("products.searchPlaceholder")}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                    <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                    {t("products.categories")}
                  </h3>
                  <div className="space-y-2">
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                        selectedCategory === null
                          ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
                          : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100"
                      }`}
                    >
                      {t("products.allCategories")}
                    </button>
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                          selectedCategory === category.id
                            ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
                            : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100"
                        }`}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                    {t("products.priceRange")}
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {t("products.from")}
                      </label>
                      <Input
                        type="number"
                        value={priceRange.min}
                        onChange={(e) =>
                          setPriceRange((prev) => ({
                            ...prev,
                            min: Number(e.target.value),
                          }))
                        }
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {t("products.to")}
                      </label>
                      <Input
                        type="number"
                        value={priceRange.max}
                        onChange={(e) =>
                          setPriceRange((prev) => ({
                            ...prev,
                            max: Number(e.target.value),
                          }))
                        }
                        placeholder="100000000"
                      />
                    </div>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => setPriceRange({ min: 0, max: 100000000 })}
                    >
                      {t("products.reset")}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="mt-6 lg:mt-0 lg:col-span-3">
              {/* Toolbar */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Filter className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {t("products.sortBy")}:
                      </span>
                    </div>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-1 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                    >
                      <option value="name">{t("products.sortName")}</option>
                      <option value="price-low">
                        {t("products.sortPriceLow")}
                      </option>
                      <option value="price-high">
                        {t("products.sortPriceHigh")}
                      </option>
                      <option value="newest">{t("products.sortNewest")}</option>
                    </select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {t("products.display")}:
                    </span>
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-2 rounded-md transition-colors ${
                        viewMode === "grid"
                          ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                          : "text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
                      }`}
                    >
                      <Grid className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-2 rounded-md transition-colors ${
                        viewMode === "list"
                          ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                          : "text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
                      }`}
                    >
                      <List className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Products Grid/List */}
              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div
                      key={i}
                      className="bg-gray-200 dark:bg-gray-700 rounded-xl h-80 animate-pulse"
                    ></div>
                  ))}
                </div>
              ) : (
                <div
                  className={
                    viewMode === "grid"
                      ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                      : "space-y-6"
                  }
                >
                  {sortedProducts.length > 0 ? (
                    sortedProducts.map((product: Product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        viewMode={viewMode}
                      />
                    ))
                  ) : (
                    <div className="col-span-full text-center py-12">
                      <div className="text-gray-400 dark:text-gray-500 text-6xl mb-4">
                        🔍
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                        {t("products.noProducts")}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {t("products.noProductsDesc")}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
