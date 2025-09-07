"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import ProductCard from "@/components/products/ProductCard";
import {
  Star,
  ShoppingCart,
  Heart,
  Share2,
  Truck,
  Shield,
  RefreshCw,
  Plus,
  Minus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { apiService } from "@/services/api";

interface Category {
  id: number;
  name: string;
  description: string;
  image: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  stock: number;
  images: string[];
  categoryId: number;
  category: Category;
  isActive: boolean;
  isFeatured: boolean;
  tags: string[];
  sku: string;
  weight: number;
  attributes: Record<string, string | number>;
  createdAt: string;
  updatedAt: string;
}

interface Review {
  id: number;
  userId: number;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = Number(params.id);

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("description");

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);

        // Fetch product details and related products in parallel
        const [productData, relatedProductsData] = await Promise.all([
          apiService.getProduct(productId),
          apiService.getProducts({ limit: 4 }), // Get related products
        ]);

        setProduct(productData);
        // Filter out current product from related products
        setRelatedProducts(
          relatedProductsData
            .filter((p: Product) => p.id !== productId)
            .slice(0, 4)
        );

        // Mock reviews for now (you can add a reviews API later)
        setReviews([
          {
            id: 1,
            userId: 1,
            userName: "Nguyễn Văn A",
            rating: 5,
            comment: "Sản phẩm rất tốt, giao hàng nhanh!",
            createdAt: "2025-01-01T10:00:00Z",
          },
          {
            id: 2,
            userId: 2,
            userName: "Trần Thị B",
            rating: 4,
            comment: "Chất lượng ổn, giá hợp lý.",
            createdAt: "2025-01-02T14:30:00Z",
          },
        ]);
      } catch (error) {
        console.error("Error fetching product:", error);
        setProduct(null);
        setRelatedProducts([]);
        setReviews([]);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProductData();
    }
  }, [productId]);
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const discountPercentage = product?.discountPrice
    ? Math.round(
        ((product.price - product.discountPrice) / product.price) * 100
      )
    : 0;

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
      : 0;

  const handleAddToCart = () => {
    if (product) {
      // Add to cart logic here
      console.log("Adding to cart:", { product, quantity });
    }
  };

  const handleBuyNow = () => {
    if (product) {
      // Navigate to checkout
      router.push(`/checkout?productId=${product.id}&quantity=${quantity}`);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 animate-pulse">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-gray-200 aspect-square rounded-lg"></div>
              <div className="space-y-4">
                <div className="bg-gray-200 h-8 rounded"></div>
                <div className="bg-gray-200 h-6 rounded w-3/4"></div>
                <div className="bg-gray-200 h-12 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Không tìm thấy sản phẩm
            </h2>
            <Button onClick={() => router.push("/products")}>
              Quay lại danh sách sản phẩm
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen">
        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex items-center space-x-2 text-sm">
              <button
                onClick={() => router.push("/")}
                className="text-gray-500 hover:text-gray-700"
              >
                Trang chủ
              </button>
              <span className="text-gray-400">/</span>
              <button
                onClick={() => router.push("/products")}
                className="text-gray-500 hover:text-gray-700"
              >
                Sản phẩm
              </button>
              <span className="text-gray-400">/</span>
              <button
                onClick={() =>
                  router.push(`/products?category=${product.categoryId}`)
                }
                className="text-gray-500 hover:text-gray-700"
              >
                {product.category.name}
              </button>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-medium">{product.name}</span>
            </nav>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="relative aspect-square bg-white rounded-lg overflow-hidden">
                <Image
                  src={product.images[selectedImageIndex]}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
                {product.discountPrice && (
                  <Badge
                    variant="error"
                    className="absolute top-4 left-4 text-sm font-bold"
                  >
                    -{discountPercentage}%
                  </Badge>
                )}
              </div>

              {product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`relative aspect-square bg-white rounded-lg overflow-hidden border-2 transition-colors ${
                        selectedImageIndex === index
                          ? "border-blue-500"
                          : "border-gray-200"
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {product.name}
                </h1>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-5 w-5 ${
                          star <= averageRating
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-sm text-gray-600">
                      ({reviews.length} đánh giá)
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">
                    SKU: {product.sku}
                  </span>
                </div>

                <div className="flex items-center space-x-4 mb-4">
                  {product.discountPrice ? (
                    <>
                      <span className="text-3xl font-bold text-red-600">
                        {formatPrice(product.discountPrice)}
                      </span>
                      <span className="text-xl text-gray-500 line-through">
                        {formatPrice(product.price)}
                      </span>
                    </>
                  ) : (
                    <span className="text-3xl font-bold text-gray-900">
                      {formatPrice(product.price)}
                    </span>
                  )}
                </div>

                <div className="flex items-center space-x-2 mb-6">
                  <Badge variant={product.stock > 0 ? "success" : "error"}>
                    {product.stock > 0
                      ? `Còn ${product.stock} sản phẩm`
                      : "Hết hàng"}
                  </Badge>
                  {product.tags.map((tag) => (
                    <Badge key={tag} variant="info">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Product Attributes */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold">Thông số kỹ thuật</h3>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(product.attributes).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex justify-between py-2 border-b border-gray-200"
                    >
                      <span className="text-gray-600 capitalize">{key}:</span>
                      <span className="font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quantity and Actions */}
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-gray-700">
                    Số lượng:
                  </span>
                  <div className="flex items-center border border-gray-300 rounded-md">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                      className="p-2 hover:bg-gray-100 disabled:opacity-50"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="px-4 py-2 border-l border-r border-gray-300 min-w-[60px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() =>
                        setQuantity(Math.min(product.stock, quantity + 1))
                      }
                      disabled={quantity >= product.stock}
                      className="p-2 hover:bg-gray-100 disabled:opacity-50"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button
                    onClick={handleAddToCart}
                    variant="outline"
                    className="flex-1"
                    disabled={product.stock === 0}
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Thêm vào giỏ
                  </Button>
                  <Button
                    onClick={handleBuyNow}
                    className="flex-1"
                    disabled={product.stock === 0}
                  >
                    Mua ngay
                  </Button>
                </div>

                <div className="flex space-x-4">
                  <Button variant="outline" size="sm">
                    <Heart className="h-4 w-4 mr-2" />
                    Yêu thích
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    Chia sẻ
                  </Button>
                </div>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
                <div className="text-center">
                  <Truck className="h-8 w-8 mx-auto text-blue-600 mb-2" />
                  <div className="text-sm font-medium">Giao hàng miễn phí</div>
                  <div className="text-xs text-gray-500">Đơn hàng từ 500K</div>
                </div>
                <div className="text-center">
                  <Shield className="h-8 w-8 mx-auto text-green-600 mb-2" />
                  <div className="text-sm font-medium">Bảo hành chính hãng</div>
                  <div className="text-xs text-gray-500">12 tháng</div>
                </div>
                <div className="text-center">
                  <RefreshCw className="h-8 w-8 mx-auto text-orange-600 mb-2" />
                  <div className="text-sm font-medium">Đổi trả 7 ngày</div>
                  <div className="text-xs text-gray-500">Miễn phí đổi trả</div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <div className="mt-12">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8">
                {[
                  { id: "description", label: "Mô tả sản phẩm" },
                  { id: "specifications", label: "Thông số kỹ thuật" },
                  { id: "reviews", label: `Đánh giá (${reviews.length})` },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            <div className="py-8">
              {activeTab === "description" && (
                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed">
                    {product.description}
                  </p>
                </div>
              )}

              {activeTab === "specifications" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-4">
                        Thông số chung
                      </h3>
                      <div className="space-y-3">
                        {Object.entries(product.attributes).map(
                          ([key, value]) => (
                            <div
                              key={key}
                              className="flex justify-between py-2 border-b border-gray-200"
                            >
                              <span className="text-gray-600 capitalize">
                                {key}:
                              </span>
                              <span className="font-medium">{value}</span>
                            </div>
                          )
                        )}
                        <div className="flex justify-between py-2 border-b border-gray-200">
                          <span className="text-gray-600">Trọng lượng:</span>
                          <span className="font-medium">
                            {product.weight}kg
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeTab === "reviews" && (
                <div className="space-y-6">
                  {reviews.length > 0 ? (
                    reviews.map((review) => (
                      <Card key={review.id}>
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h4 className="font-semibold">
                                {review.userName}
                              </h4>
                              <div className="flex items-center mt-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    className={`h-4 w-4 ${
                                      star <= review.rating
                                        ? "text-yellow-400 fill-current"
                                        : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                            <span className="text-sm text-gray-500">
                              {new Date(review.createdAt).toLocaleDateString(
                                "vi-VN"
                              )}
                            </span>
                          </div>
                          <p className="text-gray-700">{review.comment}</p>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <div className="text-gray-400 text-6xl mb-4">💬</div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Chưa có đánh giá nào
                      </h3>
                      <p className="text-gray-600">
                        Hãy là người đầu tiên đánh giá sản phẩm này
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Related Products */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Sản phẩm liên quan
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
