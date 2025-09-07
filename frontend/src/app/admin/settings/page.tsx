"use client";

import React, { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import {
  Save,
  RefreshCw,
  Bell,
  Shield,
  Mail,
  Globe,
  CreditCard,
} from "lucide-react";

interface Settings {
  general: {
    siteName: string;
    siteDescription: string;
    siteUrl: string;
    contactEmail: string;
    phoneNumber: string;
    address: string;
    currency: string;
    timezone: string;
  };
  email: {
    smtpHost: string;
    smtpPort: string;
    smtpUser: string;
    smtpPassword: string;
    fromEmail: string;
    fromName: string;
  };
  payment: {
    vnpayMerchantId: string;
    vnpaySecretKey: string;
    vnpaySandbox: boolean;
    momoPartnerCode: string;
    momoAccessKey: string;
    momoSecretKey: string;
    momoSandbox: boolean;
  };
  notifications: {
    emailNotifications: boolean;
    orderNotifications: boolean;
    stockNotifications: boolean;
    customerNotifications: boolean;
  };
  security: {
    twoFactorAuth: boolean;
    sessionTimeout: number;
    maxLoginAttempts: number;
    passwordMinLength: number;
    requirePasswordSpecialChars: boolean;
  };
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>({
    general: {
      siteName: "E-Commerce Store",
      siteDescription: "Cửa hàng thương mại điện tử hàng đầu Việt Nam",
      siteUrl: "https://yourstore.com",
      contactEmail: "contact@yourstore.com",
      phoneNumber: "+84 123 456 789",
      address: "123 Đường ABC, Quận 1, TP.HCM",
      currency: "VND",
      timezone: "Asia/Ho_Chi_Minh",
    },
    email: {
      smtpHost: "smtp.gmail.com",
      smtpPort: "587",
      smtpUser: "",
      smtpPassword: "",
      fromEmail: "noreply@yourstore.com",
      fromName: "E-Commerce Store",
    },
    payment: {
      vnpayMerchantId: "",
      vnpaySecretKey: "",
      vnpaySandbox: true,
      momoPartnerCode: "",
      momoAccessKey: "",
      momoSecretKey: "",
      momoSandbox: true,
    },
    notifications: {
      emailNotifications: true,
      orderNotifications: true,
      stockNotifications: true,
      customerNotifications: false,
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: 30,
      maxLoginAttempts: 5,
      passwordMinLength: 8,
      requirePasswordSpecialChars: true,
    },
  });

  const [activeTab, setActiveTab] = useState("general");
  const [loading, setLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState<
    "idle" | "saving" | "saved" | "error"
  >("idle");

  useEffect(() => {
    // Load settings from API
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      // Replace with actual API call
      // const response = await api.get("/admin/settings");
      // setSettings(response.data);
    } catch (error) {
      console.error("Error loading settings:", error);
    }
  };

  const saveSettings = async () => {
    try {
      setLoading(true);
      setSaveStatus("saving");

      // Replace with actual API call
      // await api.put("/admin/settings", settings);

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 2000);
    } catch (error) {
      console.error("Error saving settings:", error);
      setSaveStatus("error");
      setTimeout(() => setSaveStatus("idle"), 2000);
    } finally {
      setLoading(false);
    }
  };

  const updateSetting = (
    section: keyof Settings,
    key: string,
    value: string | number | boolean
  ) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  };

  const tabs = [
    { id: "general", label: "Tổng quan", icon: Globe },
    { id: "email", label: "Email", icon: Mail },
    { id: "payment", label: "Thanh toán", icon: CreditCard },
    { id: "notifications", label: "Thông báo", icon: Bell },
    { id: "security", label: "Bảo mật", icon: Shield },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Cài đặt hệ thống</h1>
          <button
            onClick={saveSettings}
            disabled={loading}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            } text-white transition-colors`}
          >
            {loading ? (
              <RefreshCw size={20} className="animate-spin" />
            ) : (
              <Save size={20} />
            )}
            {saveStatus === "saving" && "Đang lưu..."}
            {saveStatus === "saved" && "Đã lưu!"}
            {saveStatus === "error" && "Lỗi!"}
            {saveStatus === "idle" && "Lưu cài đặt"}
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Tabs */}
          <div className="lg:w-64">
            <nav className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 text-left rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? "bg-blue-100 text-blue-700 border-l-4 border-blue-500"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <Icon size={20} />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              {/* General Settings */}
              {activeTab === "general" && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Cài đặt tổng quan
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tên trang web
                      </label>
                      <input
                        type="text"
                        value={settings.general.siteName}
                        onChange={(e) =>
                          updateSetting("general", "siteName", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        URL trang web
                      </label>
                      <input
                        type="url"
                        value={settings.general.siteUrl}
                        onChange={(e) =>
                          updateSetting("general", "siteUrl", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mô tả trang web
                      </label>
                      <textarea
                        value={settings.general.siteDescription}
                        onChange={(e) =>
                          updateSetting(
                            "general",
                            "siteDescription",
                            e.target.value
                          )
                        }
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email liên hệ
                      </label>
                      <input
                        type="email"
                        value={settings.general.contactEmail}
                        onChange={(e) =>
                          updateSetting(
                            "general",
                            "contactEmail",
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Số điện thoại
                      </label>
                      <input
                        type="tel"
                        value={settings.general.phoneNumber}
                        onChange={(e) =>
                          updateSetting(
                            "general",
                            "phoneNumber",
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Địa chỉ
                      </label>
                      <textarea
                        value={settings.general.address}
                        onChange={(e) =>
                          updateSetting("general", "address", e.target.value)
                        }
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tiền tệ
                      </label>
                      <select
                        value={settings.general.currency}
                        onChange={(e) =>
                          updateSetting("general", "currency", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="VND">VND (Vietnamese Dong)</option>
                        <option value="USD">USD (US Dollar)</option>
                        <option value="EUR">EUR (Euro)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Múi giờ
                      </label>
                      <select
                        value={settings.general.timezone}
                        onChange={(e) =>
                          updateSetting("general", "timezone", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="Asia/Ho_Chi_Minh">
                          Asia/Ho_Chi_Minh
                        </option>
                        <option value="UTC">UTC</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Email Settings */}
              {activeTab === "email" && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Cài đặt Email
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        SMTP Host
                      </label>
                      <input
                        type="text"
                        value={settings.email.smtpHost}
                        onChange={(e) =>
                          updateSetting("email", "smtpHost", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        SMTP Port
                      </label>
                      <input
                        type="text"
                        value={settings.email.smtpPort}
                        onChange={(e) =>
                          updateSetting("email", "smtpPort", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        SMTP Username
                      </label>
                      <input
                        type="text"
                        value={settings.email.smtpUser}
                        onChange={(e) =>
                          updateSetting("email", "smtpUser", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        SMTP Password
                      </label>
                      <input
                        type="password"
                        value={settings.email.smtpPassword}
                        onChange={(e) =>
                          updateSetting("email", "smtpPassword", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        From Email
                      </label>
                      <input
                        type="email"
                        value={settings.email.fromEmail}
                        onChange={(e) =>
                          updateSetting("email", "fromEmail", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        From Name
                      </label>
                      <input
                        type="text"
                        value={settings.email.fromName}
                        onChange={(e) =>
                          updateSetting("email", "fromName", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Payment Settings */}
              {activeTab === "payment" && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Cài đặt Thanh toán
                  </h2>

                  {/* VNPay Settings */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      VNPay
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Merchant ID
                        </label>
                        <input
                          type="text"
                          value={settings.payment.vnpayMerchantId}
                          onChange={(e) =>
                            updateSetting(
                              "payment",
                              "vnpayMerchantId",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Secret Key
                        </label>
                        <input
                          type="password"
                          value={settings.payment.vnpaySecretKey}
                          onChange={(e) =>
                            updateSetting(
                              "payment",
                              "vnpaySecretKey",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="vnpaySandbox"
                          checked={settings.payment.vnpaySandbox}
                          onChange={(e) =>
                            updateSetting(
                              "payment",
                              "vnpaySandbox",
                              e.target.checked
                            )
                          }
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label
                          htmlFor="vnpaySandbox"
                          className="ml-2 block text-sm text-gray-900"
                        >
                          Chế độ sandbox (thử nghiệm)
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* MoMo Settings */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      MoMo
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Partner Code
                        </label>
                        <input
                          type="text"
                          value={settings.payment.momoPartnerCode}
                          onChange={(e) =>
                            updateSetting(
                              "payment",
                              "momoPartnerCode",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Access Key
                        </label>
                        <input
                          type="text"
                          value={settings.payment.momoAccessKey}
                          onChange={(e) =>
                            updateSetting(
                              "payment",
                              "momoAccessKey",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Secret Key
                        </label>
                        <input
                          type="password"
                          value={settings.payment.momoSecretKey}
                          onChange={(e) =>
                            updateSetting(
                              "payment",
                              "momoSecretKey",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="momoSandbox"
                          checked={settings.payment.momoSandbox}
                          onChange={(e) =>
                            updateSetting(
                              "payment",
                              "momoSandbox",
                              e.target.checked
                            )
                          }
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label
                          htmlFor="momoSandbox"
                          className="ml-2 block text-sm text-gray-900"
                        >
                          Chế độ sandbox (thử nghiệm)
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Notification Settings */}
              {activeTab === "notifications" && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Cài đặt Thông báo
                  </h2>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium text-gray-900">
                          Thông báo email
                        </label>
                        <p className="text-sm text-gray-500">
                          Bật/tắt tất cả thông báo qua email
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        checked={settings.notifications.emailNotifications}
                        onChange={(e) =>
                          updateSetting(
                            "notifications",
                            "emailNotifications",
                            e.target.checked
                          )
                        }
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium text-gray-900">
                          Thông báo đơn hàng
                        </label>
                        <p className="text-sm text-gray-500">
                          Nhận thông báo khi có đơn hàng mới
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        checked={settings.notifications.orderNotifications}
                        onChange={(e) =>
                          updateSetting(
                            "notifications",
                            "orderNotifications",
                            e.target.checked
                          )
                        }
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium text-gray-900">
                          Thông báo tồn kho
                        </label>
                        <p className="text-sm text-gray-500">
                          Nhận thông báo khi sản phẩm sắp hết hàng
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        checked={settings.notifications.stockNotifications}
                        onChange={(e) =>
                          updateSetting(
                            "notifications",
                            "stockNotifications",
                            e.target.checked
                          )
                        }
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium text-gray-900">
                          Thông báo khách hàng
                        </label>
                        <p className="text-sm text-gray-500">
                          Gửi email thông báo tới khách hàng
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        checked={settings.notifications.customerNotifications}
                        onChange={(e) =>
                          updateSetting(
                            "notifications",
                            "customerNotifications",
                            e.target.checked
                          )
                        }
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Security Settings */}
              {activeTab === "security" && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Cài đặt Bảo mật
                  </h2>

                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium text-gray-900">
                          Xác thực hai yếu tố
                        </label>
                        <p className="text-sm text-gray-500">
                          Yêu cầu xác thực bổ sung khi đăng nhập
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        checked={settings.security.twoFactorAuth}
                        onChange={(e) =>
                          updateSetting(
                            "security",
                            "twoFactorAuth",
                            e.target.checked
                          )
                        }
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Thời gian hết hạn phiên (phút)
                      </label>
                      <input
                        type="number"
                        value={settings.security.sessionTimeout}
                        onChange={(e) =>
                          updateSetting(
                            "security",
                            "sessionTimeout",
                            parseInt(e.target.value)
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Số lần đăng nhập sai tối đa
                      </label>
                      <input
                        type="number"
                        value={settings.security.maxLoginAttempts}
                        onChange={(e) =>
                          updateSetting(
                            "security",
                            "maxLoginAttempts",
                            parseInt(e.target.value)
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Độ dài mật khẩu tối thiểu
                      </label>
                      <input
                        type="number"
                        value={settings.security.passwordMinLength}
                        onChange={(e) =>
                          updateSetting(
                            "security",
                            "passwordMinLength",
                            parseInt(e.target.value)
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium text-gray-900">
                          Yêu cầu ký tự đặc biệt trong mật khẩu
                        </label>
                        <p className="text-sm text-gray-500">
                          Mật khẩu phải có ít nhất một ký tự đặc biệt
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        checked={settings.security.requirePasswordSpecialChars}
                        onChange={(e) =>
                          updateSetting(
                            "security",
                            "requirePasswordSpecialChars",
                            e.target.checked
                          )
                        }
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
