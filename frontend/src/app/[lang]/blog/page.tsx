"use client";

import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import Button from "@/components/ui/Button";
import {
  Calendar,
  User,
  Tag,
  Eye,
  ArrowRight,
  Search,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const blogPosts = [
    {
      id: 1,
      title: "Top 10 Mô Hình Xe Thể Thao Được Yêu Thích Nhất 2024",
      excerpt:
        "Khám phá những mô hình xe thể thao hot nhất năm 2024 với độ chi tiết tuyệt vời và giá cả hợp lý.",
      image: "/blog-1.jpg",
      author: "Mr. Loi",
      date: "2024-03-15",
      category: "Xe Thể Thao",
      views: 1250,
      tags: ["Ferrari", "Lamborghini", "Porsche"],
    },
    {
      id: 2,
      title: "Hướng Dẫn Bảo Quản Mô Hình Xe Đúng Cách",
      excerpt:
        "Các tips và tricks để giữ cho bộ sưu tập mô hình xe của bạn luôn như mới.",
      image: "/blog-2.jpg",
      author: "Admin",
      date: "2024-03-10",
      category: "Hướng Dẫn",
      views: 890,
      tags: ["Bảo quản", "Tips", "Chăm sóc"],
    },
    {
      id: 3,
      title: "Lịch Sử Phát Triển Của Các Hãng Xe Nổi Tiếng",
      excerpt:
        "Tìm hiểu về lịch sử và câu chuyện đằng sau những thương hiệu xe hơi danh tiếng thế giới.",
      image: "/blog-3.jpg",
      author: "Mr. Loi",
      date: "2024-03-05",
      category: "Lịch Sử",
      views: 2100,
      tags: ["BMW", "Mercedes", "Audi"],
    },
    {
      id: 4,
      title: "Xu Hướng Mô Hình Xe Điện Năm 2024",
      excerpt:
        "Khám phá những mô hình xe điện mới nhất và xu hướng tương lai của ngành công nghiệp ô tô.",
      image: "/blog-4.jpg",
      author: "Admin",
      date: "2024-02-28",
      category: "Công Nghệ",
      views: 1560,
      tags: ["Tesla", "BMW i", "Xe điện"],
    },
    {
      id: 5,
      title: "Bộ Sưu Tập Xe Cổ Điển Đáng Mơ Ước",
      excerpt:
        "Những mô hình xe cổ điển kinh điển mà mọi collector đều mong muốn sở hữu.",
      image: "/blog-5.jpg",
      author: "Mr. Loi",
      date: "2024-02-20",
      category: "Xe Cổ Điển",
      views: 1850,
      tags: ["Mustang", "Camaro", "Cổ điển"],
    },
    {
      id: 6,
      title: "So Sánh Chất Lượng Các Thương Hiệu Mô Hình",
      excerpt:
        "Đánh giá chi tiết về chất lượng và độ chi tiết của các thương hiệu mô hình xe hàng đầu.",
      image: "/blog-6.jpg",
      author: "Admin",
      date: "2024-02-15",
      category: "Review",
      views: 1320,
      tags: ["Maisto", "Bburago", "Hot Wheels"],
    },
  ];

  const categories = [
    { name: "Tất cả", count: 24 },
    { name: "Xe Thể Thao", count: 8 },
    { name: "Hướng Dẫn", count: 6 },
    { name: "Lịch Sử", count: 4 },
    { name: "Công Nghệ", count: 3 },
    { name: "Review", count: 3 },
  ];

  const popularTags = [
    "Ferrari",
    "Lamborghini",
    "Porsche",
    "BMW",
    "Mercedes",
    "Audi",
    "Tesla",
    "Tips",
    "Bảo quản",
    "Collector",
  ];

  const filteredPosts = blogPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Blog Vuaxemohinh
              </h1>
              <p className="text-xl opacity-90 max-w-2xl mx-auto">
                Khám phá thế giới mô hình xe qua những bài viết chuyên sâu và
                hướng dẫn hữu ích
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Search Bar */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm bài viết..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Blog Posts Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredPosts.map((post) => (
                  <article
                    key={post.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="relative h-48 bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
                      <span className="text-white text-4xl">🏎️</span>
                      <div className="absolute top-4 left-4">
                        <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                        {post.title}
                      </h2>

                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center">
                            <User className="h-4 w-4 mr-1" />
                            {post.author}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {new Date(post.date).toLocaleDateString("vi-VN")}
                          </div>
                          <div className="flex items-center">
                            <Eye className="h-4 w-4 mr-1" />
                            {post.views}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>

                      <Link
                        href={`/blog/${post.id}`}
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Đọc thêm
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center mt-12">
                <div className="flex space-x-2">
                  <Button variant="outline" disabled>
                    Trước
                  </Button>
                  <Button className="bg-blue-600 text-white">1</Button>
                  <Button variant="outline">2</Button>
                  <Button variant="outline">3</Button>
                  <Button variant="outline">Sau</Button>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Categories */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Danh Mục
                </h3>
                <ul className="space-y-2">
                  {categories.map((category, index) => (
                    <li key={index}>
                      <a
                        href="#"
                        className="flex items-center justify-between text-gray-600 hover:text-blue-600 transition-colors"
                      >
                        <span>{category.name}</span>
                        <span className="bg-gray-100 text-gray-500 px-2 py-1 rounded text-xs">
                          {category.count}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Popular Posts */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
                  Bài Viết Phổ Biến
                </h3>
                <div className="space-y-4">
                  {blogPosts.slice(0, 3).map((post) => (
                    <div key={post.id} className="flex items-start space-x-3">
                      <div className="w-16 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-sm">🏎️</span>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 line-clamp-2 mb-1">
                          {post.title}
                        </h4>
                        <div className="flex items-center text-xs text-gray-500">
                          <Eye className="h-3 w-3 mr-1" />
                          {post.views}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <Tag className="h-5 w-5 mr-2 text-blue-600" />
                  Tags Phổ Biến
                </h3>
                <div className="flex flex-wrap gap-2">
                  {popularTags.map((tag, index) => (
                    <a
                      key={index}
                      href="#"
                      className="bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-700 px-3 py-1 rounded-full text-sm transition-colors"
                    >
                      #{tag}
                    </a>
                  ))}
                </div>
              </div>

              {/* Newsletter */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg p-6">
                <h3 className="text-lg font-bold mb-4">Đăng Ký Newsletter</h3>
                <p className="text-sm opacity-90 mb-4">
                  Nhận thông tin về bài viết mới và khuyến mãi đặc biệt
                </p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Email của bạn"
                    className="w-full px-3 py-2 rounded text-gray-900 focus:outline-none"
                  />
                  <Button className="w-full bg-white text-blue-600 hover:bg-gray-100">
                    Đăng Ký
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
