import React from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div
      className={cn(
        "bg-white rounded-lg shadow-sm border border-gray-200",
        className
      )}
    >
      {children}
    </div>
  );
};

const CardHeader: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div className={cn("px-6 py-4 border-b border-gray-200", className)}>
      {children}
    </div>
  );
};

const CardContent: React.FC<CardProps> = ({ children, className }) => {
  return <div className={cn("px-6 py-4", className)}>{children}</div>;
};

const CardFooter: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div className={cn("px-6 py-4 border-t border-gray-200", className)}>
      {children}
    </div>
  );
};

const CardTitle: React.FC<CardProps> = ({ children, className }) => {
  return (
    <h3 className={cn("text-lg font-semibold text-gray-900", className)}>
      {children}
    </h3>
  );
};

export { Card, CardHeader, CardContent, CardFooter, CardTitle };
