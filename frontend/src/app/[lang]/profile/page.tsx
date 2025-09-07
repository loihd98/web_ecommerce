"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import {
  User,
  Mail,
  Phone,
  Lock,
  Settings,
  Package,
  Heart,
  LogOut,
} from "lucide-react";
import { apiService } from "@/services/api";

interface UserProfile {
  id: number;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  createdAt: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/login");
          return;
        }

        const profileData = await apiService.getProfile();
        setUser(profileData);
        setFormData({
          name: profileData.name,
          email: profileData.email,
          phone: profileData.phone,
        });
      } catch (error) {
        console.error("Error fetching profile:", error);
        // If token is invalid, redirect to login
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/");
  };

  const handleUpdateProfile = async () => {
    try {
      setLoading(true);
      const updatedUser = await apiService.updateProfile(formData);
      setUser(updatedUser);
      setIsEditing(false);

      // Update localStorage
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (error) {
      console.error("Error updating profile:", error);
      setErrors({ submit: "Cập nhật thông tin thất bại" });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Đang tải...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Tài khoản của tôi
            </h1>
            <p className="text-gray-600">
              Quản lý thông tin tài khoản và đơn hàng
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center mb-6">
                    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                      <User className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-lg">{user.name}</h3>
                    <p className="text-gray-600 text-sm">{user.email}</p>
                  </div>

                  <nav className="space-y-2">
                    <button
                      onClick={() => setActiveTab("profile")}
                      className={`w-full flex items-center px-4 py-2 text-left rounded-lg transition-colors ${
                        activeTab === "profile"
                          ? "bg-blue-50 text-blue-600"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      <User className="w-5 h-5 mr-3" />
                      Thông tin cá nhân
                    </button>

                    <button
                      onClick={() => {
                        setActiveTab("orders");
                        router.push("/orders");
                      }}
                      className={`w-full flex items-center px-4 py-2 text-left rounded-lg transition-colors hover:bg-gray-50`}
                    >
                      <Package className="w-5 h-5 mr-3" />
                      Đơn hàng của tôi
                    </button>

                    <button
                      onClick={() => setActiveTab("security")}
                      className={`w-full flex items-center px-4 py-2 text-left rounded-lg transition-colors ${
                        activeTab === "security"
                          ? "bg-blue-50 text-blue-600"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      <Lock className="w-5 h-5 mr-3" />
                      Bảo mật
                    </button>

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center px-4 py-2 text-left rounded-lg transition-colors hover:bg-red-50 text-red-600"
                    >
                      <LogOut className="w-5 h-5 mr-3" />
                      Đăng xuất
                    </button>
                  </nav>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {activeTab === "profile" && (
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>Thông tin cá nhân</CardTitle>
                      <Button
                        variant={isEditing ? "outline" : "primary"}
                        onClick={() => setIsEditing(!isEditing)}
                      >
                        {isEditing ? "Hủy" : "Chỉnh sửa"}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {errors.submit && (
                      <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
                        <p className="text-red-600 text-sm">{errors.submit}</p>
                      </div>
                    )}

                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Input
                            label="Họ và tên"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className={!isEditing ? "bg-gray-50" : ""}
                          />
                        </div>
                        <div>
                          <Input
                            label="Email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className={!isEditing ? "bg-gray-50" : ""}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Input
                            label="Số điện thoại"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className={!isEditing ? "bg-gray-50" : ""}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Ngày tham gia
                          </label>
                          <input
                            type="text"
                            value={new Date(user.createdAt).toLocaleDateString(
                              "vi-VN"
                            )}
                            disabled
                            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
                          />
                        </div>
                      </div>

                      {isEditing && (
                        <div className="flex gap-4">
                          <Button
                            onClick={handleUpdateProfile}
                            disabled={loading}
                            className="flex-1"
                          >
                            {loading ? "Đang cập nhật..." : "Lưu thay đổi"}
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              {activeTab === "security" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Bảo mật tài khoản</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="border rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Mật khẩu</h4>
                            <p className="text-sm text-gray-600">
                              Cập nhật mật khẩu định kỳ để bảo mật tài khoản
                            </p>
                          </div>
                          <Button variant="outline" size="sm">
                            Đổi mật khẩu
                          </Button>
                        </div>
                      </div>

                      <div className="border rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Xác thực 2 bước</h4>
                            <p className="text-sm text-gray-600">
                              Thêm lớp bảo mật cho tài khoản của bạn
                            </p>
                          </div>
                          <Button variant="outline" size="sm">
                            Kích hoạt
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
