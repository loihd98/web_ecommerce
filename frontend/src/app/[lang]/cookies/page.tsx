"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Chính sách Cookie
          </h1>
          <p className="text-gray-600">
            Cập nhật lần cuối: {new Date().toLocaleDateString("vi-VN")}
          </p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Cookie là gì?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Cookie là các tệp văn bản nhỏ được lưu trữ trên thiết bị của bạn
                khi bạn truy cập website. Cookie giúp website ghi nhớ thông tin
                về lần truy cập của bạn, làm cho lần truy cập tiếp theo dễ dàng
                hơn và website hữu ích hơn đối với bạn.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Vuaxemohinh sử dụng Cookie như thế nào?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">Chúng tôi sử dụng cookie để:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Duy trì phiên đăng nhập của bạn</li>
                <li>Ghi nhớ sở thích và cài đặt của bạn</li>
                <li>Phân tích cách bạn sử dụng website để cải thiện dịch vụ</li>
                <li>Cung cấp nội dung và quảng cáo phù hợp</li>
                <li>Bảo vệ website khỏi spam và lạm dụng</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Các loại Cookie chúng tôi sử dụng</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    1. Cookie cần thiết
                  </h4>
                  <p className="text-gray-700">
                    Những cookie này cần thiết để website hoạt động và không thể
                    tắt trong hệ thống của chúng tôi. Chúng thường chỉ được
                    thiết lập để đáp ứng các hành động do bạn thực hiện.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    2. Cookie hiệu suất
                  </h4>
                  <p className="text-gray-700">
                    Những cookie này cho phép chúng tôi đếm lượt truy cập và
                    nguồn lưu lượng truy cập để có thể đo lường và cải thiện
                    hiệu suất của website.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    3. Cookie chức năng
                  </h4>
                  <p className="text-gray-700">
                    Những cookie này cho phép website cung cấp chức năng và cá
                    nhân hóa nâng cao. Chúng có thể được thiết lập bởi chúng tôi
                    hoặc bởi các nhà cung cấp bên thứ ba.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    4. Cookie quảng cáo
                  </h4>
                  <p className="text-gray-700">
                    Những cookie này có thể được thiết lập thông qua website của
                    chúng tôi bởi các đối tác quảng cáo để xây dựng hồ sơ về sở
                    thích của bạn.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cookie của bên thứ ba</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                Chúng tôi cũng sử dụng cookie từ các dịch vụ bên thứ ba:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>
                  <strong>Google Analytics:</strong> Để phân tích lưu lượng truy
                  cập website
                </li>
                <li>
                  <strong>Facebook Pixel:</strong> Để theo dõi hiệu quả quảng
                  cáo
                </li>
                <li>
                  <strong>Google Ads:</strong> Để hiển thị quảng cáo có liên
                  quan
                </li>
                <li>
                  <strong>Tiktok Pixel:</strong> Để theo dõi tương tác người
                  dùng
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cách quản lý Cookie</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Cài đặt trình duyệt
                  </h4>
                  <p className="text-gray-700">
                    Bạn có thể kiểm soát và/hoặc xóa cookie theo ý muốn. Bạn có
                    thể xóa tất cả cookie đã có trên máy tính và có thể thiết
                    lập hầu hết trình duyệt để ngăn chặn cookie được lưu trữ.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Tắt cookie
                  </h4>
                  <p className="text-gray-700">
                    Nếu bạn chọn tắt cookie, một số tính năng của website có thể
                    không hoạt động bình thường. Ví dụ, bạn có thể không thể
                    đăng nhập hoặc thêm sản phẩm vào giỏ hàng.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Thời gian lưu trữ Cookie</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-gray-700">
                <p className="mb-4">Cookie được chia làm hai loại chính:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>
                    <strong>Session Cookie:</strong> Tạm thời và sẽ bị xóa khi
                    bạn đóng trình duyệt
                  </li>
                  <li>
                    <strong>Persistent Cookie:</strong> Lưu trữ trong một khoảng
                    thời gian nhất định (thường từ vài ngày đến vài năm)
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cập nhật chính sách Cookie</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Chúng tôi có thể cập nhật chính sách Cookie này theo thời gian
                để phản ánh những thay đổi trong thực hành của chúng tôi hoặc vì
                những lý do khác. Chúng tôi khuyến khích bạn xem lại chính sách
                này định kỳ.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Liên hệ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-gray-700">
                <p className="mb-4">
                  Nếu bạn có câu hỏi về chính sách Cookie này, vui lòng liên hệ:
                </p>
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
