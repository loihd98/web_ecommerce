"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import {
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  Tag,
  Truck,
} from "lucide-react";

// Disable static generation for this page
export const dynamic = "force-dynamic";

interface CartItem {
  id: number;
  productId: number;
  name: string;
  price: number;
  discountPrice?: number;
  image: string;
  quantity: number;
  stock: number;
  attributes: Record<string, string | number>;
}

export default function CartPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{
    code: string;
    discount: number;
  } | null>(null);

  useEffect(() => {
    // Mock cart data for demo
    const mockCartItems: CartItem[] = [
      {
        id: 1,
        productId: 1,
        name: "iPhone 15 Pro Max 256GB",
        price: 29990000,
        discountPrice: 27990000,
        image: "/placeholder-product.jpg",
        quantity: 1,
        stock: 15,
        attributes: { color: "Titan Tự Nhiên", storage: "256GB" },
      },
      {
        id: 2,
        productId: 3,
        name: "Samsung Galaxy S24 Ultra",
        price: 31990000,
        discountPrice: 29990000,
        image: "/placeholder-product.jpg",
        quantity: 2,
        stock: 12,
        attributes: { color: "Đen Titan", storage: "256GB" },
      },
      {
        id: 3,
        productId: 6,
        name: "Nồi cơm điện Panasonic 1.8L",
        price: 2990000,
        discountPrice: 2490000,
        image: "/placeholder-product.jpg",
        quantity: 1,
        stock: 25,
        attributes: { capacity: "1.8L", brand: "Panasonic" },
      },
    ];

    setTimeout(() => {
      setCartItems(mockCartItems);
      setLoading(false);
    }, 1000);
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;

    setCartItems((items) =>
      items.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: Math.min(newQuantity, item.stock) };
        }
        return item;
      })
    );
  };

  const removeItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const applyCoupon = () => {
    // Mock coupon validation
    const validCoupons = {
      SAVE10: { discount: 0.1, description: "Giảm 10%" },
      WELCOME20: { discount: 0.2, description: "Giảm 20% cho khách hàng mới" },
      FREESHIP: { discount: 50000, description: "Miễn phí vận chuyển" },
    };

    if (validCoupons[couponCode as keyof typeof validCoupons]) {
      setAppliedCoupon({
        code: couponCode,
        discount:
          validCoupons[couponCode as keyof typeof validCoupons].discount,
      });
      setCouponCode("");
    } else {
      alert("Mã giảm giá không hợp lệ");
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const itemPrice = item.discountPrice || item.price;
      return total + itemPrice * item.quantity;
    }, 0);
  };

  const calculateDiscount = () => {
    if (!appliedCoupon) return 0;

    const subtotal = calculateSubtotal();
    if (appliedCoupon.discount < 1) {
      // Percentage discount
      return subtotal * appliedCoupon.discount;
    } else {
      // Fixed amount discount
      return appliedCoupon.discount;
    }
  };

  const calculateShipping = () => {
    const subtotal = calculateSubtotal();
    if (appliedCoupon?.code === "FREESHIP" || subtotal >= 500000) {
      return 0;
    }
    return 30000; // Default shipping fee
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const discount = calculateDiscount();
    const shipping = calculateShipping();
    return subtotal - discount + shipping;
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    router.push("/checkout");
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 animate-pulse">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-gray-200 h-32 rounded-lg"></div>
                ))}
              </div>
              <div className="bg-gray-200 h-96 rounded-lg"></div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (cartItems.length === 0) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <ShoppingBag className="h-24 w-24 mx-auto text-gray-400 mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Giỏ hàng của bạn đang trống
            </h2>
            <p className="text-gray-600 mb-8">
              Hãy thêm một số sản phẩm vào giỏ hàng để tiếp tục mua sắm
            </p>
            <Button onClick={() => router.push("/products")}>
              Tiếp tục mua sắm
            </Button>
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
            <h1 className="text-3xl font-bold text-gray-900">Giỏ hàng</h1>
            <p className="mt-2 text-gray-600">
              {cartItems.length} sản phẩm trong giỏ hàng
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="relative w-20 h-20 bg-gray-200 rounded-lg overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <Link
                          href={`/products/${item.productId}`}
                          className="text-lg font-semibold text-gray-900 hover:text-blue-600 line-clamp-2"
                        >
                          {item.name}
                        </Link>
                        <div className="mt-1 flex flex-wrap gap-2">
                          {Object.entries(item.attributes).map(
                            ([key, value]) => (
                              <Badge
                                key={key}
                                variant="info"
                                className="text-xs"
                              >
                                {key}: {value}
                              </Badge>
                            )
                          )}
                        </div>
                        <div className="mt-2 flex items-center space-x-2">
                          {item.discountPrice ? (
                            <>
                              <span className="text-lg font-bold text-red-600">
                                {formatPrice(item.discountPrice)}
                              </span>
                              <span className="text-sm text-gray-500 line-through">
                                {formatPrice(item.price)}
                              </span>
                            </>
                          ) : (
                            <span className="text-lg font-bold text-gray-900">
                              {formatPrice(item.price)}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col items-end space-y-4">
                        <div className="flex items-center border border-gray-300 rounded-md">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            disabled={item.quantity <= 1}
                            className="p-2 hover:bg-gray-100 disabled:opacity-50"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="px-4 py-2 border-l border-r border-gray-300 min-w-[60px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            disabled={item.quantity >= item.stock}
                            className="p-2 hover:bg-gray-100 disabled:opacity-50"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-600 hover:text-red-800 p-2"
                          title="Xóa sản phẩm"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              {/* Coupon Code */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Tag className="h-5 w-5 mr-2" />
                    Mã giảm giá
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {appliedCoupon ? (
                    <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-md">
                      <div>
                        <span className="text-sm font-medium text-green-800">
                          {appliedCoupon.code}
                        </span>
                        <div className="text-xs text-green-600">
                          Giảm{" "}
                          {appliedCoupon.discount < 1
                            ? `${appliedCoupon.discount * 100}%`
                            : formatPrice(appliedCoupon.discount)}
                        </div>
                      </div>
                      <button
                        onClick={removeCoupon}
                        className="text-green-600 hover:text-green-800"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Nhập mã giảm giá"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <Button onClick={applyCoupon} variant="outline">
                        Áp dụng
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Order Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Tóm tắt đơn hàng</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Tạm tính:</span>
                    <span>{formatPrice(calculateSubtotal())}</span>
                  </div>

                  {appliedCoupon && (
                    <div className="flex justify-between text-green-600">
                      <span>Giảm giá:</span>
                      <span>-{formatPrice(calculateDiscount())}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span className="flex items-center">
                      <Truck className="h-4 w-4 mr-1" />
                      Phí vận chuyển:
                    </span>
                    <span>
                      {calculateShipping() === 0 ? (
                        <span className="text-green-600">Miễn phí</span>
                      ) : (
                        formatPrice(calculateShipping())
                      )}
                    </span>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Tổng cộng:</span>
                      <span className="text-blue-600">
                        {formatPrice(calculateTotal())}
                      </span>
                    </div>
                  </div>

                  <Button
                    onClick={handleCheckout}
                    className="w-full mt-6"
                    size="lg"
                  >
                    Thanh toán
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>

                  <div className="text-center">
                    <Link
                      href="/products"
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      ← Tiếp tục mua sắm
                    </Link>
                  </div>
                </CardContent>
              </Card>

              {/* Benefits */}
              <Card>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <Truck className="h-4 w-4 mr-2 text-blue-600" />
                      Miễn phí vận chuyển cho đơn hàng từ 500K
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Tag className="h-4 w-4 mr-2 text-green-600" />
                      Đổi trả miễn phí trong 7 ngày
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
