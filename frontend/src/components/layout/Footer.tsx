import React from "react";
import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Package,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter section */}
      <div className="bg-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-2">Đăng ký nhận tin tức</h3>
            <p className="text-gray-300 mb-6">
              Nhận thông báo về sản phẩm mới và ưu đãi đặc biệt
            </p>
            <div className="max-w-md mx-auto flex">
              <input
                type="email"
                placeholder="Nhập email của bạn"
                className="flex-1 px-4 py-3 rounded-l-lg border-0 text-gray-900 focus:ring-2 focus:ring-blue-500"
              />
              <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-r-lg transition-colors">
                Đăng ký
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company info */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Package className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">EComShop</span>
              </div>
              <p className="text-gray-400 mb-4">
                Cửa hàng trực tuyến hàng đầu Việt Nam với hàng nghìn sản phẩm
                chất lượng cao.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Youtube className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Quick links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Liên kết nhanh</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/products"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Sản phẩm
                  </Link>
                </li>
                <li>
                  <Link
                    href="/categories"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Danh mục
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Về chúng tôi
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Liên hệ
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            {/* Customer service */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Hỗ trợ khách hàng</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/help"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Trung tâm trợ giúp
                  </Link>
                </li>
                <li>
                  <Link
                    href="/shipping"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Chính sách giao hàng
                  </Link>
                </li>
                <li>
                  <Link
                    href="/returns"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Đổi trả hàng
                  </Link>
                </li>
                <li>
                  <Link
                    href="/warranty"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Bảo hành
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Chính sách bảo mật
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact info */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Thông tin liên hệ</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-400">
                    CT6 Kien Hung, Ha Dong, Hanoi
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-400">0342429911</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-400">info@ecomshop.vn</span>
                </div>
              </div>

              {/* Working hours */}
              <div className="mt-6">
                <h4 className="font-semibold mb-2">Giờ làm việc</h4>
                <p className="text-gray-400 text-sm">
                  Thứ 2 - Thứ 6: 8:00 - 18:00
                  <br />
                  Thứ 7 - Chủ nhật: 9:00 - 17:00
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 EComShop. Tất cả quyền được bảo lưu.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                href="/terms"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Điều khoản sử dụng
              </Link>
              <Link
                href="/privacy"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Chính sách bảo mật
              </Link>
              <Link
                href="/cookies"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
