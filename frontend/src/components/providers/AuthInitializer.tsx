"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/store/hooks";
import { initializeAuth } from "@/store/authSlice";

export default function AuthInitializer() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Initialize auth state from localStorage on app start
    dispatch(initializeAuth());
  }, [dispatch]);

  return null; // This component doesn't render anything
}
