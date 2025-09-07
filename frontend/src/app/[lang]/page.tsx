"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Layout from "@/components/layout/Layout";
import ProductCard from "@/components/products/ProductCard";
import Button from "@/components/ui/Button";
import { useTranslation } from "@/hooks/useTranslation";
import {
  ChevronRight,
  Truck,
  Shield,
  RefreshCw,
  Headphones,
} from "lucide-react";
import { apiService } from "@/services/api";

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

export default function Home() {
  const { t, createLocalizedPath } = useTranslation();
  const [categories, setCategories] = useState<Category[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch categories and featured products in parallel
        const [categoriesData, featuredProductsData] = await Promise.all([
          apiService.getCategories(),
          apiService.getFeaturedProducts(),
        ]);

        setCategories(categoriesData);
        setFeaturedProducts(featuredProductsData);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Keep empty arrays as fallback
        setCategories([]);
        setFeaturedProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-red-500 via-yellow-400 to-blue-500 dark:from-red-600 dark:via-yellow-500 dark:to-blue-600 text-white overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent dark:from-black/40"></div>
          {/* Car pattern background */}
          <div className="absolute inset-0 opacity-10">
            <div className="grid grid-cols-8 gap-2 h-full">
              {Array.from({ length: 32 }).map((_, i) => (
                <div key={i} className="bg-white rounded-lg opacity-20"></div>
              ))}
            </div>
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h1 className="text-4xl lg:text-6xl font-bold mb-6 lego-text">
                  <span className="text-white drop-shadow-lg">
                    {t("hero.title.part1")}
                  </span>
                  <br />
                  <span className="lego-title drop-shadow-lg">
                    {t("hero.title.part2")}
                  </span>
                </h1>
                <p className="text-xl mb-8 text-gray-100 drop-shadow">
                  {t("hero.subtitle")}
                </p>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <Link href={createLocalizedPath("/products")}>
                    <button className="lego-btn lego-btn-yellow">
                      {t("hero.shopNow")}
                      <ChevronRight className="ml-2 h-5 w-5 inline" />
                    </button>
                  </Link>
                  <Link href={createLocalizedPath("/categories")}>
                    <button className="lego-btn">
                      {t("hero.viewCategories")}
                    </button>
                  </Link>
                </div>
              </div>
              <div className="relative">
                <div className="relative z-10 bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 lego-card lego-float">
                  <div className="text-center">
                    <div className="text-8xl mb-4 lego-icon">🏎️</div>
                    <h3 className="text-3xl font-bold mb-2 lego-text">
                      Vuaxemohinh Shop
                    </h3>
                    <p className="text-blue-100">{t("brand.tagline")}</p>
                  </div>
                </div>
                {/* Floating Car elements */}
                <div className="absolute top-10 right-10 lego-brick lego-red p-4 rounded-xl shadow-lg lego-pulse">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">�</div>
                    <div className="text-sm text-white font-semibold">NEW</div>
                  </div>
                </div>
                <div
                  className="absolute bottom-10 left-10 lego-brick lego-blue p-3 rounded-lg shadow-lg lego-float"
                  style={{ animationDelay: "1s" }}
                >
                  <div className="text-center">
                    <div className="text-lg font-bold text-white lego-icon">
                      🚗
                    </div>
                  </div>
                </div>
                <div
                  className="absolute top-1/2 right-20 lego-brick lego-green p-3 rounded-lg shadow-lg lego-float"
                  style={{ animationDelay: "2s" }}
                >
                  <div className="text-center">
                    <div className="text-lg font-bold text-white lego-icon">
                      🏎️
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center group hover:scale-105 transition-transform">
                <div className="bg-red-100 dark:bg-red-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-red-200 dark:group-hover:bg-red-900/50 transition-colors">
                  <Truck className="h-8 w-8 text-red-600 dark:text-red-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-red-600 dark:text-red-400">
                  {t("features.shipping")}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {t("features.shipping.desc")}
                </p>
              </div>
              <div className="text-center group hover:scale-105 transition-transform">
                <div className="bg-yellow-100 dark:bg-yellow-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-yellow-200 dark:group-hover:bg-yellow-900/50 transition-colors">
                  <Shield className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-yellow-600 dark:text-yellow-400">
                  {t("features.payment")}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {t("features.payment.desc")}
                </p>
              </div>
              <div className="text-center group hover:scale-105 transition-transform">
                <div className="bg-blue-100 dark:bg-blue-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50 transition-colors">
                  <RefreshCw className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-blue-600 dark:text-blue-400">
                  {t("features.returns")}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {t("features.returns.desc")}
                </p>
              </div>
              <div className="text-center group hover:scale-105 transition-transform">
                <div className="bg-green-100 dark:bg-green-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 dark:group-hover:bg-green-900/50 transition-colors">
                  <Headphones className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-green-600 dark:text-green-400">
                  {t("features.support")}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {t("features.support.desc")}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {t("section.categories")}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                {t("section.categories.desc")}
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
              {categories.map((category: Category) => (
                <Link
                  key={category.id}
                  href={createLocalizedPath(`/categories/${category.id}`)}
                  className="group bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg dark:hover:shadow-gray-900/50 transition-all duration-300 overflow-hidden transform hover:scale-105 lego-card lego-stack"
                >
                  <div className="aspect-square relative overflow-hidden">
                    <div
                      className={`absolute inset-0 lego-brick ${
                        category.name.includes("Thể Thao")
                          ? "lego-red"
                          : category.name.includes("Cổ Điển")
                          ? "lego-orange"
                          : category.name.includes("Đua")
                          ? "lego-blue"
                          : category.name.includes("Sang")
                          ? "lego-purple"
                          : category.name.includes("Tải")
                          ? "lego-green"
                          : category.name.includes("Mô Tô")
                          ? "lego-black"
                          : "lego-yellow"
                      }`}
                    ></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white text-4xl drop-shadow-lg lego-icon">
                        {category.name.includes("Technic")
                          ? "⚙️"
                          : category.name.includes("City")
                          ? "🏙️"
                          : category.name.includes("Creator")
                          ? "🎨"
                          : category.name.includes("Star Wars")
                          ? "⭐"
                          : category.name.includes("Friends")
                          ? "�"
                          : category.name.includes("Architecture")
                          ? "🏛️"
                          : "🧱"}
                      </span>
                    </div>
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors lego-text text-sm">
                      {category.name}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {category.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="py-16 bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  {t("section.featured.title")}
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  {t("section.featured.desc")}
                </p>
              </div>
              <Link
                href={createLocalizedPath("/products")}
                className="hidden sm:block"
              >
                <Button variant="outline">
                  {t("section.viewAll")}
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="bg-gray-200 dark:bg-gray-700 rounded-xl h-80 animate-pulse"
                  ></div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredProducts.map((product: Product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

            <div className="text-center mt-8 sm:hidden">
              <Link href={createLocalizedPath("/products")}>
                <Button variant="outline">
                  {t("section.viewAllProducts")}
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-16 bg-gradient-to-r from-red-500 via-yellow-400 to-blue-500 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-block bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h2 className="text-3xl font-bold mb-4">
                {t("newsletter.title")}
              </h2>
              <p className="text-white/90 mb-8 max-w-2xl mx-auto">
                {t("newsletter.desc")}
              </p>
              <div className="max-w-md mx-auto flex">
                <input
                  type="email"
                  placeholder={t("newsletter.placeholder")}
                  className="flex-1 px-4 py-3 rounded-l-lg border-0 text-gray-900 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                />
                <Button className="bg-white hover:bg-gray-100 text-red-600 font-bold px-6 py-3 rounded-r-lg rounded-l-none border-0 shadow-lg">
                  {t("newsletter.subscribe")}
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
