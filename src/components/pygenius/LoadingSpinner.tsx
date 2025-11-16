"use client";

import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";

export const LoadingSpinner = ({ className }: { className?: string }) => {
  return (
    <Loader className={cn("animate-spin", className)} />
  );
};
