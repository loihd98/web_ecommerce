"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setProducts,
  setCategories,
  setFeaturedProducts,
} from "@/store/productsSlice";
import ProductCard from "@/components/products/ProductCard";
import Button from "@/components/ui/Button";
import { Product, Category } from "@/types";
import {
  ChevronRight,
  Truck,
  Shield,
  RefreshCw,
  Headphones,
} from "lucide-react";

export default function Home() {
  const dispatch = useAppDispatch();
  const { products, categories, featuredProducts } = useAppSelector(
    (state) => state.products
  );
  const [loading, setLoading] = useState(true);

  // Mock data for demo
  useEffect(() => {
    const mockCategories: Category[] = [
      {
        id: 1,
        name: "Điện thoại",
        description: "Smartphone mới nhất",
        image: "/category-phone.jpg",
        isActive: true,
        createdAt: "2025-01-01",
        updatedAt: "2025-01-01",
      },
      {
        id: 2,
        name: "Laptop",
        description: "Máy tính xách tay",
        image: "/category-laptop.jpg",
        isActive: true,
        createdAt: "2025-01-01",
        updatedAt: "2025-01-01",
      },
      {
        id: 3,
        name: "Thời trang",
        description: "Quần áo thời trang",
        image: "/category-fashion.jpg",
        isActive: true,
        createdAt: "2025-01-01",
        updatedAt: "2025-01-01",
      },
      {
        id: 4,
        name: "Gia dụng",
        description: "Đồ gia dụng",
        image: "/category-home.jpg",
        isActive: true,
        createdAt: "2025-01-01",
        updatedAt: "2025-01-01",
      },
    ];

    const mockProducts: Product[] = [
      {
        id: 1,
        name: "iPhone 15 Pro Max 256GB",
        description: "Điện thoại iPhone mới nhất với camera tiên tiến",
        price: 29990000,
        discountPrice: 27990000,
        stock: 15,
        images: ["/placeholder-product.jpg"],
        categoryId: 1,
        category: mockCategories[0],
        isActive: true,
        isFeatured: true,
        tags: ["apple", "iphone", "smartphone"],
        sku: "IP15PM256",
        weight: 0.22,
        attributes: { color: "Titan Tự Nhiên", storage: "256GB" },
        createdAt: "2025-01-01",
        updatedAt: "2025-01-01",
      },
      {
        id: 2,
        name: "MacBook Air M3 13 inch",
        description: "Laptop MacBook Air với chip M3 mạnh mẽ",
        price: 28990000,
        stock: 8,
        images: ["/placeholder-product.jpg"],
        categoryId: 2,
        category: mockCategories[1],
        isActive: true,
        isFeatured: true,
        tags: ["apple", "macbook", "laptop"],
        sku: "MBAM313",
        weight: 1.24,
        attributes: { color: "Xám", memory: "8GB", storage: "256GB" },
        createdAt: "2025-01-01",
        updatedAt: "2025-01-01",
      },
      {
        id: 3,
        name: "Áo thun Premium Cotton",
        description: "Áo thun cao cấp chất liệu cotton 100%",
        price: 299000,
        discountPrice: 199000,
        stock: 50,
        images: ["/placeholder-product.jpg"],
        categoryId: 3,
        category: mockCategories[2],
        isActive: true,
        isFeatured: false,
        tags: ["fashion", "cotton", "tshirt"],
        sku: "AT001",
        weight: 0.2,
        attributes: { size: "M", color: "Trắng", material: "Cotton 100%" },
        createdAt: "2025-01-01",
        updatedAt: "2025-01-01",
      },
      {
        id: 4,
        name: "Nồi cơm điện Panasonic 1.8L",
        description: "Nồi cơm điện cao cấp với công nghệ nấu thông minh",
        price: 2990000,
        discountPrice: 2490000,
        stock: 25,
        images: ["/placeholder-product.jpg"],
        categoryId: 4,
        category: mockCategories[3],
        isActive: true,
        isFeatured: true,
        tags: ["home", "kitchen", "rice-cooker"],
        sku: "RC18P",
        weight: 3.5,
        attributes: { capacity: "1.8L", brand: "Panasonic" },
        createdAt: "2025-01-01",
        updatedAt: "2025-01-01",
      },
    ];

    // Simulate API call
    setTimeout(() => {
      dispatch(setCategories(mockCategories));
      dispatch(setProducts(mockProducts));
      dispatch(setFeaturedProducts(mockProducts.filter((p) => p.isFeatured)));
      setLoading(false);
    }, 1000);
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                Mua sắm thông minh,
                <br />
                <span className="text-yellow-400">tiết kiệm hơn</span>
              </h1>
              <p className="text-xl mb-8 text-gray-100">
                Khám phá hàng nghìn sản phẩm chất lượng với giá tốt nhất. Giao
                hàng nhanh, đổi trả dễ dàng.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Button
                  size="lg"
                  className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
                >
                  Mua sắm ngay
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-blue-600"
                >
                  Xem danh mục
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="relative z-10 bg-white bg-opacity-10 rounded-2xl p-8">
                <div className="text-center">
                  <div className="text-6xl mb-4">🛒</div>
                  <h3 className="text-2xl font-bold mb-2">EComShop</h3>
                  <p className="text-blue-100">
                    Mua sắm trực tuyến #1 Việt Nam
                  </p>
                </div>
              </div>
              {/* Floating elements */}
              <div className="absolute top-10 right-10 bg-white p-4 rounded-xl shadow-lg animate-bounce">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">50%</div>
                  <div className="text-sm text-gray-600">Giảm giá</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Giao hàng miễn phí</h3>
              <p className="text-gray-600">
                Miễn phí vận chuyển cho đơn hàng trên 500K
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Thanh toán an toàn</h3>
              <p className="text-gray-600">
                Bảo mật thông tin 100% với công nghệ SSL
              </p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <RefreshCw className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Đổi trả 30 ngày</h3>
              <p className="text-gray-600">
                Đổi trả miễn phí trong vòng 30 ngày
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Headphones className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Hỗ trợ 24/7</h3>
              <p className="text-gray-600">Tư vấn và hỗ trợ khách hàng 24/7</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Danh mục sản phẩm
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Khám phá các danh mục sản phẩm đa dạng với hàng nghìn lựa chọn phù
              hợp cho mọi nhu cầu
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.id}`}
                className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
              >
                <div className="aspect-square relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white text-4xl">📱</span>
                  </div>
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {category.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Sản phẩm nổi bật
              </h2>
              <p className="text-gray-600">
                Những sản phẩm được yêu thích nhất
              </p>
            </div>
            <Link href="/products" className="hidden sm:block">
              <Button variant="outline">
                Xem tất cả
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="bg-gray-200 rounded-xl h-80 animate-pulse"
                ></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          <div className="text-center mt-8 sm:hidden">
            <Link href="/products">
              <Button variant="outline">
                Xem tất cả sản phẩm
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Đăng ký nhận tin khuyến mãi
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Hãy là người đầu tiên biết về các sản phẩm mới và ưu đãi đặc biệt từ
            chúng tôi
          </p>
          <div className="max-w-md mx-auto flex">
            <input
              type="email"
              placeholder="Nhập email của bạn"
              className="flex-1 px-4 py-3 rounded-l-lg border-0 text-gray-900 focus:ring-2 focus:ring-yellow-400"
            />
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-3 rounded-r-lg rounded-l-none">
              Đăng ký
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
