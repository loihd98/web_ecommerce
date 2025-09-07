"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useAppDispatch } from "@/store/hooks";
import { loginStart, loginSuccess, loginFailure } from "@/store/authSlice";
import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { apiService } from "@/services/api";

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
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

    if (!formData.email) {
      newErrors.email = "Email là bắt buộc";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
    }

    if (!formData.password) {
      newErrors.password = "Mật khẩu là bắt buộc";
    } else if (formData.password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
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
    dispatch(loginStart());

    try {
      const data = await apiService.login(formData.email, formData.password);

      // Store token in localStorage
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Update Redux state
      dispatch(
        loginSuccess({
          user: data.user,
          token: data.access_token,
        })
      );

      // Redirect based on user role
      if (data.user.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/");
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Đăng nhập thất bại";
      setErrors({
        submit: errorMessage,
      });
      dispatch(loginFailure(errorMessage));
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: string) => {
    try {
      const result = await signIn(provider, {
        callbackUrl: "/",
        redirect: false,
      });

      if (result?.error) {
        setErrors({ general: "Đăng nhập thất bại. Vui lòng thử lại." });
      }
    } catch (error) {
      console.error("Social login error:", error);
      setErrors({ general: "Đăng nhập thất bại. Vui lòng thử lại." });
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Đăng nhập</h2>
            <p className="mt-2 text-gray-600">
              Hoặc{" "}
              <Link
                href="/signup"
                className="text-blue-600 hover:text-blue-500 font-medium"
              >
                tạo tài khoản mới
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

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-2 block text-sm text-gray-700"
                    >
                      Ghi nhớ đăng nhập
                    </label>
                  </div>

                  <Link
                    href="/forgot-password"
                    className="text-sm text-blue-600 hover:text-blue-500"
                  >
                    Quên mật khẩu?
                  </Link>
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                </Button>
              </form>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">
                      Hoặc đăng nhập với
                    </span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => handleSocialLogin("google")}
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Google
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => handleSocialLogin("facebook")}
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="#1877F2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    Facebook
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
