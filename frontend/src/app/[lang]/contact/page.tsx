"use client";

import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import Button from "@/components/ui/Button";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Send,
  User,
  Building,
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
    alert(
      "Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong thời gian sớm nhất."
    );
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Liên Hệ Với Chúng Tôi
              </h1>
              <p className="text-xl opacity-90 max-w-2xl mx-auto">
                Vuaxemohinh luôn sẵn sàng hỗ trợ bạn về mô hình xe và dịch vụ
                của chúng tôi
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Gửi Tin Nhắn Cho Chúng Tôi
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Họ và tên *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Nhập họ và tên của bạn"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Số điện thoại
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="0123-456-789"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Chủ đề *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Chủ đề cần tư vấn"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Nội dung *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Nội dung tin nhắn của bạn..."
                  />
                </div>

                <Button type="submit" className="w-full">
                  <Send className="h-4 w-4 mr-2" />
                  Gửi Tin Nhắn
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              {/* Contact Methods */}
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Thông Tin Liên Hệ
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full">
                      <Phone className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Hotline
                      </h3>
                      <p className="text-gray-600">0123-456-789</p>
                      <p className="text-sm text-gray-500">Hoạt động 24/7</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full">
                      <Mail className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Email
                      </h3>
                      <p className="text-gray-600">support@vuaxemohinh.com</p>
                      <p className="text-sm text-gray-500">
                        Phản hồi trong 24h
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full">
                      <MapPin className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Địa chỉ
                      </h3>
                      <p className="text-gray-600">
                        CT6 Kien Hung, Ha Dong
                        <br />
                        Hanoi, Vietnam
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full">
                      <Clock className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Giờ làm việc
                      </h3>
                      <p className="text-gray-600">
                        Thứ 2 - Thứ 6: 8:00 - 18:00
                        <br />
                        Thứ 7 - CN: 9:00 - 17:00
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Team Contact */}
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Ban Lãnh Đạo
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full">
                      <User className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Mr. Loi
                      </h3>
                      <p className="text-blue-600 font-medium">CTO & Founder</p>
                      <p className="text-sm text-gray-600">
                        loi@vuaxemohinh.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full">
                      <Building className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Phòng Kinh Doanh
                      </h3>
                      <p className="text-green-600 font-medium">
                        Business Development
                      </p>
                      <p className="text-sm text-gray-600">
                        business@vuaxemohinh.com
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Kết Nối Với Chúng Tôi
                </h2>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                  >
                    📘
                  </a>
                  <a
                    href="#"
                    className="flex items-center justify-center w-12 h-12 bg-blue-400 text-white rounded-full hover:bg-blue-500 transition-colors"
                  >
                    🐦
                  </a>
                  <a
                    href="#"
                    className="flex items-center justify-center w-12 h-12 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors"
                  >
                    📷
                  </a>
                  <a
                    href="#"
                    className="flex items-center justify-center w-12 h-12 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                  >
                    📺
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
