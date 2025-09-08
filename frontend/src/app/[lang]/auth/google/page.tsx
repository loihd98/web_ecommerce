"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { AlertCircle, ArrowLeft, Chrome } from "lucide-react";
import Link from "next/link";

export default function GoogleAuthPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <Chrome className="h-8 w-8 text-red-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Đăng nhập bằng Google
          </h1>
          <p className="text-gray-600">
            Tính năng đăng nhập bằng Google đang được phát triển
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
                Google để mang lại trải nghiệm thuận tiện hơn cho bạn.
              </p>
              <p className="text-gray-700">
                Hiện tại, bạn có thể sử dụng các phương thức đăng nhập khác được
                hỗ trợ trên Vuaxemohinh.
              </p>
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
              <CardTitle>Lợi ích khi đăng nhập bằng Google (sắp có)</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Đăng nhập nhanh chóng chỉ với một cú nhấp chuột</li>
                <li>Không cần nhớ thêm mật khẩu</li>
                <li>Bảo mật cao với xác thực 2 lớp của Google</li>
                <li>Đồng bộ thông tin tự động</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Thời gian dự kiến</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Chúng tôi dự kiến sẽ ra mắt tính năng đăng nhập bằng Google
                trong thời gian sớm nhất. Để cập nhật thông tin mới nhất, bạn có
                thể:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mt-3">
                <li>Theo dõi fanpage Facebook của chúng tôi</li>
                <li>Đăng ký nhận tin tức qua email</li>
                <li>Kiểm tra website thường xuyên</li>
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
