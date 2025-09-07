"use client";

import React, { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { apiService } from "@/services/api";
import { Plus, Search, Edit, Trash2, Eye, Package } from "lucide-react";

// Disable static generation for this page
export const dynamic = "force-dynamic";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  stock: number;
  images: string[];
  categoryId: number;
  category?: any;
  isActive: boolean;
  isFeatured: boolean;
  sku: string;
  createdAt: string;
  updatedAt: string;
}

interface Category {
  id: number;
  name: string;
  description: string;
}

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    discountPrice: "",
    stock: "",
    categoryId: "",
    sku: "",
    isActive: true,
    isFeatured: false,
  });

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await apiService.getProducts();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await apiService.getCategories();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setCategories([]);
    }
  };

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiService.createProduct({
        ...formData,
        price: Number(formData.price),
        discountPrice: formData.discountPrice
          ? Number(formData.discountPrice)
          : undefined,
        stock: Number(formData.stock),
        categoryId: Number(formData.categoryId),
        images: ["/placeholder-product.jpg"], // Default image
        tags: [],
        weight: 0,
        attributes: {},
      });

      setShowCreateModal(false);
      resetForm();
      fetchProducts();
    } catch (error) {
      console.error("Error creating product:", error);
      alert("Error creating product");
    }
  };

  const handleUpdateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    try {
      await apiService.updateProduct(editingProduct.id, {
        ...formData,
        price: Number(formData.price),
        discountPrice: formData.discountPrice
          ? Number(formData.discountPrice)
          : undefined,
        stock: Number(formData.stock),
        categoryId: Number(formData.categoryId),
      });

      setEditingProduct(null);
      resetForm();
      fetchProducts();
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Error updating product");
    }
  };

  const handleDeleteProduct = async (id: number) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      await apiService.deleteProduct(id);
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Error deleting product");
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      discountPrice: "",
      stock: "",
      categoryId: "",
      sku: "",
      isActive: true,
      isFeatured: false,
    });
  };

  const startEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      discountPrice: product.discountPrice?.toString() || "",
      stock: product.stock.toString(),
      categoryId: product.categoryId.toString(),
      sku: product.sku,
      isActive: product.isActive,
      isFeatured: product.isFeatured,
    });
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN");
  };

  return (
    <AdminLayout title="Products Management">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
          </div>
          <Button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Add Product</span>
          </Button>
        </div>

        {/* Products Table */}
        <Card>
          <CardHeader>
            <CardTitle>Products ({filteredProducts.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-8">
                <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No products found</p>
                <Button
                  onClick={() => setShowCreateModal(true)}
                  className="mt-4"
                >
                  Create your first product
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3">Product</th>
                      <th className="text-left p-3">SKU</th>
                      <th className="text-left p-3">Category</th>
                      <th className="text-left p-3">Price</th>
                      <th className="text-left p-3">Stock</th>
                      <th className="text-left p-3">Status</th>
                      <th className="text-left p-3">Created</th>
                      <th className="text-left p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((product) => (
                      <tr
                        key={product.id}
                        className="border-b hover:bg-gray-50"
                      >
                        <td className="p-3">
                          <div>
                            <p className="font-medium">{product.name}</p>
                            <p className="text-sm text-gray-500 truncate max-w-xs">
                              {product.description}
                            </p>
                          </div>
                        </td>
                        <td className="p-3">{product.sku}</td>
                        <td className="p-3">{product.category?.name || "-"}</td>
                        <td className="p-3">
                          <div>
                            <p>{formatPrice(product.price)}</p>
                            {product.discountPrice && (
                              <p className="text-sm text-green-600">
                                {formatPrice(product.discountPrice)}
                              </p>
                            )}
                          </div>
                        </td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              product.stock > 10
                                ? "bg-green-100 text-green-800"
                                : product.stock > 0
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {product.stock}
                          </span>
                        </td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              product.isActive
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {product.isActive ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td className="p-3">{formatDate(product.createdAt)}</td>
                        <td className="p-3">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => startEdit(product)}
                              className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(product.id)}
                              className="p-1 text-red-600 hover:bg-red-50 rounded"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Create/Edit Modal */}
        {(showCreateModal || editingProduct) && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl font-bold mb-4">
                {editingProduct ? "Edit Product" : "Create Product"}
              </h2>

              <form
                onSubmit={
                  editingProduct ? handleUpdateProduct : handleCreateProduct
                }
              >
                <div className="space-y-4">
                  <Input
                    label="Product Name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      className="w-full p-2 border border-gray-300 rounded-md"
                      rows={3}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="Price"
                      type="number"
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({ ...formData, price: e.target.value })
                      }
                      required
                    />
                    <Input
                      label="Discount Price"
                      type="number"
                      value={formData.discountPrice}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          discountPrice: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="Stock"
                      type="number"
                      value={formData.stock}
                      onChange={(e) =>
                        setFormData({ ...formData, stock: e.target.value })
                      }
                      required
                    />
                    <Input
                      label="SKU"
                      value={formData.sku}
                      onChange={(e) =>
                        setFormData({ ...formData, sku: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <select
                      value={formData.categoryId}
                      onChange={(e) =>
                        setFormData({ ...formData, categoryId: e.target.value })
                      }
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    >
                      <option value="">Select Category</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex space-x-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.isActive}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            isActive: e.target.checked,
                          })
                        }
                        className="mr-2"
                      />
                      Active
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.isFeatured}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            isFeatured: e.target.checked,
                          })
                        }
                        className="mr-2"
                      />
                      Featured
                    </label>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowCreateModal(false);
                      setEditingProduct(null);
                      resetForm();
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">
                    {editingProduct ? "Update" : "Create"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
