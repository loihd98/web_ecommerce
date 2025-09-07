"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { Lock, Eye, EyeOff, CheckCircle, AlertCircle } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { apiService } from "@/services/api";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    const tokenParam = searchParams.get("token");
    if (!tokenParam) {
      router.push("/forgot-password");
      return;
    }
    setToken(tokenParam);
  }, [searchParams, router]);

  const validateForm = () => {
    if (!formData.password) {
      setError(t("error.password.required"));
      return false;
    }

    if (formData.password.length < 6) {
      setError(t("error.password.short"));
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError(t("error.password.mismatch"));
      return false;
    }

    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      await apiService.resetPassword(token, formData.password);
      setSuccess(true);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : t("error.reset.failed");
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-lg dark:bg-gray-800/80">
              <CardContent className="py-12 px-8 text-center">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/30 mb-6">
                  <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>

                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {t("reset.success.title")}
                </h2>

                <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                  {t("reset.success.message")}
                </p>

                <Button
                  onClick={() => router.push("/login")}
                  className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white shadow-lg"
                >
                  {t("reset.login")}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="text-center mb-8">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 dark:bg-blue-900/30 mb-6">
              <Lock className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>

            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              {t("reset.title")}
            </h2>

            <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed">
              {t("reset.subtitle")}
            </p>
          </div>
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-lg dark:bg-gray-800/80">
            <CardContent className="py-8 px-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-4 flex items-start">
                    <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-red-600 dark:text-red-400 text-sm font-medium">
                      {error}
                    </p>
                  </div>
                )}

                <div className="relative">
                  <Input
                    label={t("reset.password")}
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder={t("reset.password.placeholder")}
                    className="pl-12 pr-12 h-12 text-base"
                    required
                  />
                  <Lock className="absolute left-4 top-10 h-5 w-5 text-gray-400" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-10 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
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
                    label={t("reset.confirmPassword")}
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder={t("reset.confirmPassword.placeholder")}
                    className="pl-12 pr-12 h-12 text-base"
                    required
                  />
                  <Lock className="absolute left-4 top-10 h-5 w-5 text-gray-400" />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-10 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>

                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {t("reset.requirements")}
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-lg transform transition-all duration-200 hover:scale-105"
                  disabled={loading}
                >
                  {loading ? t("reset.updating") : t("reset.update")}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Background decoration */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 -right-32 w-80 h-80 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-600/20 blur-3xl"></div>
          <div className="absolute -bottom-40 -left-32 w-80 h-80 rounded-full bg-gradient-to-tr from-purple-400/20 to-pink-600/20 blur-3xl"></div>
        </div>
      </div>
    </Layout>
  );
}
