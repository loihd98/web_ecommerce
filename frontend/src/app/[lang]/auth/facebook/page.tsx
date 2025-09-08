"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { AlertCircle, ArrowLeft, Facebook } from "lucide-react";
import Link from "next/link";

export default function FacebookAuthPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <Facebook className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Đăng nhập bằng Facebook
          </h1>
          <p className="text-gray-600">
            Tính năng đăng nhập bằng Facebook đang được phát triển
          </p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 text-yellow-500" />
                <span>Thông báo</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                Chúng tôi đang phát triển tính năng đăng nhập bằng tài khoản
                Facebook để mang lại trải nghiệm thuận tiện hơn cho bạn.
              </p>
              <p className="text-gray-700">
                Hiện tại, bạn có thể sử dụng các phương thức đăng nhập khác được
                hỗ trợ trên Vuaxemohinh.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Theo dõi chúng tôi trên Facebook</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                Trong thời gian chờ đợi, bạn có thể theo dõi fanpage Facebook
                của chúng tôi để cập nhật thông tin mới nhất:
              </p>
              <a
                href="https://www.facebook.com/share/1C1dp31mte/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <Facebook className="h-5 w-5" />
                <span>Theo dõi Facebook</span>
              </a>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Các phương thức đăng nhập hiện có</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Đăng nhập bằng email và mật khẩu</li>
                <li>Đăng ký tài khoản mới</li>
                <li>Đăng nhập bằng số điện thoại (sắp ra mắt)</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>
                Lợi ích khi đăng nhập bằng Facebook (sắp có)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Đăng nhập nhanh chóng với tài khoản Facebook</li>
                <li>Chia sẻ sản phẩm yêu thích lên Facebook dễ dàng</li>
                <li>Nhận thông báo khuyến mãi qua Facebook Messenger</li>
                <li>Kết nối với bạn bè đã sử dụng Vuaxemohinh</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Bảo mật và quyền riêng tư</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                Khi tính năng đăng nhập Facebook được triển khai, chúng tôi cam
                kết:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Chỉ truy cập thông tin cơ bản cần thiết</li>
                <li>Không đăng bài lên Facebook mà không có sự đồng ý</li>
                <li>Bảo vệ thông tin cá nhân theo tiêu chuẩn cao nhất</li>
                <li>Tuân thủ chính sách bảo mật của Facebook</li>
              </ul>
            </CardContent>
          </Card>

          <div className="text-center">
            <Link
              href="/auth/login"
              className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Quay lại trang đăng nhập</span>
            </Link>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Liên hệ hỗ trợ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-gray-700">
                <p className="mb-4">
                  Nếu bạn gặp khó khăn trong việc đăng nhập, vui lòng liên hệ:
                </p>
                <p className="mb-2">
                  <strong>Điện thoại:</strong> 0342429911
                </p>
                <p className="mb-2">
                  <strong>Email:</strong> info@vuaxemohinh.vn
                </p>
                <p className="mb-2">
                  <strong>Địa chỉ:</strong> CT6 Kien Hung, Ha Dong, Hanoi
                </p>
                <p>
                  <strong>Giờ hỗ trợ:</strong> 8:00 - 18:00 (Thứ 2 - Thứ 6)
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
