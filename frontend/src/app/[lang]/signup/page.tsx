"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { Eye, EyeOff, Mail, Lock, User, Phone } from "lucide-react";
import { apiService } from "@/services/api";

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name) {
      newErrors.name = "Họ tên là bắt buộc";
    }

    if (!formData.email) {
      newErrors.email = "Email là bắt buộc";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
    }

    if (!formData.phone) {
      newErrors.phone = "Số điện thoại là bắt buộc";
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = "Số điện thoại không hợp lệ";
    }

    if (!formData.password) {
      newErrors.password = "Mật khẩu là bắt buộc";
    } else if (formData.password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Xác nhận mật khẩu là bắt buộc";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu xác nhận không khớp";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const data = await apiService.register({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      });

      // Store token in localStorage
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Redirect to home page
      router.push("/");
    } catch (error) {
      setErrors({
        submit: error instanceof Error ? error.message : "Đăng ký thất bại",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Tạo tài khoản</h2>
            <p className="mt-2 text-gray-600">
              Đã có tài khoản?{" "}
              <Link
                href="/login"
                className="text-blue-600 hover:text-blue-500 font-medium"
              >
                Đăng nhập ngay
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <Card>
            <CardContent className="py-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {errors.submit && (
                  <div className="bg-red-50 border border-red-200 rounded-md p-4">
                    <p className="text-red-600 text-sm">{errors.submit}</p>
                  </div>
                )}

                <div className="relative">
                  <Input
                    label="Họ và tên"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    error={errors.name}
                    placeholder="John Smith"
                    className="pl-10"
                  />
                  <User className="absolute left-3 top-8 h-5 w-5 text-gray-400" />
                </div>

                <div className="relative">
                  <Input
                    label="Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                    placeholder="nhap@email.com"
                    className="pl-10"
                  />
                  <Mail className="absolute left-3 top-8 h-5 w-5 text-gray-400" />
                </div>

                <div className="relative">
                  <Input
                    label="Số điện thoại"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    error={errors.phone}
                    placeholder="0342429911"
                    className="pl-10"
                  />
                  <Phone className="absolute left-3 top-8 h-5 w-5 text-gray-400" />
                </div>

                <div className="relative">
                  <Input
                    label="Mật khẩu"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    error={errors.password}
                    placeholder="Nhập mật khẩu"
                    className="pl-10 pr-10"
                  />
                  <Lock className="absolute left-3 top-8 h-5 w-5 text-gray-400" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-8 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>

                <div className="relative">
                  <Input
                    label="Xác nhận mật khẩu"
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    error={errors.confirmPassword}
                    placeholder="Nhập lại mật khẩu"
                    className="pl-10 pr-10"
                  />
                  <Lock className="absolute left-3 top-8 h-5 w-5 text-gray-400" />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-8 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>

                <div className="flex items-center">
                  <input
                    id="agree-terms"
                    name="agree-terms"
                    type="checkbox"
                    required
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="agree-terms"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Tôi đồng ý với{" "}
                    <Link
                      href="/terms"
                      className="text-blue-600 hover:text-blue-500"
                    >
                      Điều khoản sử dụng
                    </Link>{" "}
                    và{" "}
                    <Link
                      href="/privacy"
                      className="text-blue-600 hover:text-blue-500"
                    >
                      Chính sách bảo mật
                    </Link>
                  </label>
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Đang tạo tài khoản..." : "Tạo tài khoản"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
