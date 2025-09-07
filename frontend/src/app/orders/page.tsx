"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { Package, Eye, Truck, Clock, CheckCircle, XCircle } from "lucide-react";
import { apiService } from "@/services/api";

interface OrderItem {
  id: number;
  productName: string;
  price: number;
  discountPrice?: number;
  quantity: number;
  productAttributes?: string;
}

interface Order {
  id: number;
  orderNumber: string;
  status:
    | "pending"
    | "confirmed"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled";
  paymentStatus: "pending" | "paid" | "failed" | "refunded";
  paymentMethod: "cod" | "card" | "momo" | "vnpay";
  total: number;
  createdAt: string;
  items: OrderItem[];
  shippingName: string;
  shippingAddress: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const ordersData = await apiService.getOrders();
        setOrders(ordersData);
      } catch (error) {
        console.error("Error fetching orders:", error);
        // Fallback to empty array if no authentication or error
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    // Check if user is logged in
    const token = localStorage.getItem("token");
    if (token) {
      fetchOrders();
    } else {
      setLoading(false);
      setOrders([]);
    }
  }, []);
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />;
      case "confirmed":
      case "processing":
        return <Package className="h-4 w-4" />;
      case "shipped":
        return <Truck className="h-4 w-4" />;
      case "delivered":
        return <CheckCircle className="h-4 w-4" />;
      case "cancelled":
        return <XCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "pending":
        return "warning";
      case "confirmed":
      case "processing":
        return "info";
      case "shipped":
        return "info";
      case "delivered":
        return "success";
      case "cancelled":
        return "error";
      default:
        return "default";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Chờ xác nhận";
      case "confirmed":
        return "Đã xác nhận";
      case "processing":
        return "Đang xử lý";
      case "shipped":
        return "Đang giao hàng";
      case "delivered":
        return "Đã giao hàng";
      case "cancelled":
        return "Đã hủy";
      default:
        return status;
    }
  };

  const getPaymentStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Chờ thanh toán";
      case "paid":
        return "Đã thanh toán";
      case "failed":
        return "Thanh toán thất bại";
      case "refunded":
        return "Đã hoàn tiền";
      default:
        return status;
    }
  };

  const getPaymentMethodText = (method: string) => {
    switch (method) {
      case "cod":
        return "Thanh toán khi nhận hàng";
      case "card":
        return "Thẻ tín dụng";
      case "momo":
        return "Ví MoMo";
      case "vnpay":
        return "VNPay";
      default:
        return method;
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 animate-pulse">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-gray-200 h-48 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (orders.length === 0) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <Package className="h-24 w-24 mx-auto text-gray-400 mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Chưa có đơn hàng nào
            </h2>
            <p className="text-gray-600 mb-8">
              Bạn chưa có đơn hàng nào. Hãy bắt đầu mua sắm ngay!
            </p>
            <Link href="/products">
              <Button>Bắt đầu mua sắm</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen">
        {/* Header */}
        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <h1 className="text-3xl font-bold text-gray-900">
              Đơn hàng của tôi
            </h1>
            <p className="mt-2 text-gray-600">
              Quản lý và theo dõi các đơn hàng của bạn
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-6">
            {orders.map((order) => (
              <Card key={order.id}>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
                    <div>
                      <CardTitle className="text-lg">
                        Đơn hàng #{order.orderNumber}
                      </CardTitle>
                      <p className="text-sm text-gray-600 mt-1">
                        Đặt hàng lúc {formatDate(order.createdAt)}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge
                        variant={getStatusVariant(order.status) as any}
                        className="flex items-center space-x-1"
                      >
                        {getStatusIcon(order.status)}
                        <span>{getStatusText(order.status)}</span>
                      </Badge>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Order Items */}
                    <div className="lg:col-span-2">
                      <h4 className="font-medium mb-3">Sản phẩm:</h4>
                      <div className="space-y-3">
                        {order.items.map((item) => {
                          const attributes = item.productAttributes
                            ? JSON.parse(item.productAttributes)
                            : {};

                          return (
                            <div
                              key={item.id}
                              className="flex justify-between items-start p-3 bg-gray-50 rounded-lg"
                            >
                              <div className="flex-1">
                                <h5 className="font-medium text-gray-900">
                                  {item.productName}
                                </h5>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {Object.entries(attributes).map(
                                    ([key, value]) => (
                                      <Badge
                                        key={key}
                                        variant="info"
                                        className="text-xs"
                                      >
                                        {key}: {value as string}
                                      </Badge>
                                    )
                                  )}
                                </div>
                                <p className="text-sm text-gray-600 mt-1">
                                  Số lượng: {item.quantity}
                                </p>
                              </div>
                              <div className="text-right">
                                {item.discountPrice ? (
                                  <>
                                    <p className="font-medium text-red-600">
                                      {formatPrice(
                                        item.discountPrice * item.quantity
                                      )}
                                    </p>
                                    <p className="text-sm text-gray-500 line-through">
                                      {formatPrice(item.price * item.quantity)}
                                    </p>
                                  </>
                                ) : (
                                  <p className="font-medium">
                                    {formatPrice(item.price * item.quantity)}
                                  </p>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Order Summary */}
                    <div>
                      <h4 className="font-medium mb-3">Thông tin đơn hàng:</h4>
                      <div className="space-y-3">
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-gray-600">
                              Tổng tiền:
                            </span>
                            <span className="font-bold text-blue-600">
                              {formatPrice(order.total)}
                            </span>
                          </div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-gray-600">
                              Thanh toán:
                            </span>
                            <span className="text-sm">
                              {getPaymentMethodText(order.paymentMethod)}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">
                              Trạng thái TT:
                            </span>
                            <Badge
                              variant={
                                order.paymentStatus === "paid"
                                  ? "success"
                                  : "warning"
                              }
                              className="text-xs"
                            >
                              {getPaymentStatusText(order.paymentStatus)}
                            </Badge>
                          </div>
                        </div>

                        <div className="p-3 bg-gray-50 rounded-lg">
                          <h5 className="font-medium text-sm mb-2">
                            Địa chỉ giao hàng:
                          </h5>
                          <p className="text-sm text-gray-600">
                            {order.shippingName}
                          </p>
                          <p className="text-sm text-gray-600">
                            {order.shippingAddress}
                          </p>
                        </div>

                        <div className="flex space-x-2">
                          <Link href={`/orders/${order.id}`} className="flex-1">
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full"
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              Chi tiết
                            </Button>
                          </Link>

                          {order.status === "delivered" && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1"
                            >
                              Đánh giá
                            </Button>
                          )}

                          {order.status === "pending" && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1 text-red-600 border-red-600 hover:bg-red-50"
                            >
                              Hủy đơn
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-8">
            <Button variant="outline">Tải thêm đơn hàng</Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
