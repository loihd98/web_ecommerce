"use client";

import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import {
  HelpCircle,
  Search,
  ChevronDown,
  ChevronRight,
  Phone,
  Mail,
  MessageCircle,
  BookOpen,
  Video,
  Download,
  Clock,
  Users,
} from "lucide-react";

export default function HelpPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqCategories = [
    {
      title: "Đặt Hàng & Thanh Toán",
      icon: "💳",
      faqs: [
        {
          question: "Làm thế nào để đặt hàng trên website?",
          answer:
            "Bạn có thể đặt hàng bằng cách chọn sản phẩm, thêm vào giỏ hàng, và làm theo hướng dẫn thanh toán. Chúng tôi hỗ trợ nhiều phương thức thanh toán khác nhau.",
        },
        {
          question: "Những phương thức thanh toán nào được hỗ trợ?",
          answer:
            "Chúng tôi hỗ trợ thanh toán qua thẻ tín dụng, chuyển khoản ngân hàng, ví điện tử (Momo, ZaloPay), và thanh toán khi nhận hàng (COD).",
        },
        {
          question: "Tôi có thể hủy đơn hàng không?",
          answer:
            "Bạn có thể hủy đơn hàng trong vòng 2 giờ sau khi đặt hàng. Sau thời gian này, vui lòng liên hệ hotline để được hỗ trợ.",
        },
      ],
    },
    {
      title: "Giao Hàng & Vận Chuyển",
      icon: "🚚",
      faqs: [
        {
          question: "Thời gian giao hàng là bao lâu?",
          answer:
            "Thời gian giao hàng thường từ 1-5 ngày tùy theo khu vực. Nội thành Hà Nội và các thành phố lớn thường nhận hàng trong 1-2 ngày.",
        },
        {
          question: "Phí vận chuyển được tính như thế nào?",
          answer:
            "Miễn phí vận chuyển cho đơn hàng từ 500.000đ. Đơn hàng dưới 500.000đ sẽ có phí vận chuyển từ 30.000đ tùy theo khu vực.",
        },
        {
          question: "Tôi có thể theo dõi đơn hàng không?",
          answer:
            "Có, bạn sẽ nhận được mã tracking qua SMS và email để theo dõi tình trạng đơn hàng real-time.",
        },
      ],
    },
    {
      title: "Sản Phẩm & Chất Lượng",
      icon: "🏎️",
      faqs: [
        {
          question: "Các mô hình xe có được bảo hành không?",
          answer:
            "Tất cả sản phẩm đều có bảo hành tối thiểu 6 tháng. Một số sản phẩm cao cấp có bảo hành lên đến 24 tháng.",
        },
        {
          question: "Sản phẩm có giống với hình ảnh không?",
          answer:
            "Chúng tôi cam kết 100% hình ảnh thật. Nếu sản phẩm không đúng mô tả, bạn được đổi trả miễn phí.",
        },
        {
          question: "Làm thế nào để bảo quản mô hình xe?",
          answer:
            "Để nơi khô ráo, tránh ánh nắng trực tiếp, vệ sinh định kỳ bằng khăn mềm. Xem hướng dẫn chi tiết trong blog của chúng tôi.",
        },
      ],
    },
    {
      title: "Tài Khoản & Bảo Mật",
      icon: "🔐",
      faqs: [
        {
          question: "Làm thế nào để tạo tài khoản?",
          answer:
            "Click vào 'Đăng ký' ở góc phải màn hình, điền thông tin cần thiết và xác nhận email. Quá trình chỉ mất vài phút.",
        },
        {
          question: "Tôi quên mật khẩu, phải làm sao?",
          answer:
            "Click vào 'Quên mật khẩu' tại trang đăng nhập, nhập email và làm theo hướng dẫn để đặt lại mật khẩu.",
        },
        {
          question: "Thông tin cá nhân có được bảo mật không?",
          answer:
            "Chúng tôi áp dụng mã hóa SSL và tuân thủ các tiêu chuẩn bảo mật quốc tế để bảo vệ thông tin khách hàng.",
        },
      ],
    },
  ];

  const quickLinks = [
    { title: "Hướng dẫn đặt hàng", icon: BookOpen, url: "/guide/order" },
    { title: "Video hướng dẫn", icon: Video, url: "/guide/videos" },
    { title: "Tải app mobile", icon: Download, url: "/mobile-app" },
    { title: "Liên hệ hỗ trợ", icon: Phone, url: "/contact" },
  ];

  const contactMethods = [
    {
      title: "Hotline 24/7",
      description: "0123-456-789",
      icon: Phone,
      action: "tel:0342429911",
      color: "blue",
    },
    {
      title: "Email Support",
      description: "help@vuaxemohinh.com",
      icon: Mail,
      action: "mailto:help@vuaxemohinh.com",
      color: "green",
    },
    {
      title: "Live Chat",
      description: "Chat trực tiếp với tư vấn viên",
      icon: MessageCircle,
      action: "#",
      color: "purple",
    },
  ];

  const filteredFaqs = faqCategories
    .map((category) => ({
      ...category,
      faqs: category.faqs.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter((category) => category.faqs.length > 0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Trung Tâm Hỗ Trợ
              </h1>
              <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8">
                Chúng tôi ở đây để giúp bạn có trải nghiệm mua sắm tốt nhất tại
                Vuaxemohinh
              </p>

              {/* Search Bar */}
              <div className="max-w-2xl mx-auto">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm câu hỏi, hướng dẫn..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {quickLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4 mx-auto">
                    <link.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {link.title}
                  </h3>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Cách Thức Liên Hệ
              </h2>
              <p className="text-lg text-gray-600">
                Chọn cách thức liên hệ phù hợp với bạn
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {contactMethods.map((method, index) => (
                <a
                  key={index}
                  href={method.action}
                  className={`bg-${method.color}-50 border border-${method.color}-200 rounded-lg p-6 text-center hover:shadow-md transition-shadow`}
                >
                  <div
                    className={`flex items-center justify-center w-16 h-16 bg-${method.color}-100 rounded-full mb-4 mx-auto`}
                  >
                    <method.icon
                      className={`h-8 w-8 text-${method.color}-600`}
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {method.title}
                  </h3>
                  <p className={`text-${method.color}-700 font-medium`}>
                    {method.description}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Câu Hỏi Thường Gặp
              </h2>
              <p className="text-lg text-gray-600">
                Tìm câu trả lời nhanh chóng cho những thắc mắc phổ biến
              </p>
            </div>

            <div className="space-y-8">
              {(searchTerm ? filteredFaqs : faqCategories).map(
                (category, categoryIndex) => (
                  <div
                    key={categoryIndex}
                    className="bg-white rounded-lg shadow-lg overflow-hidden"
                  >
                    <div className="bg-gray-50 px-6 py-4 border-b">
                      <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                        <span className="text-2xl mr-3">{category.icon}</span>
                        {category.title}
                      </h3>
                    </div>

                    <div className="divide-y divide-gray-200">
                      {category.faqs.map((faq, faqIndex) => {
                        const globalIndex = categoryIndex * 100 + faqIndex;
                        return (
                          <div key={faqIndex}>
                            <button
                              onClick={() => toggleFaq(globalIndex)}
                              className="w-full px-6 py-4 text-left hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition-colors"
                            >
                              <div className="flex items-center justify-between">
                                <h4 className="text-lg font-medium text-gray-900 pr-4">
                                  {faq.question}
                                </h4>
                                {openFaq === globalIndex ? (
                                  <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                                ) : (
                                  <ChevronRight className="h-5 w-5 text-gray-500 flex-shrink-0" />
                                )}
                              </div>
                            </button>

                            {openFaq === globalIndex && (
                              <div className="px-6 pb-4">
                                <p className="text-gray-700 leading-relaxed">
                                  {faq.answer}
                                </p>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )
              )}
            </div>

            {searchTerm && filteredFaqs.length === 0 && (
              <div className="text-center py-12">
                <HelpCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Không tìm thấy kết quả
                </h3>
                <p className="text-gray-600 mb-6">
                  Không có câu hỏi nào phù hợp với từ khóa "{searchTerm}"
                </p>
                <button
                  onClick={() => setSearchTerm("")}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Xem tất cả câu hỏi
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Support Team */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">
                  Đội Ngũ Hỗ Trợ Chuyên Nghiệp
                </h2>
                <p className="text-xl opacity-90 mb-6">
                  Được dẫn dắt bởi <strong>Mr. Loi</strong> - CTO & Founder, đội
                  ngũ hỗ trợ của chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc
                  của bạn.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5" />
                    <span>Hỗ trợ 24/7, kể cả cuối tuần</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Users className="h-5 w-5" />
                    <span>Đội ngũ tư vấn viên chuyên nghiệp</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MessageCircle className="h-5 w-5" />
                    <span>Phản hồi nhanh trong vòng 30 phút</span>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <div className="bg-white bg-opacity-10 rounded-lg p-8">
                  <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-12 w-12" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Mr. Loi</h3>
                  <p className="text-lg opacity-90 mb-4">CTO & Founder</p>
                  <p className="text-sm opacity-80">
                    "Chúng tôi cam kết mang đến trải nghiệm khách hàng tốt nhất
                    cho cộng đồng yêu thích mô hình xe."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Still Need Help */}
        <section className="py-16 bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Vẫn Cần Hỗ Trợ?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Đừng ngại liên hệ với chúng tôi, chúng tôi luôn sẵn sàng giúp đỡ!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:0342429911"
                className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
              >
                <Phone className="h-5 w-5 mr-2" />
                Gọi Hotline
              </a>
              <a
                href="/contact"
                className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center"
              >
                <Mail className="h-5 w-5 mr-2" />
                Gửi Email
              </a>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
