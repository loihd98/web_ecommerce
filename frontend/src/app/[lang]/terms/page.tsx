"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Điều khoản sử dụng
          </h1>
          <p className="text-gray-600">
            Cập nhật lần cuối: {new Date().toLocaleDateString("vi-VN")}
          </p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>1. Chấp nhận điều khoản</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Bằng việc truy cập và sử dụng website Vuaxemohinh, bạn đồng ý
                tuân thủ và bị ràng buộc bởi các điều khoản và điều kiện sử dụng
                này. Nếu bạn không đồng ý với bất kỳ phần nào của các điều khoản
                này, bạn không được phép sử dụng dịch vụ của chúng tôi.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>2. Mô tả dịch vụ</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                Vuaxemohinh là nền tảng thương mại điện tử cung cấp:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Dịch vụ mua bán sản phẩm trực tuyến</li>
                <li>Thông tin sản phẩm và đánh giá</li>
                <li>Hỗ trợ thanh toán và giao hàng</li>
                <li>Dịch vụ chăm sóc khách hàng</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>3. Quyền và nghĩa vụ của người dùng</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Quyền của người dùng:
                  </h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Truy cập và sử dụng các dịch vụ được cung cấp</li>
                    <li>Được bảo vệ thông tin cá nhân theo quy định</li>
                    <li>Được hỗ trợ kỹ thuật và chăm sóc khách hàng</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Nghĩa vụ của người dùng:
                  </h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Cung cấp thông tin chính xác và cập nhật</li>
                    <li>Không sử dụng dịch vụ cho mục đích bất hợp pháp</li>
                    <li>Tuân thủ các quy định và chính sách của website</li>
                    <li>Thanh toán đầy đủ cho các đơn hàng đã đặt</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>4. Chính sách thanh toán và giao hàng</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Thanh toán:
                  </h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Thanh toán khi nhận hàng (COD)</li>
                    <li>Chuyển khoản ngân hàng</li>
                    <li>Thanh toán qua ví điện tử</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Giao hàng:
                  </h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Giao hàng toàn quốc</li>
                    <li>Thời gian giao hàng: 1-7 ngày làm việc</li>
                    <li>Miễn phí giao hàng cho đơn hàng trên 500,000 VNĐ</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>5. Chính sách đổi trả</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Đổi trả trong vòng 7 ngày kể từ ngày nhận hàng</li>
                <li>Sản phẩm phải còn nguyên vẹn, chưa sử dụng</li>
                <li>Có hóa đơn mua hàng hợp lệ</li>
                <li>
                  Khách hàng chịu phí vận chuyển đổi trả (trừ lỗi từ nhà bán)
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>6. Giới hạn trách nhiệm</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Vuaxemohinh không chịu trách nhiệm cho bất kỳ thiệt hại trực
                tiếp, gián tiếp, ngẫu nhiên, đặc biệt hoặc hậu quả phát sinh từ
                việc sử dụng hoặc không thể sử dụng dịch vụ của chúng tôi.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>7. Thay đổi điều khoản</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Chúng tôi có quyền sửa đổi các điều khoản này bất cứ lúc nào.
                Các thay đổi sẽ có hiệu lực ngay khi được đăng tải trên website.
                Việc tiếp tục sử dụng dịch vụ sau khi có thay đổi đồng nghĩa với
                việc bạn chấp nhận các điều khoản mới.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>8. Thông tin liên hệ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-gray-700">
                <p className="mb-2">
                  <strong>Địa chỉ:</strong> CT6 Kien Hung, Ha Dong, Hanoi
                </p>
                <p className="mb-2">
                  <strong>Điện thoại:</strong> 0342429911
                </p>
                <p>
                  <strong>Email:</strong> info@vuaxemohinh.vn
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
