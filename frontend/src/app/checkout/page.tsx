"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import {
  CreditCard,
  Truck,
  MapPin,
  User,
  Phone,
  Mail,
  Lock,
  CheckCircle,
} from "lucide-react";
import { apiService } from "@/services/api";

interface CartItem {
  id: number;
  name: string;
  price: number;
  discountPrice?: number;
  quantity: number;
  image: string;
}

interface ShippingInfo {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  district: string;
  ward: string;
  notes: string;
}

interface PaymentInfo {
  method: "cod" | "card" | "momo" | "vnpay";
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardName: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Review, 4: Success
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);

  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    district: "",
    ward: "",
    notes: "",
  });

  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    method: "cod",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    // Mock cart data
    const mockCartItems: CartItem[] = [
      {
        id: 1,
        name: "iPhone 15 Pro Max 256GB",
        price: 29990000,
        discountPrice: 27990000,
        quantity: 1,
        image: "/placeholder-product.jpg",
      },
      {
        id: 2,
        name: "Samsung Galaxy S24 Ultra",
        price: 31990000,
        discountPrice: 29990000,
        quantity: 1,
        image: "/placeholder-product.jpg",
      },
    ];
    setCartItems(mockCartItems);
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const itemPrice = item.discountPrice || item.price;
      return total + itemPrice * item.quantity;
    }, 0);
  };

  const calculateShipping = () => {
    const subtotal = calculateSubtotal();
    return subtotal >= 500000 ? 0 : 30000;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateShipping();
  };

  const validateShipping = () => {
    const newErrors: { [key: string]: string } = {};

    if (!shippingInfo.fullName) newErrors.fullName = "Họ tên là bắt buộc";
    if (!shippingInfo.phone) newErrors.phone = "Số điện thoại là bắt buộc";
    if (!shippingInfo.email) newErrors.email = "Email là bắt buộc";
    if (!shippingInfo.address) newErrors.address = "Địa chỉ là bắt buộc";
    if (!shippingInfo.city) newErrors.city = "Tỉnh/Thành phố là bắt buộc";
    if (!shippingInfo.district) newErrors.district = "Quận/Huyện là bắt buộc";
    if (!shippingInfo.ward) newErrors.ward = "Phường/Xã là bắt buộc";

    if (shippingInfo.email && !/\S+@\S+\.\S+/.test(shippingInfo.email)) {
      newErrors.email = "Email không hợp lệ";
    }

    if (shippingInfo.phone && !/^[0-9]{10}$/.test(shippingInfo.phone)) {
      newErrors.phone = "Số điện thoại không hợp lệ";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePayment = () => {
    if (paymentInfo.method === "cod") return true;

    const newErrors: { [key: string]: string } = {};

    if (!paymentInfo.cardNumber) newErrors.cardNumber = "Số thẻ là bắt buộc";
    if (!paymentInfo.expiryDate)
      newErrors.expiryDate = "Ngày hết hạn là bắt buộc";
    if (!paymentInfo.cvv) newErrors.cvv = "CVV là bắt buộc";
    if (!paymentInfo.cardName) newErrors.cardName = "Tên chủ thẻ là bắt buộc";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (step === 1 && validateShipping()) {
      setStep(2);
    } else if (step === 2 && validatePayment()) {
      setStep(3);
    } else if (step === 3) {
      handlePlaceOrder();
    }
  };

  const handlePlaceOrder = async () => {
    setLoading(true);

    try {
      // Prepare order data
      const orderData = {
        items: cartItems.map((item) => ({
          productId: item.id,
          productName: item.name,
          price: item.discountPrice || item.price,
          discountPrice: item.discountPrice,
          quantity: item.quantity,
          productAttributes: {},
        })),
        shippingInfo,
        paymentMethod: paymentInfo.method,
        subtotal: calculateSubtotal(),
        shippingFee: calculateShipping(),
        discount: 0,
        total: calculateTotal(),
      };

      // Call API to create order
      const order = await apiService.createOrder(orderData);
      console.log("Order created successfully:", order);

      setStep(4);
    } catch (error) {
      console.error("Order failed:", error);
      // You can add error handling here, e.g., show error message
    } finally {
      setLoading(false);
    }
  };

  const renderShippingForm = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative">
          <Input
            label="Họ và tên *"
            value={shippingInfo.fullName}
            onChange={(e) =>
              setShippingInfo({ ...shippingInfo, fullName: e.target.value })
            }
            error={errors.fullName}
            className="pl-10"
          />
          <User className="absolute left-3 top-8 h-5 w-5 text-gray-400" />
        </div>

        <div className="relative">
          <Input
            label="Số điện thoại *"
            value={shippingInfo.phone}
            onChange={(e) =>
              setShippingInfo({ ...shippingInfo, phone: e.target.value })
            }
            error={errors.phone}
            className="pl-10"
          />
          <Phone className="absolute left-3 top-8 h-5 w-5 text-gray-400" />
        </div>
      </div>

      <div className="relative">
        <Input
          label="Email *"
          type="email"
          value={shippingInfo.email}
          onChange={(e) =>
            setShippingInfo({ ...shippingInfo, email: e.target.value })
          }
          error={errors.email}
          className="pl-10"
        />
        <Mail className="absolute left-3 top-8 h-5 w-5 text-gray-400" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <select
          value={shippingInfo.city}
          onChange={(e) =>
            setShippingInfo({ ...shippingInfo, city: e.target.value })
          }
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Chọn Tỉnh/Thành phố</option>
          <option value="hanoi">Hà Nội</option>
          <option value="hcm">TP. Hồ Chí Minh</option>
          <option value="danang">Đà Nẵng</option>
        </select>

        <select
          value={shippingInfo.district}
          onChange={(e) =>
            setShippingInfo({ ...shippingInfo, district: e.target.value })
          }
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Chọn Quận/Huyện</option>
          <option value="district1">Quận 1</option>
          <option value="district2">Quận 2</option>
          <option value="district3">Quận 3</option>
        </select>

        <select
          value={shippingInfo.ward}
          onChange={(e) =>
            setShippingInfo({ ...shippingInfo, ward: e.target.value })
          }
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Chọn Phường/Xã</option>
          <option value="ward1">Phường 1</option>
          <option value="ward2">Phường 2</option>
          <option value="ward3">Phường 3</option>
        </select>
      </div>

      <div className="relative">
        <Input
          label="Địa chỉ cụ thể *"
          value={shippingInfo.address}
          onChange={(e) =>
            setShippingInfo({ ...shippingInfo, address: e.target.value })
          }
          error={errors.address}
          placeholder="Số nhà, tên đường..."
          className="pl-10"
        />
        <MapPin className="absolute left-3 top-8 h-5 w-5 text-gray-400" />
      </div>

      <Input
        label="Ghi chú (tùy chọn)"
        value={shippingInfo.notes}
        onChange={(e) =>
          setShippingInfo({ ...shippingInfo, notes: e.target.value })
        }
        placeholder="Ghi chú thêm cho đơn hàng..."
      />
    </div>
  );

  const renderPaymentForm = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Chọn phương thức thanh toán</h3>

        <div className="space-y-3">
          <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
            <input
              type="radio"
              name="paymentMethod"
              value="cod"
              checked={paymentInfo.method === "cod"}
              onChange={(e) =>
                setPaymentInfo({
                  ...paymentInfo,
                  method: e.target.value as any,
                })
              }
              className="mr-3"
            />
            <Truck className="h-5 w-5 mr-3 text-green-600" />
            <div>
              <div className="font-medium">Thanh toán khi nhận hàng (COD)</div>
              <div className="text-sm text-gray-500">
                Thanh toán bằng tiền mặt khi nhận hàng
              </div>
            </div>
          </label>

          <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
            <input
              type="radio"
              name="paymentMethod"
              value="card"
              checked={paymentInfo.method === "card"}
              onChange={(e) =>
                setPaymentInfo({
                  ...paymentInfo,
                  method: e.target.value as any,
                })
              }
              className="mr-3"
            />
            <CreditCard className="h-5 w-5 mr-3 text-blue-600" />
            <div>
              <div className="font-medium">Thẻ tín dụng/Ghi nợ</div>
              <div className="text-sm text-gray-500">Visa, Mastercard, JCB</div>
            </div>
          </label>

          <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
            <input
              type="radio"
              name="paymentMethod"
              value="momo"
              checked={paymentInfo.method === "momo"}
              onChange={(e) =>
                setPaymentInfo({
                  ...paymentInfo,
                  method: e.target.value as any,
                })
              }
              className="mr-3"
            />
            <div className="h-5 w-5 mr-3 bg-pink-500 rounded"></div>
            <div>
              <div className="font-medium">Ví MoMo</div>
              <div className="text-sm text-gray-500">
                Thanh toán qua ví điện tử MoMo
              </div>
            </div>
          </label>

          <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
            <input
              type="radio"
              name="paymentMethod"
              value="vnpay"
              checked={paymentInfo.method === "vnpay"}
              onChange={(e) =>
                setPaymentInfo({
                  ...paymentInfo,
                  method: e.target.value as any,
                })
              }
              className="mr-3"
            />
            <div className="h-5 w-5 mr-3 bg-blue-600 rounded"></div>
            <div>
              <div className="font-medium">VNPay</div>
              <div className="text-sm text-gray-500">Thanh toán qua VNPay</div>
            </div>
          </label>
        </div>
      </div>

      {paymentInfo.method === "card" && (
        <div className="space-y-4 mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium">Thông tin thẻ</h4>

          <Input
            label="Số thẻ *"
            value={paymentInfo.cardNumber}
            onChange={(e) =>
              setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })
            }
            error={errors.cardNumber}
            placeholder="1234 5678 9012 3456"
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Ngày hết hạn *"
              value={paymentInfo.expiryDate}
              onChange={(e) =>
                setPaymentInfo({ ...paymentInfo, expiryDate: e.target.value })
              }
              error={errors.expiryDate}
              placeholder="MM/YY"
            />

            <div className="relative">
              <Input
                label="CVV *"
                value={paymentInfo.cvv}
                onChange={(e) =>
                  setPaymentInfo({ ...paymentInfo, cvv: e.target.value })
                }
                error={errors.cvv}
                placeholder="123"
                className="pl-10"
              />
              <Lock className="absolute left-3 top-8 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <Input
            label="Tên chủ thẻ *"
            value={paymentInfo.cardName}
            onChange={(e) =>
              setPaymentInfo({ ...paymentInfo, cardName: e.target.value })
            }
            error={errors.cardName}
            placeholder="NGUYEN VAN A"
          />
        </div>
      )}
    </div>
  );

  const renderOrderReview = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Thông tin giao hàng</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-medium">{shippingInfo.fullName}</p>
          <p>{shippingInfo.phone}</p>
          <p>{shippingInfo.email}</p>
          <p>
            {shippingInfo.address}, {shippingInfo.ward}, {shippingInfo.district}
            , {shippingInfo.city}
          </p>
          {shippingInfo.notes && (
            <p className="text-gray-600 mt-2">Ghi chú: {shippingInfo.notes}</p>
          )}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Phương thức thanh toán</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-medium">
            {paymentInfo.method === "cod" && "Thanh toán khi nhận hàng (COD)"}
            {paymentInfo.method === "card" && "Thẻ tín dụng/Ghi nợ"}
            {paymentInfo.method === "momo" && "Ví MoMo"}
            {paymentInfo.method === "vnpay" && "VNPay"}
          </p>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Sản phẩm đặt hàng</h3>
        <div className="space-y-3">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-gray-600">Số lượng: {item.quantity}</p>
                </div>
              </div>
              <p className="font-medium">
                {formatPrice(
                  (item.discountPrice || item.price) * item.quantity
                )}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  if (step === 4) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <Card className="max-w-md w-full mx-4">
            <CardContent className="p-8 text-center">
              <CheckCircle className="h-16 w-16 mx-auto text-green-600 mb-6" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Đặt hàng thành công!
              </h2>
              <p className="text-gray-600 mb-6">
                Cảm ơn bạn đã đặt hàng. Chúng tôi sẽ liên hệ với bạn sớm nhất.
              </p>
              <div className="space-y-3">
                <Button
                  onClick={() => router.push("/orders")}
                  className="w-full"
                >
                  Xem đơn hàng
                </Button>
                <Button
                  onClick={() => router.push("/")}
                  variant="outline"
                  className="w-full"
                >
                  Về trang chủ
                </Button>
              </div>
            </CardContent>
          </Card>
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
            <h1 className="text-3xl font-bold text-gray-900">Thanh toán</h1>

            {/* Steps */}
            <div className="mt-6 flex items-center">
              {[
                { number: 1, title: "Thông tin giao hàng" },
                { number: 2, title: "Thanh toán" },
                { number: 3, title: "Xác nhận" },
              ].map((stepInfo, index) => (
                <div key={stepInfo.number} className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                      step >= stepInfo.number
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {stepInfo.number}
                  </div>
                  <span
                    className={`ml-2 text-sm ${
                      step >= stepInfo.number
                        ? "text-blue-600 font-medium"
                        : "text-gray-500"
                    }`}
                  >
                    {stepInfo.title}
                  </span>
                  {index < 2 && (
                    <div
                      className={`mx-4 h-px w-12 ${
                        step > stepInfo.number ? "bg-blue-600" : "bg-gray-300"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {step === 1 && "Thông tin giao hàng"}
                    {step === 2 && "Phương thức thanh toán"}
                    {step === 3 && "Xác nhận đơn hàng"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {step === 1 && renderShippingForm()}
                  {step === 2 && renderPaymentForm()}
                  {step === 3 && renderOrderReview()}
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Tóm tắt đơn hàng</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between text-sm"
                      >
                        <span>
                          {item.name} x{item.quantity}
                        </span>
                        <span>
                          {formatPrice(
                            (item.discountPrice || item.price) * item.quantity
                          )}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between">
                      <span>Tạm tính:</span>
                      <span>{formatPrice(calculateSubtotal())}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Phí vận chuyển:</span>
                      <span>
                        {calculateShipping() === 0 ? (
                          <span className="text-green-600">Miễn phí</span>
                        ) : (
                          formatPrice(calculateShipping())
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between text-lg font-bold border-t pt-2">
                      <span>Tổng cộng:</span>
                      <span className="text-blue-600">
                        {formatPrice(calculateTotal())}
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 space-y-3">
                    {step > 1 && (
                      <Button
                        onClick={() => setStep(step - 1)}
                        variant="outline"
                        className="w-full"
                      >
                        Quay lại
                      </Button>
                    )}

                    <Button
                      onClick={handleNextStep}
                      className="w-full"
                      disabled={loading}
                    >
                      {loading
                        ? "Đang xử lý..."
                        : step === 3
                        ? "Đặt hàng"
                        : "Tiếp tục"}
                    </Button>
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
