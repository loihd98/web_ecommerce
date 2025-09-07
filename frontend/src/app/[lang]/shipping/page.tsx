"use client";

import React from "react";
import Layout from "@/components/layout/Layout";
import {
  Truck,
  Clock,
  Shield,
  MapPin,
  Package,
  CheckCircle,
} from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

export default function ShippingPage() {
  const { t } = useTranslation();

  const shippingMethods = [
    {
      icon: Truck,
      name: "Giao hàng tiêu chuẩn",
      time: "3-5 ngày làm việc",
      price: "30.000đ",
      description: "Phù hợp cho đơn hàng thông thường",
    },
    {
      icon: Clock,
      name: "Giao hàng nhanh",
      time: "1-2 ngày làm việc",
      price: "50.000đ",
      description: "Giao hàng nhanh trong nội thành",
    },
    {
      icon: Shield,
      name: "Giao hàng VIP",
      time: "Trong ngày",
      price: "100.000đ",
      description: "Giao hàng trong ngày cho đơn hàng khẩn cấp",
    },
  ];

  const features = [
    {
      icon: Package,
      title: "Đóng gói an toàn",
      description:
        "Mô hình xe được đóng gói cẩn thận với vật liệu chống sốc chuyên dụng",
    },
    {
      icon: CheckCircle,
      title: "Kiểm tra chất lượng",
      description:
        "Mỗi sản phẩm đều được kiểm tra kỹ lưỡng trước khi giao hàng",
    },
    {
      icon: MapPin,
      title: "Theo dõi đơn hàng",
      description: "Cập nhật tình trạng giao hàng real-time qua SMS và email",
    },
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Chính Sách Giao Hàng
              </h1>
              <p className="text-xl opacity-90 max-w-2xl mx-auto">
                Vuaxemohinh cam kết giao hàng nhanh chóng, an toàn cho tất cả mô
                hình xe yêu thích của bạn
              </p>
            </div>
          </div>
        </div>

        {/* Shipping Methods */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Phương Thức Giao Hàng
              </h2>
              <p className="text-lg text-gray-600">
                Chọn phương thức giao hàng phù hợp với nhu cầu của bạn
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {shippingMethods.map((method, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4 mx-auto">
                    <method.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">
                    {method.name}
                  </h3>
                  <div className="text-center mb-4">
                    <span className="text-2xl font-bold text-blue-600">
                      {method.price}
                    </span>
                    <p className="text-gray-600">{method.time}</p>
                  </div>
                  <p className="text-gray-600 text-center">
                    {method.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Cam Kết Của Chúng Tôi
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="text-center">
                  <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4 mx-auto">
                    <feature.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Delivery Areas */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Khu Vực Giao Hàng
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  🏙️ Nội thành Hà Nội & các thành phố lớn
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Giao hàng trong ngày (đặt trước 14h)</li>
                  <li>• Miễn phí giao hàng cho đơn từ 500.000đ</li>
                  <li>• Hỗ trợ giao hàng cuối tuần</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  🌏 Toàn quốc
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Giao hàng 2-5 ngày làm việc</li>
                  <li>• Miễn phí giao hàng cho đơn từ 1.000.000đ</li>
                  <li>• Hỗ trợ giao hàng tận nhà</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Info */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Cần Hỗ Trợ Về Giao Hàng?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Liên hệ với chúng tôi để được tư vấn chi tiết
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:0342429911"
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                📞 Hotline: 0123-456-789
              </a>
              <a
                href="mailto:support@vuaxemohinh.com"
                className="bg-transparent border-2 border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                ✉️ support@vuaxemohinh.com
              </a>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
