"use client";

import React from "react";
import Layout from "@/components/layout/Layout";
import Button from "@/components/ui/Button";
import {
  Heart,
  Shield,
  Truck,
  Headphones,
  Users,
  Award,
  Phone,
  Mail,
  MapPin,
  Clock,
} from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  const features = [
    {
      icon: Shield,
      title: "Bảo mật tuyệt đối",
      description:
        "Đảm bảo thông tin khách hàng được bảo mật 100% với công nghệ mã hóa tiên tiến.",
    },
    {
      icon: Truck,
      title: "Giao hàng nhanh chóng",
      description:
        "Giao hàng toàn quốc trong 1-3 ngày với đội ngũ vận chuyển chuyên nghiệp.",
    },
    {
      icon: Headphones,
      title: "Hỗ trợ 24/7",
      description:
        "Đội ngũ chăm sóc khách hàng sẵn sàng hỗ trợ bạn mọi lúc, mọi nơi.",
    },
    {
      icon: Award,
      title: "Chất lượng đảm bảo",
      description:
        "Tất cả sản phẩm đều được kiểm tra chất lượng nghiêm ngặt trước khi giao đến tay khách hàng.",
    },
  ];

  const team = [
    {
      name: "Nguyễn Văn A",
      role: "CEO & Founder",
      image: "/placeholder-avatar.jpg",
      description:
        "Với hơn 10 năm kinh nghiệm trong lĩnh vực thương mại điện tử.",
    },
    {
      name: "Trần Thị B",
      role: "CTO",
      image: "/placeholder-avatar.jpg",
      description:
        "Chuyên gia công nghệ với passion về trải nghiệm người dùng.",
    },
    {
      name: "Lê Văn C",
      role: "Head of Marketing",
      image: "/placeholder-avatar.jpg",
      description:
        "Chiến lược gia marketing với nhiều năm kinh nghiệm trong ngành.",
    },
    {
      name: "Phạm Thị D",
      role: "Customer Success Manager",
      image: "/placeholder-avatar.jpg",
      description: "Đảm bảo trải nghiệm khách hàng luôn được đặt lên hàng đầu.",
    },
  ];

  const stats = [
    { number: "100,000+", label: "Khách hàng tin tưởng" },
    { number: "500,000+", label: "Sản phẩm đã bán" },
    { number: "99.9%", label: "Độ hài lòng khách hàng" },
    { number: "24/7", label: "Hỗ trợ khách hàng" },
  ];

  return (
    <Layout>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl font-bold mb-6">Về Chúng Tôi</h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
              Chúng tôi là một công ty thương mại điện tử hàng đầu, cam kết mang
              đến cho khách hàng những sản phẩm chất lượng cao với dịch vụ tốt
              nhất.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products">
                <Button variant="secondary" size="lg">
                  Khám phá sản phẩm
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="outline"
                  size="lg"
                  className="text-white border-white hover:bg-white hover:text-blue-600"
                >
                  Liên hệ ngay
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Company Story */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Câu chuyện của chúng tôi
                </h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    Được thành lập vào năm 2020, chúng tôi bắt đầu với một ước
                    mơ đơn giản: tạo ra một nền tảng thương mại điện tử mà mọi
                    người đều có thể tin tưởng và sử dụng dễ dàng.
                  </p>
                  <p>
                    Với sự phát triển không ngừng, chúng tôi đã trở thành một
                    trong những địa chỉ mua sắm trực tuyến uy tín hàng đầu tại
                    Việt Nam, phục vụ hàng trăm nghìn khách hàng.
                  </p>
                  <p>
                    Chúng tôi không chỉ bán sản phẩm, mà còn xây dựng mối quan
                    hệ lâu dài với khách hàng thông qua chất lượng dịch vụ xuất
                    sắc và cam kết không ngừng cải tiến.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl p-8 text-white">
                  <div className="grid grid-cols-2 gap-6">
                    {stats.map((stat, index) => (
                      <div key={index} className="text-center">
                        <div className="text-2xl font-bold mb-2">
                          {stat.number}
                        </div>
                        <div className="text-sm opacity-90">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Tại sao chọn chúng tôi?
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Chúng tôi cam kết mang đến cho bạn trải nghiệm mua sắm tuyệt vời
                nhất
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="text-center">
                  <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
                      <feature.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Đội ngũ của chúng tôi
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Gặp gỡ những người đứng sau thành công của chúng tôi
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <div key={index} className="text-center">
                  <div className="bg-gray-50 rounded-2xl p-6 hover:shadow-md transition-shadow">
                    <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Users className="w-8 h-8 text-gray-500" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">
                      {member.name}
                    </h3>
                    <p className="text-blue-600 font-medium mb-3">
                      {member.role}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {member.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <div className="flex items-center mb-6">
                  <div className="bg-blue-100 rounded-lg p-3 mr-4">
                    <Heart className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Sứ mệnh</h3>
                </div>
                <p className="text-gray-600">
                  Sứ mệnh của chúng tôi là tạo ra một nền tảng thương mại điện
                  tử đáng tin cậy, nơi khách hàng có thể dễ dàng tìm kiếm và mua
                  sắm những sản phẩm chất lượng cao với giá cả hợp lý. Chúng tôi
                  cam kết mang đến trải nghiệm mua sắm tuyệt vời và dịch vụ
                  khách hàng xuất sắc.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <div className="flex items-center mb-6">
                  <div className="bg-purple-100 rounded-lg p-3 mr-4">
                    <Award className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Tầm nhìn</h3>
                </div>
                <p className="text-gray-600">
                  Trở thành nền tảng thương mại điện tử hàng đầu tại Việt Nam và
                  khu vực Đông Nam Á, được khách hàng tin tưởng và lựa chọn hàng
                  đầu. Chúng tôi hướng đến việc xây dựng một hệ sinh thái mua
                  sắm hoàn chỉnh, hiện đại và bền vững.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Liên hệ với chúng tôi
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Điện thoại</h3>
                <p className="text-gray-600">1900 1234</p>
                <p className="text-gray-600">(+84) 123 456 789</p>
              </div>

              <div className="text-center">
                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
                <p className="text-gray-600">support@example.com</p>
                <p className="text-gray-600">info@example.com</p>
              </div>

              <div className="text-center">
                <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Địa chỉ</h3>
                <p className="text-gray-600">123 Đường ABC</p>
                <p className="text-gray-600">Quận 1, TP.HCM</p>
              </div>

              <div className="text-center">
                <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Giờ làm việc
                </h3>
                <p className="text-gray-600">T2 - T6: 8:00 - 18:00</p>
                <p className="text-gray-600">T7 - CN: 9:00 - 17:00</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Bắt đầu mua sắm cùng chúng tôi ngay hôm nay!
            </h2>
            <p className="text-xl text-white mb-8 opacity-90">
              Khám phá hàng nghìn sản phẩm chất lượng với giá cả hợp lý
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products">
                <Button variant="secondary" size="lg">
                  Xem sản phẩm
                </Button>
              </Link>
              <Link href="/register">
                <Button
                  variant="outline"
                  size="lg"
                  className="text-white border-white hover:bg-white hover:text-blue-600"
                >
                  Đăng ký ngay
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
