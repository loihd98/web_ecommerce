"use client";

import React, { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Search, Filter, Eye, Truck, CheckCircle, XCircle } from "lucide-react";

// Disable static generation for this page
export const dynamic = "force-dynamic";

interface Order {
  id: number;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  total: number;
  status: string;
  createdAt: string;
  items: {
    productName: string;
    quantity: number;
    price: number;
  }[];
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      // Mock data for now - replace with actual API call
      const mockOrders: Order[] = [
        {
          id: 1,
          orderNumber: "ORD-001",
          customerName: "John Smith",
          customerEmail: "nguyenvana@email.com",
          total: 1500000,
          status: "pending",
          createdAt: "2024-01-15T10:30:00Z",
          items: [{ productName: "iPhone 15", quantity: 1, price: 1500000 }],
        },
        {
          id: 2,
          orderNumber: "ORD-002",
          customerName: "Jane Doe",
          customerEmail: "tranthib@email.com",
          total: 2500000,
          status: "processing",
          createdAt: "2024-01-14T14:20:00Z",
          items: [{ productName: "MacBook Air", quantity: 1, price: 2500000 }],
        },
        {
          id: 3,
          orderNumber: "ORD-003",
          customerName: "Mike Brown",
          customerEmail: "levanc@email.com",
          total: 800000,
          status: "shipped",
          createdAt: "2024-01-13T09:15:00Z",
          items: [{ productName: "AirPods Pro", quantity: 1, price: 800000 }],
        },
        {
          id: 4,
          orderNumber: "ORD-004",
          customerName: "Phạm Thị D",
          customerEmail: "phamthid@email.com",
          total: 1200000,
          status: "delivered",
          createdAt: "2024-01-12T16:45:00Z",
          items: [{ productName: "iPad Air", quantity: 1, price: 1200000 }],
        },
        {
          id: 5,
          orderNumber: "ORD-005",
          customerName: "Hoàng Văn E",
          customerEmail: "hoangvane@email.com",
          total: 500000,
          status: "cancelled",
          createdAt: "2024-01-11T11:30:00Z",
          items: [{ productName: "Apple Watch", quantity: 1, price: 500000 }],
        },
      ];
      setOrders(mockOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-purple-100 text-purple-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "shipped":
        return <Truck size={16} />;
      case "delivered":
        return <CheckCircle size={16} />;
      case "cancelled":
        return <XCircle size={16} />;
      default:
        return null;
    }
  };

  const updateOrderStatus = async (orderId: number, newStatus: string) => {
    try {
      // Replace with actual API call
      setOrders(
        orders.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Quản lý đơn hàng</h1>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Tìm kiếm theo mã đơn, tên khách hàng, email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Filter size={20} className="text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Tất cả trạng thái</option>
                <option value="pending">Chờ xử lý</option>
                <option value="processing">Đang xử lý</option>
                <option value="shipped">Đã gửi</option>
                <option value="delivered">Đã giao</option>
                <option value="cancelled">Đã hủy</option>
              </select>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Đơn hàng
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Khách hàng
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tổng tiền
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trạng thái
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ngày đặt
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {order.orderNumber}
                        </div>
                        <div className="text-sm text-gray-500">
                          {order.items.length} sản phẩm
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {order.customerName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {order.customerEmail}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {formatCurrency(order.total)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {getStatusIcon(order.status)}
                        {order.status === "pending" && "Chờ xử lý"}
                        {order.status === "processing" && "Đang xử lý"}
                        {order.status === "shipped" && "Đã gửi"}
                        {order.status === "delivered" && "Đã giao"}
                        {order.status === "cancelled" && "Đã hủy"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(order.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button className="text-blue-600 hover:text-blue-900 flex items-center gap-1">
                          <Eye size={16} />
                          Xem
                        </button>
                        <select
                          value={order.status}
                          onChange={(e) =>
                            updateOrderStatus(order.id, e.target.value)
                          }
                          className="text-sm border border-gray-300 rounded px-2 py-1"
                        >
                          <option value="pending">Chờ xử lý</option>
                          <option value="processing">Đang xử lý</option>
                          <option value="shipped">Đã gửi</option>
                          <option value="delivered">Đã giao</option>
                          <option value="cancelled">Đã hủy</option>
                        </select>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredOrders.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-500">Không tìm thấy đơn hàng nào</div>
            </div>
          )}
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-sm font-medium text-gray-500">
              Tổng đơn hàng
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {orders.length}
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-sm font-medium text-gray-500">Chờ xử lý</div>
            <div className="text-2xl font-bold text-yellow-600">
              {orders.filter((o) => o.status === "pending").length}
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-sm font-medium text-gray-500">Đang xử lý</div>
            <div className="text-2xl font-bold text-blue-600">
              {orders.filter((o) => o.status === "processing").length}
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-sm font-medium text-gray-500">Đã giao</div>
            <div className="text-2xl font-bold text-green-600">
              {orders.filter((o) => o.status === "delivered").length}
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-sm font-medium text-gray-500">Doanh thu</div>
            <div className="text-2xl font-bold text-gray-900">
              {formatCurrency(
                orders
                  .filter((o) => o.status === "delivered")
                  .reduce((sum, order) => sum + order.total, 0)
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
