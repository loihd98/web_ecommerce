import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product, Category } from "../types";

interface ProductsState {
  products: Product[];
  categories: Category[];
  featuredProducts: Product[];
  currentProduct: Product | null;
  isLoading: boolean;
  error: string | null;
  filters: {
    category: string;
    priceRange: [number, number];
    searchQuery: string;
  };
}

const initialState: ProductsState = {
  products: [],
  categories: [],
  featuredProducts: [],
  currentProduct: null,
  isLoading: false,
  error: null,
  filters: {
    category: "",
    priceRange: [0, 10000000],
    searchQuery: "",
  },
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
      state.isLoading = false;
    },
    setCategories: (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload;
    },
    setFeaturedProducts: (state, action: PayloadAction<Product[]>) => {
      state.featuredProducts = action.payload;
    },
    setCurrentProduct: (state, action: PayloadAction<Product | null>) => {
      state.currentProduct = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    setFilters: (
      state,
      action: PayloadAction<Partial<ProductsState["filters"]>>
    ) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setLoading,
  setProducts,
  setCategories,
  setFeaturedProducts,
  setCurrentProduct,
  setError,
  setFilters,
  clearError,
} = productsSlice.actions;

export default productsSlice.reducer;
