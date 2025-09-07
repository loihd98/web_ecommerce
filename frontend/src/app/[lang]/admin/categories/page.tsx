"use client";

import React, { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { apiService } from "@/services/api";
import { Plus, Search, Edit, Trash2, Tags } from "lucide-react";

// Disable static generation for this page
export const dynamic = "force-dynamic";

interface Category {
  id: number;
  name: string;
  description: string;
  image?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function AdminCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    isActive: true,
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const data = await apiService.getCategories();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiService.createCategory({
        ...formData,
        image: "/placeholder-category.jpg", // Default image
      });

      setShowCreateModal(false);
      resetForm();
      fetchCategories();
    } catch (error) {
      console.error("Error creating category:", error);
      alert("Error creating category");
    }
  };

  const handleUpdateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory) return;

    try {
      await apiService.updateCategory(editingCategory.id, formData);

      setEditingCategory(null);
      resetForm();
      fetchCategories();
    } catch (error) {
      console.error("Error updating category:", error);
      alert("Error updating category");
    }
  };

  const handleDeleteCategory = async (id: number) => {
    if (
      !confirm(
        "Are you sure you want to delete this category? This will affect all products in this category."
      )
    )
      return;

    try {
      await apiService.deleteCategory(id);
      fetchCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
      alert("Error deleting category");
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      isActive: true,
    });
  };

  const startEdit = (category: Category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description,
      isActive: category.isActive,
    });
  };

  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN");
  };

  return (
    <AdminLayout title="Categories Management">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search categories..."
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
            <span>Add Category</span>
          </Button>
        </div>

        {/* Categories Table */}
        <Card>
          <CardHeader>
            <CardTitle>Categories ({filteredCategories.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : filteredCategories.length === 0 ? (
              <div className="text-center py-8">
                <Tags className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No categories found</p>
                <Button
                  onClick={() => setShowCreateModal(true)}
                  className="mt-4"
                >
                  Create your first category
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3">Name</th>
                      <th className="text-left p-3">Description</th>
                      <th className="text-left p-3">Status</th>
                      <th className="text-left p-3">Created</th>
                      <th className="text-left p-3">Updated</th>
                      <th className="text-left p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCategories.map((category) => (
                      <tr
                        key={category.id}
                        className="border-b hover:bg-gray-50"
                      >
                        <td className="p-3">
                          <p className="font-medium">{category.name}</p>
                        </td>
                        <td className="p-3">
                          <p className="text-gray-600 max-w-xs truncate">
                            {category.description}
                          </p>
                        </td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              category.isActive
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {category.isActive ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td className="p-3">
                          {formatDate(category.createdAt)}
                        </td>
                        <td className="p-3">
                          {formatDate(category.updatedAt)}
                        </td>
                        <td className="p-3">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => startEdit(category)}
                              className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteCategory(category.id)}
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
        {(showCreateModal || editingCategory) && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <h2 className="text-xl font-bold mb-4">
                {editingCategory ? "Edit Category" : "Create Category"}
              </h2>

              <form
                onSubmit={
                  editingCategory ? handleUpdateCategory : handleCreateCategory
                }
              >
                <div className="space-y-4">
                  <Input
                    label="Category Name"
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

                  <div className="flex items-center">
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
                  </div>
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowCreateModal(false);
                      setEditingCategory(null);
                      resetForm();
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">
                    {editingCategory ? "Update" : "Create"}
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
