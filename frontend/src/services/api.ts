import { Product, User, Category } from "@/types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

class ApiService {
  private getAuthHeaders() {
    const token = localStorage.getItem("token");
    return {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  private async handleResponse(response: Response) {
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`
      );
    }
    return response.json();
  }

  // Auth APIs
  async login(email: string, password: string) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ email, password }),
    });
    return this.handleResponse(response);
  }

  async register(userData: {
    name: string;
    email: string;
    phone: string;
    password: string;
  }) {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: this.getAuthHeaders(),
      body: JSON.stringify(userData),
    });
    return this.handleResponse(response);
  }

  async getProfile() {
    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }

  async updateProfile(userData: {
    name: string;
    email: string;
    phone: string;
  }) {
    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
      method: "PUT",
      headers: this.getAuthHeaders(),
      body: JSON.stringify(userData),
    });
    return this.handleResponse(response);
  }

  async forgotPassword(email: string) {
    const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
      method: "POST",
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ email }),
    });
    return this.handleResponse(response);
  }

  async resetPassword(token: string, password: string) {
    const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
      method: "POST",
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ token, password }),
    });
    return this.handleResponse(response);
  }

  // Products APIs
  async getProducts(params?: {
    category?: number;
    search?: string;
    sortBy?: string;
    minPrice?: number;
    maxPrice?: number;
    page?: number;
    limit?: number;
  }) {
    const queryString = params
      ? "?" +
        new URLSearchParams(
          Object.entries(params).reduce((acc, [key, value]) => {
            if (value !== undefined && value !== null) {
              acc[key] = String(value);
            }
            return acc;
          }, {} as Record<string, string>)
        ).toString()
      : "";

    const response = await fetch(`${API_BASE_URL}/products${queryString}`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }

  async getProduct(id: number) {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }

  async getFeaturedProducts() {
    const response = await fetch(`${API_BASE_URL}/products/featured`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }

  async createProduct(productData: Partial<Product>) {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: "POST",
      headers: this.getAuthHeaders(),
      body: JSON.stringify(productData),
    });
    return this.handleResponse(response);
  }

  async updateProduct(id: number, productData: Partial<Product>) {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: "PUT",
      headers: this.getAuthHeaders(),
      body: JSON.stringify(productData),
    });
    return this.handleResponse(response);
  }

  async deleteProduct(id: number) {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: "DELETE",
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }

  // Categories APIs
  async getCategories() {
    const response = await fetch(`${API_BASE_URL}/categories`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }

  async getCategory(id: number) {
    const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }

  async createCategory(categoryData: Partial<Category>) {
    const response = await fetch(`${API_BASE_URL}/categories`, {
      method: "POST",
      headers: this.getAuthHeaders(),
      body: JSON.stringify(categoryData),
    });
    return this.handleResponse(response);
  }

  async updateCategory(id: number, categoryData: Partial<Category>) {
    const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
      method: "PUT",
      headers: this.getAuthHeaders(),
      body: JSON.stringify(categoryData),
    });
    return this.handleResponse(response);
  }

  async deleteCategory(id: number) {
    const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
      method: "DELETE",
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }

  // Orders APIs
  async createOrder(orderData: {
    items: Array<{
      productId: number;
      productName: string;
      price: number;
      discountPrice?: number;
      quantity: number;
      productAttributes?: Record<string, unknown>;
    }>;
    shippingInfo: {
      fullName: string;
      phone: string;
      email: string;
      address: string;
      city: string;
      district: string;
      ward: string;
      notes?: string;
    };
    paymentMethod: "cod" | "card" | "momo" | "vnpay";
    subtotal: number;
    shippingFee: number;
    discount: number;
    total: number;
  }) {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: "POST",
      headers: this.getAuthHeaders(),
      body: JSON.stringify(orderData),
    });
    return this.handleResponse(response);
  }

  async getOrders() {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }

  async getUserOrders(userId: number) {
    const response = await fetch(`${API_BASE_URL}/orders/user/${userId}`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }

  async getOrder(id: number) {
    const response = await fetch(`${API_BASE_URL}/orders/${id}`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }

  async updateOrderStatus(id: number, status: string) {
    const response = await fetch(`${API_BASE_URL}/orders/${id}/status`, {
      method: "PATCH",
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ status }),
    });
    return this.handleResponse(response);
  }

  // Users APIs
  async getUsers() {
    const response = await fetch(`${API_BASE_URL}/users`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }

  async getUser(id: number) {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }

  async updateUser(id: number, userData: Partial<User>) {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: "PUT",
      headers: this.getAuthHeaders(),
      body: JSON.stringify(userData),
    });
    return this.handleResponse(response);
  }

  // Favorites APIs (using localStorage for now since backend doesn't have this feature)
  async getFavorites() {
    try {
      const favorites = localStorage.getItem("favorites");
      if (!favorites) return [];

      const favoriteIds = JSON.parse(favorites);
      // Get product details for each favorite
      const favoriteProducts = await Promise.all(
        favoriteIds.map(async (id: number) => {
          try {
            return await this.getProduct(id);
          } catch (error) {
            console.error(`Error fetching favorite product ${id}:`, error);
            return null;
          }
        })
      );

      return favoriteProducts.filter((product) => product !== null);
    } catch (error) {
      console.error("Error getting favorites:", error);
      return [];
    }
  }

  async addToFavorites(productId: number) {
    try {
      const favorites = localStorage.getItem("favorites");
      const favoriteIds = favorites ? JSON.parse(favorites) : [];

      if (!favoriteIds.includes(productId)) {
        favoriteIds.push(productId);
        localStorage.setItem("favorites", JSON.stringify(favoriteIds));
      }

      return true;
    } catch (error) {
      console.error("Error adding to favorites:", error);
      return false;
    }
  }

  async removeFromFavorites(productId: number) {
    try {
      const favorites = localStorage.getItem("favorites");
      if (!favorites) return true;

      const favoriteIds = JSON.parse(favorites);
      const updatedFavorites = favoriteIds.filter(
        (id: number) => id !== productId
      );
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

      return true;
    } catch (error) {
      console.error("Error removing from favorites:", error);
      return false;
    }
  }

  async isFavorite(productId: number) {
    try {
      const favorites = localStorage.getItem("favorites");
      if (!favorites) return false;

      const favoriteIds = JSON.parse(favorites);
      return favoriteIds.includes(productId);
    } catch (error) {
      console.error("Error checking favorite status:", error);
      return false;
    }
  }
}

export const apiService = new ApiService();
export default apiService;
