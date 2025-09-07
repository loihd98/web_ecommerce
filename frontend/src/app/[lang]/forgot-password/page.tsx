"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { Mail, ArrowLeft, CheckCircle } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { apiService } from "@/services/api";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError(t("error.email.required"));
      return;
    }

    if (!validateEmail(email)) {
      setError(t("error.email.invalid"));
      return;
    }

    setLoading(true);

    try {
      await apiService.forgotPassword(email);
      setSuccess(true);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : t("error.forgot.failed");
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    router.back();
  };

  if (success) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-lg dark:bg-gray-800/80">
              <CardContent className="py-12 px-8 text-center">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/30 mb-6">
                  <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>

                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {t("forgot.success.title")}
                </h2>

                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  {t("forgot.success.message")}
                </p>

                <div className="text-sm text-gray-500 dark:text-gray-400 mb-8">
                  <strong className="text-gray-900 dark:text-white">
                    {email}
                  </strong>
                </div>

                <div className="space-y-4">
                  <Button
                    onClick={() => router.push("/login")}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
                  >
                    {t("forgot.back.login")}
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => setSuccess(false)}
                    className="w-full border-gray-300 dark:border-gray-600"
                  >
                    {t("forgot.resend")}
                  </Button>
                </div>
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
              <Mail className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>

            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              {t("forgot.title")}
            </h2>

            <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed">
              {t("forgot.subtitle")}
            </p>
          </div>
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-lg dark:bg-gray-800/80">
            <CardContent className="py-8 px-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-4">
                    <p className="text-red-600 dark:text-red-400 text-sm font-medium">
                      {error}
                    </p>
                  </div>
                )}

                <div className="relative">
                  <Input
                    label={t("auth.email")}
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError("");
                    }}
                    placeholder={t("forgot.email.placeholder")}
                    className="pl-12 h-12 text-base"
                    required
                  />
                  <Mail className="absolute left-4 top-10 h-5 w-5 text-gray-400" />
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-lg transform transition-all duration-200 hover:scale-105"
                  disabled={loading}
                >
                  {loading ? t("forgot.sending") : t("forgot.send")}
                </Button>
              </form>

              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={handleBack}
                  className="w-full flex items-center justify-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors group"
                >
                  <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                  {t("forgot.back")}
                </button>
              </div>
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
