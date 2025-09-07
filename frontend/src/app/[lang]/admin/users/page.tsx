"use client";

import React, { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import {
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Plus,
  Shield,
  User,
} from "lucide-react";

// Disable static generation for this page
export const dynamic = "force-dynamic";

interface User {
  id: number;
  email: string;
  name: string;
  role: string;
  status: string;
  createdAt: string;
  lastLogin: string;
  orderCount: number;
  totalSpent: number;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      // Mock data for now - replace with actual API call
      const mockUsers: User[] = [
        {
          id: 1,
          email: "admin@example.com",
          name: "Administrator",
          role: "admin",
          status: "active",
          createdAt: "2024-01-01T00:00:00Z",
          lastLogin: "2024-01-15T10:30:00Z",
          orderCount: 0,
          totalSpent: 0,
        },
        {
          id: 2,
          email: "johnsmith@email.com",
          name: "John Smith",
          role: "customer",
          status: "active",
          createdAt: "2024-01-10T08:00:00Z",
          lastLogin: "2024-01-15T09:20:00Z",
          orderCount: 5,
          totalSpent: 2500000,
        },
        {
          id: 3,
          email: "janedoe@email.com",
          name: "Jane Doe",
          role: "customer",
          status: "active",
          createdAt: "2024-01-12T14:30:00Z",
          lastLogin: "2024-01-14T16:45:00Z",
          orderCount: 3,
          totalSpent: 1800000,
        },
        {
          id: 4,
          email: "mikebrown@email.com",
          name: "Mike Brown",
          role: "customer",
          status: "inactive",
          createdAt: "2024-01-08T12:15:00Z",
          lastLogin: "2024-01-10T11:30:00Z",
          orderCount: 1,
          totalSpent: 500000,
        },
        {
          id: 5,
          email: "phamthid@email.com",
          name: "Phạm Thị D",
          role: "customer",
          status: "banned",
          createdAt: "2024-01-05T09:45:00Z",
          lastLogin: "2024-01-06T14:20:00Z",
          orderCount: 0,
          totalSpent: 0,
        },
      ];
      setUsers(mockUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-yellow-100 text-yellow-800";
      case "banned":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-purple-100 text-purple-800";
      case "customer":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const updateUserStatus = async (userId: number, newStatus: string) => {
    try {
      // Replace with actual API call
      setUsers(
        users.map((user) =>
          user.id === userId ? { ...user, status: newStatus } : user
        )
      );
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };

  const deleteUser = async (userId: number) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa người dùng này?")) {
      try {
        // Replace with actual API call
        setUsers(users.filter((user) => user.id !== userId));
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus =
      statusFilter === "all" || user.status === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
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
          <h1 className="text-3xl font-bold text-gray-900">
            Quản lý người dùng
          </h1>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
            <Plus size={20} />
            Thêm người dùng
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Tìm kiếm theo email hoặc tên..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter size={20} className="text-gray-400" />
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">Tất cả vai trò</option>
                  <option value="admin">Quản trị viên</option>
                  <option value="customer">Khách hàng</option>
                </select>
              </div>
              <div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">Tất cả trạng thái</option>
                  <option value="active">Hoạt động</option>
                  <option value="inactive">Không hoạt động</option>
                  <option value="banned">Bị cấm</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Người dùng
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Vai trò
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trạng thái
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Đơn hàng
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tổng chi tiêu
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Lần cuối đăng nhập
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                            {user.role === "admin" ? (
                              <Shield className="h-5 w-5 text-gray-600" />
                            ) : (
                              <User className="h-5 w-5 text-gray-600" />
                            )}
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {user.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(
                          user.role
                        )}`}
                      >
                        {user.role === "admin" ? "Quản trị viên" : "Khách hàng"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                          user.status
                        )}`}
                      >
                        {user.status === "active" && "Hoạt động"}
                        {user.status === "inactive" && "Không hoạt động"}
                        {user.status === "banned" && "Bị cấm"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.orderCount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatCurrency(user.totalSpent)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(user.lastLogin)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button className="text-blue-600 hover:text-blue-900 flex items-center gap-1">
                          <Eye size={16} />
                          Xem
                        </button>
                        <button className="text-green-600 hover:text-green-900 flex items-center gap-1">
                          <Edit size={16} />
                          Sửa
                        </button>
                        <select
                          value={user.status}
                          onChange={(e) =>
                            updateUserStatus(user.id, e.target.value)
                          }
                          className="text-sm border border-gray-300 rounded px-2 py-1"
                        >
                          <option value="active">Hoạt động</option>
                          <option value="inactive">Không hoạt động</option>
                          <option value="banned">Bị cấm</option>
                        </select>
                        {user.role !== "admin" && (
                          <button
                            onClick={() => deleteUser(user.id)}
                            className="text-red-600 hover:text-red-900 flex items-center gap-1"
                          >
                            <Trash2 size={16} />
                            Xóa
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-500">Không tìm thấy người dùng nào</div>
            </div>
          )}
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-sm font-medium text-gray-500">
              Tổng người dùng
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {users.length}
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-sm font-medium text-gray-500">
              Quản trị viên
            </div>
            <div className="text-2xl font-bold text-purple-600">
              {users.filter((u) => u.role === "admin").length}
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-sm font-medium text-gray-500">
              Khách hàng hoạt động
            </div>
            <div className="text-2xl font-bold text-green-600">
              {
                users.filter(
                  (u) => u.role === "customer" && u.status === "active"
                ).length
              }
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-sm font-medium text-gray-500">Đã bị cấm</div>
            <div className="text-2xl font-bold text-red-600">
              {users.filter((u) => u.status === "banned").length}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
