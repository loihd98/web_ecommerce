"use client";

import React from "react";
import Layout from "@/components/layout/Layout";
import {
  RotateCcw,
  Shield,
  Clock,
  CheckCircle,
  AlertCircle,
  Package,
  CreditCard,
  Phone,
} from "lucide-react";

export default function ReturnsPage() {
  const returnReasons = [
    "Sản phẩm bị lỗi/hư hỏng",
    "Sản phẩm không đúng mô tả",
    "Giao sai sản phẩm",
    "Không hài lòng với chất lượng",
    "Thay đổi ý muốn",
    "Khác (ghi rõ lý do)",
  ];

  const returnSteps = [
    {
      step: 1,
      title: "Liên hệ với chúng tôi",
      description: "Gọi hotline hoặc gửi email thông báo muốn đổi/trả",
      icon: Phone,
    },
    {
      step: 2,
      title: "Xác nhận thông tin",
      description: "Chúng tôi sẽ xác nhận thông tin đơn hàng và lý do đổi/trả",
      icon: CheckCircle,
    },
    {
      step: 3,
      title: "Đóng gói sản phẩm",
      description: "Đóng gói sản phẩm cẩn thận với hộp và phụ kiện đầy đủ",
      icon: Package,
    },
    {
      step: 4,
      title: "Hoàn tiền/Đổi hàng",
      description: "Xử lý hoàn tiền hoặc gửi sản phẩm mới trong 3-5 ngày",
      icon: CreditCard,
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
                Chính Sách Đổi Trả
              </h1>
              <p className="text-xl opacity-90 max-w-2xl mx-auto">
                Vuaxemohinh cam kết mang đến trải nghiệm mua sắm tốt nhất với
                chính sách đổi trả linh hoạt
              </p>
            </div>
          </div>
        </div>

        {/* Policy Overview */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4 mx-auto">
                  <Clock className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  30 Ngày Đổi Trả
                </h3>
                <p className="text-gray-600">
                  Đổi trả miễn phí trong vòng 30 ngày kể từ ngày nhận hàng
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4 mx-auto">
                  <Shield className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Bảo Hành Chất Lượng
                </h3>
                <p className="text-gray-600">
                  Đổi mới ngay lập tức nếu sản phẩm có lỗi từ nhà sản xuất
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4 mx-auto">
                  <RotateCcw className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Quy Trình Đơn Giản
                </h3>
                <p className="text-gray-600">
                  Chỉ cần liên hệ, chúng tôi sẽ hỗ trợ toàn bộ quy trình đổi trả
                </p>
              </div>
            </div>

            {/* Return Steps */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Quy Trình Đổi Trả
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {returnSteps.map((step, index) => (
                  <div key={index} className="text-center">
                    <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4 mx-auto">
                      <step.icon className="h-8 w-8 text-blue-600" />
                    </div>
                    <div className="mb-4">
                      <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full text-sm font-bold">
                        {step.step}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Conditions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Return Conditions */}
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <CheckCircle className="h-6 w-6 text-green-600 mr-2" />
                  Điều Kiện Đổi Trả
                </h2>
                <ul className="space-y-4">
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <span className="text-gray-700">
                      Sản phẩm còn nguyên vẹn, chưa sử dụng
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <span className="text-gray-700">
                      Còn đầy đủ hộp, phụ kiện, và nhãn mác gốc
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <span className="text-gray-700">
                      Có hóa đơn mua hàng hoặc mã đơn hàng
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <span className="text-gray-700">
                      Thực hiện trong vòng 30 ngày kể từ ngày nhận hàng
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <span className="text-gray-700">
                      Mô hình không bị hư hỏng do người dùng
                    </span>
                  </li>
                </ul>
              </div>

              {/* Non-returnable Items */}
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <AlertCircle className="h-6 w-6 text-red-600 mr-2" />
                  Sản Phẩm Không Đổi Trả
                </h2>
                <ul className="space-y-4">
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                    <span className="text-gray-700">
                      Sản phẩm đã bị hư hỏng do người dùng
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                    <span className="text-gray-700">
                      Mô hình đặc biệt theo yêu cầu riêng
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                    <span className="text-gray-700">
                      Sản phẩm giảm giá trên 50%
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                    <span className="text-gray-700">
                      Quá thời hạn 30 ngày đổi trả
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Return Reasons */}
            <div className="bg-white rounded-lg shadow-lg p-8 mt-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Lý Do Đổi Trả Thường Gặp
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {returnReasons.map((reason, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700">{reason}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Cần Hỗ Trợ Đổi Trả?</h2>
            <p className="text-xl mb-8 opacity-90">
              Đội ngũ chăm sóc khách hàng của chúng tôi luôn sẵn sàng hỗ trợ bạn
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:0342429911"
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                📞 Hotline: 0123-456-789
              </a>
              <a
                href="mailto:returns@vuaxemohinh.com"
                className="bg-transparent border-2 border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                ✉️ returns@vuaxemohinh.com
              </a>
            </div>
            <p className="mt-6 text-sm opacity-80">
              Thời gian hỗ trợ: Thứ 2 - Chủ nhật, 8:00 - 22:00
            </p>
          </div>
        </section>
      </div>
    </Layout>
  );
}
