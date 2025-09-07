"use client";

import React from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const themes = [
    { value: "light", icon: Sun, label: "Light" },
    { value: "dark", icon: Moon, label: "Dark" },
    { value: "system", icon: Monitor, label: "System" },
  ] as const;

  return (
    <div className="relative">
      <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
        {themes.map((themeOption) => {
          const Icon = themeOption.icon;
          const isActive = theme === themeOption.value;

          return (
            <button
              key={themeOption.value}
              onClick={() => setTheme(themeOption.value)}
              className={`
                flex items-center justify-center w-8 h-8 rounded-md transition-all duration-200
                ${
                  isActive
                    ? "bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                }
              `}
              title={themeOption.label}
            >
              <Icon className="w-4 h-4" />
            </button>
          );
        })}
      </div>
    </div>
  );
}
