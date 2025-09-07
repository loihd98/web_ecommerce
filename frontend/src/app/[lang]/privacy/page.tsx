"use client";

import React from "react";
import Layout from "@/components/layout/Layout";
import {
  Shield,
  Lock,
  Eye,
  Users,
  Database,
  FileText,
  AlertTriangle,
  Phone,
} from "lucide-react";

export default function PrivacyPage() {
  const sections = [
    {
      id: "thu-thap",
      title: "1. Thu Thập Thông Tin",
      icon: Database,
      content: [
        "Thông tin cá nhân: Họ tên, email, số điện thoại, địa chỉ",
        "Thông tin thanh toán: Không lưu trữ thông tin thẻ tín dụng",
        "Thông tin sử dụng: Lịch sử duyệt web, sở thích mua sắm",
        "Thông tin thiết bị: IP address, loại thiết bị, trình duyệt",
      ],
    },
    {
      id: "su-dung",
      title: "2. Sử Dụng Thông Tin",
      icon: Eye,
      content: [
        "Xử lý đơn hàng và giao hàng",
        "Cung cấp dịch vụ chăm sóc khách hàng",
        "Gửi thông báo về đơn hàng và khuyến mãi",
        "Cải thiện trải nghiệm người dùng",
        "Phân tích và nghiên cứu thị trường",
      ],
    },
    {
      id: "chia-se",
      title: "3. Chia Sẻ Thông Tin",
      icon: Users,
      content: [
        "Không bán thông tin cá nhân cho bên thứ ba",
        "Chia sẻ với đối tác vận chuyển để giao hàng",
        "Chia sẻ với cơ quan pháp luật khi có yêu cầu",
        "Chia sẻ với công ty mẹ và công ty con (nếu có)",
      ],
    },
    {
      id: "bao-mat",
      title: "4. Bảo Mật Thông Tin",
      icon: Lock,
      content: [
        "Mã hóa SSL cho tất cả giao dịch",
        "Hệ thống firewall và bảo mật nhiều lớp",
        "Kiểm tra bảo mật định kỳ",
        "Đào tạo nhân viên về bảo mật thông tin",
        "Tuân thủ các tiêu chuẩn bảo mật quốc tế",
      ],
    },
  ];

  const userRights = [
    {
      title: "Quyền Truy Cập",
      description:
        "Bạn có quyền yêu cầu xem thông tin cá nhân mà chúng tôi đang lưu trữ",
    },
    {
      title: "Quyền Chỉnh Sửa",
      description:
        "Bạn có thể yêu cầu chỉnh sửa hoặc cập nhật thông tin cá nhân",
    },
    {
      title: "Quyền Xóa",
      description: "Bạn có quyền yêu cầu xóa thông tin cá nhân khỏi hệ thống",
    },
    {
      title: "Quyền Hạn Chế",
      description: "Bạn có thể yêu cầu hạn chế việc xử lý thông tin cá nhân",
    },
    {
      title: "Quyền Di Chuyển",
      description:
        "Bạn có quyền yêu cầu chuyển giao dữ liệu cho nhà cung cấp khác",
    },
    {
      title: "Quyền Phản Đối",
      description:
        "Bạn có quyền phản đối việc xử lý thông tin cho mục đích marketing",
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
                Chính Sách Bảo Mật
              </h1>
              <p className="text-xl opacity-90 max-w-2xl mx-auto">
                Vuaxemohinh cam kết bảo vệ thông tin cá nhân và quyền riêng tư
                của khách hàng
              </p>
            </div>
          </div>
        </div>

        {/* Overview */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
              <div className="text-center mb-8">
                <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4 mx-auto">
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Cam Kết Bảo Mật
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Chính sách này mô tả cách chúng tôi thu thập, sử dụng, lưu trữ
                  và bảo vệ thông tin cá nhân của bạn khi sử dụng website
                  Vuaxemohinh. Chúng tôi tuân thủ nghiêm ngặt các quy định pháp
                  luật về bảo vệ dữ liệu cá nhân.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-blue-50 rounded-lg">
                  <Lock className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Mã Hóa SSL
                  </h3>
                  <p className="text-sm text-gray-600">
                    Bảo mật 256-bit cho mọi giao dịch
                  </p>
                </div>
                <div className="text-center p-6 bg-green-50 rounded-lg">
                  <Shield className="h-8 w-8 text-green-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">
                    GDPR Compliant
                  </h3>
                  <p className="text-sm text-gray-600">
                    Tuân thủ các tiêu chuẩn quốc tế
                  </p>
                </div>
                <div className="text-center p-6 bg-purple-50 rounded-lg">
                  <Database className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Lưu Trữ An Toàn
                  </h3>
                  <p className="text-sm text-gray-600">
                    Máy chủ được bảo mật 24/7
                  </p>
                </div>
              </div>
            </div>

            {/* Privacy Sections */}
            <div className="space-y-8">
              {sections.map((section, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg p-8">
                  <div className="flex items-start space-x-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full flex-shrink-0">
                      <section.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">
                        {section.title}
                      </h3>
                      <ul className="space-y-3">
                        {section.content.map((item, itemIndex) => (
                          <li
                            key={itemIndex}
                            className="flex items-start space-x-3"
                          >
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* User Rights */}
            <div className="bg-white rounded-lg shadow-lg p-8 mt-12">
              <div className="text-center mb-8">
                <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4 mx-auto">
                  <FileText className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Quyền Của Người Dùng
                </h2>
                <p className="text-lg text-gray-600">
                  Bạn có những quyền sau đây đối với thông tin cá nhân của mình
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userRights.map((right, index) => (
                  <div
                    key={index}
                    className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      {right.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{right.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Cookies Policy */}
            <div className="bg-white rounded-lg shadow-lg p-8 mt-12">
              <div className="flex items-start space-x-4">
                <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full flex-shrink-0">
                  <AlertTriangle className="h-6 w-6 text-orange-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    5. Chính Sách Cookies
                  </h3>
                  <div className="space-y-4 text-gray-700">
                    <p>
                      Chúng tôi sử dụng cookies để cải thiện trải nghiệm người
                      dùng và phân tích lưu lượng truy cập website. Cookies là
                      các tệp văn bản nhỏ được lưu trữ trên thiết bị của bạn.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">
                          Cookies Cần Thiết
                        </h4>
                        <p className="text-sm text-gray-600">
                          Đảm bảo website hoạt động bình thường và an toàn
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">
                          Cookies Phân Tích
                        </h4>
                        <p className="text-sm text-gray-600">
                          Giúp chúng tôi hiểu cách khách hàng sử dụng website
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">
                          Cookies Marketing
                        </h4>
                        <p className="text-sm text-gray-600">
                          Hiển thị quảng cáo phù hợp với sở thích của bạn
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">
                          Cookies Chức Năng
                        </h4>
                        <p className="text-sm text-gray-600">
                          Ghi nhớ lựa chọn và cài đặt của bạn
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-white rounded-lg shadow-lg p-8 mt-12">
              <div className="text-center">
                <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4 mx-auto">
                  <Phone className="h-8 w-8 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Liên Hệ Về Bảo Mật
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Nếu bạn có câu hỏi về chính sách bảo mật hoặc muốn thực hiện
                  quyền của mình
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="mailto:privacy@vuaxemohinh.com"
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    ✉️ privacy@vuaxemohinh.com
                  </a>
                  <a
                    href="tel:0342429911"
                    className="bg-gray-100 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                  >
                    📞 0123-456-789
                  </a>
                </div>
                <p className="mt-4 text-sm text-gray-500">
                  Người phụ trách bảo mật: <strong>Mr. Loi</strong> - CTO &
                  Founder
                </p>
              </div>
            </div>

            {/* Last Updated */}
            <div className="text-center mt-8">
              <p className="text-gray-500">
                Chính sách này được cập nhật lần cuối:{" "}
                <strong>15/03/2024</strong>
              </p>
              <p className="text-sm text-gray-400 mt-2">
                Chúng tôi có thể cập nhật chính sách này theo thời gian. Mọi
                thay đổi sẽ được thông báo trước tối thiểu 30 ngày.
              </p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
