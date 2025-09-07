"use client";

import React from "react";
import Layout from "@/components/layout/Layout";
import {
  Shield,
  Clock,
  Wrench,
  CheckCircle,
  AlertTriangle,
  Package,
  FileText,
  Phone,
  Award,
} from "lucide-react";

export default function WarrantyPage() {
  const warrantyTypes = [
    {
      type: "Bảo Hành Cơ Bản",
      duration: "6 tháng",
      coverage: "Lỗi sản xuất, hư hỏng trong quá trình vận chuyển",
      icon: Shield,
      color: "blue",
    },
    {
      type: "Bảo Hành Mở Rộng",
      duration: "12 tháng",
      coverage: "Bảo hành cơ bản + hỗ trợ kỹ thuật, thay thế phụ kiện",
      icon: Award,
      color: "green",
    },
    {
      type: "Bảo Hành VIP",
      duration: "24 tháng",
      coverage: "Toàn diện + đổi mới trong 30 ngày đầu",
      icon: Package,
      color: "purple",
    },
  ];

  const warrantyProcess = [
    {
      step: 1,
      title: "Kiểm tra thông tin",
      description: "Cung cấp mã sản phẩm và thông tin đơn hàng",
      icon: FileText,
    },
    {
      step: 2,
      title: "Đánh giá tình trạng",
      description: "Chúng tôi sẽ kiểm tra và đánh giá tình trạng sản phẩm",
      icon: Wrench,
    },
    {
      step: 3,
      title: "Xử lý bảo hành",
      description: "Sửa chữa, thay thế hoặc hoàn tiền theo chính sách",
      icon: CheckCircle,
    },
    {
      step: 4,
      title: "Giao hàng",
      description: "Giao sản phẩm đã được bảo hành về tay khách hàng",
      icon: Package,
    },
  ];

  const coveredIssues = [
    "Lỗi sản xuất từ nhà máy",
    "Hư hỏng trong quá trình vận chuyển",
    "Lỗi màu sơn, decal bong tróc",
    "Khớp nối bị lỏng hoặc gãy",
    "Bánh xe không quay được",
    "Cửa xe không đóng/mở được",
    "Phụ kiện bị thiếu hoặc lỏng",
    "Lỗi điện tử (nếu có)",
  ];

  const notCovered = [
    "Hư hỏng do va đập, rơi vỡ",
    "Hư hỏng do sử dụng sai cách",
    "Hao mòn tự nhiên theo thời gian",
    "Sản phẩm đã qua sửa chữa bởi bên thứ 3",
    "Hư hỏng do tiếp xúc với nước/hóa chất",
    "Mất hoặc thất lạc sản phẩm",
    "Hư hỏng do cháy nổ, thiên tai",
    "Quá thời hạn bảo hành",
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Chính Sách Bảo Hành
              </h1>
              <p className="text-xl opacity-90 max-w-2xl mx-auto">
                Vuaxemohinh cam kết bảo vệ đầu tư của bạn với chính sách bảo
                hành toàn diện
              </p>
            </div>
          </div>
        </div>

        {/* Warranty Types */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Các Gói Bảo Hành
              </h2>
              <p className="text-lg text-gray-600">
                Chọn gói bảo hành phù hợp với nhu cầu của bạn
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {warrantyTypes.map((warranty, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-shadow"
                >
                  <div
                    className={`flex items-center justify-center w-16 h-16 bg-${warranty.color}-100 rounded-full mb-6 mx-auto`}
                  >
                    <warranty.icon
                      className={`h-8 w-8 text-${warranty.color}-600`}
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {warranty.type}
                  </h3>
                  <div className="mb-4">
                    <span
                      className={`text-3xl font-bold text-${warranty.color}-600`}
                    >
                      {warranty.duration}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-6">{warranty.coverage}</p>
                  <div
                    className={`bg-${warranty.color}-50 border border-${warranty.color}-200 rounded-lg p-4`}
                  >
                    <p
                      className={`text-${warranty.color}-800 font-medium text-sm`}
                    >
                      {warranty.type === "Bảo Hành Cơ Bản"
                        ? "Miễn phí cho tất cả sản phẩm"
                        : warranty.type === "Bảo Hành Mở Rộng"
                        ? "Phí: 10% giá trị sản phẩm"
                        : "Phí: 15% giá trị sản phẩm"}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Warranty Process */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Quy Trình Bảo Hành
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {warrantyProcess.map((step, index) => (
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

            {/* Coverage Details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
              {/* Covered Issues */}
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <CheckCircle className="h-6 w-6 text-green-600 mr-2" />
                  Những Gì Được Bảo Hành
                </h2>
                <ul className="space-y-3">
                  {coveredIssues.map((issue, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <span className="text-gray-700">{issue}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Not Covered */}
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <AlertTriangle className="h-6 w-6 text-red-600 mr-2" />
                  Những Gì Không Được Bảo Hành
                </h2>
                <ul className="space-y-3">
                  {notCovered.map((issue, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                      <span className="text-gray-700">{issue}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Important Notes */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Clock className="h-6 w-6 text-orange-600 mr-2" />
                Lưu Ý Quan Trọng
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Thời Gian Xử Lý
                    </h3>
                    <p className="text-gray-700 text-sm">
                      3-7 ngày làm việc cho sửa chữa thông thường
                      <br />
                      1-3 ngày cho thay thế sản phẩm
                    </p>
                  </div>
                  <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Giữ Hóa Đơn
                    </h3>
                    <p className="text-gray-700 text-sm">
                      Bắt buộc phải có hóa đơn mua hàng hoặc email xác nhận đơn
                      hàng
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-purple-50 border-l-4 border-purple-500 rounded">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Vận Chuyển
                    </h3>
                    <p className="text-gray-700 text-sm">
                      Miễn phí vận chuyển 2 chiều cho tất cả trường hợp bảo hành
                    </p>
                  </div>
                  <div className="p-4 bg-orange-50 border-l-4 border-orange-500 rounded">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Thay Thế
                    </h3>
                    <p className="text-gray-700 text-sm">
                      Nếu không sửa được, chúng tôi sẽ thay thế bằng sản phẩm
                      tương đương
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Warranty Registration */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg p-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-4">Đăng Ký Bảo Hành</h2>
                <p className="text-xl mb-6 opacity-90">
                  Đăng ký bảo hành ngay để được hỗ trợ tốt nhất
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <FileText className="h-6 w-6" />
                    </div>
                    <h3 className="font-semibold mb-2">Online</h3>
                    <p className="text-sm opacity-90">Đăng ký qua website</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Phone className="h-6 w-6" />
                    </div>
                    <h3 className="font-semibold mb-2">Hotline</h3>
                    <p className="text-sm opacity-90">Gọi 0123-456-789</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Package className="h-6 w-6" />
                    </div>
                    <h3 className="font-semibold mb-2">Tự Động</h3>
                    <p className="text-sm opacity-90">Khi nhận hàng</p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="/warranty-registration"
                    className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                  >
                    📝 Đăng Ký Bảo Hành
                  </a>
                  <a
                    href="/warranty-check"
                    className="bg-transparent border-2 border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
                  >
                    🔍 Kiểm Tra Bảo Hành
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Cần Hỗ Trợ Bảo Hành?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Liên hệ với chúng tôi để được hỗ trợ nhanh chóng
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:0342429911"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                📞 Hotline: 0123-456-789
              </a>
              <a
                href="mailto:warranty@vuaxemohinh.com"
                className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
              >
                ✉️ warranty@vuaxemohinh.com
              </a>
            </div>
            <p className="mt-6 text-gray-500">
              Phụ trách bảo hành: <strong>Mr. Loi</strong> - CTO & Founder
              <br />
              Thời gian hỗ trợ: 8:00 - 20:00 (Thứ 2 - Chủ nhật)
            </p>
          </div>
        </section>
      </div>
    </Layout>
  );
}
