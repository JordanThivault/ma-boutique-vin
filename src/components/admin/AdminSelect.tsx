// src/components/admin/AdminSelect.tsx
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AdminSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode;
  className?: string;
}

export function AdminSelect({ children, className, ...props }: AdminSelectProps) {
  return (
    <div className="relative">
      <select
        className={cn(
          "appearance-none rounded-xl border bg-white py-2 pr-8 pl-3 text-sm text-neutral-700",
          "focus:ring-2 focus:ring-neutral-900 focus:outline-none",
          "cursor-pointer",
          className
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-neutral-400" />
    </div>
  );
}
