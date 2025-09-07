"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { logout } from "@/store/authSlice";
import { useTranslation } from "@/hooks/useTranslation";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import Logo from "@/components/ui/Logo";
import {
  ShoppingCart,
  User,
  Search,
  Menu,
  X,
  Heart,
  LogOut,
  Package,
  UserCircle,
} from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user } = useAppSelector((state) => state.auth);
  const { totalItems } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const { t, createLocalizedPath } = useTranslation();

  const handleLogout = () => {
    dispatch(logout());
    setIsUserMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
      {/* Top banner */}
      <div className="bg-gradient-to-r from-red-500 via-yellow-400 to-blue-500 text-white text-center py-2 text-sm font-bold lego-text">
        {t("header.banner")}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href={createLocalizedPath("/")}
            className="flex items-center space-x-3"
          >
            <Logo />
          </Link>

          {/* Search bar */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder={t("search.placeholder")}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href={createLocalizedPath("/products")}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              {t("nav.products")}
            </Link>
            <Link
              href={createLocalizedPath("/categories")}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              {t("nav.categories")}
            </Link>
            <Link
              href={createLocalizedPath("/about")}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              {t("nav.about")}
            </Link>

            {/* Wishlist */}
            <Link
              href={createLocalizedPath("/favorites")}
              className="relative p-2 text-gray-700 hover:text-red-600 transition-colors"
              title={t("header.favorites.title")}
            >
              <Heart className="h-6 w-6" />
              {/* TODO: Add favorites count */}
            </Link>

            {/* Cart */}
            <Link
              href={createLocalizedPath("/cart")}
              className="relative p-2 text-gray-700 hover:text-blue-600 transition-colors"
            >
              <ShoppingCart className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  {user.image ? (
                    <Image
                      src={user.image}
                      alt={user.firstName}
                      width={32}
                      height={32}
                      className="h-8 w-8 rounded-full object-cover border-2 border-gray-200"
                    />
                  ) : (
                    <UserCircle className="h-8 w-8" />
                  )}
                  <span className="hidden lg:block">{user.firstName}</span>
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <Link
                      href={createLocalizedPath("/profile")}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <User className="h-4 w-4 mr-2" />
                      {t("nav.profile")}
                    </Link>
                    <Link
                      href={createLocalizedPath("/favorites")}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <Heart className="h-4 w-4 mr-2" />
                      {t("nav.favorites")}
                    </Link>
                    <Link
                      href={createLocalizedPath("/orders")}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <Package className="h-4 w-4 mr-2" />
                      {t("nav.orders")}
                    </Link>
                    {user?.role === "admin" && (
                      <Link
                        href={createLocalizedPath("/admin")}
                        className="flex items-center px-4 py-2 text-sm text-blue-600 hover:bg-blue-50"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Package className="h-4 w-4 mr-2" />
                        {t("nav.admin")}
                      </Link>
                    )}
                    <hr className="my-1" />
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      {t("auth.logout")}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <LanguageSwitcher />
                <Link
                  href={createLocalizedPath("/login")}
                  className="text-gray-700 hover:text-blue-600 transition-colors"
                >
                  {t("auth.signIn")}
                </Link>
                <Link
                  href={createLocalizedPath("/register")}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {t("auth.signUp")}
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-700"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-2 space-y-2">
            <Link
              href={createLocalizedPath("/products")}
              className="block py-2 text-gray-700 hover:text-blue-600"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("nav.products")}
            </Link>
            <Link
              href={createLocalizedPath("/categories")}
              className="block py-2 text-gray-700 hover:text-blue-600"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("nav.categories")}
            </Link>
            <Link
              href={createLocalizedPath("/about")}
              className="block py-2 text-gray-700 hover:text-blue-600"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("nav.about")}
            </Link>

            {user ? (
              <>
                <div className="flex items-center space-x-3 py-3 border-t border-gray-200">
                  {user.image ? (
                    <Image
                      src={user.image}
                      alt={user.firstName}
                      width={40}
                      height={40}
                      className="h-10 w-10 rounded-full object-cover border-2 border-gray-200"
                    />
                  ) : (
                    <UserCircle className="h-10 w-10 text-gray-400" />
                  )}
                  <div>
                    <p className="font-medium text-gray-900">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>
                <Link
                  href={createLocalizedPath("/profile")}
                  className="block py-2 text-gray-700 hover:text-blue-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t("nav.profile")}
                </Link>
                <Link
                  href={createLocalizedPath("/favorites")}
                  className="block py-2 text-gray-700 hover:text-blue-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t("nav.favorites")}
                </Link>
                <Link
                  href={createLocalizedPath("/cart")}
                  className="block py-2 text-gray-700 hover:text-blue-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t("nav.cart")} ({totalItems})
                </Link>
                <Link
                  href={createLocalizedPath("/orders")}
                  className="block py-2 text-gray-700 hover:text-blue-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t("nav.orders")}
                </Link>
                {user?.role === "admin" && (
                  <Link
                    href={createLocalizedPath("/admin")}
                    className="block py-2 text-blue-600 hover:text-blue-700 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t("nav.admin")}
                  </Link>
                )}
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left py-2 text-gray-700 hover:text-blue-600"
                >
                  {t("auth.logout")}
                </button>
              </>
            ) : (
              <>
                <Link
                  href={createLocalizedPath("/login")}
                  className="block py-2 text-gray-700 hover:text-blue-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t("auth.signIn")}
                </Link>
                <Link
                  href={createLocalizedPath("/register")}
                  className="block py-2 text-gray-700 hover:text-blue-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t("auth.signUp")}
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
